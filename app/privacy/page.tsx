import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How SkyCode handles account identity, project files, AI prompts, operational records, and privacy choices.",
  alternates: { canonical: "/privacy" },
};

const sections: LegalSection[] = [
  {
    title: "Information we process",
    content: (
      <>
        <p>
          SkyCode may process your ChatGPT account email and optional display
          name when you sign in, together with project names, source files,
          prompts, and the actions needed to provide the workspace.
        </p>
        <p>
          The public marketing pages do not require an account. The Instant
          Builder runs in your browser and does not require a provider API key.
        </p>
      </>
    ),
  },
  {
    title: "How information is used",
    content: (
      <ul>
        <li>Authenticate users and enforce project ownership.</li>
        <li>Save, open, update, and delete user-owned projects.</li>
        <li>Apply abuse prevention, request limits, and security controls.</li>
        <li>Operate optional Cloud AI when it is configured and selected.</li>
        <li>Diagnose reliability and security incidents.</li>
      </ul>
    ),
  },
  {
    title: "AI processing",
    content: (
      <>
        <p>
          When you deliberately select Cloud AI, the current prompt and bounded
          project context may be sent to the configured AI provider to generate
          a response. Do not place passwords, payment details, private keys, or
          other secrets in prompts or project files.
        </p>
        <p>
          Cloud AI usage records may include account identity, provider, model,
          token counts, cost, duration, status, and a request identifier. They
          do not store the provider API key.
        </p>
      </>
    ),
  },
  {
    title: "Storage and retention",
    content: (
      <>
        <p>
          Saved projects are stored in the platform database and linked to the
          signed-in owner. Project audit records are retained for up to 180
          days, Cloud AI usage records for up to 90 days, and rate-limit
          records for a short operational window.
        </p>
        <p>
          Device-local preferences such as workspace layout may remain in your
          browser until you clear its site data.
        </p>
      </>
    ),
  },
  {
    title: "Sharing and security",
    content: (
      <p>
        SkyCode does not sell personal information. Data is shared only with
        infrastructure and AI providers needed for the selected service, or
        when required to protect users, comply with law, or respond to a valid
        legal request. Technical safeguards include server-side authorization,
        restricted previews, validation, request limits, and security headers.
      </p>
    ),
  },
  {
    title: "Your choices",
    content: (
      <>
        <p>
          You can use the public site and Instant Builder without signing in,
          avoid Cloud AI, delete saved projects from the dashboard, and clear
          browser-local preferences through your browser settings.
        </p>
        <p>
          For privacy questions or a data request, email{" "}
          <a href="mailto:hello@skycode.dev?subject=SkyCode%20privacy">
            hello@skycode.dev
          </a>
          . Identity verification may be required before fulfilling a request.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="LEGAL"
      title="Privacy Policy"
      description="A clear explanation of what SkyCode processes, why it is needed, and the choices available to you."
      effectiveDate="July 30, 2026"
      sections={sections}
    />
  );
}
