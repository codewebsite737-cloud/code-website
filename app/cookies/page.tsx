import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How SkyCode uses essential session technology and browser-local preferences.",
  alternates: { canonical: "/cookies" },
};

const sections: LegalSection[] = [
  {
    title: "Current use",
    content: (
      <p>
        SkyCode currently uses only technology required to operate account
        sign-in, security, and device-local workspace preferences. It does not
        currently use advertising cookies or cross-site behavioral tracking.
      </p>
    ),
  },
  {
    title: "Essential sessions",
    content: (
      <p>
        Sign in with ChatGPT may use secure session cookies controlled by the
        authentication platform. These are necessary to identify the signed-in
        user and protect account-specific routes and project operations.
      </p>
    ),
  },
  {
    title: "Local preferences",
    content: (
      <p>
        The workspace may store device-local preferences such as the selected
        layout version and panel sizes. These values stay in your browser and
        are not authoritative project records.
      </p>
    ),
  },
  {
    title: "Managing storage",
    content: (
      <p>
        You can clear SkyCode cookies and local storage using your browser
        settings. Removing essential session data may sign you out, and clearing
        local storage resets device-specific workspace preferences.
      </p>
    ),
  },
  {
    title: "Future changes",
    content: (
      <p>
        If optional analytics or non-essential cookies are introduced, SkyCode
        will update this policy and add an appropriate consent choice before
        activating them where required.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="LEGAL"
      title="Cookie Policy"
      description="SkyCode keeps browser storage limited to sign-in, security, and useful workspace preferences."
      effectiveDate="July 30, 2026"
      sections={sections}
    />
  );
}
