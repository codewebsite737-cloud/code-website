import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Acceptable Use Policy",
  description:
    "Rules that protect SkyCode users, infrastructure, generated projects, and third parties.",
  alternates: { canonical: "/acceptable-use" },
};

const sections: LegalSection[] = [
  {
    title: "Build responsibly",
    content: (
      <p>
        Use SkyCode to create legitimate software, learn, prototype, and ship
        products you are authorized to build. Review generated code and respect
        applicable laws, contracts, intellectual property, and privacy rights.
      </p>
    ),
  },
  {
    title: "Prohibited harmful activity",
    content: (
      <ul>
        <li>Malware, credential theft, phishing, fraud, or impersonation.</li>
        <li>Unauthorized access, exploitation, scanning, or disruption.</li>
        <li>Bypassing security, quotas, authentication, or safety controls.</li>
        <li>Abuse, harassment, exploitation, or illegal surveillance.</li>
        <li>Content or software that violates another person&apos;s rights.</li>
      </ul>
    ),
  },
  {
    title: "Infrastructure protection",
    content: (
      <p>
        Do not overload the service, automate excessive requests, evade request
        limits, upload secrets, or attempt to use the restricted preview as a
        general-purpose execution environment.
      </p>
    ),
  },
  {
    title: "Enforcement",
    content: (
      <p>
        SkyCode may limit or suspend access when necessary to investigate
        suspected abuse, protect users or infrastructure, comply with law, or
        prevent continuing harm. Where appropriate, the project team may ask
        for corrective action before restoring access.
      </p>
    ),
  },
  {
    title: "Reporting",
    content: (
      <p>
        Report abuse or security concerns to{" "}
        <a href="mailto:hello@skycode.dev?subject=SkyCode%20abuse%20report">
          hello@skycode.dev
        </a>
        . Include only the minimum information needed to investigate and never
        email passwords, API keys, or other secrets.
      </p>
    ),
  },
];

export default function AcceptableUsePage() {
  return (
    <LegalPage
      eyebrow="TRUST"
      title="Acceptable Use Policy"
      description="Straightforward rules that keep the builder useful, lawful, and safe for everyone."
      effectiveDate="July 30, 2026"
      sections={sections}
    />
  );
}
