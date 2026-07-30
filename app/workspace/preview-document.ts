import type { WorkspaceFiles } from "./project-generator";

function escapeEmbeddedClosingTag(source: string, tagName: "style" | "script") {
  return source.replace(
    new RegExp(`</${tagName}`, "gi"),
    `<\\/${tagName}`,
  );
}

export function buildPreviewDocument(files: WorkspaceFiles) {
  const embeddedStyles = escapeEmbeddedClosingTag(files["styles.css"], "style");
  const embeddedScript = escapeEmbeddedClosingTag(files["app.js"], "script");

  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src 'none'; object-src 'none'; media-src 'none'; frame-src 'none'; worker-src 'none'; form-action 'none'; base-uri 'none'"><style>${embeddedStyles}</style></head><body>${files["index.html"]}<script>${embeddedScript}<\/script></body></html>`;
}
