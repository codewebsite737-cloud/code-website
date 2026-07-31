import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type ChatGPTUser = {
  displayName: string;
  email: string;
  fullName: string | null;
};

const USER_EMAIL_HEADER = "oai-authenticated-user-email";
const USER_FULL_NAME_HEADER = "oai-authenticated-user-full-name";
const USER_FULL_NAME_ENCODING_HEADER =
  "oai-authenticated-user-full-name-encoding";
const PERCENT_ENCODED_UTF8 = "percent-encoded-utf-8";
const SIGN_IN_PATH = "/signin-with-chatgpt";
const SIGN_OUT_PATH = "/signout-with-chatgpt";
const CALLBACK_PATH = "/callback";

export async function getChatGPTUser(req?: Request): Promise<ChatGPTUser | null> {
  let email: string | null = null;
  let encodedFullName: string | null = null;
  let encoding: string | null = null;

  try {
    const requestHeaders = await headers();
    if (requestHeaders && typeof requestHeaders.get === "function") {
      email = requestHeaders.get("oai-authenticated-user-email") ?? requestHeaders.get("OAI-AUTHENTICATED-USER-EMAIL") ?? null;
      encodedFullName = requestHeaders.get("oai-authenticated-user-full-name") ?? requestHeaders.get("OAI-AUTHENTICATED-USER-FULL-NAME") ?? null;
      encoding = requestHeaders.get("oai-authenticated-user-full-name-encoding") ?? requestHeaders.get("OAI-AUTHENTICATED-USER-FULL-NAME-ENCODING") ?? null;
    }
  } catch {
    // ignore
  }

  if (!email && req && req.headers) {
    try {
      const h = req.headers as any;
      if (typeof h.get === "function") {
        email = h.get("oai-authenticated-user-email") ?? h.get("OAI-AUTHENTICATED-USER-EMAIL") ?? null;
        encodedFullName = h.get("oai-authenticated-user-full-name") ?? h.get("OAI-AUTHENTICATED-USER-FULL-NAME") ?? null;
        encoding = h.get("oai-authenticated-user-full-name-encoding") ?? h.get("OAI-AUTHENTICATED-USER-FULL-NAME-ENCODING") ?? null;
      }
      if (!email && typeof h.entries === "function") {
        for (const [k, v] of h.entries()) {
          if (k.toLowerCase() === "oai-authenticated-user-email") email = v;
          if (k.toLowerCase() === "oai-authenticated-user-full-name") encodedFullName = v;
          if (k.toLowerCase() === "oai-authenticated-user-full-name-encoding") encoding = v;
        }
      }
      if (!email && typeof h === "object") {
        for (const k of Object.keys(h)) {
          if (k.toLowerCase() === "oai-authenticated-user-email") email = h[k];
          if (k.toLowerCase() === "oai-authenticated-user-full-name") encodedFullName = h[k];
          if (k.toLowerCase() === "oai-authenticated-user-full-name-encoding") encoding = h[k];
        }
      }
    } catch {
      // ignore
    }
  }

  if (!email) return null;

  const fullName =
    encodedFullName && encoding === PERCENT_ENCODED_UTF8
      ? safeDecodeURIComponent(encodedFullName)
      : null;

  return {
    displayName: fullName ?? email,
    email,
    fullName,
  };
}

export async function requireChatGPTUser(
  returnTo: string,
): Promise<ChatGPTUser> {
  const user = await getChatGPTUser();
  if (user) return user;

  redirect(chatGPTSignInPath(returnTo));
}

export function chatGPTSignInPath(returnTo: string): string {
  const safeReturnTo = safeRelativeReturnPath(returnTo);
  return `${SIGN_IN_PATH}?return_to=${encodeURIComponent(safeReturnTo)}`;
}

export function chatGPTSignOutPath(returnTo = "/"): string {
  const safeReturnTo = safeRelativeReturnPath(returnTo);
  return `${SIGN_OUT_PATH}?return_to=${encodeURIComponent(safeReturnTo)}`;
}

function safeRelativeReturnPath(value: string): string {
  if (!value.startsWith("/") || value.startsWith("//")) return "/";

  let url: URL;
  try {
    url = new URL(value, "https://app.local");
  } catch {
    return "/";
  }
  if (url.origin !== "https://app.local") return "/";
  if (isReservedAuthPath(url.pathname)) return "/";

  return `${url.pathname}${url.search}${url.hash}`;
}

function isReservedAuthPath(pathname: string): boolean {
  return (
    pathname === SIGN_IN_PATH ||
    pathname === SIGN_OUT_PATH ||
    pathname === CALLBACK_PATH
  );
}

function safeDecodeURIComponent(value: string): string | null {
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
}
