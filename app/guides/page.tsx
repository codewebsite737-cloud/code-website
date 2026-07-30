import type { Metadata } from "next";
import Link from "next/link";
import {
  MarketingFooter,
  MarketingHeader,
  PageIntro,
} from "../components/MarketingShell";

const title = "AI App Building Guides";
const description =
  "Practical guides for planning, building, reviewing, securing, and publishing browser-based apps and websites with AI.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/guides" },
  openGraph: {
    title: `${title} | SkyCode`,
    description,
    url: "/guides",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | SkyCode`,
    description,
  },
};

const baseUrl = "https://skycode-ai-workspace.skymarketing737.chatgpt.site";
const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: title,
  description,
  url: `${baseUrl}/guides`,
  isPartOf: {
    "@type": "WebSite",
    name: "SkyCode",
    url: baseUrl,
  },
};

const resources = [
  {
    label: "COMPLETE GUIDE",
    title: "How to build a web app with AI",
    description:
      "A seven-step workflow for turning a product idea into an editable, tested browser project without losing control of the code.",
    href: "/guides/build-web-app-with-ai",
  },
  {
    label: "PRODUCT WORKFLOW",
    title: "Choose the right AI app builder workflow",
    description:
      "Understand where prompting helps, where direct editing matters, and how to keep the generated source portable.",
    href: "/ai-app-builder",
  },
  {
    label: "WEBSITE WORKFLOW",
    title: "Build an AI website that remains editable",
    description:
      "Plan the audience, content hierarchy, responsive layout, conversion path, and SEO foundation before publishing.",
    href: "/ai-website-builder",
  },
  {
    label: "SECURITY",
    title: "Review the browser execution boundary",
    description:
      "Learn why generated code should run with restricted capabilities and what a production multi-language runtime still needs.",
    href: "/security",
  },
];

export default function GuidesPage() {
  return (
    <div className="marketing-site">
      <MarketingHeader />
      <main>
        <PageIntro
          eyebrow="SKYCODE GUIDES"
          title="Build with AI, without building blindly."
          description={description}
        />
        <section className="guide-grid">
          {resources.map((resource, index) => (
            <article key={resource.href}>
              <span>{resource.label}</span>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <h2>{resource.title}</h2>
              <p>{resource.description}</p>
              <Link href={resource.href}>Read this guide <i>→</i></Link>
            </article>
          ))}
        </section>
        <section className="split-callout">
          <div>
            <span className="marketing-eyebrow">A BETTER DEFAULT</span>
            <h2>Useful content before search-engine content.</h2>
          </div>
          <p>
            Every SkyCode guide is written to answer a real planning or building
            question. Clear, original, people-first information is a stronger long-term
            search strategy than publishing hundreds of thin keyword pages.
          </p>
        </section>
      </main>
      <MarketingFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}
