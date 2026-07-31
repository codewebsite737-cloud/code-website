import { getD1Binding } from "../../../db";
import { getAiRuntimeConfig } from "../ai/runtime";

function healthResponse(
  data: unknown,
  status: number,
  requestId: string,
) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "X-Request-Id": requestId,
    },
  });
}

export async function GET() {
  const requestId = crypto.randomUUID();
  const checkedAt = new Date().toISOString();

  try {
    const database = await getD1Binding()
      .prepare("SELECT 1 AS healthy")
      .first<{ healthy: number }>();
    if (database?.healthy !== 1) {
      throw new Error("Database health check returned an invalid result.");
    }

    const ai = getAiRuntimeConfig();
    return healthResponse(
      {
        checkedAt,
        services: {
          application: "operational",
          cloudAi: ai.configured ? "operational" : "setup_required",
          database: "operational",
          instantBuilder: "operational",
        },
        status: "operational",
      },
      200,
      requestId,
    );
  } catch (error) {
    console.error("Health check failed", { error, requestId });
    return healthResponse(
      {
        checkedAt,
        services: {
          application: "operational",
          cloudAi: "unknown",
          database: "unavailable",
          instantBuilder: "operational",
        },
        status: "degraded",
      },
      503,
      requestId,
    );
  }
}
