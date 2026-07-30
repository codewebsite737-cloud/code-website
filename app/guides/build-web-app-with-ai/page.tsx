import type { Metadata } from "next";
import Link from "next/link";
import {
  MarketingFooter,
  MarketingHeader,
} from "../../components/MarketingShell";

const title = "How to Build a Web App with AI: A 7-Step Guide";
const description =
  "Plan, generate, review, test, secure, and publish an editable web app with AI using a practical seven-step workflow.";
const baseUrl = "https://skycode-ai-workspace.skymarketing737.chatgpt.site";
const pageUrl = `${baseUrl}/guides/build-web-app-with-ai`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/guides/build-web-app-with-ai" },
  openGraph: {
    title: `${title} | SkyCode`,
    description,
    url: "/guides/build-web-app-with-ai",
    type: "article",
    publishedTime: "2026-07-28T00:00:00+03:00",
    modifiedTime: "2026-07-28T00:00:00+03:00",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | SkyCode`,
    description,
  },
};

const steps = [
  {
    id: "define-outcome",
    title: "Define one useful outcome",
    body: [
      "Start with the job the app must complete, not a list of technologies. A strong first sentence identifies the user, the problem, and the result. For example: “Create a client portal where a freelance designer can share project status, files, and invoice history with each client.”",
      "Then choose the smallest complete journey. For the client portal, that might be: sign in, see active projects, open one project, and review an invoice. Features such as team chat, analytics, or advanced billing can wait until the core journey is understandable.",
    ],
  },
  {
    id: "write-brief",
    title: "Turn the idea into a build brief",
    body: [
      "Give the AI enough context to make connected decisions. Include the audience, business goal, required pages, important data, actions, visual tone, device priorities, accessibility needs, and anything that must not happen.",
      "Avoid a vague prompt such as “make a modern app.” A better brief says who the app serves, what the home screen must communicate, what information each page needs, and which action matters most. This reduces random design choices and makes later review much easier.",
    ],
  },
  {
    id: "generate-structure",
    title: "Generate structure before polish",
    body: [
      "The first build should prove the information architecture and user flow. Ask for semantic navigation, clear headings, forms with labels, realistic sample content, empty states, loading states, and responsive behavior. Treat visual effects as a second pass.",
      "A useful AI app builder should create files you can inspect. Confirm where the layout, styles, interactions, project configuration, and data assumptions live. If the result is only a visual surface with no accessible source, you will have less control when the product becomes more specific.",
    ],
  },
  {
    id: "review-code",
    title: "Review the generated code",
    body: [
      "Read the file tree and search for important behavior. Check whether links point to real destinations, buttons have an action, form fields have labels, repeated content is structured consistently, and configuration matches the project that was requested.",
      "AI-generated code can be plausible without being correct. Look for hidden assumptions, duplicated styles, insecure client-side authorization, exposed secrets, fake integrations, and claims that the current runtime cannot support. Ask the AI to explain a focused part, but verify the actual file rather than relying only on the explanation.",
    ],
  },
  {
    id: "test-preview",
    title: "Run and test the visible result",
    body: [
      "Use the browser preview as a testing surface, not as proof that everything is finished. Click the primary navigation, forms, menus, responsive controls, and important calls to action. Check narrow screens, keyboard focus, text contrast, overflow, and error states.",
      "Generated browser code should run with restricted capabilities. The current SkyCode web workspace uses a sandboxed preview and a restrictive content policy. Full package installation, server processes, and multi-language code execution require separate disposable containers, resource limits, network controls, and secret handling.",
    ],
  },
  {
    id: "prepare-discovery",
    title: "Prepare public pages for search and sharing",
    body: [
      "Give every public page one descriptive title, one accurate summary, a self-referencing canonical URL, and a visible heading that matches the searcher’s goal. Use descriptive internal links so visitors and crawlers can understand how related pages connect.",
      "Add structured data only when it describes visible content. Include important public URLs in a sitemap, keep private workspaces out of the index with noindex, and ensure the mobile page contains the same meaningful content as desktop. Do not repeat keywords unnaturally; useful, original information is the stronger long-term signal.",
    ],
  },
  {
    id: "publish-improve",
    title: "Publish, measure, and improve",
    body: [
      "Save a stable version, test the production build, and publish on a domain you intend to keep. Connect that domain to Google Search Console, verify ownership, submit the sitemap, and request indexing for the most important pages.",
      "SEO is an evidence loop, not a one-time switch. Review which queries generate impressions, where a page appears, which result earns clicks, and whether visitors complete the intended action. Improve pages from real search behavior, customer questions, competitor changes, and product evidence over time.",
    ],
  },
];

const articleStructuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  datePublished: "2026-07-28T00:00:00+03:00",
  dateModified: "2026-07-28T00:00:00+03:00",
  mainEntityOfPage: pageUrl,
  author: {
    "@type": "Organization",
    name: "SkyCode",
    url: baseUrl,
  },
  publisher: {
    "@type": "Organization",
    name: "SkyCode",
    url: baseUrl,
  },
};

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${baseUrl}/guides` },
    { "@type": "ListItem", position: 3, name: title, item: pageUrl },
  ],
};

export default function BuildWebAppWithAiGuide() {
  return (
    <div className="marketing-site">
      <MarketingHeader />
      <main className="guide-page">
        <nav className="seo-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span>
          <Link href="/guides">Guides</Link><span>/</span>
          <span>Build a web app with AI</span>
        </nav>

        <article>
          <header className="guide-header">
            <span className="marketing-eyebrow">PRACTICAL GUIDE · 10 MIN READ</span>
            <h1>{title}</h1>
            <p>{description}</p>
            <div>
              <span>By SkyCode Product Team</span>
              <time dateTime="2026-07-28">Updated July 28, 2026</time>
            </div>
          </header>

          <div className="guide-body">
            <aside aria-label="Table of contents">
              <strong>IN THIS GUIDE</strong>
              {steps.map((step, index) => (
                <a key={step.id} href={`#${step.id}`}>{index + 1}. {step.title}</a>
              ))}
              <a href="#launch-checklist">Launch checklist</a>
            </aside>

            <div className="guide-content">
              <p className="guide-lead">
                AI can shorten the distance between an idea and working software, but
                speed is useful only when the result remains understandable. This
                workflow keeps the product goal, source code, security boundary, and
                release decision under human control.
              </p>

              {steps.map((step, index) => (
                <section id={step.id} key={step.id}>
                  <span>STEP {String(index + 1).padStart(2, "0")}</span>
                  <h2>{step.title}</h2>
                  {step.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {index === 1 && (
                    <div className="guide-example">
                      <strong>A better first prompt</strong>
                      <p>
                        Build a responsive client portal for freelance designers. The
                        dashboard should show active projects, deadlines, recent files,
                        and unpaid invoices. Use a calm editorial style, clear empty
                        states, accessible contrast, and realistic sample content. Keep
                        every file editable and explain the project structure.
                      </p>
                    </div>
                  )}
                </section>
              ))}

              <section id="launch-checklist" className="launch-checklist">
                <span>FINAL REVIEW</span>
                <h2>AI web app launch checklist</h2>
                <ul>
                  <li><i>✓</i>The primary user can complete the core journey.</li>
                  <li><i>✓</i>Every visible control has a real action or clear disabled state.</li>
                  <li><i>✓</i>Important pages work on mobile and with keyboard navigation.</li>
                  <li><i>✓</i>Private pages use authorization and are excluded from search.</li>
                  <li><i>✓</i>Public pages have unique titles, summaries, headings, and canonicals.</li>
                  <li><i>✓</i>No secret or ownership decision is trusted to browser code.</li>
                  <li><i>✓</i>The production build is tested before the release is shared.</li>
                </ul>
              </section>

              <section className="guide-next">
                <span className="marketing-eyebrow">TRY THE WORKFLOW</span>
                <h2>Start with an editable browser project.</h2>
                <p>
                  Open SkyCode to create the first HTML, CSS, and JavaScript version,
                  or review the <Link href="/security">security architecture</Link>{" "}
                  before planning a larger execution platform.
                </p>
                <div>
                  <Link className="primary-cta" href="/workspace">Open the workspace <span>↗</span></Link>
                  <Link className="secondary-cta" href="/ai-app-builder">Explore the AI app builder</Link>
                </div>
              </section>
            </div>
          </div>
        </article>
      </main>
      <MarketingFooter />
      {[articleStructuredData, breadcrumbStructuredData].map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </div>
  );
}
