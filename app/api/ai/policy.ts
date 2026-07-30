import type {
  FileName,
  ProjectCategory,
  WorkspaceFiles,
} from "../../workspace/project-generator";

const MAX_AI_BODY_BYTES = 90_000;
const MAX_PROMPT_CHARACTERS = 3_000;
const MAX_CONTEXT_FILE_CHARACTERS = 14_000;
const REQUIRED_FILES: FileName[] = [
  "index.html",
  "styles.css",
  "app.js",
  "package.json",
];
const ALLOWED_CATEGORIES = new Set<ProjectCategory>([
  "website",
  "web-app",
  "mobile-app",
  "dashboard",
  "store",
  "other",
]);

export type AiGenerationInput = {
  category: ProjectCategory;
  currentFiles: WorkspaceFiles;
  prompt: string;
};

export class AiInputError extends Error {
  readonly code: string;
  readonly status: number;

  constructor(
    code: string,
    status: number,
    message: string,
  ) {
    super(message);
    this.code = code;
    this.name = "AiInputError";
    this.status = status;
  }
}

export async function readAiGenerationInput(
  request: Request,
): Promise<AiGenerationInput> {
  const contentLength = request.headers.get("content-length");
  if (contentLength) {
    const declaredLength = Number(contentLength);
    if (
      !Number.isSafeInteger(declaredLength) ||
      declaredLength < 0 ||
      declaredLength > MAX_AI_BODY_BYTES
    ) {
      throw payloadTooLarge();
    }
  }

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_AI_BODY_BYTES) {
    throw payloadTooLarge();
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    throw new AiInputError(
      "INVALID_JSON",
      400,
      "Request body must contain valid JSON.",
    );
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new AiInputError(
      "INVALID_JSON",
      400,
      "Request body must be a JSON object.",
    );
  }

  const candidate = payload as Record<string, unknown>;
  const prompt =
    typeof candidate.prompt === "string"
      ? candidate.prompt.normalize("NFKC").trim()
      : "";
  if (!prompt || prompt.length > MAX_PROMPT_CHARACTERS) {
    throw new AiInputError(
      "PROMPT",
      422,
      "Prompt must contain between 1 and 3,000 characters.",
    );
  }

  if (
    typeof candidate.category !== "string" ||
    !ALLOWED_CATEGORIES.has(candidate.category as ProjectCategory)
  ) {
    throw new AiInputError(
      "CATEGORY",
      422,
      "A supported project category is required.",
    );
  }

  const currentFiles = validateContextFiles(candidate.currentFiles);
  return {
    category: candidate.category as ProjectCategory,
    currentFiles,
    prompt,
  };
}

function validateContextFiles(value: unknown): WorkspaceFiles {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw invalidFiles();
  }
  const candidate = value as Partial<Record<FileName, unknown>>;
  const files = {} as WorkspaceFiles;

  for (const name of REQUIRED_FILES) {
    const content = candidate[name];
    if (
      typeof content !== "string" ||
      content.length > MAX_CONTEXT_FILE_CHARACTERS
    ) {
      throw invalidFiles();
    }
    files[name] = content;
  }

  return files;
}

function payloadTooLarge() {
  return new AiInputError(
    "PAYLOAD_SIZE",
    413,
    "AI request payload is too large.",
  );
}

function invalidFiles() {
  return new AiInputError(
    "FILES",
    422,
    "AI context files are invalid or exceed safe limits.",
  );
}
