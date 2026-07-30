import {
  validateCloudProject,
  type FileName,
  type GeneratedProject,
  type ProjectCategory,
  type WorkspaceFiles,
} from "./project-generator";

const MAX_RESPONSE_CHARACTERS = 1_200_000;
const MAX_CONTEXT_FILE_CHARACTERS = 14_000;

export const cloudStorageKeys = {
  draft: "skycode_workspace_draft",
} as const;

export type ManagedAiStatus = {
  authenticated: boolean;
  available: boolean;
  configured: boolean;
  dailyLimit?: number;
  model?: string;
  provider?: string;
};

type ManagedAiResponse = {
  code?: string;
  error?: string;
  meta?: {
    dailyRemaining?: number;
    model?: string;
    provider?: string;
  };
  project?: unknown;
  signInPath?: string;
};

export class ManagedAiError extends Error {
  constructor(
    readonly code: string,
    message: string,
    readonly signInPath?: string,
  ) {
    super(message);
    this.name = "ManagedAiError";
  }
}

export async function getManagedAiStatus(): Promise<ManagedAiStatus> {
  const { response, data } = await fetchJson<ManagedAiStatus>(
    "/api/ai",
    {
      cache: "no-store",
      headers: { Accept: "application/json" },
    },
    10_000,
  );

  if (!response.ok) {
    throw new ManagedAiError(
      "STATUS_UNAVAILABLE",
      "Cloud AI status is temporarily unavailable.",
    );
  }
  return data;
}

export async function generateCloudProject({
  category,
  files,
  request,
}: {
  category: ProjectCategory;
  files: WorkspaceFiles;
  request: string;
}): Promise<GeneratedProject> {
  const currentFiles = Object.fromEntries(
    (Object.entries(files) as [FileName, string][]).map(
      ([name, content]) => [name, compactContextFile(name, content)],
    ),
  ) as WorkspaceFiles;
  const { response, data } = await fetchJson<ManagedAiResponse>(
    "/api/ai",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category,
        currentFiles,
        prompt: request,
      }),
    },
    82_000,
  );

  if (!response.ok || !data.project) {
    throw new ManagedAiError(
      data.code ?? "CLOUD_AI_FAILED",
      data.error ?? "Cloud AI could not complete this request.",
      data.signInPath,
    );
  }

  return validateCloudProject(data.project);
}

function compactContextFile(name: FileName, content: string) {
  if (content.length <= MAX_CONTEXT_FILE_CHARACTERS) return content;

  const marker =
    name === "index.html"
      ? "\n<!-- SkyCode omitted the unchanged middle for a faster AI request. -->\n"
      : name === "package.json"
        ? "\n"
        : "\n/* SkyCode omitted the unchanged middle for a faster AI request. */\n";
  const available = MAX_CONTEXT_FILE_CHARACTERS - marker.length;
  const headLength = Math.ceil(available * 0.68);
  return `${content.slice(0, headLength)}${marker}${content.slice(
    content.length - (available - headLength),
  )}`;
}

async function fetchJson<T>(
  url: string,
  init: RequestInit,
  timeoutMs: number,
): Promise<{ response: Response; data: T }> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
    });
    const raw = await response.text();
    if (raw.length > MAX_RESPONSE_CHARACTERS) {
      throw new ManagedAiError(
        "RESPONSE_SIZE",
        "Cloud AI returned an unexpectedly large response.",
      );
    }

    let data: T;
    try {
      data = JSON.parse(raw) as T;
    } catch {
      throw new ManagedAiError(
        "INVALID_RESPONSE",
        "Cloud AI returned an invalid response.",
      );
    }
    return { response, data };
  } catch (error) {
    if (error instanceof ManagedAiError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ManagedAiError(
        "CLIENT_TIMEOUT",
        "Cloud AI timed out. Instant Builder is still available.",
      );
    }
    throw new ManagedAiError(
      "NETWORK",
      "Cloud AI could not be reached. Instant Builder is still available.",
    );
  } finally {
    window.clearTimeout(timer);
  }
}
