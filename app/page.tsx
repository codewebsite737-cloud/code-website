import type { Metadata } from "next";
import Link from "next/link";
import { MarketingFooter, MarketingHeader } from "./components/MarketingShell";

const baseUrl = "https://code-website.codewebsite737.workers.dev";

export const metadata: Metadata = {
  title: "AI Website Builder, Web App Builder & Online Code Editor",
  description:
    "Build websites and web apps, edit sections visually or in code, autosave private projects, preview safely, undo changes, and export source you can keep.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "SkyCode — AI Website and Web App Builder",
    description:
      "Generate a complete browser project, edit every section or file, autosave your work, and export code you own.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkyCode — AI Website and Web App Builder",
    description:
      "Build, edit, autosave, preview, undo, redo, and export real browser projects.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${baseUrl}/#application`,
  name: "SkyCode",
  url: baseUrl,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires a modern web browser",
  description:
    "AI-assisted website and web app builder with visual section editing, a complete code view, private project autosave, restricted preview, undo and redo, and source export.",
  featureList: [
    "AI-assisted website and web app generation",
    "Visual section content and design editing",
    "Editable HTML, CSS, JavaScript, and JSON files",
    "Automatic private project saving",
    "Keyboard undo and redo",
    "Restricted live browser preview",
    "Project source export",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  publisher: { "@id": `${baseUrl}/#organization` },
};

const buildTypes = [
  "Website",
  "Web app",
  "Booking",
  "Dashboard",
  "Store",
  "Portfolio",
];

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
            <span className="home-kicker">AI WEBSITE & WEB APP BUILDER</span>
            <h1>Build the product. Keep the code.</h1>
            <p>
              SkyCode turns an idea into a complete browser project, then gives
              you visual section editing, a full code view, automatic saving,
              safe preview, undo and redo, and source you can export.
            </p>
          </div>

          <div className="home-composer">
            <span className="home-composer-label">Describe what you want to build</span>
            <div className="home-composer-input">
              <span>Build a responsive booking website for a creative studio…</span>
              <Link href="/workspace" aria-label="Start building in SkyCode">
                <span>Start building</span>
                <b>↗</b>
              </Link>
            </div>
            <div className="home-build-types" aria-label="Popular project types">
              {buildTypes.map((type) => (
                <Link href="/workspace" key={type}>
                  {type}
                </Link>
              ))}
            </div>
          </div>

          <div className="home-hero-links">
            <Link href="/workspace">Open the builder</Link>
            <Link href="/features">Explore every feature</Link>
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
            <span>WHAT WORKS TODAY</span>
            <h2>From first prompt to a saved project.</h2>
            <p>
              Start quickly, refine visually, inspect the source, and return to
              the same project without losing your progress.
            </p>
          </div>

          <div className="home-agent-grid">
            <article className="home-story-card home-story-design">
              <span className="home-card-label">GENERATE</span>
              <h3>Create the complete starting project.</h3>
              <p>
                Choose a project type and describe the result. SkyCode creates
                the HTML, CSS, JavaScript, configuration, and live preview.
              </p>
              <div className="home-wireframe" aria-hidden="true">
                <i />
                <i />
                <i />
                <span />
              </div>
            </article>

            <article className="home-story-card home-story-move">
              <span className="home-card-label">EDIT VISUALLY</span>
              <h3>Change one section without breaking the page.</h3>
              <p>
                Select a section in Preview, update its content or design, move
                it, duplicate it, or remove it while the rest stays untouched.
              </p>
              <div className="home-progress" aria-hidden="true">
                <span><i>1</i><b>Select section</b><em>Ready</em></span>
                <span><i>2</i><b>Edit content</b><em>Ready</em></span>
                <span className="active"><i>3</i><b>Review preview</b><em>Live</em></span>
              </div>
            </article>

            <article className="home-story-card home-story-ship">
              <span className="home-card-label">EDIT CODE</span>
              <h3>Open every file when you need control.</h3>
              <p>
                Switch to Code for files, search, source checkpoints, outline,
                timeline, problems, logs, and the complete editable source.
              </p>
              <div className="home-code-lines" aria-hidden="true">
                <span><i>01</i><b>const</b> project = buildIdea()</span>
                <span><i>02</i>preview(project)</span>
                <span><i>03</i><b>return</b> exportSource(project)</span>
              </div>
            </article>

            <article className="home-story-card home-story-team">
              <span className="home-card-label">KEEP YOUR WORK</span>
              <h3>Autosave, undo, redo, and continue later.</h3>
              <p>
                Every project change is preserved and synced to private project
                storage. Familiar keyboard undo and redo are built in.
              </p>
              <Link href="/workspace">Start a project <span>↗</span></Link>
            </article>
          </div>
        </section>

        <section className="home-platform">
          <div className="home-section-heading">
            <span>ONE FOCUSED WORKSPACE</span>
            <h2>Preview for building. Code for development.</h2>
          </div>

          <div className="home-platform-grid">
            <article>
              <span>01 / PREVIEW</span>
              <h3>A clean live canvas.</h3>
              <p>
                Review the website at desktop, tablet, or phone size and edit
                individual sections without developer panels in the way.
              </p>
              <div className="platform-preview" aria-hidden="true">
                <span />
                <div><i /><i /><i /></div>
              </div>
            </article>

            <article>
              <span>02 / CODE</span>
              <h3>Developer tools stay together.</h3>
              <p>
                Files, search, source control, database tools, outline,
                timeline, terminal, problems, and logs live in Code view.
              </p>
              <div className="platform-files" aria-hidden="true">
                <i>HTML</i><i>CSS</i><i>JS</i><i>JSON</i>
              </div>
            </article>

            <article>
              <span>03 / AUTOSAVE</span>
              <h3>No manual save state to manage.</h3>
              <p>
                Changes are synced to the current private project after you stop
                editing, so a reload returns to the same work.
              </p>
              <div className="platform-status">
                <span><i /> Project recovery ready</span>
                <span><i /> Changes synced</span>
              </div>
            </article>

            <article>
              <span>04 / RECOVERY</span>
              <h3>Undo the change, not the whole project.</h3>
              <p>
                Use Ctrl or Command Z to undo edits, restore them with redo, and
                export a static copy whenever you need it.
              </p>
              <div className="platform-prompt">
                <span>⌘ Z &nbsp; Undo</span>
                <b>⌘ ⇧ Z</b>
              </div>
            </article>
          </div>
        </section>

        <section className="home-product">
          <div className="home-product-copy">
            <span>THE CURRENT PRODUCT</span>
            <h2>A real project, not a temporary demo.</h2>
            <p>
              SkyCode stores project files, restores the current workspace after
              reload, locks active files during collaboration, validates common
              issues, and keeps exported code independent from the editor.
            </p>
            <Link href="/workspace">Open SkyCode <span>↗</span></Link>
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
                <small>PROJECT</small>
                <p>studio-booking</p>
                <span><i /> Autosave active</span>
                <span><i /> 4 source files</span>
                <span className="working"><i /> Preview current</span>
              </div>
              <div className="product-code">
                <small>index.html</small>
                <pre><code>{`<main class="booking-app">
  <h1>Book your next session</h1>
  <Schedule availability={slots} />
</main>`}</code></pre>
                <div><b>PROBLEMS</b><span>✓ No blocking issues</span></div>
              </div>
              <div className="product-preview">
                <small>PREVIEW</small>
                <div>
                  <span>STUDIO</span>
                  <h3>Book your next session.</h3>
                  <p>Choose a service and available time</p>
                  <i /><i /><i />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-security">
          <div>
            <span>SECURITY BY DESIGN</span>
            <h2>Your code and preview stay separated.</h2>
          </div>
          <div className="home-security-copy">
            <p>
              The live preview runs with restricted permissions, private routes
              stay out of search results, cross-origin writes are rejected, and
              server API keys never enter generated project code.
            </p>
            <Link href="/security">Read the security model <span>↗</span></Link>
          </div>
          <div className="home-security-model" aria-label="SkyCode security model">
            <span><b>01</b>Your source</span>
            <i />
            <span><b>02</b>Restricted preview</span>
            <i />
            <span><b>03</b>Private storage</span>
          </div>
        </section>

        <section className="home-platform" aria-labelledby="home-faq-title">
          <div className="home-section-heading">
            <span>COMMON QUESTIONS</span>
            <h2 id="home-faq-title">What you need to know before building.</h2>
          </div>
          <div className="home-platform-grid">
            <article>
              <span>CAN I EDIT THE CODE?</span>
              <h3>Yes. Every generated file is editable.</h3>
              <p>
                SkyCode exposes the HTML, CSS, JavaScript, and project
                configuration instead of locking the result behind a visual tool.
              </p>
            </article>
            <article>
              <span>DOES RELOAD LOSE MY WORK?</span>
              <h3>No. The current project is restored.</h3>
              <p>
                Completed projects sync automatically and reload from private
                project storage instead of restarting the build wizard.
              </p>
            </article>
            <article>
              <span>CAN I EXPORT?</span>
              <h3>Yes. The source remains yours to keep.</h3>
              <p>
                Export a static HTML build at any time and continue developing
                the project outside SkyCode when that fits your workflow.
              </p>
            </article>
            <article>
              <span>IS THE PREVIEW ISOLATED?</span>
              <h3>Yes. It runs inside a restricted sandbox.</h3>
              <p>
                Preview scripts cannot freely access the parent workspace or
                external network resources, reducing accidental exposure.
              </p>
            </article>
          </div>
        </section>

        <section className="home-final">
          <span>START WITH A REAL IDEA</span>
          <h2>Build the first working version today.</h2>
          <p>Generate it, refine it, save it, and keep the code.</p>
          <Link href="/workspace">Start building free <span>↗</span></Link>
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
