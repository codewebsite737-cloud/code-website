export const dynamic = "force-static";

import { getD1Binding } from "../../../../db";

interface LockPayload {
  projectId: string;
  filePath: string;
  lockedBy: string;
  lockToken: string;
}

const LOCK_TTL_MS = 30000; // 30 seconds TTL for lock expiration

function jsonResponse(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

// Memory fallback store if D1 binding is unavailable in static/dev mode
const memoryLocks = new Map<string, { lockedBy: string; lockToken: string; updatedAtMs: number }>();

function memoryKey(projectId: string, filePath: string) {
  return `${projectId}:${filePath}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId") || "default";
  const filePath = searchParams.get("filePath") || "index.html";
  const now = Date.now();

  try {
    const db = getD1Binding();
    const row = await db
      .prepare(
        "SELECT locked_by, lock_token, updated_at_ms FROM project_locks WHERE project_id = ? AND file_path = ? LIMIT 1",
      )
      .bind(projectId, filePath)
      .first<{ locked_by: string; lock_token: string; updated_at_ms: number }>();

    if (row && now - row.updated_at_ms < LOCK_TTL_MS) {
      return jsonResponse({
        locked: true,
        lockedBy: row.locked_by,
        lockToken: row.lock_token,
        expiresInMs: LOCK_TTL_MS - (now - row.updated_at_ms),
      });
    }

    return jsonResponse({ locked: false });
  } catch (_err) {
    // Memory fallback
    const key = memoryKey(projectId, filePath);
    const existing = memoryLocks.get(key);
    if (existing && now - existing.updatedAtMs < LOCK_TTL_MS) {
      return jsonResponse({
        locked: true,
        lockedBy: existing.lockedBy,
        lockToken: existing.lockToken,
        expiresInMs: LOCK_TTL_MS - (now - existing.updatedAtMs),
      });
    }
    return jsonResponse({ locked: false });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<LockPayload>;
    const { projectId = "default", filePath = "index.html", lockedBy = "User", lockToken } = body;
    if (!lockToken) {
      return jsonResponse({ error: "Missing lockToken" }, 400);
    }
    const now = Date.now();

    try {
      const db = getD1Binding();
      // Check existing lock
      const existing = await db
        .prepare(
          "SELECT locked_by, lock_token, updated_at_ms FROM project_locks WHERE project_id = ? AND file_path = ? LIMIT 1",
        )
        .bind(projectId, filePath)
        .first<{ locked_by: string; lock_token: string; updated_at_ms: number }>();

      if (
        existing &&
        now - existing.updated_at_ms < LOCK_TTL_MS &&
        existing.lock_token !== lockToken
      ) {
        return jsonResponse(
          {
            acquired: false,
            lockedBy: existing.locked_by,
            message: `File is locked by ${existing.locked_by}`,
          },
          409,
        );
      }

      // Upsert lock
      await db
        .prepare(
          `INSERT INTO project_locks (project_id, file_path, locked_by, lock_token, updated_at_ms)
           VALUES (?, ?, ?, ?, ?)
           ON CONFLICT(project_id, file_path) DO UPDATE SET
             locked_by = excluded.locked_by,
             lock_token = excluded.lock_token,
             updated_at_ms = excluded.updated_at_ms`,
        )
        .bind(projectId, filePath, lockedBy, lockToken, now)
        .run();

      return jsonResponse({ acquired: true, lockedBy, lockToken, ttlMs: LOCK_TTL_MS });
    } catch (_err) {
      // Fallback in memory
      const key = memoryKey(projectId, filePath);
      const existing = memoryLocks.get(key);
      if (existing && now - existing.updatedAtMs < LOCK_TTL_MS && existing.lockToken !== lockToken) {
        return jsonResponse(
          {
            acquired: false,
            lockedBy: existing.lockedBy,
            message: `File is locked by ${existing.lockedBy}`,
          },
          409,
        );
      }
      memoryLocks.set(key, { lockedBy, lockToken, updatedAtMs: now });
      return jsonResponse({ acquired: true, lockedBy, lockToken, ttlMs: LOCK_TTL_MS });
    }
  } catch (_e) {
    return jsonResponse({ error: "Invalid payload" }, 400);
  }
}

export async function DELETE(request: Request) {
  try {
    const body = (await request.json()) as Partial<LockPayload>;
    const { projectId = "default", filePath = "index.html", lockToken } = body;
    if (!lockToken) return jsonResponse({ success: true });

    try {
      const db = getD1Binding();
      await db
        .prepare(
          "DELETE FROM project_locks WHERE project_id = ? AND file_path = ? AND lock_token = ?",
        )
        .bind(projectId, filePath, lockToken)
        .run();
    } catch (_err) {
      const key = memoryKey(projectId, filePath);
      const existing = memoryLocks.get(key);
      if (existing && existing.lockToken === lockToken) {
        memoryLocks.delete(key);
      }
    }

    return jsonResponse({ success: true });
  } catch (_e) {
    return jsonResponse({ success: true });
  }
}
