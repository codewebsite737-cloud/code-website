import { getD1Binding } from "../../../../db";
import {
  ProjectInputError,
  assertTrustedMutation,
  isValidProjectId,
} from "../policy";
import { findOwnedProject } from "../store";
import {
  applyIdentityCookie,
  getRequestIdentity,
  type RequestIdentity,
} from "../../shared/session";

interface LockPayload {
  projectId: string;
  filePath: string;
  lockToken: string;
}

const LOCK_TTL_MS = 30_000;
const LOCK_TOKEN_PATTERN = /^[a-zA-Z0-9_-]{8,120}$/;
const FILE_PATH_PATTERN = /^[a-zA-Z0-9_./-]{1,160}$/;

function jsonResponse(
  data: unknown,
  status = 200,
  identity: RequestIdentity | null = null,
) {
  const headers = new Headers({
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
  });
  applyIdentityCookie(headers, identity);
  return Response.json(data, { status, headers });
}

export async function GET(request: Request) {
  let identity: RequestIdentity | null = null;
  try {
    identity = await getRequestIdentity(request);
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");
    const filePath = searchParams.get("filePath");
    if (!isValidProjectId(projectId) || !isSafeFilePath(filePath)) {
      return jsonResponse(
        { error: "Valid project and file are required." },
        400,
        identity,
      );
    }
    if (!(await findOwnedProject(identity.ownerId, projectId))) {
      return jsonResponse({ error: "Project not found." }, 404, identity);
    }

    const now = Date.now();
    const db = getD1Binding();
    await deleteExpiredLocks(db, now);
    const row = await db
      .prepare(
        "SELECT locked_by, lock_token, updated_at_ms FROM project_locks WHERE project_id = ? AND file_path = ? LIMIT 1",
      )
      .bind(projectId, filePath)
      .first<{
        locked_by: string;
        lock_token: string;
        updated_at_ms: number;
      }>();

    if (row && now - row.updated_at_ms < LOCK_TTL_MS) {
      return jsonResponse(
        {
          locked: true,
          lockedBy: row.locked_by,
          lockToken: row.lock_token,
          expiresInMs: LOCK_TTL_MS - (now - row.updated_at_ms),
        },
        200,
        identity,
      );
    }

    return jsonResponse({ locked: false }, 200, identity);
  } catch (error) {
    console.error("Project lock read failed", error);
    return jsonResponse(
      { error: "Project locking is temporarily unavailable." },
      503,
      identity,
    );
  }
}

export async function POST(request: Request) {
  let identity: RequestIdentity | null = null;
  try {
    await assertTrustedMutation(request);
    const body = await readLockPayload(request);
    identity = await getRequestIdentity(request);
    if (!(await findOwnedProject(identity.ownerId, body.projectId))) {
      return jsonResponse({ error: "Project not found." }, 404, identity);
    }

    const now = Date.now();
    const db = getD1Binding();
    await deleteExpiredLocks(db, now);
    const existing = await db
      .prepare(
        "SELECT locked_by, lock_token, updated_at_ms FROM project_locks WHERE project_id = ? AND file_path = ? LIMIT 1",
      )
      .bind(body.projectId, body.filePath)
      .first<{
        locked_by: string;
        lock_token: string;
        updated_at_ms: number;
      }>();

    if (
      existing &&
      now - existing.updated_at_ms < LOCK_TTL_MS &&
      existing.lock_token !== body.lockToken
    ) {
      return jsonResponse(
        {
          acquired: false,
          lockedBy: existing.locked_by,
          message: `File is locked by ${existing.locked_by}`,
        },
        409,
        identity,
      );
    }

    await db
      .prepare(
        `INSERT INTO project_locks (
          project_id,
          file_path,
          locked_by,
          lock_token,
          updated_at_ms
        ) VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(project_id, file_path) DO UPDATE SET
          locked_by = excluded.locked_by,
          lock_token = excluded.lock_token,
          updated_at_ms = excluded.updated_at_ms`,
      )
      .bind(
        body.projectId,
        body.filePath,
        identity.displayName,
        body.lockToken,
        now,
      )
      .run();

    return jsonResponse(
      {
        acquired: true,
        lockedBy: identity.displayName,
        lockToken: body.lockToken,
        ttlMs: LOCK_TTL_MS,
      },
      200,
      identity,
    );
  } catch (error) {
    const normalized = normalizeLockError(error);
    if (normalized) {
      return jsonResponse(
        { code: normalized.code, error: normalized.message },
        normalized.status,
        identity,
      );
    }
    console.error("Project lock write failed", error);
    return jsonResponse(
      { error: "Project locking is temporarily unavailable." },
      503,
      identity,
    );
  }
}

export async function DELETE(request: Request) {
  let identity: RequestIdentity | null = null;
  try {
    await assertTrustedMutation(request);
    const body = await readLockPayload(request);
    identity = await getRequestIdentity(request);
    if (!(await findOwnedProject(identity.ownerId, body.projectId))) {
      return jsonResponse({ error: "Project not found." }, 404, identity);
    }

    await getD1Binding()
      .prepare(
        "DELETE FROM project_locks WHERE project_id = ? AND file_path = ? AND lock_token = ?",
      )
      .bind(body.projectId, body.filePath, body.lockToken)
      .run();

    return jsonResponse({ success: true }, 200, identity);
  } catch (error) {
    const normalized = normalizeLockError(error);
    if (normalized) {
      return jsonResponse(
        { code: normalized.code, error: normalized.message },
        normalized.status,
        identity,
      );
    }
    console.error("Project lock release failed", error);
    return jsonResponse(
      { error: "Project locking is temporarily unavailable." },
      503,
      identity,
    );
  }
}

async function readLockPayload(request: Request): Promise<LockPayload> {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    throw new ProjectInputError("INVALID_JSON", 400, "Invalid lock request.");
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new ProjectInputError("LOCK_INPUT", 400, "Invalid lock request.");
  }
  const candidate = payload as Record<string, unknown>;
  if (
    !isValidProjectId(candidate.projectId) ||
    !isSafeFilePath(candidate.filePath) ||
    typeof candidate.lockToken !== "string" ||
    !LOCK_TOKEN_PATTERN.test(candidate.lockToken)
  ) {
    throw new ProjectInputError("LOCK_INPUT", 400, "Invalid lock request.");
  }
  return {
    projectId: candidate.projectId,
    filePath: candidate.filePath,
    lockToken: candidate.lockToken,
  };
}

function isSafeFilePath(value: unknown): value is string {
  if (typeof value !== "string" || !FILE_PATH_PATTERN.test(value)) return false;
  return !value
    .split("/")
    .some((segment) => !segment || segment === "." || segment === "..");
}

async function deleteExpiredLocks(db: D1Database, now: number) {
  await db
    .prepare("DELETE FROM project_locks WHERE updated_at_ms < ?")
    .bind(now - LOCK_TTL_MS)
    .run();
}

function normalizeLockError(error: unknown) {
  if (!(error instanceof ProjectInputError)) return null;
  return { code: error.code, message: error.message, status: error.status };
}
