import { getChatGPTUser } from "../../chatgpt-auth";

const SESSION_COOKIE = "skycode_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;
const SESSION_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type RequestIdentity = {
  accountType: "authenticated" | "guest";
  displayName: string;
  ownerId: string;
  setCookie: string | null;
};

export async function getRequestIdentity(
  request: Request,
): Promise<RequestIdentity> {
  const authenticatedUser = await getChatGPTUser(request);
  if (authenticatedUser) {
    return {
      accountType: "authenticated",
      displayName: authenticatedUser.displayName,
      ownerId: authenticatedUser.email.trim().toLowerCase(),
      setCookie: null,
    };
  }

  const existingSession = readCookie(
    request.headers.get("cookie"),
    SESSION_COOKIE,
  );
  const sessionId =
    existingSession && SESSION_ID_PATTERN.test(existingSession)
      ? existingSession.toLowerCase()
      : crypto.randomUUID();

  return {
    accountType: "guest",
    displayName: `Guest ${sessionId.slice(0, 4).toUpperCase()}`,
    ownerId: `guest:${sessionId}`,
    setCookie:
      existingSession === sessionId
        ? null
        : serializeSessionCookie(
            sessionId,
            new URL(request.url).protocol === "https:",
          ),
  };
}

export function applyIdentityCookie(
  headers: Headers,
  identity: RequestIdentity | null,
) {
  if (identity?.setCookie) headers.append("Set-Cookie", identity.setCookie);
}

function readCookie(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return null;
  for (const pair of cookieHeader.split(";")) {
    const separator = pair.indexOf("=");
    if (separator < 0) continue;
    const key = pair.slice(0, separator).trim();
    if (key !== name) continue;
    const value = pair.slice(separator + 1).trim();
    try {
      return decodeURIComponent(value);
    } catch {
      return null;
    }
  }
  return null;
}

function serializeSessionCookie(sessionId: string, secure: boolean) {
  return [
    `${SESSION_COOKIE}=${encodeURIComponent(sessionId)}`,
    "Path=/",
    `Max-Age=${SESSION_MAX_AGE_SECONDS}`,
    "HttpOnly",
    "SameSite=Lax",
    secure ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}
