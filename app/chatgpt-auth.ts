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
  try {
    let email: string | null = null;
    let encodedFullName: string | null = null;
    let encoding: string | null = null;

    if (req && req.headers) {
      const h = req.headers as any;
      email = typeof h.get === "function" ? (h.get(USER_EMAIL_HEADER) ?? h.get(USER_EMAIL_HEADER.toLowerCase())) : (h[USER_EMAIL_HEADER] ?? h[USER_EMAIL_HEADER.toLowerCase()]);
      encodedFullName = typeof h.get === "function" ? (h.get(USER_FULL_NAME_HEADER) ?? h.get(USER_FULL_NAME_HEADER.toLowerCase())) : (h[USER_FULL_NAME_HEADER] ?? h[USER_FULL_NAME_HEADER.toLowerCase()]);
      encoding = typeof h.get === "function" ? (h.get(USER_FULL_NAME_ENCODING_HEADER) ?? h.get(USER_FULL_NAME_ENCODING_HEADER.toLowerCase())) : (h[USER_FULL_NAME_ENCODING_HEADER] ?? h[USER_FULL_NAME_ENCODING_HEADER.toLowerCase()]);
    }
    if (!email) {
      try {
        const requestHeaders = await headers();
        email = requestHeaders.get(USER_EMAIL_HEADER);
        encodedFullName = requestHeaders.get(USER_FULL_NAME_HEADER);
        encoding = requestHeaders.get(USER_FULL_NAME_ENCODING_HEADER);
      } catch {
        // headers() fallback
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
  } catch {
    return null;
  }
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
