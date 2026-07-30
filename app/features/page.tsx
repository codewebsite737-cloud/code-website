import type { Metadata } from "next";
import {
  CallToAction,
  MarketingFooter,
  MarketingHeader,
  PageIntro,
} from "../components/MarketingShell";

export const metadata: Metadata = {
  title: "AI Coding Features: Editor, Preview & Projects",
  description:
    "Explore SkyCode's AI coding agent, browser editor, live preview, project history, collaboration foundation, and publishing workflow.",
  alternates: { canonical: "/features" },
  openGraph: {
    title: "AI Coding Features: Editor, Preview & Projects | SkyCode",
    description:
      "Explore SkyCode's AI coding agent, browser editor, restricted preview, project history, and publishing workflow.",
    url: "/features",
    type: "website",
  },
};

const features = [
  ["AI build agent", "Turns a product request into a plan, code changes, checks, and a clear summary."],
  ["Multi-file editor", "Edit HTML, CSS, JavaScript, TypeScript, JSON, and project configuration in one workspace."],
  ["Restricted live preview", "Runs web previews in a sandboxed frame without same-origin access to the editor."],
  ["Project persistence", "Stores project ownership, files, templates, and timestamps in durable platform storage."],
  ["Version workflow", "Creates useful checkpoints for review, recovery, and controlled production releases."],
  ["Terminal feedback", "Shows install, build, runtime, and validation output beside the code."],
  ["Responsive design", "Build and inspect sites for desktop, tablet, and mobile viewports."],
  ["Accessible by default", "Semantic navigation, keyboard-friendly controls, labels, focus states, and readable contrast."],
  ["SEO toolchain", "Page metadata, canonical URLs, structured data, sitemap, robots rules, and crawlable content."],
  ["Secure write APIs", "Validates identity and project ownership on the server for every create, update, and delete."],
  ["Exportable source", "Keeps the project as ordinary files so users are never trapped inside a visual-only format."],
  ["Deployment controls", "Publishes validated, immutable versions with explicit audience and access decisions."],
];

export default function FeaturesPage() {
  return (
    <div className="marketing-site">
      <MarketingHeader />
      <main>
        <PageIntro
          eyebrow="PRODUCT CAPABILITIES"
          title="Everything around the code, in one place."
          description="SkyCode combines an actionable AI partner with the tools developers expect—and keeps each layer understandable."
        />
        <section className="detail-grid">
          {features.map(([title, description], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{title}</h2>
              <p>{description}</p>
            </article>
          ))}
        </section>
        <section className="split-callout">
          <div>
            <span className="marketing-eyebrow">BUILT FOR BOTH MODES</span>
            <h2>Start with a prompt. Finish in the code.</h2>
          </div>
          <p>
            Non-technical users can describe an outcome and inspect a visual result.
            Experienced developers can edit files, review changes, read logs, and control
            the final architecture.
          </p>
        </section>
        <CallToAction />
      </main>
      <MarketingFooter />
    </div>
  );
}
