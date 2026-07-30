import Link from "next/link";
import {
  MarketingFooter,
  MarketingHeader,
} from "./components/MarketingShell";

export default function NotFound() {
  return (
    <div className="marketing-site not-found-page">
      <MarketingHeader />
      <main>
        <span className="marketing-eyebrow">404 / NOT FOUND</span>
        <h1>This page is outside the project.</h1>
        <p>
          The address may have changed, or the page may never have existed.
        </p>
        <div>
          <Link className="primary-cta" href="/">Return home</Link>
          <Link className="secondary-cta" href="/workspace">Open workspace</Link>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
