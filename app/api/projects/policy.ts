export const MAX_BODY_BYTES = 500_000;
export const MAX_FILES = 60;
export const MAX_FILE_BYTES = 180_000;
export const MAX_PROJECTS_PER_USER = 100;

const ALLOWED_TEMPLATES = new Set([
  "web",
  "react",
  "blank",
  "website",
  "web-app",
  "mobile-app",
  "dashboard",
  "store",
  "other",
]);

const PROJECT_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type ProjectFiles = Record<string, string>;

export class ProjectInputError extends Error {
  constructor(
    readonly code: string,
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ProjectInputError";
  }
}

function getHeader(request: Request, name: string): string | null {
  const h = (request as any)?.headers;
  if (!h) return null;

  let raw: any = null;
  if (typeof h.get === "function") {
    try {
      raw = h.get(name) ?? h.get(name.toLowerCase());
    } catch {
      // ignore
    }
  }
  if (!raw && typeof h.entries === "function") {
    try {
      for (const [k, v] of h.entries()) {
        if (k.toLowerCase() === name.toLowerCase()) {
          raw = v;
          break;
        }
      }
    } catch {
      // ignore
    }
  }
  if (!raw && typeof h === "object") {
    for (const k of Object.keys(h)) {
      if (k.toLowerCase() === name.toLowerCase()) {
        raw = h[k];
        break;
      }
    }
  }

  if (raw === null || raw === undefined) return null;
  if (Array.isArray(raw)) return raw[0] ? String(raw[0]) : null;
  return String(raw);
}

import { headers } from "next/headers";

export async function assertTrustedMutation(request: Request) {
  let requestOrigin = getHeader(request, "origin");
  let fetchSite = getHeader(request, "sec-fetch-site");
  let contentType = getHeader(request, "content-type")?.toLowerCase();

  try {
    const h = await headers();
    if (!requestOrigin) requestOrigin = h.get("origin");
    if (!fetchSite) fetchSite = h.get("sec-fetch-site");
    if (!contentType) contentType = h.get("content-type")?.toLowerCase();
  } catch {
    // ignore
  }

  const expectedOrigin = new URL(request.url).origin;
  if (requestOrigin && requestOrigin !== expectedOrigin) {
    throw new ProjectInputError(
      "CROSS_ORIGIN",
      403,
      "Cross-origin writes are not allowed.",
    );
  }

  if (fetchSite && fetchSite !== "same-origin") {
    throw new ProjectInputError(
      "CROSS_SITE",
      403,
      "Cross-site writes are not allowed.",
    );
  }

  if (contentType && !contentType.startsWith("application/json")) {
    throw new ProjectInputError(
      "CONTENT_TYPE",
      415,
      "Content-Type must be application/json.",
    );
  }
}

export async function readProjectPayload(request: Request) {
  assertTrustedMutation(request);

  const contentLength = request.headers.get("content-length");
  if (contentLength) {
    const declaredLength = Number(contentLength);
    if (
      !Number.isSafeInteger(declaredLength) ||
      declaredLength < 0 ||
      declaredLength > MAX_BODY_BYTES
    ) {
      throw new ProjectInputError(
        "PAYLOAD_SIZE",
        413,
        "Project payload is too large.",
      );
    }
  }

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
    throw new ProjectInputError(
      "PAYLOAD_SIZE",
      413,
      "Project payload is too large.",
    );
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    throw new ProjectInputError(
      "INVALID_JSON",
      400,
      "Request body must contain valid JSON.",
    );
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new ProjectInputError(
      "INVALID_JSON",
      400,
      "Request body must be a JSON object.",
    );
  }

  return payload as Record<string, unknown>;
}

export function cleanProjectName(value: unknown) {
  if (typeof value !== "string") return "";
  return value
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}\s._-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

export function normalizeTemplate(value: unknown) {
  return typeof value === "string" && ALLOWED_TEMPLATES.has(value)
    ? value
    : "web";
}

export function isValidProjectId(value: unknown): value is string {
  return typeof value === "string" && PROJECT_ID_PATTERN.test(value);
}

export function validateProjectFiles(value: unknown): ProjectFiles {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw invalidFiles();
  }

  const entries = Object.entries(value);
  if (entries.length > MAX_FILES) throw invalidFiles();

  const safe: ProjectFiles = {};
  for (const [path, content] of entries) {
    const segments = path.split("/");
    if (
      !path ||
      path !== path.trim() ||
      path.length > 160 ||
      path.startsWith("/") ||
      !/^[a-zA-Z0-9_./-]+$/.test(path) ||
      segments.some((segment) => !segment || segment === "." || segment === "..") ||
      typeof content !== "string" ||
      new TextEncoder().encode(content).byteLength > MAX_FILE_BYTES
    ) {
      throw invalidFiles();
    }
    safe[path] = content;
  }

  return safe;
}

function invalidFiles() {
  return new ProjectInputError(
    "FILES",
    422,
    "Project files are invalid or exceed safe limits.",
  );
}
