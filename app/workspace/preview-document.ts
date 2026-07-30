import type { WorkspaceFiles } from "./project-generator";

const PREVIEW_SECTION_SELECTOR = [
  "nav",
  "header",
  "main > section",
  "main > article",
  "body > section",
  "body > article",
  "aside",
  "footer",
].join(",");

function escapeEmbeddedClosingTag(source: string, tagName: "style" | "script") {
  return source.replace(
    new RegExp(`</${tagName}`, "gi"),
    `<\\/${tagName}`,
  );
}

type PreviewDocumentOptions = {
  sectionEditor?: boolean;
};

function buildSectionEditorBridge() {
  const selector = JSON.stringify(PREVIEW_SECTION_SELECTOR);
  return `
    (() => {
      const selector = ${selector};
      const candidates = Array.from(document.body.querySelectorAll(selector));
      let selectedIndex = -1;
      const labels = {
        ASIDE: "Sidebar",
        FOOTER: "Footer",
        HEADER: "Header",
        NAV: "Navigation",
        ARTICLE: "Content",
        SECTION: "Section"
      };

      const labelFor = (element) => {
        const clue = [
          element.getAttribute("aria-label"),
          element.id,
          element.className
        ].filter(Boolean).join(" ").toLowerCase();
        if (clue.includes("hero")) return "Hero";
        if (clue.includes("feature")) return "Features";
        if (clue.includes("price")) return "Pricing";
        if (clue.includes("testimonial") || clue.includes("review")) return "Testimonials";
        if (clue.includes("contact")) return "Contact";
        if (clue.includes("cta") || clue.includes("call-to-action")) return "Call to action";
        return labels[element.tagName] || "Section";
      };

      const pathFor = (element) => {
        const path = [];
        let current = element;
        while (current && current !== document.body && path.length < 4) {
          let label = current.tagName.toLowerCase();
          if (current.id) label += "#" + current.id;
          else if (typeof current.className === "string" && current.className.trim()) {
            label += "." + current.className.trim().split(/\\s+/).slice(0, 2).join(".");
          }
          path.unshift(label.slice(0, 54));
          current = current.parentElement;
        }
        return path;
      };

      const cleanMarkup = (element) => {
        const clone = element.cloneNode(true);
        [clone, ...clone.querySelectorAll("*")].forEach((node) => {
          node.removeAttribute("data-skycode-section-index");
          node.removeAttribute("data-skycode-section-label");
          node.classList.remove("skycode-section-selected");
        });
        return clone.outerHTML;
      };

      candidates.forEach((element, index) => {
        element.setAttribute("data-skycode-section-index", String(index));
        element.setAttribute("data-skycode-section-label", labelFor(element));
      });
      document.documentElement.classList.add("skycode-section-mode");

      const toolbar = document.createElement("div");
      toolbar.className = "skycode-section-toolbar";
      toolbar.setAttribute("role", "toolbar");
      toolbar.setAttribute("aria-label", "Selected section actions");
      toolbar.innerHTML = [
        '<strong class="skycode-toolbar-label">Section</strong>',
        '<span class="skycode-toolbar-divider"></span>',
        '<button type="button" data-action="move-up" aria-label="Move section up" title="Move up">↑</button>',
        '<button type="button" data-action="move-down" aria-label="Move section down" title="Move down">↓</button>',
        '<button type="button" data-action="duplicate" aria-label="Duplicate section" title="Duplicate">⧉</button>'
      ].join("");
      document.body.appendChild(toolbar);

      const positionToolbar = () => {
        if (selectedIndex < 0) {
          toolbar.classList.remove("visible");
          return;
        }
        const selected = candidates[selectedIndex];
        if (!selected) return;
        const rect = selected.getBoundingClientRect();
        const toolbarRect = toolbar.getBoundingClientRect();
        const left = Math.max(
          8,
          Math.min(rect.left + 8, window.innerWidth - toolbarRect.width - 8)
        );
        const top = rect.top > toolbarRect.height + 12
          ? rect.top - toolbarRect.height - 8
          : Math.min(window.innerHeight - toolbarRect.height - 8, rect.top + 8);
        toolbar.style.left = left + "px";
        toolbar.style.top = Math.max(8, top) + "px";
        toolbar.classList.add("visible");
      };

      const emitSelection = (index) => {
        const target = candidates[index];
        if (!target) return;
        selectedIndex = index;
        candidates.forEach((element) =>
          element.classList.remove("skycode-section-selected")
        );
        target.classList.add("skycode-section-selected");
        toolbar.querySelector(".skycode-toolbar-label").textContent =
          target.getAttribute("data-skycode-section-label") || "Section";
        positionToolbar();
        window.parent.postMessage({
          source: "skycode-preview",
          type: "section-selected",
          section: {
            index,
            label: target.getAttribute("data-skycode-section-label") || "Section",
            tag: target.tagName.toLowerCase(),
            html: cleanMarkup(target),
            path: pathFor(target)
          }
        }, "*");
      };

      const clearSelection = (notifyParent) => {
        selectedIndex = -1;
        candidates.forEach((element) =>
          element.classList.remove("skycode-section-selected")
        );
        toolbar.classList.remove("visible");
        if (notifyParent) {
          window.parent.postMessage({
            source: "skycode-preview",
            type: "section-deselected"
          }, "*");
        }
      };

      toolbar.addEventListener("click", (event) => {
        const button = event.target instanceof Element
          ? event.target.closest("button[data-action]")
          : null;
        if (!button || selectedIndex < 0) return;
        event.preventDefault();
        event.stopPropagation();
        window.parent.postMessage({
          source: "skycode-preview",
          type: "section-action",
          action: button.getAttribute("data-action"),
          index: selectedIndex
        }, "*");
      });

      document.addEventListener("click", (event) => {
        const target = event.target instanceof Element
          ? event.target.closest("[data-skycode-section-index]")
          : null;
        if (!target) return;
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        emitSelection(Number(target.getAttribute("data-skycode-section-index")));
      }, true);

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && selectedIndex >= 0) {
          event.preventDefault();
          clearSelection(true);
        }
      });
      window.addEventListener("scroll", positionToolbar, true);
      window.addEventListener("resize", positionToolbar);

      window.addEventListener("message", (event) => {
        if (event.source !== window.parent) return;
        if (!event.data || event.data.source !== "skycode-workspace") return;
        if (event.data.type === "clear-section-selection") {
          clearSelection(false);
          return;
        }
        if (
          event.data.type === "select-section" &&
          Number.isInteger(event.data.index) &&
          candidates[event.data.index]
        ) {
          candidates[event.data.index].scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
          emitSelection(event.data.index);
        }
      });

      window.parent.postMessage({
        source: "skycode-preview",
        type: "sections-ready",
        sections: candidates.map((element, index) => ({
          index,
          label: element.getAttribute("data-skycode-section-label") || "Section",
          tag: element.tagName.toLowerCase()
        }))
      }, "*");
    })();
  `;
}

export function buildPreviewDocument(
  files: WorkspaceFiles,
  options: PreviewDocumentOptions = {},
) {
  const embeddedStyles = escapeEmbeddedClosingTag(files["styles.css"], "style");
  const embeddedScript = escapeEmbeddedClosingTag(files["app.js"], "script");
  const editorStyles = options.sectionEditor
    ? `<style>
      .skycode-section-mode [data-skycode-section-index] {
        cursor: pointer !important;
        outline: 1px dashed rgba(255, 107, 53, .72);
        outline-offset: -2px;
        transition: outline-color .16s ease, box-shadow .16s ease;
      }
      .skycode-section-mode [data-skycode-section-index]:hover {
        outline: 2px solid #ff6b35;
        outline-offset: -2px;
        box-shadow: inset 0 0 0 1px rgba(255, 107, 53, .2);
      }
      .skycode-section-mode .skycode-section-selected {
        outline: 3px solid #ff5a1f !important;
        outline-offset: -3px !important;
        box-shadow: inset 0 0 0 2px rgba(255, 90, 31, .22) !important;
      }
      .skycode-section-toolbar {
        all: initial;
        min-height: 34px;
        position: fixed;
        z-index: 2147483647;
        display: none;
        align-items: center;
        gap: 3px;
        padding: 4px;
        border: 1px solid rgba(255, 255, 255, .16);
        border-radius: 10px;
        background: rgba(15, 16, 20, .96);
        color: #f6f7f9;
        box-shadow: 0 12px 32px rgba(0, 0, 0, .42);
        font: 600 12px/1 Inter, ui-sans-serif, system-ui, sans-serif;
        backdrop-filter: blur(18px);
      }
      .skycode-section-toolbar.visible {
        display: flex;
      }
      .skycode-section-toolbar strong {
        all: initial;
        max-width: 150px;
        overflow: hidden;
        padding: 0 7px;
        color: #f6f7f9;
        font: 700 11px/1 Inter, ui-sans-serif, system-ui, sans-serif;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .skycode-section-toolbar .skycode-toolbar-divider {
        all: initial;
        width: 1px;
        height: 18px;
        margin-right: 2px;
        background: rgba(255, 255, 255, .13);
      }
      .skycode-section-toolbar button {
        all: initial;
        width: 27px;
        height: 27px;
        border-radius: 7px;
        color: #d9dbe2;
        font: 700 15px/27px Inter, ui-sans-serif, system-ui, sans-serif;
        text-align: center;
        cursor: pointer;
      }
      .skycode-section-toolbar button:hover {
        background: rgba(255, 90, 31, .2);
        color: #fff;
      }
    </style>`
    : "";
  const editorScript = options.sectionEditor
    ? `<script>${escapeEmbeddedClosingTag(buildSectionEditorBridge(), "script")}<\/script>`
    : "";

  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src 'none'; object-src 'none'; media-src 'none'; frame-src 'none'; worker-src 'none'; form-action 'none'; base-uri 'none'"><style>${embeddedStyles}</style>${editorStyles}</head><body>${files["index.html"]}<script>${embeddedScript}<\/script>${editorScript}</body></html>`;
}
