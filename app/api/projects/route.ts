export const dynamic = "force-static";

import { getChatGPTUser } from "../../chatgpt-auth";
import {
  ProjectInputError,
  assertTrustedMutation,
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

function json(data: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", "no-store");
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Request-Id", crypto.randomUUID());
  return Response.json(data, { ...init, headers });
}

function unauthorized() {
  return json({ error: "Authentication required." }, { status: 401 });
}

function tooManyRequests(rateLimit: RateLimitState) {
  return json(
    { error: "Too many requests. Please wait before trying again." },
    {
      status: 429,
      headers: rateLimitHeaders(rateLimit),
    },
  );
}

function withRateLimit(rateLimit: RateLimitState): HeadersInit {
  return rateLimitHeaders(rateLimit);
}

async function requireRateLimit(
  ownerEmail: string,
  method: ProjectApiMethod,
) {
  return takeProjectApiRateLimit(ownerEmail, method);
}

function apiFailure(error: unknown) {
  if (error instanceof ProjectInputError) {
    return json(
      { error: error.message, code: error.code },
      { status: error.status },
    );
  }

  console.error("Projects API request failed", error);
  return json(
    { error: "The project service is temporarily unavailable." },
    { status: 503 },
  );
}

export async function GET(request: Request) {
  try {
    const user = await getChatGPTUser();
    if (!user) return unauthorized();

    const rateLimit = await requireRateLimit(user.email, "GET");
    if (!rateLimit.allowed) return tooManyRequests(rateLimit);

    const id = new URL(request.url).searchParams.get("id");
    if (id !== null) {
      if (!isValidProjectId(id)) {
        return json(
          { error: "Valid project ID required." },
          { status: 400, headers: withRateLimit(rateLimit) },
        );
      }

      const project = await findOwnedProject(user.email, id);
      if (!project) {
        return json(
          { error: "Project not found." },
          { status: 404, headers: withRateLimit(rateLimit) },
        );
      }
      return json(
        { project },
        { headers: withRateLimit(rateLimit) },
      );
    }

    const projects = await listOwnedProjects(user.email);
    return json(
      { projects },
      { headers: withRateLimit(rateLimit) },
    );
  } catch (error) {
    return apiFailure(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await getChatGPTUser();
    if (!user) return unauthorized();
    assertTrustedMutation(request);

    const rateLimit = await requireRateLimit(user.email, "POST");
    if (!rateLimit.allowed) return tooManyRequests(rateLimit);

    const payload = await readProjectPayload(request);
    const name = cleanProjectName(payload.name);
    if (!name) {
      return json(
        { error: "Project name is required." },
        { status: 400, headers: withRateLimit(rateLimit) },
      );
    }

    const files = payload.files ? validateProjectFiles(payload.files) : {};
    const now = new Date().toISOString();
    const project = {
      id: crypto.randomUUID(),
      ownerEmail: user.email,
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
            "This account has reached the 100-project safety limit. Delete an old project before creating another.",
        },
        { status: 409, headers: withRateLimit(rateLimit) },
      );
    }

    return json(
      {
        project: {
          id: project.id,
          name: project.name,
          template: project.template,
          createdAt: project.createdAt,
          updatedAt: project.updatedAt,
        },
      },
      { status: 201, headers: withRateLimit(rateLimit) },
    );
  } catch (error) {
    return apiFailure(error);
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getChatGPTUser();
    if (!user) return unauthorized();
    assertTrustedMutation(request);

    const rateLimit = await requireRateLimit(user.email, "PUT");
    if (!rateLimit.allowed) return tooManyRequests(rateLimit);

    const payload = await readProjectPayload(request);
    const id = payload.id;
    const name = cleanProjectName(payload.name);
    if (!isValidProjectId(id) || !name) {
      return json(
        { error: "Valid project ID and name are required." },
        { status: 400, headers: withRateLimit(rateLimit) },
      );
    }

    const files = validateProjectFiles(payload.files);
    const updatedAt = new Date().toISOString();
    const updated = await updateOwnedProject({
      id,
      ownerEmail: user.email,
      name,
      files,
      updatedAt,
    });
    if (!updated) {
      return json(
        { error: "Project not found." },
        { status: 404, headers: withRateLimit(rateLimit) },
      );
    }

    return json(
      { project: { id, name, updatedAt } },
      { headers: withRateLimit(rateLimit) },
    );
  } catch (error) {
    return apiFailure(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getChatGPTUser();
    if (!user) return unauthorized();
    assertTrustedMutation(request);

    const rateLimit = await requireRateLimit(user.email, "DELETE");
    if (!rateLimit.allowed) return tooManyRequests(rateLimit);

    const payload = await readProjectPayload(request);
    const id = payload.id;
    if (!isValidProjectId(id)) {
      return json(
        { error: "Valid project ID required." },
        { status: 400, headers: withRateLimit(rateLimit) },
      );
    }

    const deleted = await deleteOwnedProject(user.email, id);
    if (!deleted) {
      return json(
        { error: "Project not found." },
        { status: 404, headers: withRateLimit(rateLimit) },
      );
    }

    return json(
      { deleted: true },
      { headers: withRateLimit(rateLimit) },
    );
  } catch (error) {
    return apiFailure(error);
  }
}
