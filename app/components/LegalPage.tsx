import type { ReactNode } from "react";
import {
  MarketingFooter,
  MarketingHeader,
} from "./MarketingShell";

export type LegalSection = {
  title: string;
  content: ReactNode;
};

export function LegalPage({
  eyebrow,
  title,
  description,
  effectiveDate,
  sections,
}: {
  eyebrow: string;
  title: string;
  description: string;
  effectiveDate: string;
  sections: LegalSection[];
}) {
  return (
    <div className="marketing-site legal-page">
      <MarketingHeader />
      <main>
        <header className="legal-hero">
          <span className="marketing-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          <small>Effective {effectiveDate}</small>
        </header>
        <div className="legal-layout">
          <aside aria-label={`${title} sections`}>
            <strong>ON THIS PAGE</strong>
            {sections.map((section, index) => (
              <a key={section.title} href={`#section-${index + 1}`}>
                {section.title}
              </a>
            ))}
          </aside>
          <article>
            {sections.map((section, index) => (
              <section id={`section-${index + 1}`} key={section.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{section.title}</h2>
                <div>{section.content}</div>
              </section>
            ))}
          </article>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
