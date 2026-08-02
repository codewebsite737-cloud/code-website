import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type ChatGPTUser = {
  displayName: string;
  email: string;
  fullName: string | null;
};

type HeaderReader = {
  get(name: string): string | null;
};

const USER_EMAIL_HEADER = "oai-authenticated-user-email";
const USER_FULL_NAME_HEADER = "oai-authenticated-user-full-name";
const USER_FULL_NAME_ENCODING_HEADER =
  "oai-authenticated-user-full-name-encoding";
const ACCESS_EMAIL_HEADER = "cf-access-authenticated-user-email";
const ACCESS_NAME_HEADER = "cf-access-authenticated-user-name";
const PERCENT_ENCODED_UTF8 = "percent-encoded-utf-8";
const SIGN_IN_PATH = "/signin-with-chatgpt";
const SIGN_OUT_PATH = "/signout-with-chatgpt";
const CALLBACK_PATH = "/callback";

export async function getChatGPTUser(req?: Request): Promise<ChatGPTUser | null> {
  const requestUser = req ? userFromHeaders(req.headers) : null;
  if (requestUser) return requestUser;

  try {
    return userFromHeaders(await headers());
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

function userFromHeaders(headerReader: HeaderReader): ChatGPTUser | null {
  const chatGptEmail = readHeader(headerReader, USER_EMAIL_HEADER);
  if (chatGptEmail) {
    const encodedFullName = readHeader(headerReader, USER_FULL_NAME_HEADER);
    const encoding = readHeader(headerReader, USER_FULL_NAME_ENCODING_HEADER);
    const fullName =
      encodedFullName && encoding === PERCENT_ENCODED_UTF8
        ? safeDecodeURIComponent(encodedFullName)
        : encodedFullName;
    return normalizedUser(chatGptEmail, fullName);
  }

  const accessEmail = readHeader(headerReader, ACCESS_EMAIL_HEADER);
  if (!accessEmail) return null;
  return normalizedUser(
    accessEmail,
    readHeader(headerReader, ACCESS_NAME_HEADER),
  );
}

function readHeader(headerReader: HeaderReader, name: string) {
  return headerReader.get(name) ?? headerReader.get(name.toUpperCase());
}

function normalizedUser(emailValue: string, fullNameValue: string | null) {
  const email = emailValue.trim().toLowerCase();
  if (!email || email.length > 320 || !email.includes("@")) return null;
  const fullName = fullNameValue?.trim().slice(0, 120) || null;
  return {
    displayName: fullName ?? email,
    email,
    fullName,
  };
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
