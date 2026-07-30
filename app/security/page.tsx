import type { Metadata } from "next";
import Link from "next/link";
import {
  MarketingFooter,
  MarketingHeader,
} from "../components/MarketingShell";
import {
  MarketingIcon,
  type MarketingIconName,
} from "../components/MarketingIcons";

export const metadata: Metadata = {
  title: "Security & Trust for the AI Coding Workspace",
  description:
    "See how SkyCode protects projects with server-side authorization, rate limits, restricted browser previews, server-only AI secrets, validated releases, and transparent security boundaries.",
  alternates: { canonical: "/security" },
  openGraph: {
    title: "Security & Trust for the AI Coding Workspace | SkyCode",
    description:
      "Explore SkyCode's layered approach to project access, AI generation, restricted preview, validation, and responsible disclosure.",
    url: "/security",
    type: "website",
  },
};

const securityLayers: Array<{
  icon: MarketingIconName;
  number: string;
  title: string;
  description: string;
  label: string;
}> = [
  {
    icon: "shield",
    number: "01",
    title: "Identity before access",
    description:
      "Durable project reads and writes require an authenticated account. The server checks project ownership instead of trusting an ID supplied by the browser.",
    label: "Server enforced",
  },
  {
    icon: "review",
    number: "02",
    title: "Validated write boundary",
    description:
      "State-changing APIs require same-origin requests, expected JSON, valid paths, supported operations, and bounded payloads before storage is touched.",
    label: "Reject by default",
  },
  {
    icon: "preview",
    number: "03",
    title: "Restricted live preview",
    description:
      "Generated browser code runs in a sandboxed, opaque-origin frame with a restrictive content policy and no outbound connections, forms, plugins, workers, or nested frames.",
    label: "Network blocked",
  },
  {
    icon: "spark",
    number: "04",
    title: "Protected AI boundary",
    description:
      "The free instant builder needs no provider credential. Optional Cloud AI is authenticated, rate-limited, time-bounded, output-validated, and safely falls back when unavailable.",
    label: "Bounded requests",
  },
];

const controlRows: Array<{
  icon: MarketingIconName;
  title: string;
  detail: string;
  status: "Active now" | "Expansion gate";
}> = [
  {
    icon: "shield",
    title: "Authentication and ownership",
    detail:
      "Private project operations are attached to the signed-in account and checked again on the server.",
    status: "Active now",
  },
  {
    icon: "bolt",
    title: "Rate and resource limits",
    detail:
      "Project and AI APIs enforce fixed request windows plus limits on prompts, bodies, files, file size, and project count.",
    status: "Active now",
  },
  {
    icon: "code",
    title: "Input and output validation",
    detail:
      "Names, UUIDs, paths, operations, templates, AI results, and generated project sizes are constrained before use.",
    status: "Active now",
  },
  {
    icon: "files",
    title: "Server-side secret handling",
    detail:
      "The optional AI provider key stays in hosted environment configuration and is excluded from browser code, project files, storage, and responses.",
    status: "Active now",
  },
  {
    icon: "publish",
    title: "Immutable platform releases",
    detail:
      "SkyCode releases are built, validated, saved as immutable versions, and then published from that exact artifact.",
    status: "Active now",
  },
  {
    icon: "run",
    title: "General-purpose code execution",
    detail:
      "Python, Node processes, package installation, and public multi-tenant runners remain disabled until disposable containers and strict compute controls exist.",
    status: "Expansion gate",
  },
];

const responsibilities = [
  {
    owner: "SkyCode",
    title: "Platform boundary",
    items: [
      "Authenticate and authorize supported project operations",
      "Restrict the current browser preview",
      "Validate platform API inputs and generated AI output",
      "Keep hosted provider credentials out of client code",
    ],
  },
  {
    owner: "You",
    title: "Application boundary",
    items: [
      "Review generated code before using or exporting it",
      "Choose appropriate visibility for published applications",
      "Add application-specific authentication and authorization",
      "Protect data and secrets used by the application you build",
    ],
  },
];

const faqs = [
  {
    question: "Can generated preview code access the SkyCode editor?",
    answer:
      "The current preview is placed in a sandboxed iframe without same-origin access. Its content policy also blocks network requests, forms, plugins, workers, framing, and other unnecessary capabilities.",
  },
  {
    question: "Does SkyCode expose an AI provider key in the browser?",
    answer:
      "No. Instant Builder works without a provider key. When optional Cloud AI is configured, its provider key is read only by the hosted server route and is not returned to the browser or written into project files.",
  },
  {
    question: "Is SkyCode SOC 2, ISO 27001, or penetration-test certified?",
    answer:
      "SkyCode does not currently claim those certifications. This page describes controls present in the product and clearly separates them from work required before broader execution or enterprise compliance claims.",
  },
  {
    question: "Can any software product guarantee perfect security?",
    answer:
      "No. Security requires continuous testing, monitoring, updates, incident response, and responsible use. SkyCode uses layered controls and publishes current limitations instead of making an absolute guarantee.",
  },
];

const securityStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function SecurityPage() {
  return (
    <div className="marketing-site security-page">
      <MarketingHeader />
      <main>
        <section className="security-hero">
          <div className="security-hero-copy">
            <span className="security-kicker">
              <MarketingIcon name="shield" />
              SECURITY AT SKYCODE
            </span>
            <h1>
              Secure by design.
              <em> Clear by default.</em>
            </h1>
            <p>
              SkyCode treats generated code as untrusted until it crosses a
              verified boundary. Identity, project data, AI generation,
              preview, and releases are controlled as separate layers.
            </p>
            <div className="security-hero-actions">
              <a
                className="primary-cta"
                href="mailto:hello@skycode.dev?subject=SkyCode%20security%20report"
              >
                Report a security issue <span>↗</span>
              </a>
              <Link className="secondary-cta" href="#control-map">
                View control map
              </Link>
            </div>
            <div className="security-proof" aria-label="Current security highlights">
              <span><i /> Server-authorized writes</span>
              <span><i /> Restricted preview</span>
              <span><i /> Server-only AI secrets</span>
            </div>
          </div>

          <div className="security-boundary-visual" aria-label="SkyCode security boundary diagram">
            <div className="boundary-orbit boundary-orbit-one" />
            <div className="boundary-orbit boundary-orbit-two" />
            <span className="boundary-node boundary-node-code"><MarketingIcon name="code" /></span>
            <span className="boundary-node boundary-node-ai"><MarketingIcon name="spark" /></span>
            <span className="boundary-node boundary-node-preview"><MarketingIcon name="preview" /></span>
            <div className="boundary-core">
              <MarketingIcon name="shield" />
              <strong>SKYCODE</strong>
              <small>CONTROL PLANE</small>
            </div>
            <div className="boundary-status">
              <span><i /> Request verified</span>
              <b>ACCESS CONTROLLED</b>
            </div>
          </div>
        </section>

        <section className="security-trust-strip" aria-label="Security design commitments">
          <span>LEAST PRIVILEGE</span>
          <span>SERVER AUTHORITY</span>
          <span>BOUNDED INPUTS</span>
          <span>HONEST STATUS</span>
        </section>

        <section className="security-overview">
          <div className="security-section-heading">
            <span className="marketing-eyebrow">SECURE BY DEFAULT</span>
            <h2>Protection at every product boundary.</h2>
            <p>
              A single security feature is never enough. SkyCode layers
              controls so that identity, storage, AI, preview, and publishing
              do not depend on one decision.
            </p>
          </div>
          <div className="security-layer-grid">
            {securityLayers.map((layer) => (
              <article key={layer.title}>
                <div className="security-card-top">
                  <span>{layer.number}</span>
                  <i><MarketingIcon name={layer.icon} /></i>
                </div>
                <h3>{layer.title}</h3>
                <p>{layer.description}</p>
                <strong><i /> {layer.label}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="security-control-map" id="control-map">
          <div className="security-section-heading">
            <span className="marketing-eyebrow">CONTROL MAP</span>
            <h2>What is protected today.</h2>
            <p>
              Each row names a current platform control or an explicit gate
              that must be completed before SkyCode expands execution.
            </p>
          </div>
          <div className="security-control-table">
            {controlRows.map((control) => (
              <article key={control.title}>
                <i className="control-icon"><MarketingIcon name={control.icon} /></i>
                <div>
                  <h3>{control.title}</h3>
                  <p>{control.detail}</p>
                </div>
                <span className={control.status === "Active now" ? "is-active" : "is-gate"}>
                  <i /> {control.status}
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="responsibility-section">
          <div className="responsibility-copy">
            <span className="marketing-eyebrow">SHARED RESPONSIBILITY</span>
            <h2>We protect the platform. You control what you build.</h2>
            <p>
              SkyCode can secure its own boundaries, but exported or published
              applications have their own users, data, permissions, and
              business rules. Review the code and configure the application
              for its real risk.
            </p>
            <Link href="/guides/build-web-app-with-ai">
              Read the secure build workflow <span>→</span>
            </Link>
          </div>
          <div className="responsibility-grid">
            {responsibilities.map((group) => (
              <article key={group.owner}>
                <span>{group.owner}</span>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}><i>✓</i>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="security-disclosure">
          <div className="disclosure-mark"><MarketingIcon name="shield" /></div>
          <div>
            <span className="marketing-eyebrow">RESPONSIBLE DISCLOSURE</span>
            <h2>Found a security issue?</h2>
            <p>
              Send a clear description, affected route, reproduction steps,
              potential impact, and supporting screenshots. Do not access data
              that is not yours, disrupt the service, or publish sensitive
              details before there is time to investigate.
            </p>
          </div>
          <a
            className="primary-cta"
            href="mailto:hello@skycode.dev?subject=SkyCode%20security%20report"
          >
            Contact security <span>↗</span>
          </a>
        </section>

        <section className="security-faq">
          <div className="security-section-heading">
            <span className="marketing-eyebrow">SECURITY FAQ</span>
            <h2>Direct answers, without the badge theater.</h2>
          </div>
          <div>
            {faqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}<span>＋</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="security-final-cta">
          <span className="marketing-eyebrow">BUILD WITH CONTROL</span>
          <h2>Keep the code visible from prompt to preview.</h2>
          <p>
            Start with a restricted browser project, inspect every generated
            file, and decide what moves forward.
          </p>
          <div>
            <Link className="primary-cta" href="/workspace">Open SkyCode <span>↗</span></Link>
            <Link className="secondary-cta" href="/docs">Read the docs</Link>
          </div>
        </section>
      </main>
      <MarketingFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(securityStructuredData) }}
      />
    </div>
  );
}
