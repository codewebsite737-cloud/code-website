export const PREVIEW_SECTION_SELECTOR = [
  "nav",
  "header",
  "main > section",
  "main > article",
  "body > section",
  "body > article",
  "aside",
  "footer",
].join(",");

export const SECTION_TARGET_ATTRIBUTE = "data-skycode-target";

export type PreviewSectionSelection = {
  index: number;
  label: string;
  tag: string;
  html: string;
};

const forbiddenSectionElements =
  "script,style,link,iframe,object,embed,base,meta";

function parseBody(source: string) {
  return new DOMParser().parseFromString(
    `<!doctype html><html><body>${source}</body></html>`,
    "text/html",
  );
}

function sectionCandidates(document: Document) {
  return Array.from(
    document.body.querySelectorAll<HTMLElement>(PREVIEW_SECTION_SELECTOR),
  );
}

function parseSectionRoot(markup: string) {
  if (markup.length > 50_000) {
    throw new Error("A single section must be smaller than 50 KB.");
  }

  const template = document.createElement("template");
  template.innerHTML = markup.trim();
  const roots = Array.from(template.content.children);
  if (roots.length !== 1 || !(roots[0] instanceof HTMLElement)) {
    throw new Error("Section HTML must contain exactly one root element.");
  }

  const root = roots[0];
  if (
    root.matches(forbiddenSectionElements) ||
    root.querySelector(forbiddenSectionElements)
  ) {
    throw new Error(
      "Scripts, frames, global styles, and external resources are not allowed inside a section.",
    );
  }

  for (const element of [root, ...Array.from(root.querySelectorAll("*"))]) {
    for (const attribute of Array.from(element.attributes)) {
      const name = attribute.name.toLowerCase();
      const value = attribute.value.trim().toLowerCase();
      if (name.startsWith("on")) {
        throw new Error("Inline event handlers are not allowed in section HTML.");
      }
      if (
        (name === "href" || name === "src" || name === "action") &&
        value.startsWith("javascript:")
      ) {
        throw new Error("JavaScript URLs are not allowed in section HTML.");
      }
    }
  }

  root.removeAttribute(SECTION_TARGET_ATTRIBUTE);
  return root;
}

export function replacePreviewSection(
  source: string,
  sectionIndex: number,
  replacementMarkup: string,
) {
  const sourceDocument = parseBody(source);
  const selected = sectionCandidates(sourceDocument)[sectionIndex];
  if (!selected) {
    throw new Error(
      "This section is no longer available. Refresh the preview and select it again.",
    );
  }

  const replacement = parseSectionRoot(replacementMarkup);
  selected.replaceWith(sourceDocument.importNode(replacement, true));
  return sourceDocument.body.innerHTML.trim();
}

export function markPreviewSection(
  source: string,
  sectionIndex: number,
) {
  const sourceDocument = parseBody(source);
  const selected = sectionCandidates(sourceDocument)[sectionIndex];
  if (!selected) {
    throw new Error(
      "This section is no longer available. Refresh the preview and select it again.",
    );
  }
  selected.setAttribute(SECTION_TARGET_ATTRIBUTE, "selected-section");
  return sourceDocument.body.innerHTML.trim();
}

export function extractMarkedSection(source: string) {
  const generatedDocument = parseBody(source);
  const selected = generatedDocument.body.querySelector<HTMLElement>(
    `[${SECTION_TARGET_ATTRIBUTE}="selected-section"]`,
  );
  if (!selected) {
    throw new Error("Cloud AI did not return the selected section safely.");
  }
  selected.removeAttribute(SECTION_TARGET_ATTRIBUTE);
  return parseSectionRoot(selected.outerHTML).outerHTML;
}

const colorInstructions: Array<[RegExp, string]> = [
  [/\b(orange|amber)\b|پرتەقاڵی|نارنجی/i, "#ff5a1f"],
  [/\b(blue|cyan)\b|شین/i, "#2797ff"],
  [/\b(green|emerald)\b|سەوز/i, "#24b47e"],
  [/\b(purple|violet)\b|مۆر/i, "#8b5cf6"],
  [/\b(pink|rose)\b|پەمەیی/i, "#ec4899"],
];

export function transformSectionLocally(
  sectionMarkup: string,
  instruction: string,
) {
  const root = parseSectionRoot(sectionMarkup);
  const cleanInstruction = instruction.trim();
  let changed = false;

  const quotedText =
    cleanInstruction.match(/["“](.+?)["”]/)?.[1]?.trim() ??
    cleanInstruction.match(/'(.*?)'/)?.[1]?.trim();
  if (quotedText) {
    const textTarget = /\b(button|cta)\b|دوگمە/i.test(cleanInstruction)
      ? root.querySelector("button, a")
      : root.querySelector("h1, h2, h3, p, button, a");
    if (textTarget) {
      textTarget.textContent = quotedText;
      changed = true;
    }
  }

  const requestedColor = colorInstructions.find(([pattern]) =>
    pattern.test(cleanInstruction),
  )?.[1];
  if (requestedColor) {
    root.style.setProperty("--accent", requestedColor);
    root.style.setProperty("--primary", requestedColor);
    root.style.borderColor = `${requestedColor}66`;
    if (/\b(background|fill)\b|پاشبنەما/i.test(cleanInstruction)) {
      root.style.background = `linear-gradient(135deg, ${requestedColor}24, transparent 72%)`;
    }
    changed = true;
  }

  if (/\b(compact|smaller|small)\b|بچووک|کۆمپاکت/i.test(cleanInstruction)) {
    root.style.paddingBlock = "clamp(24px, 5vw, 56px)";
    const heading = root.querySelector<HTMLElement>("h1, h2, h3");
    if (heading) heading.style.fontSize = "clamp(1.75rem, 4vw, 3.5rem)";
    changed = true;
  }

  if (/\b(larger|bigger|large)\b|گەورە/i.test(cleanInstruction)) {
    root.style.paddingBlock = "clamp(64px, 11vw, 144px)";
    const heading = root.querySelector<HTMLElement>("h1, h2, h3");
    if (heading) heading.style.fontSize = "clamp(2.5rem, 7vw, 6.5rem)";
    changed = true;
  }

  if (/\b(center|centered)\b|ناوەڕاست/i.test(cleanInstruction)) {
    root.style.textAlign = "center";
    root.style.marginInline = "auto";
    changed = true;
  }

  if (/\b(rounded|round|card)\b|خڕ|کارت/i.test(cleanInstruction)) {
    root.style.borderRadius = "clamp(20px, 4vw, 48px)";
    root.style.overflow = "hidden";
    changed = true;
  }

  if (/\b(dark|black)\b|تاریک|ڕەش/i.test(cleanInstruction)) {
    root.style.backgroundColor = "#0b0c10";
    root.style.color = "#f7f7f5";
    changed = true;
  } else if (/\b(light|white)\b|ڕووناک|سپی/i.test(cleanInstruction)) {
    root.style.backgroundColor = "#f7f4ee";
    root.style.color = "#171717";
    changed = true;
  }

  if (!changed) {
    throw new Error(
      'Instant section edits support quoted text and focused style directions such as “orange”, “compact”, “larger”, “centered”, “rounded”, “dark”, or “light”. You can also edit the HTML directly.',
    );
  }

  return parseSectionRoot(root.outerHTML).outerHTML;
}
