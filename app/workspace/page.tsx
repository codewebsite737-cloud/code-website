"use client";

// Interactive browser workspace.
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import {
  categoryOptions,
  generateLocalProject,
  type FileName,
  type GeneratedProject,
  type ProjectCategory,
  type WorkspaceFiles,
} from "./project-generator";
import {
  cloudStorageKeys,
  generateCloudProject,
  getManagedAiStatus,
  ManagedAiError,
} from "./cloud-ai";
import {
  BuildWizard,
  type AiMode,
} from "./components/BuildWizard";
import { FileIcon, Icon } from "./components/WorkspaceIcons";
import { buildPreviewDocument } from "./preview-document";

type ActivityPanel = "files" | "search" | "git" | "database";
type BottomPanel = "terminal" | "problems" | "logs";
type MobileWorkspaceView = "ai" | "code" | "preview" | "files" | "tools";
type WorkspaceCanvasMode = "preview" | "code";
type WorkspaceLayoutVersion = "studio" | "classic";
type ResizablePanel = "ai" | "preview" | "utility";
type PanelSizes = {
  ai: number;
  preview: number;
  utility: number;
};
type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  changedCount?: number;
  engine?: "instant" | "cloud" | "fallback";
};

const activityLabels: Record<ActivityPanel, string> = {
  files: "Files",
  search: "Search",
  git: "Source Control",
  database: "Database",
};

const bottomPanelLabels: Record<
  BottomPanel,
  { label: string; icon: string }
> = {
  terminal: { label: "Terminal", icon: "terminal" },
  problems: { label: "Problems", icon: "alert" },
  logs: { label: "Logs", icon: "logs" },
};

const defaultPanelSizes: PanelSizes = {
  ai: 320,
  preview: 440,
  utility: 190,
};

const panelLayoutStorageKey = "skycode:workspace-panel-layout:v1";
const workspaceLayoutStorageKey = "skycode:workspace-layout-version:v1";

function clampPanelSize(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), Math.max(minimum, maximum));
}

function resizePanels(
  panel: ResizablePanel,
  start: PanelSizes,
  deltaX: number,
  deltaY: number,
  viewportWidth: number,
  viewportHeight: number,
): PanelSizes {
  const minimumCodeWidth = 380;
  const activityRailWidth = 48;

  if (panel === "ai") {
    return {
      ...start,
      ai: clampPanelSize(
        Math.round(start.ai + deltaX),
        250,
        Math.min(
          520,
          viewportWidth -
            start.preview -
            minimumCodeWidth -
            activityRailWidth,
        ),
      ),
    };
  }

  if (panel === "preview") {
    return {
      ...start,
      preview: clampPanelSize(
        Math.round(start.preview - deltaX),
        300,
        Math.min(
          680,
          viewportWidth -
            start.ai -
            minimumCodeWidth -
            activityRailWidth,
        ),
      ),
    };
  }

  return {
    ...start,
    utility: clampPanelSize(
      Math.round(start.utility - deltaY),
      120,
      Math.min(380, viewportHeight - 410),
    ),
  };
}

const aiStatusSteps = [
  {
    title: "Understanding your request",
    detail: "Reading your prompt and the current project files.",
  },
  {
    title: "Planning the solution",
    detail: "Choosing the structure, components, and safest changes.",
  },
  {
    title: "Creating project files",
    detail: "Writing and checking HTML, CSS, JavaScript, and configuration.",
  },
  {
    title: "Updating secure preview",
    detail: "Applying the result to your restricted live preview.",
  },
] as const;

const codeKeywords = new Set([
  "async",
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "default",
  "else",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "from",
  "function",
  "if",
  "import",
  "in",
  "let",
  "new",
  "null",
  "return",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "undefined",
  "var",
  "while",
]);

function renderHighlightedCode(code: string): ReactNode[] {
  const tokenPattern =
    /(<!--[\s\S]*?-->|\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|<\/?[A-Za-z][\w-]*|#[\dA-Fa-f]{3,8}\b|\b\d+(?:\.\d+)?(?:px|rem|em|vh|vw|%|s|ms)?\b|--[\w-]+|[A-Za-z-]+(?=\s*:)|[.#][A-Za-z_-][\w-]*(?=[\s,{])|\b[A-Za-z_$][\w$]*\b)/g;
  const output: ReactNode[] = [];
  let cursor = 0;
  let tokenIndex = 0;

  for (const match of code.matchAll(tokenPattern)) {
    const index = match.index ?? 0;
    const token = match[0];
    if (index > cursor) output.push(code.slice(cursor, index));

    let tone = "plain";
    if (
      token.startsWith("<!--") ||
      token.startsWith("/*") ||
      token.startsWith("//")
    ) {
      tone = "comment";
    } else if (/^["'`]/.test(token)) {
      tone = "string";
    } else if (codeKeywords.has(token)) {
      tone = "keyword";
    } else if (/^<\/?/.test(token)) {
      tone = "tag";
    } else if (/^#[\dA-Fa-f]{3,8}$/.test(token)) {
      tone = "color";
    } else if (/^\d/.test(token)) {
      tone = "number";
    } else if (token.startsWith("--") || /^[A-Za-z-]+$/.test(token)) {
      tone = "property";
    } else if (/^[.#]/.test(token)) {
      tone = "selector";
    }

    output.push(
      <span className={`syntax-${tone}`} key={`${tokenIndex}-${index}`}>
        {token}
      </span>,
    );
    tokenIndex += 1;
    cursor = index + token.length;
  }

  if (cursor < code.length) output.push(code.slice(cursor));
  return output;
}

const starterFiles: WorkspaceFiles = {
  "index.html": `<main class="hero">
  <nav>
    <a class="brand" href="#">Northstar</a>
    <div class="nav-links">
      <a href="#work">Work</a>
      <a href="#about">About</a>
    </div>
  </nav>

  <section class="hero-copy">
    <span class="eyebrow">Independent creative studio</span>
    <h1>We turn bold ideas into digital experiences.</h1>
    <p>Strategy, identity and interfaces made for ambitious teams.</p>
    <button id="startButton">Start a project <span>↗</span></button>
  </section>

  <div class="orb orb-one"></div>
  <div class="orb orb-two"></div>
</main>`,
  "styles.css": `:root {
  color-scheme: dark;
  font-family: Inter, ui-sans-serif, system-ui;
  background: #080a0f;
  color: #f7f8fb;
}

* { box-sizing: border-box; }
body { margin: 0; background: #080a0f; }

.hero {
  min-height: 100vh;
  padding: 32px 7vw;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 74% 28%, #5e36d955, transparent 27%),
    linear-gradient(135deg, #0d1018, #080a0f 58%);
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
}

.brand { color: white; font-weight: 750; letter-spacing: -.04em; }
.nav-links { display: flex; gap: 28px; }
a { color: #a8acb8; text-decoration: none; font-size: 14px; }

.hero-copy {
  max-width: 720px;
  margin-top: 16vh;
  position: relative;
  z-index: 2;
}

.eyebrow {
  color: #8d72ff;
  font-size: 12px;
  letter-spacing: .16em;
  text-transform: uppercase;
}

h1 {
  font-size: clamp(48px, 7.4vw, 104px);
  line-height: .94;
  letter-spacing: -.065em;
  margin: 24px 0;
  max-width: 940px;
}

p { color: #a8acb8; font-size: 18px; line-height: 1.6; max-width: 520px; }

button {
  margin-top: 24px;
  border: 0;
  border-radius: 999px;
  background: #f5f2ff;
  color: #101116;
  padding: 15px 20px;
  font-weight: 700;
  cursor: pointer;
}

button span { padding-left: 28px; }

.orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(1px);
}
.orb-one {
  width: 360px; height: 360px;
  right: -60px; bottom: -80px;
  background: linear-gradient(135deg, #8f70ff, #4020b8);
  box-shadow: 0 0 100px #6d4cff55;
}
.orb-two {
  width: 110px; height: 110px;
  right: 32%; top: 22%;
  border: 1px solid #ffffff30;
}`,
  "app.js": `const button = document.querySelector('#startButton');

button?.addEventListener('click', () => {
  button.innerHTML = 'Let’s build something <span>→</span>';
});`,
  "package.json": `{
  "name": "northstar-studio",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "vite": "latest"
  }
}`,
};

const fileMeta: { name: FileName; tone: string }[] = [
  { name: "index.html", tone: "html" },
  { name: "styles.css", tone: "css" },
  { name: "app.js", tone: "js" },
  { name: "package.json", tone: "json" },
];

export default function Home() {
  const [files, setFiles] = useState(starterFiles);
  const [previewFiles, setPreviewFiles] = useState(starterFiles);
  const [activeFile, setActiveFile] = useState<FileName>("index.html");
  const [activePanel, setActivePanel] = useState<ActivityPanel>("files");
  const [activeBottomPanel, setActiveBottomPanel] =
    useState<BottomPanel>("terminal");
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
  const [mobileView, setMobileView] =
    useState<MobileWorkspaceView>("preview");
  const [canvasMode, setCanvasMode] =
    useState<WorkspaceCanvasMode>("preview");
  const [layoutVersion, setLayoutVersion] =
    useState<WorkspaceLayoutVersion>("studio");
  const [panelSizes, setPanelSizes] =
    useState<PanelSizes>(defaultPanelSizes);
  const [panelLayoutReady, setPanelLayoutReady] = useState(false);
  const [resizingPanel, setResizingPanel] =
    useState<ResizablePanel | null>(null);
  const [projectExpanded, setProjectExpanded] = useState(true);
  const [srcExpanded, setSrcExpanded] = useState(true);
  const [outlineOpen, setOutlineOpen] = useState(false);
  const [timelineOpen, setTimelineOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [commitMessage, setCommitMessage] = useState("");
  const [baselineFiles, setBaselineFiles] = useState(starterFiles);
  const [commits, setCommits] = useState([
    { message: "Initial workspace", time: "Now" },
  ]);
  const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("northstar-studio");
  const [saveStatus, setSaveStatus] = useState<"Saved" | "Unsaved" | "Saving">("Saved");
  const [runCount, setRunCount] = useState(0);
  const [running, setRunning] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [aiWorking, setAiWorking] = useState(false);
  const [aiStatusIndex, setAiStatusIndex] = useState(0);
  const [aiMode, setAiMode] = useState<AiMode>("instant");
  const [cloudConnected, setCloudConnected] = useState(false);
  const [cloudConfigured, setCloudConfigured] = useState(false);
  const [cloudAuthenticated, setCloudAuthenticated] = useState(false);
  const [cloudConnecting, setCloudConnecting] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | null>(null);
  const [buildPrompt, setBuildPrompt] = useState("");
  const [projectBrief, setProjectBrief] = useState("");
  const [toast, setToast] = useState("");
  const [logs, setLogs] = useState([
    { kind: "muted", text: "SkyCode browser preview" },
    { kind: "good", text: "✓ Restricted preview ready" },
    { kind: "muted", text: "Network access blocked by preview policy" },
  ]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Choose what you want to build, describe it, and I’ll generate all four files with a live preview.",
      engine: "instant",
    },
  ]);
  const importFileRef = useRef<HTMLInputElement>(null);
  const codeHighlightRef = useRef<HTMLPreElement>(null);
  const panelDragRef = useRef<{
    panel: ResizablePanel;
    pointerId: number;
    startX: number;
    startY: number;
    sizes: PanelSizes;
  } | null>(null);

  const changedFiles = fileMeta.filter(
    (file) => files[file.name] !== baselineFiles[file.name],
  );
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    return (Object.entries(files) as [FileName, string][])
      .flatMap(([name, content]) =>
        content.split("\n").flatMap((line, index) =>
          line.toLowerCase().includes(query)
            ? [{ name, line: index + 1, preview: line.trim() || "(blank line)" }]
            : [],
        ),
      )
      .slice(0, 40);
  }, [files, searchQuery]);
  const outlineItems: Record<FileName, string[]> = {
    "index.html": ["main.hero", "nav", "section.hero-copy", "div.orb-one", "div.orb-two"],
    "styles.css": [":root", ".hero", "nav", ".hero-copy", "h1", "button", ".orb"],
    "app.js": ["button", "click listener"],
    "package.json": ["name", "scripts", "dependencies"],
  };
  const lines = files[activeFile].split("\n");
  const previewHasChanges = fileMeta.some(
    (file) => files[file.name] !== previewFiles[file.name],
  );
  const srcDoc = useMemo(
    () => buildPreviewDocument(previewFiles),
    [previewFiles],
  );
  const workspaceProblems = useMemo(() => {
    const problems: {
      kind: "error" | "warning" | "notice";
      file: FileName;
      text: string;
    }[] = [];
    const hasBalancedBraces = (value: string) =>
      (value.match(/{/g)?.length ?? 0) ===
      (value.match(/}/g)?.length ?? 0);

    if (!/<[a-z][\s\S]*>/i.test(files["index.html"])) {
      problems.push({
        kind: "error",
        file: "index.html",
        text: "No valid HTML element was detected.",
      });
    }
    if (!hasBalancedBraces(files["styles.css"])) {
      problems.push({
        kind: "error",
        file: "styles.css",
        text: "CSS contains unbalanced braces.",
      });
    }
    if (!hasBalancedBraces(files["app.js"])) {
      problems.push({
        kind: "warning",
        file: "app.js",
        text: "JavaScript contains unbalanced braces.",
      });
    }
    try {
      JSON.parse(files["package.json"]);
    } catch {
      problems.push({
        kind: "error",
        file: "package.json",
        text: "package.json is not valid JSON.",
      });
    }
    if (previewHasChanges) {
      problems.push({
        kind: "notice",
        file: activeFile,
        text: "Changes are waiting to be run in the secure preview.",
      });
    }

    return problems;
  }, [activeFile, files, previewHasChanges]);

  useEffect(() => {
    const draftValue = window.sessionStorage.getItem(cloudStorageKeys.draft);
    if (draftValue) {
      try {
        const draft = JSON.parse(draftValue) as {
          files?: WorkspaceFiles;
          baselineFiles?: WorkspaceFiles;
          projectId?: string;
          projectName?: string;
          saveStatus?: "Saved" | "Unsaved";
          category?: ProjectCategory | null;
          buildPrompt?: string;
          projectBrief?: string;
          onboardingOpen?: boolean;
        };
        if (
          draft.files &&
          ["index.html", "styles.css", "app.js", "package.json"].every(
            (name) => typeof draft.files?.[name as FileName] === "string",
          )
        ) {
          setFiles(draft.files);
          setPreviewFiles(draft.files);
          setBaselineFiles(draft.baselineFiles ?? draft.files);
        }
        setProjectId(
          typeof draft.projectId === "string" ? draft.projectId : "",
        );
        if (typeof draft.projectName === "string") setProjectName(draft.projectName);
        if (draft.saveStatus === "Saved" || draft.saveStatus === "Unsaved") {
          setSaveStatus(draft.saveStatus);
        }
        if (draft.category) setSelectedCategory(draft.category);
        if (typeof draft.buildPrompt === "string") setBuildPrompt(draft.buildPrompt);
        if (typeof draft.projectBrief === "string") setProjectBrief(draft.projectBrief);
        if (typeof draft.onboardingOpen === "boolean") setOnboardingOpen(draft.onboardingOpen);
      } catch {
        window.sessionStorage.removeItem(cloudStorageKeys.draft);
      } finally {
        window.sessionStorage.removeItem(cloudStorageKeys.draft);
      }
    }

    void getManagedAiStatus()
      .then((status) => {
        setCloudAuthenticated(status.authenticated);
        setCloudConfigured(status.configured);
        setCloudConnected(status.available);
      })
      .catch(() => {
        setCloudAuthenticated(false);
        setCloudConfigured(false);
        setCloudConnected(false);
      });
  }, []);

  useEffect(() => {
    const requestedId = new URLSearchParams(window.location.search).get("project");
    if (!requestedId) return;
    setOnboardingOpen(false);
    let cancelled = false;

    void fetch(`/api/projects?id=${encodeURIComponent(requestedId)}`, {
      cache: "no-store",
    })
      .then(async (response) => {
        const data = (await response.json()) as {
          project?: {
            id: string;
            name: string;
            template?: string;
            files: Partial<Record<FileName, string>>;
          };
          error?: string;
        };
        if (!response.ok || !data.project) throw new Error(data.error ?? "Project could not be loaded.");
        return data.project;
      })
      .then((project) => {
        if (cancelled) return;
        const supportedFiles = Object.fromEntries(
          Object.entries(project.files).filter(
            ([name, content]) => name in starterFiles && typeof content === "string",
          ),
        ) as Partial<Record<FileName, string>>;
        const loadedFiles = { ...starterFiles, ...supportedFiles };
        setFiles(loadedFiles);
        setPreviewFiles(loadedFiles);
        setBaselineFiles(loadedFiles);
        setProjectId(project.id);
        setProjectName(project.name);
        if (
          categoryOptions.some((option) => option.id === project.template)
        ) {
          setSelectedCategory(project.template as ProjectCategory);
        }
        setSaveStatus("Saved");
        showToast("Project loaded");
      })
      .catch((error: unknown) => {
        if (!cancelled) showToast(error instanceof Error ? error.message : "Project could not be loaded.");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!aiWorking) {
      setAiStatusIndex(0);
      return;
    }

    const statusTimer = window.setInterval(() => {
      setAiStatusIndex((current) =>
        Math.min(current + 1, aiStatusSteps.length - 1),
      );
    }, 850);

    return () => window.clearInterval(statusTimer);
  }, [aiWorking]);

  useEffect(() => {
    const savedVersion = window.localStorage.getItem(
      workspaceLayoutStorageKey,
    );
    if (savedVersion === "studio" || savedVersion === "classic") {
      setLayoutVersion(savedVersion);
    }
  }, []);

  useEffect(() => {
    try {
      const savedLayout = window.localStorage.getItem(panelLayoutStorageKey);
      if (savedLayout) {
        const parsed = JSON.parse(savedLayout) as Partial<PanelSizes>;
        if (
          typeof parsed.ai === "number" &&
          typeof parsed.preview === "number" &&
          typeof parsed.utility === "number"
        ) {
          setPanelSizes({
            ai: clampPanelSize(parsed.ai, 250, 520),
            preview: clampPanelSize(parsed.preview, 300, 680),
            utility: clampPanelSize(parsed.utility, 120, 380),
          });
        }
      }
    } catch {
      window.localStorage.removeItem(panelLayoutStorageKey);
    } finally {
      setPanelLayoutReady(true);
    }
  }, []);

  useEffect(() => {
    if (!panelLayoutReady) return;
    window.localStorage.setItem(
      panelLayoutStorageKey,
      JSON.stringify(panelSizes),
    );
  }, [panelLayoutReady, panelSizes]);

  function runProject() {
    if (running) return;
    setCanvasMode("preview");
    setMobileView("preview");
    setRunning(true);
    setPreviewFiles({ ...files });
    setRunCount((count) => count + 1);
    setLogs((current) => [
      ...current,
      { kind: "muted", text: "Refreshing restricted browser preview…" },
    ]);
    window.setTimeout(() => {
      setRunning(false);
      setLogs((current) => [
        ...current,
        { kind: "good", text: "✓ Preview updated" },
      ]);
      showToast("Preview updated");
    }, 650);
  }

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }

  function persistWorkspaceDraft() {
    try {
      window.sessionStorage.setItem(
        cloudStorageKeys.draft,
        JSON.stringify({
          files,
          baselineFiles,
          projectId,
          projectName,
          saveStatus: saveStatus === "Saving" ? "Unsaved" : saveStatus,
          category: selectedCategory,
          buildPrompt,
          projectBrief,
          onboardingOpen,
        }),
      );
      return true;
    } catch {
      return false;
    }
  }

  async function saveProject() {
    if (saveStatus === "Saving") return;
    setSaveStatus("Saving");
    try {
      const response = await fetch("/api/projects", {
        method: projectId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(projectId ? { id: projectId } : {}),
          name: projectName,
          template: selectedCategory ?? "web",
          files,
        }),
      });
      const data = (await response.json()) as {
        project?: { id: string; name: string };
        error?: string;
      };
      if (response.status === 401) {
        setSaveStatus("Unsaved");
        if (!persistWorkspaceDraft()) {
          throw new Error(
            "Sign-in is required, and this browser could not preserve the draft.",
          );
        }
        const returnTo = `${window.location.pathname}${window.location.search}`;
        window.location.assign(
          `/signin-with-chatgpt?return_to=${encodeURIComponent(returnTo)}`,
        );
        return;
      }
      if (!response.ok || !data.project) throw new Error(data.error ?? "Project could not be saved.");
      if (!projectId) {
        setProjectId(data.project.id);
        window.history.replaceState(null, "", `/workspace?project=${encodeURIComponent(data.project.id)}`);
      }
      setSaveStatus("Saved");
      showToast("Project saved securely");
    } catch (error) {
      setSaveStatus("Unsaved");
      showToast(error instanceof Error ? error.message : "Project could not be saved.");
    }
  }

  async function copyWorkspaceLink() {
    if (!projectId) {
      showToast("Save the project before copying its private link.");
      return;
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Private project link copied");
    } catch {
      showToast("Copy the current address to keep this private project link.");
    }
  }

  function exportProject() {
    const blob = new Blob(
      [buildPreviewDocument(files)],
      { type: "text/html;charset=utf-8" },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${projectName.replace(/[^a-zA-Z0-9_-]/g, "-") || "skycode-project"}.html`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("Static project exported");
  }

  async function importWorkspaceFile(file: File | undefined) {
    if (!file) return;
    const target = fileMeta.find((item) => item.name === file.name)?.name;
    if (!target) {
      showToast("Import index.html, styles.css, app.js, or package.json.");
      return;
    }
    if (file.size > 180_000) {
      showToast("Imported files must be smaller than 180 KB.");
      return;
    }

    try {
      const content = await file.text();
      if (new TextEncoder().encode(content).byteLength > 180_000) {
        throw new Error("Imported files must be smaller than 180 KB.");
      }
      setFiles((current) => ({ ...current, [target]: content }));
      setActiveFile(target);
      setSaveStatus("Unsaved");
      showToast(`${target} imported`);
    } catch (error) {
      showToast(error instanceof Error ? error.message : "File import failed.");
    } finally {
      if (importFileRef.current) importFileRef.current.value = "";
    }
  }

  function selectPanel(panel: ActivityPanel) {
    setActivePanel(panel);
    setMobilePanelOpen((open) => (panel === activePanel ? !open : true));
    setOptionsOpen(false);
  }

  function openFile(name: FileName) {
    setActiveFile(name);
    setCanvasMode("code");
    setMobileView("code");
    setMobilePanelOpen(false);
  }

  function switchCanvas(mode: WorkspaceCanvasMode) {
    setCanvasMode(mode);
    setMobileView(mode);
    if (mode === "preview" && previewHasChanges) runProject();
  }

  function switchLayout(version: WorkspaceLayoutVersion) {
    setLayoutVersion(version);
    window.localStorage.setItem(workspaceLayoutStorageKey, version);
    showToast(
      version === "studio"
        ? "Version 1 studio layout"
        : "Version 2 classic layout",
    );
  }

  function commitChanges() {
    const cleanMessage = commitMessage.trim();
    if (!cleanMessage || changedFiles.length === 0) return;
    setBaselineFiles({ ...files });
    setCommits((current) => [
      { message: cleanMessage.slice(0, 80), time: "Now" },
      ...current.map((commit, index) => ({
        ...commit,
        time: index === 0 ? "Earlier" : commit.time,
      })),
    ]);
    setCommitMessage("");
    setLogs((current) => [
      ...current,
      { kind: "good", text: `✓ Local checkpoint: ${cleanMessage.slice(0, 42)}` },
    ]);
    showToast("Local checkpoint created");
  }

  function revertFile(name: FileName) {
    setFiles((current) => ({ ...current, [name]: baselineFiles[name] }));
    setActiveFile(name);
    setSaveStatus("Unsaved");
    showToast(`${name} restored to the last checkpoint`);
  }

  function openBuildWizard() {
    setSelectedCategory(null);
    setBuildPrompt("");
    setOnboardingOpen(true);
    setMobilePanelOpen(false);
  }

  async function connectCloudAi() {
    if (cloudConnecting) return;
    setCloudConnecting(true);
    try {
      const status = await getManagedAiStatus();
      setCloudAuthenticated(status.authenticated);
      setCloudConfigured(status.configured);

      if (!status.authenticated) {
        if (!persistWorkspaceDraft()) {
          throw new Error(
            "The browser could not preserve this workspace draft.",
          );
        }
        window.location.assign(
          `/signin-with-chatgpt?return_to=${encodeURIComponent("/workspace")}`,
        );
        return;
      }
      if (!status.configured) {
        setCloudConnected(false);
        showToast(
          "Cloud AI backend is ready. Add the server API key to activate it.",
        );
        return;
      }

      setCloudConnected(true);
      setAiMode("cloud");
      showToast("Protected server Cloud AI is ready");
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : "Cloud AI connection could not start.",
      );
    } finally {
      setCloudConnecting(false);
    }
  }

  function disconnectCloudAi() {
    setCloudConnected(false);
    setAiMode("instant");
    showToast("Switched to Instant Builder");
  }

  async function generateWithCloud(
    category: ProjectCategory,
    request: string,
  ): Promise<GeneratedProject> {
    return generateCloudProject({
      category,
      request,
      files,
    });
  }

  async function sendPrompt(
    value = prompt,
    categoryOverride?: ProjectCategory,
    createNewProject = false,
  ) {
    const cleanPrompt = value.trim();
    if (!cleanPrompt || aiWorking) return;
    if (cleanPrompt.length > 3000) {
      showToast("Prompts are limited to 3,000 characters.");
      return;
    }
    const category = categoryOverride ?? selectedCategory;
    if (!category) {
      setBuildPrompt(cleanPrompt);
      setPrompt("");
      setOnboardingOpen(true);
      return;
    }
    setPrompt("");
    setMessages((current) => [
      ...current,
      { role: "user", text: cleanPrompt },
    ]);
    setAiWorking(true);
    let engine: "instant" | "cloud" | "fallback" =
      aiMode === "cloud" && cloudConnected ? "cloud" : "instant";
    let cloudFailure = "";
    const localRequest =
      createNewProject || !projectBrief
        ? cleanPrompt
        : `${projectBrief}\nRequested update: ${cleanPrompt}`;
    try {
      let generated: GeneratedProject;
      if (engine === "cloud") {
        try {
          generated = await generateWithCloud(category, cleanPrompt);
        } catch (error) {
          if (
            error instanceof ManagedAiError &&
            error.code === "AUTH_REQUIRED"
          ) {
            if (persistWorkspaceDraft() && error.signInPath) {
              window.location.assign(error.signInPath);
            }
            throw error;
          }
          cloudFailure =
            error instanceof Error
              ? error.message
              : "The server Cloud AI model was unavailable.";
          generated = generateLocalProject(category, localRequest);
          engine = "fallback";
        }
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, 2200));
        generated = generateLocalProject(category, localRequest);
      }
      setAiStatusIndex(aiStatusSteps.length - 1);
      await new Promise((resolve) => window.setTimeout(resolve, 320));
      if (createNewProject) {
        setProjectId("");
        setBaselineFiles(starterFiles);
        setProjectBrief(cleanPrompt);
        window.history.replaceState(null, "", "/workspace");
      }
      setFiles(generated.files);
      setPreviewFiles(generated.files);
      setCanvasMode("preview");
      setMobileView("preview");
      setProjectName(generated.name);
      setSelectedCategory(category);
      setActiveFile("index.html");
      setSaveStatus("Unsaved");
      setRunCount((count) => count + 1);
      setLogs((current) => [
        ...current,
        {
          kind: "good",
          text:
            engine === "cloud"
              ? "✓ Server Cloud AI generated 4 files"
              : engine === "fallback"
                ? "✓ Instant builder completed the cloud request"
                : "✓ Instant builder generated 4 files locally",
        },
        { kind: "muted", text: "Preview updated automatically" },
      ]);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text:
            engine === "fallback"
              ? `Server Cloud AI was unavailable (${cloudFailure.slice(0, 120)}), so the instant builder completed your project instead. ${generated.summary}`
              : generated.summary,
          changedCount: 4,
          engine,
        },
      ]);
      showToast(
        engine === "cloud"
          ? "Server Cloud AI project generated"
          : "Project generated free on this device",
      );
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text:
            error instanceof Error
              ? `I couldn’t generate the project: ${error.message}`
              : "I couldn’t generate the project. Please try again.",
          engine,
        },
      ]);
    } finally {
      setAiWorking(false);
    }
  }

  function submitBuildWizard() {
    if (!selectedCategory || !buildPrompt.trim() || aiWorking) return;
    setOnboardingOpen(false);
    void sendPrompt(buildPrompt, selectedCategory, true);
  }

  function startPanelResize(
    panel: ResizablePanel,
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    panelDragRef.current = {
      panel,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      sizes: panelSizes,
    };
    setResizingPanel(panel);
  }

  function continuePanelResize(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = panelDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.preventDefault();
    const horizontalDelta =
      drag.panel === "ai" && layoutVersion === "studio"
        ? drag.startX - event.clientX
        : event.clientX - drag.startX;
    setPanelSizes(
      resizePanels(
        drag.panel,
        drag.sizes,
        horizontalDelta,
        event.clientY - drag.startY,
        window.innerWidth,
        window.innerHeight,
      ),
    );
  }

  function finishPanelResize(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = panelDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    panelDragRef.current = null;
    setResizingPanel(null);
  }

  function resizePanelWithKeyboard(
    panel: ResizablePanel,
    event: ReactKeyboardEvent<HTMLDivElement>,
  ) {
    let deltaX = 0;
    let deltaY = 0;
    const step = event.shiftKey ? 40 : 16;

    if (panel === "utility") {
      if (event.key === "ArrowUp") deltaY = -step;
      else if (event.key === "ArrowDown") deltaY = step;
      else return;
    } else {
      if (event.key === "ArrowLeft") deltaX = -step;
      else if (event.key === "ArrowRight") deltaX = step;
      else return;
    }

    event.preventDefault();
    if (panel === "ai" && layoutVersion === "studio") {
      deltaX *= -1;
    }
    setPanelSizes((current) =>
      resizePanels(
        panel,
        current,
        deltaX,
        deltaY,
        window.innerWidth,
        window.innerHeight,
      ),
    );
  }

  function resetPanelSize(panel?: ResizablePanel) {
    setPanelSizes((current) =>
      panel
        ? { ...current, [panel]: defaultPanelSizes[panel] }
        : defaultPanelSizes,
    );
    showToast(panel ? "Panel size reset" : "Workspace layout reset");
  }

  return (
    <main
      className="workspace"
      data-layout-version={layoutVersion}
    >
      <header className="topbar">
        <div className="project-identity">
          <div className="logo-mark"><span /></div>
          <strong>SkyCode</strong>
          <span className="crumb">/</span>
          <button className="project-name" onClick={openBuildWizard}>{projectName} <span>⌄</span></button>
          <button className={`save-state ${saveStatus.toLowerCase()}`} onClick={saveProject}>
            <i /> {saveStatus}
          </button>
        </div>

        <div
          className="workspace-canvas-switcher"
          role="tablist"
          aria-label="Center workspace view"
        >
          <button
            className={canvasMode === "preview" ? "active" : ""}
            role="tab"
            aria-selected={canvasMode === "preview"}
            onClick={() => switchCanvas("preview")}
          >
            Preview
            {previewHasChanges && <i />}
          </button>
          <button
            className={canvasMode === "code" ? "active" : ""}
            role="tab"
            aria-selected={canvasMode === "code"}
            onClick={() => switchCanvas("code")}
          >
            Code
          </button>
        </div>

        <div className="top-actions">
          <div
            className="layout-version-switcher"
            aria-label="Workspace layout version"
          >
            <button
              className={layoutVersion === "studio" ? "active" : ""}
              aria-pressed={layoutVersion === "studio"}
              onClick={() => switchLayout("studio")}
              title="New studio workspace"
            >
              V1
            </button>
            <button
              className={layoutVersion === "classic" ? "active" : ""}
              aria-pressed={layoutVersion === "classic"}
              onClick={() => switchLayout("classic")}
              title="Previous SkyCode workspace"
            >
              V2
            </button>
          </div>
          <button
            className="layout-reset-button"
            onClick={() => resetPanelSize()}
            title="Reset panel sizes"
          >
            <Icon name="layout" size={15} />
            <span>Reset layout</span>
          </button>
          <div className="avatars" aria-label="Project collaborators">
            <span>SK</span><span>AI</span>
          </div>
          <button className="ghost-button" onClick={copyWorkspaceLink}>Copy link</button>
          <button className="run-button" onClick={runProject}>
            <Icon name="play" size={15} />{" "}
            {running ? "Running…" : previewHasChanges ? "Run changes" : "Run"}
          </button>
          <button className="deploy-button" onClick={exportProject}>Export</button>
          <details className="workspace-overflow-menu">
            <summary aria-label="Open workspace actions">•••</summary>
            <div>
              <strong>Workspace</strong>
              <button onClick={() => switchCanvas("preview")}>
                <Icon name="layout" size={15} /> Live preview
              </button>
              <button onClick={() => switchCanvas("code")}>
                <Icon name="terminal" size={15} /> Code editor
              </button>
              <button onClick={runProject}>
                <Icon name="play" size={15} /> Run project
              </button>
              <button onClick={exportProject}>
                <Icon name="files" size={15} /> Export project
              </button>
              <button onClick={copyWorkspaceLink}>
                <Icon name="external" size={15} /> Copy workspace link
              </button>
              <span />
              <strong>Layout</strong>
              <button onClick={() => switchLayout("studio")}>
                <Icon name="layout" size={15} /> Studio layout (V1)
              </button>
              <button onClick={() => switchLayout("classic")}>
                <Icon name="layout" size={15} /> Classic layout (V2)
              </button>
              <button onClick={() => resetPanelSize()}>
                <Icon name="refresh" size={15} /> Reset panel sizes
              </button>
            </div>
          </details>
        </div>
      </header>

      <div
        className={`app-shell${resizingPanel ? " is-resizing" : ""}`}
        data-mobile-view={mobileView}
        data-layout-version={layoutVersion}
        data-canvas-mode={canvasMode}
        data-resizing={resizingPanel ?? undefined}
        style={
          {
            "--ai-panel-width": `${panelSizes.ai}px`,
            "--preview-panel-width": `${panelSizes.preview}px`,
            "--utility-panel-height": `${panelSizes.utility}px`,
          } as CSSProperties
        }
      >
        <aside className="activity-bar">
          <div>
            {(Object.keys(activityLabels) as ActivityPanel[]).map((name) => (
              <button
                key={name}
                className={activePanel === name ? "active" : ""}
                aria-label={activityLabels[name]}
                aria-pressed={activePanel === name}
                title={activityLabels[name]}
                onClick={() => selectPanel(name)}
              >
                <Icon name={name} />
                <span className="activity-label">{activityLabels[name]}</span>
                {name === "git" && changedFiles.length > 0 && (
                  <span className="activity-count">{changedFiles.length}</span>
                )}
              </button>
            ))}
          </div>
          <button
            className="profile-button"
            aria-label="Open project dashboard"
            onClick={() => {
              window.location.href = "/dashboard";
            }}
          >
            SK
          </button>
        </aside>

        <aside className={`explorer activity-panel ${mobilePanelOpen ? "mobile-open" : ""}`}>
          <div className="panel-title">
            <span>{activityLabels[activePanel].toUpperCase()}</span>
            <div className="panel-controls">
              {activePanel === "files" && (
                <button
                  aria-label="File options"
                  aria-expanded={optionsOpen}
                  onClick={() => setOptionsOpen((open) => !open)}
                >
                  •••
                </button>
              )}
              <button
                className="panel-close"
                aria-label="Close panel"
                onClick={() => setMobilePanelOpen(false)}
              >
                ×
              </button>
              {optionsOpen && (
                <div className="panel-menu">
                  <button onClick={() => { void saveProject(); setOptionsOpen(false); }}>Save project</button>
                  <button onClick={() => { exportProject(); setOptionsOpen(false); }}>Export HTML</button>
                  <button onClick={() => {
                    setProjectExpanded(false);
                    setSrcExpanded(false);
                    setOptionsOpen(false);
                  }}>Collapse folders</button>
                </div>
              )}
            </div>
          </div>

          {activePanel === "files" && (
            <>
              <button
                className="tree-heading"
                aria-expanded={projectExpanded}
                onClick={() => setProjectExpanded((expanded) => !expanded)}
              >
                <span className={projectExpanded ? "tree-caret expanded" : "tree-caret"}>
                  <Icon name="chevron" size={13} />
                </span>
                <strong>{projectName.toUpperCase()}</strong>
              </button>
              {projectExpanded && (
                <div className="file-tree">
                  <button
                    className="folder-row"
                    aria-expanded={srcExpanded}
                    onClick={() => setSrcExpanded((expanded) => !expanded)}
                  >
                    <span>{srcExpanded ? "⌄" : "›"}</span><b>⌗</b> src
                  </button>
                  {srcExpanded && fileMeta.slice(0, 3).map((file) => (
                    <button
                      key={file.name}
                      className={activeFile === file.name ? "selected" : ""}
                      onClick={() => openFile(file.name)}
                    >
                      <FileIcon tone={file.tone} />
                      {file.name}
                      {changedFiles.some((changed) => changed.name === file.name) && (
                        <i className="change-dot" />
                      )}
                    </button>
                  ))}
                  <button
                    className={activeFile === "package.json" ? "selected root-file" : "root-file"}
                    onClick={() => openFile("package.json")}
                  >
                    <FileIcon tone="json" /> package.json
                    {changedFiles.some((changed) => changed.name === "package.json") && (
                      <i className="change-dot" />
                    )}
                  </button>
                </div>
              )}
              <div className="explorer-footer">
                <button onClick={() => setOutlineOpen((open) => !open)} aria-expanded={outlineOpen}>
                  <span>OUTLINE</span><span>{outlineOpen ? "⌄" : "›"}</span>
                </button>
                {outlineOpen && (
                  <div className="outline-list">
                    {outlineItems[activeFile].map((item) => (
                      <button key={item} onClick={() => showToast(`${item} selected in ${activeFile}`)}>
                        <span>◇</span>{item}
                      </button>
                    ))}
                  </div>
                )}
                <button onClick={() => setTimelineOpen((open) => !open)} aria-expanded={timelineOpen}>
                  <span>TIMELINE</span><span>{timelineOpen ? "⌄" : "›"}</span>
                </button>
                {timelineOpen && (
                  <div className="timeline-list">
                    {commits.map((commit, index) => (
                      <div key={`${commit.message}-${index}`}><i /><span>{commit.message}</span><small>{commit.time}</small></div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {activePanel === "search" && (
            <div className="search-workspace-panel">
              <label htmlFor="workspace-search">SEARCH ACROSS FILES</label>
              <div className="search-input-wrap">
                <Icon name="search" size={14} />
                <input
                  id="workspace-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search code…"
                  autoComplete="off"
                />
                {searchQuery && <button aria-label="Clear search" onClick={() => setSearchQuery("")}>×</button>}
              </div>
              <div className="search-summary">
                {searchQuery ? `${searchResults.length} result${searchResults.length === 1 ? "" : "s"}` : "Type to search every project file"}
              </div>
              <div className="search-results">
                {searchResults.map((result, index) => (
                  <button key={`${result.name}-${result.line}-${index}`} onClick={() => openFile(result.name)}>
                    <span><FileIcon tone={fileMeta.find((file) => file.name === result.name)?.tone ?? "html"} />{result.name}<small>:{result.line}</small></span>
                    <p>{result.preview}</p>
                  </button>
                ))}
                {searchQuery && searchResults.length === 0 && (
                  <div className="panel-empty"><Icon name="search" /><p>No code matched “{searchQuery}”.</p></div>
                )}
              </div>
            </div>
          )}

          {activePanel === "git" && (
            <div className="source-panel">
              <div className="source-heading">
                <span>LOCAL CHANGES</span><b>{changedFiles.length}</b>
              </div>
              <div className="commit-box">
                <input
                  value={commitMessage}
                  onChange={(event) => setCommitMessage(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") commitChanges();
                  }}
                  placeholder="Checkpoint message"
                  maxLength={80}
                />
                <button disabled={!commitMessage.trim() || changedFiles.length === 0} onClick={commitChanges}>
                  Commit checkpoint
                </button>
              </div>
              <div className="source-files">
                {changedFiles.map((file) => (
                  <div key={file.name}>
                    <button onClick={() => openFile(file.name)}>
                      <FileIcon tone={file.tone} /><span>{file.name}</span><b>M</b>
                    </button>
                    <button aria-label={`Revert ${file.name}`} onClick={() => revertFile(file.name)}>↶</button>
                  </div>
                ))}
                {changedFiles.length === 0 && (
                  <div className="panel-empty source-clean"><span>✓</span><p>No local changes</p><small>Edit a file to see it here.</small></div>
                )}
              </div>
              <div className="source-history">
                <span>CHECKPOINT HISTORY</span>
                {commits.map((commit, index) => (
                  <div key={`${commit.message}-${index}`}><i /><p>{commit.message}</p><small>{commit.time}</small></div>
                ))}
              </div>
            </div>
          )}

          {activePanel === "database" && (
            <div className="tools-panel">
              <p className="panel-description">Protected project storage and backend tools.</p>
              <button onClick={() => void saveProject()}><span className="tool-icon save">✓</span><div><b>Save project</b><small>Store files securely</small></div><span>›</span></button>
              <button onClick={() => { window.location.href = "/dashboard"; }}><span className="tool-icon">▦</span><div><b>Project dashboard</b><small>Manage saved projects</small></div><span>›</span></button>
              <div className="tool-status"><i /><span>Private project records</span><b>{cloudAuthenticated ? "Connected" : "Sign in to save"}</b></div>
            </div>
          )}

        </aside>

        <section className="editor-column">
          <div className="editor-tabs">
            <div className="tab active">
              <FileIcon tone={fileMeta.find((file) => file.name === activeFile)?.tone ?? "html"} />
              {activeFile}
              <Icon name="close" size={12} />
            </div>
            <span className="editor-spacer" />
          </div>
          <div className="breadcrumb">
            <span>src</span><span>›</span><span>{activeFile}</span>
            {activeFile === "index.html" && <><span>›</span><span>main.hero</span></>}
          </div>
          <div className="code-editor">
            <div className="line-numbers" aria-hidden="true">
              {lines.map((_, index) => <span key={index}>{index + 1}</span>)}
            </div>
            <div className="code-input">
              <pre ref={codeHighlightRef} aria-hidden="true">
                <code>{renderHighlightedCode(files[activeFile])}</code>
              </pre>
              <textarea
                aria-label={`${activeFile} code editor`}
                spellCheck={false}
                value={files[activeFile]}
                onScroll={(event) => {
                  if (!codeHighlightRef.current) return;
                  codeHighlightRef.current.scrollTop =
                    event.currentTarget.scrollTop;
                  codeHighlightRef.current.scrollLeft =
                    event.currentTarget.scrollLeft;
                }}
                onChange={(event) => {
                  const nextValue = event.currentTarget.value;
                  setFiles((current) => ({
                    ...current,
                    [activeFile]: nextValue,
                  }));
                  setSaveStatus("Unsaved");
                }}
              />
            </div>
          </div>

          <div className="terminal-panel">
            <div className="terminal-head">
              <div>
                <span className="terminal-section-label">ACTIVITY</span>
              </div>
              <div>
                <span>browser sandbox</span>
                <button
                  aria-label="Clear activity"
                  onClick={() => setLogs([])}
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="terminal-body">
              {logs.length ? (
                logs.slice(-5).map((log, index) => <div key={`${log.text}-${index}`} className={log.kind}>{log.text}</div>)
              ) : (
                <div className="muted">Activity cleared. Run the preview to create a new entry.</div>
              )}
            </div>
          </div>
        </section>

        <aside className="right-column">
          <section className="preview-panel">
            <div className="preview-head">
              <div className="preview-tabs"><span className="active">Secure preview</span></div>
              <div className="preview-actions">
                <button onClick={runProject} aria-label="Refresh preview"><Icon name="refresh" size={14} /></button>
              </div>
            </div>
            <div className="address-bar">
              <span
                className={`status-dot${
                  running ? " running" : previewHasChanges ? " pending" : ""
                }`}
              />
              <span>
                {running
                  ? "Updating preview…"
                  : previewHasChanges
                    ? "Changes ready — press Run"
                    : "Preview up to date"}
              </span>
              <span className="preview-lock" aria-label="Network-restricted preview">◆</span>
            </div>
            <div className="preview-canvas">
              <iframe
                key={runCount}
                title="Live project preview"
                srcDoc={srcDoc}
                sandbox="allow-scripts"
                referrerPolicy="no-referrer"
              />
            </div>
          </section>

          <section className="ai-panel">
            <div className="ai-head">
              <div>
                <span className="ai-icon"><Icon name="spark" size={15} /></span>
                <strong>Sky AI</strong>
                <span className={`ai-engine-status ${aiMode}`}>
                  {aiMode === "cloud" && cloudConnected
                    ? "SERVER CLOUD"
                    : "INSTANT FREE"}
                </span>
              </div>
              <div>
                <button onClick={openBuildWizard} aria-label="Start a new AI build">＋</button>
                <button
                  onClick={() => {
                    if (cloudConnected) setAiMode((mode) => mode === "cloud" ? "instant" : "cloud");
                    else setOnboardingOpen(true);
                  }}
                  aria-label="Switch AI engine"
                >
                  {aiMode === "cloud" ? "☁" : "⌁"}
                </button>
              </div>
            </div>
            <div className="messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.role}`}>
                  <span className="message-avatar">{message.role === "user" ? "SK" : <Icon name="spark" size={13} />}</span>
                  <div>
                    <b>
                      {message.role === "user" ? "You" : "Sky AI"}
                      {message.role === "assistant" && message.engine && (
                        <em className={`message-engine ${message.engine}`}>
                          {message.engine === "cloud"
                            ? "Cloud"
                            : message.engine === "fallback"
                              ? "Local fallback"
                              : "On-device"}
                        </em>
                      )}
                    </b>
                    <p>{message.text}</p>
                    {message.role === "assistant" && message.changedCount && (
                      <div className="change-card">
                        <span><i>{message.changedCount}</i> files changed</span><button onClick={runProject}>Review changes</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {aiWorking && (
                <div
                  className="ai-progress-card"
                  role="status"
                  aria-live="polite"
                >
                  <div className="ai-progress-summary">
                    <span className="ai-progress-spinner">
                      <Icon name="spark" size={14} />
                    </span>
                    <div>
                      <strong>{aiStatusSteps[aiStatusIndex].title}</strong>
                      <p>{aiStatusSteps[aiStatusIndex].detail}</p>
                    </div>
                    <span className="ai-progress-count">
                      {aiStatusIndex + 1}/{aiStatusSteps.length}
                    </span>
                  </div>
                  <div className="ai-progress-track" aria-hidden="true">
                    <i
                      style={{
                        width: `${((aiStatusIndex + 1) / aiStatusSteps.length) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="ai-progress-steps">
                    {aiStatusSteps.map((step, index) => (
                      <span
                        key={step.title}
                        className={
                          index < aiStatusIndex
                            ? "complete"
                            : index === aiStatusIndex
                              ? "active"
                              : ""
                        }
                      >
                        <i>{index < aiStatusIndex ? "✓" : index + 1}</i>
                        {step.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="prompt-area">
              <div className="suggestions">
                <button onClick={openBuildWizard}>＋ New build</button>
                <button onClick={() => sendPrompt("Add a premium purple glow")}>Add premium glow</button>
                <button onClick={() => sendPrompt("Improve the CTA button")}>Improve CTA</button>
              </div>
              <div className="prompt-box">
                <textarea
                  aria-label="Ask Sky AI"
                  placeholder="Ask Sky AI to build, edit, or explain…"
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  maxLength={3000}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      sendPrompt();
                    }
                  }}
                />
                <div>
                  <input
                    ref={importFileRef}
                    className="file-import-input"
                    type="file"
                    accept=".html,.css,.js,.json"
                    onChange={(event) =>
                      void importWorkspaceFile(event.target.files?.[0])
                    }
                  />
                  <button
                    className="attach-button"
                    aria-label="Import a supported project file"
                    onClick={() => importFileRef.current?.click()}
                  >
                    ＋
                  </button>
                  <button
                    className="prompt-engine"
                    onClick={() => {
                      if (cloudConnected) setAiMode((mode) => mode === "cloud" ? "instant" : "cloud");
                      else setOnboardingOpen(true);
                    }}
                  >
                    {aiMode === "cloud" && cloudConnected
                      ? "Server cloud"
                      : "Instant free"}{" "}
                    <b>⌄</b>
                  </button>
                  <button className="send-button" disabled={aiWorking} onClick={() => void sendPrompt()} aria-label="Send prompt"><Icon name="send" size={14} /></button>
                </div>
              </div>
              <small>Instant mode costs nothing and needs no login. Always review generated code.</small>
            </div>
          </section>
        </aside>

        <section className="bottom-dock" aria-label="Developer tools">
          <div className="bottom-dock-tabs">
            <div>
              {(Object.keys(bottomPanelLabels) as BottomPanel[]).map(
                (panel) => (
                  <button
                    key={panel}
                    className={activeBottomPanel === panel ? "active" : ""}
                    aria-pressed={activeBottomPanel === panel}
                    onClick={() => setActiveBottomPanel(panel)}
                  >
                    <Icon
                      name={bottomPanelLabels[panel].icon}
                      size={14}
                    />
                    {bottomPanelLabels[panel].label}
                    {panel === "problems" && (
                      <span className="bottom-tab-count">
                        {workspaceProblems.length}
                      </span>
                    )}
                  </button>
                ),
              )}
            </div>
            <div>
              <span>browser sandbox</span>
              {(activeBottomPanel === "terminal" ||
                activeBottomPanel === "logs") && (
                <button
                  className="bottom-clear-button"
                  onClick={() => setLogs([])}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="bottom-dock-content">
            {activeBottomPanel === "terminal" && (
              <div className="dock-terminal-view">
                {logs.length ? (
                  logs.slice(-10).map((log, index) => (
                    <div
                      key={`${log.text}-${index}`}
                      className={log.kind}
                    >
                      <span>skycode $</span>
                      <p>{log.text}</p>
                    </div>
                  ))
                ) : (
                  <div className="dock-empty">
                    Terminal cleared. Run the preview to create new activity.
                  </div>
                )}
              </div>
            )}

            {activeBottomPanel === "problems" && (
              <div className="dock-problems-view">
                {workspaceProblems.length ? (
                  workspaceProblems.map((problem, index) => (
                    <button
                      key={`${problem.file}-${problem.text}-${index}`}
                      onClick={() => {
                        openFile(problem.file);
                        setMobileView("code");
                      }}
                    >
                      <span className={`problem-mark ${problem.kind}`}>
                        {problem.kind === "error"
                          ? "×"
                          : problem.kind === "warning"
                            ? "!"
                            : "i"}
                      </span>
                      <strong>{problem.file}</strong>
                      <p>{problem.text}</p>
                    </button>
                  ))
                ) : (
                  <div className="dock-empty dock-clean">
                    <span>✓</span>
                    No problems detected in the current project files.
                  </div>
                )}
              </div>
            )}

            {activeBottomPanel === "logs" && (
              <div className="dock-logs-view">
                {logs.length ? (
                  logs.map((log, index) => (
                    <div key={`${log.text}-${index}`}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <b className={log.kind}>
                        {log.kind === "good" ? "SUCCESS" : "INFO"}
                      </b>
                      <p>{log.text}</p>
                    </div>
                  ))
                ) : (
                  <div className="dock-empty">
                    No workspace logs yet.
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <div
          className="resize-handle resize-handle-ai"
          role="separator"
          aria-label="Resize AI assistant"
          aria-orientation="vertical"
          aria-valuemin={250}
          aria-valuemax={520}
          aria-valuenow={panelSizes.ai}
          tabIndex={0}
          title="Drag to resize AI · Double-click to reset"
          onPointerDown={(event) => startPanelResize("ai", event)}
          onPointerMove={continuePanelResize}
          onPointerUp={finishPanelResize}
          onPointerCancel={finishPanelResize}
          onLostPointerCapture={finishPanelResize}
          onKeyDown={(event) => resizePanelWithKeyboard("ai", event)}
          onDoubleClick={() => resetPanelSize("ai")}
        >
          <span aria-hidden="true" />
        </div>
        <div
          className="resize-handle resize-handle-preview"
          role="separator"
          aria-label="Resize live preview"
          aria-orientation="vertical"
          aria-valuemin={300}
          aria-valuemax={680}
          aria-valuenow={panelSizes.preview}
          tabIndex={0}
          title="Drag to resize Preview · Double-click to reset"
          onPointerDown={(event) => startPanelResize("preview", event)}
          onPointerMove={continuePanelResize}
          onPointerUp={finishPanelResize}
          onPointerCancel={finishPanelResize}
          onLostPointerCapture={finishPanelResize}
          onKeyDown={(event) => resizePanelWithKeyboard("preview", event)}
          onDoubleClick={() => resetPanelSize("preview")}
        >
          <span aria-hidden="true" />
        </div>
        <div
          className="resize-handle resize-handle-utility"
          role="separator"
          aria-label="Resize bottom project tools"
          aria-orientation="horizontal"
          aria-valuemin={120}
          aria-valuemax={380}
          aria-valuenow={panelSizes.utility}
          tabIndex={0}
          title="Drag to resize project tools · Double-click to reset"
          onPointerDown={(event) => startPanelResize("utility", event)}
          onPointerMove={continuePanelResize}
          onPointerUp={finishPanelResize}
          onPointerCancel={finishPanelResize}
          onLostPointerCapture={finishPanelResize}
          onKeyDown={(event) => resizePanelWithKeyboard("utility", event)}
          onDoubleClick={() => resetPanelSize("utility")}
        >
          <span aria-hidden="true" />
        </div>
      </div>

      <nav className="mobile-workspace-nav" aria-label="Workspace sections">
        <button
          className={mobileView === "ai" ? "active" : ""}
          onClick={() => setMobileView("ai")}
        >
          <Icon name="spark" size={18} />
          <span>AI</span>
        </button>
        <button
          className={mobileView === "code" ? "active" : ""}
          onClick={() => setMobileView("code")}
        >
          <Icon name="terminal" size={18} />
          <span>Code</span>
        </button>
        <button
          className={mobileView === "preview" ? "active" : ""}
          onClick={() => setMobileView("preview")}
        >
          <Icon name="layout" size={18} />
          <span>Preview</span>
        </button>
        <button
          className={mobileView === "files" ? "active" : ""}
          onClick={() => {
            setActivePanel("files");
            setMobileView("files");
          }}
        >
          <Icon name="files" size={18} />
          <span>Files</span>
        </button>
        <button
          className={mobileView === "tools" ? "active" : ""}
          onClick={() => setMobileView("tools")}
        >
          <Icon name="terminal" size={18} />
          <span>Tools</span>
        </button>
      </nav>

      <footer className="statusbar">
        <div><span>⑂ main*</span><span>↻</span><span>ⓧ 0</span><span>△ 0</span></div>
        <div><span>Spaces: 2</span><span>UTF-8</span><span>{`{ }`} Prettier</span><span>⌁ JavaScript</span><span>◉ Connected</span></div>
      </footer>

      <BuildWizard
        open={onboardingOpen}
        selectedCategory={selectedCategory}
        buildPrompt={buildPrompt}
        aiMode={aiMode}
        cloudConnected={cloudConnected}
        cloudConfigured={cloudConfigured}
        cloudAuthenticated={cloudAuthenticated}
        cloudConnecting={cloudConnecting}
        aiWorking={aiWorking}
        onClose={() => setOnboardingOpen(false)}
        onSelectCategory={setSelectedCategory}
        onPromptChange={setBuildPrompt}
        onAiModeChange={setAiMode}
        onConnectCloudAi={() => void connectCloudAi()}
        onDisconnectCloudAi={disconnectCloudAi}
        onSubmit={submitBuildWizard}
      />

      {toast && <div className="toast"><span>✓</span>{toast}</div>}
    </main>
  );
}
