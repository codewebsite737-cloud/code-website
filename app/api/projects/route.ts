export const dynamic = "force-static";

import {
  ProjectInputError,
  cleanProjectName,
  isValidProjectId,
  normalizeTemplate,
  readProjectPayload,
  validateProjectFiles,
} from "./policy";
import {
  rateLimitHeaders,
  takeProjectApiRateLimit,
  type ProjectApiMethod,
  type RateLimitState,
} from "./security";
import {
  createOwnedProject,
  deleteOwnedProject,
  findOwnedProject,
  listOwnedProjects,
  updateOwnedProject,
} from "./store";
import {
  applyIdentityCookie,
  getRequestIdentity,
  type RequestIdentity,
} from "../shared/session";

function json(
  data: unknown,
  init: ResponseInit = {},
  identity: RequestIdentity | null = null,
) {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", "no-store");
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Request-Id", crypto.randomUUID());
  applyIdentityCookie(headers, identity);
  return Response.json(data, { ...init, headers });
}

function tooManyRequests(
  rateLimit: RateLimitState,
  identity: RequestIdentity,
) {
  return json(
    { error: "Too many requests. Please wait before trying again." },
    {
      status: 429,
      headers: rateLimitHeaders(rateLimit),
    },
    identity,
  );
}

function withRateLimit(rateLimit: RateLimitState): HeadersInit {
  return rateLimitHeaders(rateLimit);
}

async function requireRateLimit(
  ownerId: string,
  method: ProjectApiMethod,
) {
  return takeProjectApiRateLimit(ownerId, method);
}

function apiFailure(
  error: unknown,
  identity: RequestIdentity | null,
) {
  const knownError = normalizeApiError(error);
  if (knownError) {
    return json(
      { error: knownError.message, code: knownError.code },
      { status: knownError.status },
      identity,
    );
  }

  console.error("Projects API request failed", error);
  return json(
    { error: "The project service is temporarily unavailable." },
    { status: 503 },
    identity,
  );
}

function normalizeApiError(error: unknown) {
  if (error instanceof ProjectInputError) {
    return {
      code: error.code,
      message: error.message,
      status: error.status,
    };
  }
  if (!error || typeof error !== "object") return null;
  const candidate = error as Record<string, unknown>;
  if (
    typeof candidate.status !== "number" ||
    typeof candidate.message !== "string"
  ) {
    return null;
  }
  return {
    code:
      typeof candidate.code === "string"
        ? candidate.code
        : "PROJECT_REQUEST",
    message: candidate.message,
    status: candidate.status,
  };
}

export async function GET(request: Request) {
  let identity: RequestIdentity | null = null;
  try {
    identity = await getRequestIdentity(request);
    const rateLimit = await requireRateLimit(identity.ownerId, "GET");
    if (!rateLimit.allowed) return tooManyRequests(rateLimit, identity);

    const id = new URL(request.url).searchParams.get("id");
    if (id !== null) {
      if (!isValidProjectId(id)) {
        return json(
          { error: "Valid project ID required." },
          { status: 400, headers: withRateLimit(rateLimit) },
          identity,
        );
      }

      const project = await findOwnedProject(identity.ownerId, id);
      if (!project) {
        return json(
          { error: "Project not found." },
          { status: 404, headers: withRateLimit(rateLimit) },
          identity,
        );
      }
      return json(
        { accountType: identity.accountType, project },
        { headers: withRateLimit(rateLimit) },
        identity,
      );
    }

    const projects = await listOwnedProjects(identity.ownerId);
    return json(
      {
        accountType: identity.accountType,
        displayName: identity.displayName,
        projects,
      },
      { headers: withRateLimit(rateLimit) },
      identity,
    );
  } catch (error) {
    return apiFailure(error, identity);
  }
}

export async function POST(request: Request) {
  let identity: RequestIdentity | null = null;
  try {
    const payload = await readProjectPayload(request);
    identity = await getRequestIdentity(request);
    const rateLimit = await requireRateLimit(identity.ownerId, "POST");
    if (!rateLimit.allowed) return tooManyRequests(rateLimit, identity);

    const name = cleanProjectName(payload.name);
    if (!name) {
      return json(
        { error: "Project name is required." },
        { status: 400, headers: withRateLimit(rateLimit) },
        identity,
      );
    }

    const files = payload.files ? validateProjectFiles(payload.files) : {};
    const now = new Date().toISOString();
    const project = {
      id: crypto.randomUUID(),
      ownerEmail: identity.ownerId,
      name,
      template: normalizeTemplate(payload.template),
      files,
      createdAt: now,
      updatedAt: now,
    };
    const created = await createOwnedProject(project);
    if (!created) {
      return json(
        {
          error:
            "This workspace has reached the 100-project safety limit. Delete an old project before creating another.",
        },
        { status: 409, headers: withRateLimit(rateLimit) },
        identity,
      );
    }

    return json(
      {
        accountType: identity.accountType,
        project: {
          id: project.id,
          name: project.name,
          template: project.template,
          createdAt: project.createdAt,
          updatedAt: project.updatedAt,
        },
      },
      { status: 201, headers: withRateLimit(rateLimit) },
      identity,
    );
  } catch (error) {
    return apiFailure(error, identity);
  }
}

export async function PUT(request: Request) {
  let identity: RequestIdentity | null = null;
  try {
    const payload = await readProjectPayload(request);
    identity = await getRequestIdentity(request);
    const rateLimit = await requireRateLimit(identity.ownerId, "PUT");
    if (!rateLimit.allowed) return tooManyRequests(rateLimit, identity);

    const id = payload.id;
    const name = cleanProjectName(payload.name);
    if (!isValidProjectId(id) || !name) {
      return json(
        { error: "Valid project ID and name are required." },
        { status: 400, headers: withRateLimit(rateLimit) },
        identity,
      );
    }

    const files = validateProjectFiles(payload.files);
    const updatedAt = new Date().toISOString();
    const updated = await updateOwnedProject({
      id,
      ownerEmail: identity.ownerId,
      name,
      files,
      updatedAt,
    });
    if (!updated) {
      return json(
        { error: "Project not found." },
        { status: 404, headers: withRateLimit(rateLimit) },
        identity,
      );
    }

    return json(
      { accountType: identity.accountType, project: { id, name, updatedAt } },
      { headers: withRateLimit(rateLimit) },
      identity,
    );
  } catch (error) {
    return apiFailure(error, identity);
  }
}

export async function DELETE(request: Request) {
  let identity: RequestIdentity | null = null;
  try {
    const payload = await readProjectPayload(request);
    identity = await getRequestIdentity(request);
    const rateLimit = await requireRateLimit(identity.ownerId, "DELETE");
    if (!rateLimit.allowed) return tooManyRequests(rateLimit, identity);

    const id = payload.id;
    if (!isValidProjectId(id)) {
      return json(
        { error: "Valid project ID required." },
        { status: 400, headers: withRateLimit(rateLimit) },
        identity,
      );
    }

    const deleted = await deleteOwnedProject(identity.ownerId, id);
    if (!deleted) {
      return json(
        { error: "Project not found." },
        { status: 404, headers: withRateLimit(rateLimit) },
        identity,
      );
    }

    return json(
      { deleted: true },
      { headers: withRateLimit(rateLimit) },
      identity,
    );
  } catch (error) {
    return apiFailure(error, identity);
  }
}
