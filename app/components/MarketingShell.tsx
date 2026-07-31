import Link from "next/link";

export function Brand() {
  return (
    <Link className="marketing-brand" href="/" aria-label="SkyCode home">
      <span className="marketing-logo"><i /></span>
      <strong>SkyCode</strong>
      <span className="sys-status-badge" style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "10px",
        color: "#ff0000",
        background: "rgba(255, 0, 0, 0.1)",
        border: "1px solid rgba(255, 0, 0, 0.3)",
        padding: "2px 6px",
        borderRadius: "3px",
        letterSpacing: "0.08em",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        marginLeft: "6px"
      }}>
        <i style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: "#ff0000",
          boxShadow: "0 0 6px #ff0000"
        }} />
        SYS // 2.0
      </span>
    </Link>
  );
}

export function MarketingHeader() {
  return (
    <header className="marketing-header">
      <Brand />
      <nav aria-label="Main navigation">
        <Link href="/ai-app-builder">AI Builder</Link>
        <Link href="/features">Features</Link>
        <Link href="/security">Security</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/guides">Guides</Link>
      </nav>
      <details className="marketing-mobile-menu">
        <summary aria-label="Open navigation menu">
          <span />
          <span />
          <span />
        </summary>
        <div>
          <Link href="/ai-app-builder">AI Builder</Link>
          <Link href="/features">Features</Link>
          <Link href="/security">Security</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/docs">Documentation</Link>
          <Link href="/status">System status</Link>
          <Link href="/dashboard">Sign in</Link>
          <Link className="mobile-menu-cta" href="/workspace">Start building</Link>
        </div>
      </details>
      <div className="marketing-actions">
        <Link className="text-link" href="/dashboard">Sign in</Link>
        <Link className="header-cta" href="/workspace">Start building</Link>
      </div>
    </header>
  );
}

export function MarketingFooter() {
  return (
    <footer className="marketing-footer">
      <div className="footer-main">
        <div>
          <Brand />
          <p>From idea to working software, in one secure workspace.</p>
        </div>
        <div className="footer-links">
          <div>
            <strong>Product</strong>
            <Link href="/ai-app-builder">AI app builder</Link>
            <Link href="/ai-website-builder">AI website builder</Link>
            <Link href="/online-code-editor">Online code editor</Link>
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
          </div>
          <div>
            <strong>Resources</strong>
            <Link href="/guides">AI building guides</Link>
            <Link href="/guides/build-web-app-with-ai">Build a web app with AI</Link>
            <Link href="/security">Security</Link>
            <Link href="/docs">Documentation</Link>
          </div>
          <div>
            <strong>Workspace</strong>
            <Link href="/workspace">Workspace</Link>
            <Link href="/dashboard">Projects</Link>
            <Link href="/status">System status</Link>
            <a href="mailto:hello@skycode.dev">Contact</a>
            <Link href="/security">Trust center</Link>
            <Link href="/docs#responsible-ai">Responsible AI</Link>
          </div>
          <div>
            <strong>Legal</strong>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/acceptable-use">Acceptable use</Link>
            <a href="/.well-known/security.txt">Security.txt</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 SkyCode. All rights reserved.</span>
        <span>Browser software builder · Core service status is public.</span>
      </div>
    </footer>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-intro">
      <span className="marketing-eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}

export function CallToAction() {
  return (
    <section className="final-cta">
      <span className="marketing-eyebrow">START BUILDING</span>
      <h2>Your next product can start today.</h2>
      <p>Open the workspace, describe the idea, and keep full control of the code.</p>
      <div>
        <Link className="primary-cta" href="/workspace">Open SkyCode <span>↗</span></Link>
        <Link className="secondary-cta" href="/docs">Read the docs</Link>
      </div>
    </section>
  );
}
