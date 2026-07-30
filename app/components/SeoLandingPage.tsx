import Link from "next/link";
import {
  CallToAction,
  MarketingFooter,
  MarketingHeader,
} from "./MarketingShell";

const baseUrl = "https://skycode-ai-workspace.skymarketing737.chatgpt.site";

export type SeoFaq = {
  question: string;
  answer: string;
};

type SeoLandingPageProps = {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  proof: string[];
  sectionTitle: string;
  sectionDescription: string;
  benefits: Array<{
    title: string;
    description: string;
  }>;
  steps: Array<{
    title: string;
    description: string;
  }>;
  useCases: Array<{
    title: string;
    description: string;
  }>;
  faqs: SeoFaq[];
};

export function SeoLandingPage({
  path,
  eyebrow,
  title,
  description,
  proof,
  sectionTitle,
  sectionDescription,
  benefits,
  steps,
  useCases,
  faqs,
}: SeoLandingPageProps) {
  const pageUrl = `${baseUrl}${path}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: pageUrl,
      isPartOf: {
        "@type": "WebSite",
        name: "SkyCode",
        url: baseUrl,
      },
      about: {
        "@type": "SoftwareApplication",
        name: "SkyCode",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: title,
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <div className="marketing-site">
      <MarketingHeader />
      <main className="seo-main">
        <nav className="seo-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>{title}</span>
        </nav>

        <section className="seo-hero">
          <span className="marketing-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="hero-actions">
            <Link className="primary-cta" href="/workspace">
              Start building free <span>↗</span>
            </Link>
            <Link className="secondary-cta" href="/features">
              Explore every feature
            </Link>
          </div>
          <ul className="seo-proof" aria-label="Product advantages">
            {proof.map((item) => (
              <li key={item}><i>✓</i>{item}</li>
            ))}
          </ul>
        </section>

        <section className="seo-benefits">
          <div className="section-heading">
            <span className="marketing-eyebrow">WHY SKYCODE</span>
            <h2>{sectionTitle}</h2>
            <p>{sectionDescription}</p>
          </div>
          <div className="seo-benefit-grid">
            {benefits.map((benefit, index) => (
              <article key={benefit.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="seo-process">
          <div className="section-heading">
            <span className="marketing-eyebrow">HOW IT WORKS</span>
            <h2>From a clear prompt to editable software.</h2>
          </div>
          <ol>
            {steps.map((step, index) => (
              <li key={step.title}>
                <span>{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="seo-use-cases">
          <div className="section-heading">
            <span className="marketing-eyebrow">WHAT YOU CAN BUILD</span>
            <h2>Useful starting points, not locked templates.</h2>
          </div>
          <div>
            {useCases.map((useCase) => (
              <article key={useCase.title}>
                <h3>{useCase.title}</h3>
                <p>{useCase.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="seo-faq">
          <div className="section-heading">
            <span className="marketing-eyebrow">QUESTIONS, ANSWERED</span>
            <h2>What to know before you build.</h2>
          </div>
          <div>
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}<span aria-hidden="true">＋</span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <CallToAction />
      </main>
      <MarketingFooter />
      {structuredData.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </div>
  );
}
