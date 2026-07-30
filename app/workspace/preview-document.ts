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

      const cleanMarkup = (element) => {
        const clone = element.cloneNode(true);
        [clone, ...clone.querySelectorAll("[data-skycode-section-index]")].forEach((node) => {
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

      document.addEventListener("click", (event) => {
        const target = event.target instanceof Element
          ? event.target.closest("[data-skycode-section-index]")
          : null;
        if (!target) return;
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        candidates.forEach((element) =>
          element.classList.remove("skycode-section-selected")
        );
        target.classList.add("skycode-section-selected");
        window.parent.postMessage({
          source: "skycode-preview",
          type: "section-selected",
          section: {
            index: Number(target.getAttribute("data-skycode-section-index")),
            label: target.getAttribute("data-skycode-section-label") || "Section",
            tag: target.tagName.toLowerCase(),
            html: cleanMarkup(target)
          }
        }, "*");
      }, true);

      window.addEventListener("message", (event) => {
        if (event.source !== window.parent) return;
        if (
          !event.data ||
          event.data.source !== "skycode-workspace" ||
          event.data.type !== "clear-section-selection"
        ) {
          return;
        }
        candidates.forEach((element) =>
          element.classList.remove("skycode-section-selected")
        );
      });
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
    </style>`
    : "";
  const editorScript = options.sectionEditor
    ? `<script>${escapeEmbeddedClosingTag(buildSectionEditorBridge(), "script")}<\/script>`
    : "";

  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src 'none'; object-src 'none'; media-src 'none'; frame-src 'none'; worker-src 'none'; form-action 'none'; base-uri 'none'"><style>${embeddedStyles}</style>${editorStyles}</head><body>${files["index.html"]}<script>${embeddedScript}<\/script>${editorScript}</body></html>`;
}
