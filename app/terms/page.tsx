import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply when using the SkyCode AI coding workspace and public website.",
  alternates: { canonical: "/terms" },
};

const sections: LegalSection[] = [
  {
    title: "Using SkyCode",
    content: (
      <p>
        You may use SkyCode only if you can legally agree to these terms. You
        are responsible for activity performed through your account and for
        keeping your account access secure. Do not share credentials in prompts,
        project files, support messages, or public links.
      </p>
    ),
  },
  {
    title: "Generated code",
    content: (
      <>
        <p>
          AI and template-generated output can contain mistakes, insecure
          patterns, incomplete logic, or third-party material. You must review,
          test, and validate generated code before using it in production.
        </p>
        <p>
          SkyCode does not guarantee that output is unique, error-free, fit for
          a particular purpose, or free of third-party claims.
        </p>
      </>
    ),
  },
  {
    title: "Your content",
    content: (
      <p>
        You retain your rights in project content you provide. You grant
        SkyCode the limited permission needed to store, process, reproduce, and
        transmit that content solely to operate, secure, and improve the
        service you requested. You must have the right to use the content you
        submit.
      </p>
    ),
  },
  {
    title: "Current service scope",
    content: (
      <p>
        The current public product supports browser-based HTML, CSS,
        JavaScript, and JSON projects, restricted preview, export, and
        authenticated project storage. Paid subscriptions, public code
        execution, team collaboration, and custom-domain publishing are not
        available until they are explicitly marked active in the product.
      </p>
    ),
  },
  {
    title: "Availability and changes",
    content: (
      <p>
        SkyCode may change, suspend, or discontinue features to protect the
        service, comply with law, or improve reliability. Preview features may
        change more frequently. Planned features are not a promise of a release
        date.
      </p>
    ),
  },
  {
    title: "Disclaimers and responsibility",
    content: (
      <p>
        SkyCode is provided on an “as available” basis to the maximum extent
        permitted by law. You are responsible for reviewing generated output,
        maintaining backups of important exported work, and adding the
        application-specific security, privacy, and compliance controls your
        own product requires.
      </p>
    ),
  },
  {
    title: "Contact",
    content: (
      <p>
        Questions about these terms can be sent to{" "}
        <a href="mailto:hello@skycode.dev?subject=SkyCode%20terms">
          hello@skycode.dev
        </a>
        . These terms should be reviewed with qualified legal counsel before
        SkyCode begins accepting payments or enters a new jurisdiction.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="LEGAL"
      title="Terms of Service"
      description="The practical rules for using SkyCode and reviewing software created with AI."
      effectiveDate="July 30, 2026"
      sections={sections}
    />
  );
}
