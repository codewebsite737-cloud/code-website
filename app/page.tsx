import type { Metadata } from "next";
import Link from "next/link";
import { MarketingFooter, MarketingHeader } from "./components/MarketingShell";

export const metadata: Metadata = {
  title: "AI App Builder & Online Code Editor",
  description:
    "Build web apps and websites with AI, edit every generated file, preview changes safely, and keep the source code.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "SkyCode: Turn ideas into working software",
    description:
      "Plan, build, edit, preview, and publish browser projects in one secure AI workspace.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkyCode: Turn ideas into working software",
    description:
      "Build apps and websites with AI while keeping complete control of the code.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SkyCode",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  description:
    "AI-assisted browser coding workspace for creating, editing, previewing, and publishing web applications.",
  featureList: [
    "AI-assisted app and website generation",
    "Editable HTML, CSS, JavaScript, and JSON files",
    "Cross-file project search",
    "Restricted live browser preview",
    "Project saving and source export",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const buildTypes = ["Website", "Web app", "Dashboard", "Store", "API"];
const audiences = [
  "FOUNDERS",
  "DEVELOPERS",
  "DESIGNERS",
  "PRODUCT TEAMS",
  "AGENCIES",
];

export default function HomePage() {
  return (
    <div className="marketing-site home-replit">
      <MarketingHeader />

      <main>
        <section className="home-hero">
          <div className="home-hero-copy">
            <span className="home-kicker">AI SOFTWARE BUILDER</span>
            <h1>What will you build?</h1>
            <p>
              Turn an idea into working software. SkyCode plans the structure,
              writes real code, and gives you a clear place to review every
              change.
            </p>
          </div>

          <div className="home-composer">
            <span className="home-composer-label">Describe your idea</span>
            <div className="home-composer-input">
              <span>
                Build a booking platform for independent studios…
              </span>
              <Link href="/workspace" aria-label="Start building in SkyCode">
                <span>Start</span>
                <b>↗</b>
              </Link>
            </div>
            <div className="home-build-types" aria-label="Popular build types">
              {buildTypes.map((type) => (
                <Link href="/workspace" key={type}>
                  {type}
                </Link>
              ))}
            </div>
          </div>

          <div className="home-hero-links">
            <Link href="/workspace">Start building free</Link>
            <Link href="/features">See how it works</Link>
          </div>
        </section>

        <section className="home-audience" aria-label="Who SkyCode is built for">
          <span>BUILT FOR</span>
          <div>
            {audiences.map((audience) => (
              <b key={audience}>{audience}</b>
            ))}
          </div>
        </section>

        <section className="home-agent">
          <div className="home-section-heading">
            <span>MEET SKY AI</span>
            <h2>From a rough idea to a real product.</h2>
            <p>
              Build visually, edit directly, and move from prompt to publish
              without losing control of your project.
            </p>
          </div>

          <div className="home-agent-grid">
            <article className="home-story-card home-story-design">
              <span className="home-card-label">DESIGN</span>
              <h3>Shape the idea freely.</h3>
              <p>
                Start with plain language. SkyCode turns your product goal into
                a structured interface you can refine.
              </p>
              <div className="home-wireframe" aria-hidden="true">
                <i />
                <i />
                <i />
                <span />
              </div>
            </article>

            <article className="home-story-card home-story-move">
              <span className="home-card-label">BUILD</span>
              <h3>Move faster, with context.</h3>
              <p>
                The assistant plans, edits multiple files, validates its work,
                and shows progress while it builds.
              </p>
              <div className="home-progress" aria-hidden="true">
                <span><i>1</i><b>Plan architecture</b><em>Done</em></span>
                <span><i>2</i><b>Create interface</b><em>Done</em></span>
                <span className="active"><i>3</i><b>Run validation</b><em>Building</em></span>
              </div>
            </article>

            <article className="home-story-card home-story-ship">
              <span className="home-card-label">SHIP</span>
              <h3>Real code. Ready to keep.</h3>
              <p>
                Work with familiar files, inspect every line, preview safely,
                then export or publish when the project is ready.
              </p>
              <div className="home-code-lines" aria-hidden="true">
                <span><i>01</i><b>const</b> product = await buildIdea()</span>
                <span><i>02</i>validate(product)</span>
                <span><i>03</i><b>return</b> publish(product)</span>
              </div>
            </article>

            <article className="home-story-card home-story-team">
              <span className="home-card-label">REVIEW</span>
              <h3>Build together, clearly.</h3>
              <p>
                Keep the AI conversation, source, preview, problems, and logs in
                one organized workspace.
              </p>
              <Link href="/workspace">Open the workspace <span>↗</span></Link>
            </article>
          </div>
        </section>

        <section className="home-platform">
          <div className="home-section-heading">
            <span>THE COMPLETE WORKSPACE</span>
            <h2>Everything your build needs.</h2>
          </div>

          <div className="home-platform-grid">
            <article>
              <span>01 / AI ASSISTANT</span>
              <h3>Describe it. Watch it build.</h3>
              <p>
                See the plan, the current task, and each completed step while
                Sky AI creates your project.
              </p>
              <div className="platform-prompt">
                <span>Add secure account settings</span>
                <b>Send</b>
              </div>
            </article>

            <article>
              <span>02 / CODE EDITOR</span>
              <h3>Edit every generated file.</h3>
              <p>
                Clear syntax colors, file search, project history, keyboard
                controls, and source you can export.
              </p>
              <div className="platform-files" aria-hidden="true">
                <i>HTML</i><i>CSS</i><i>JS</i><i>JSON</i>
              </div>
            </article>

            <article>
              <span>03 / LIVE PREVIEW</span>
              <h3>See changes before you ship.</h3>
              <p>
                Run the current source inside a restricted preview and review
                the result beside your code.
              </p>
              <div className="platform-preview" aria-hidden="true">
                <span />
                <div><i /><i /><i /></div>
              </div>
            </article>

            <article>
              <span>04 / PROJECT TOOLS</span>
              <h3>Problems, logs, and releases.</h3>
              <p>
                Catch common code issues, follow build activity, save projects,
                and publish a validated version.
              </p>
              <div className="platform-status">
                <span><i /> 0 errors</span>
                <span><i /> Preview ready</span>
              </div>
            </article>
          </div>
        </section>

        <section className="home-product">
          <div className="home-product-copy">
            <span>YOUR WORKSPACE</span>
            <h2>One clear place to think, code, and preview.</h2>
            <p>
              Resize the assistant, editor, preview, and developer tools to
              match the way you work. SkyCode stays readable from phone to
              desktop.
            </p>
            <Link href="/workspace">Try the workspace <span>↗</span></Link>
          </div>

          <div className="home-product-window" aria-label="SkyCode workspace preview">
            <div className="product-topbar">
              <strong>SkyCode</strong>
              <span>studio-booking</span>
              <b>Run</b>
            </div>
            <div className="product-shell">
              <aside>
                <span>◇</span>
                <span>⌕</span>
                <span>⑂</span>
                <span>▦</span>
              </aside>
              <div className="product-ai">
                <small>SKY AI</small>
                <p>Build the appointment dashboard and responsive booking flow.</p>
                <span><i /> Planning project</span>
                <span><i /> Creating files</span>
                <span className="working"><i /> Building interface</span>
              </div>
              <div className="product-code">
                <small>dashboard.tsx</small>
                <pre><code>{`export function Dashboard() {
  const bookings = useBookings()

  return (
    <Schedule data={bookings} />
  )
}`}</code></pre>
                <div><b>TERMINAL</b><span>✓ Preview ready</span></div>
              </div>
              <div className="product-preview">
                <small>PREVIEW</small>
                <div>
                  <span>STUDIO</span>
                  <h3>Good morning, Sara.</h3>
                  <p>4 bookings scheduled today</p>
                  <i /><i /><i />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-security">
          <div>
            <span>SECURITY BY DESIGN</span>
            <h2>Your project stays in its own lane.</h2>
          </div>
          <div className="home-security-copy">
            <p>
              SkyCode separates the editor from browser previews, validates
              sensitive requests, protects server secrets, and publishes
              immutable releases.
            </p>
            <Link href="/security">Read about security <span>↗</span></Link>
          </div>
          <div className="home-security-model" aria-label="SkyCode security model">
            <span><b>01</b>Your code</span>
            <i />
            <span><b>02</b>Restricted runtime</span>
            <i />
            <span><b>03</b>Safe preview</span>
          </div>
        </section>

        <section className="home-final">
          <span>START WITH AN IDEA</span>
          <h2>What are you waiting for?</h2>
          <p>Build the first working version today. No setup required.</p>
          <Link href="/workspace">Get started free <span>↗</span></Link>
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
