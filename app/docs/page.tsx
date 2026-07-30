import type { Metadata } from "next";
import Link from "next/link";
import {
  MarketingFooter,
  MarketingHeader,
  PageIntro,
} from "../components/MarketingShell";

export const metadata: Metadata = {
  title: "SkyCode Documentation",
  description:
    "Learn how to create, edit, run, save, secure, and publish projects with the SkyCode AI workspace.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "SkyCode Documentation",
    description:
      "Learn how to create, edit, run, save, secure, and publish projects with the SkyCode AI workspace.",
    url: "/docs",
    type: "website",
  },
};

export default function DocsPage() {
  return (
    <div className="marketing-site">
      <MarketingHeader />
      <main>
        <PageIntro
          eyebrow="DOCUMENTATION"
          title="Go from prompt to working preview."
          description="A concise guide to the current MVP and the architecture required for production-grade multi-language execution."
        />
        <section className="docs-layout">
          <aside>
            <strong>GETTING STARTED</strong>
            <a href="#create">Create a project</a>
            <a href="#edit">Edit files</a>
            <a href="#run">Run and preview</a>
            <a href="#save">Save projects</a>
            <strong>PLATFORM</strong>
            <a href="#security-model">Security model</a>
            <a href="#seo">SEO output</a>
            <a href="#responsible-ai">Responsible AI</a>
          </aside>
          <article>
            <section id="create"><span>01</span><h2>Create a project</h2><p>Open the workspace, choose Website, Web app, Mobile app, Dashboard, Store, or Other, then describe the result you want. Instant Builder generates all four project files without payment or login. Saved projects are attached to your authenticated identity on the server.</p><Link href="/workspace">Open workspace →</Link></section>
            <section id="edit"><span>02</span><h2>Edit files</h2><p>Select a file from the explorer and change its contents in the editor. The current MVP supports HTML, CSS, JavaScript, and JSON. Each edit updates the working draft in memory until you save.</p></section>
            <section id="run"><span>03</span><h2>Run and preview</h2><p>Select Run to rebuild the live web preview. Generated output is placed in a sandboxed iframe without same-origin privileges. Its policy blocks network requests, forms, plugins, framing, and navigation.</p><pre><code>{`sandbox="allow-scripts"\ndefault-src 'none'\nconnect-src 'none'\nform-action 'none'`}</code></pre></section>
            <section id="save"><span>04</span><h2>Save projects</h2><p>Authenticated saves go through protected API routes. The server validates payload limits, then creates or updates only a project owned by the current user.</p></section>
            <section id="security-model"><span>05</span><h2>Security model</h2><p>Browser preview isolation is only one layer. Enabling package installation, Python, Node processes, or user-facing public execution requires disposable containers, quotas, egress controls, secret injection, scanning, and audit records.</p></section>
            <section id="seo"><span>06</span><h2>SEO output</h2><p>Public product pages include unique titles and descriptions, canonical URLs, Open Graph metadata, semantic headings, crawlable content, robots rules, a sitemap, and SoftwareApplication structured data.</p></section>
            <section id="responsible-ai"><span>07</span><h2>Responsible AI</h2><p>Instant Builder runs without sending the prompt to an AI provider. Server Cloud AI is optional and requires ChatGPT sign-in. Prompts and four bounded current files pass through a same-origin backend to OpenRouter; the API key stays server-side, per-user minute and daily limits protect usage, metadata-only events exclude prompts and source, and every generated change remains reviewable before release.</p></section>
          </article>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
