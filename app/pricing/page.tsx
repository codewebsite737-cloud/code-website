import type { Metadata } from "next";
import Link from "next/link";
import {
  MarketingFooter,
  MarketingHeader,
  PageIntro,
} from "../components/MarketingShell";

export const metadata: Metadata = {
  title: "AI App Builder Pricing",
  description:
    "Compare SkyCode Starter, Creator, and Team plans for AI coding, private projects, collaboration, execution, and publishing.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "AI App Builder Pricing | SkyCode",
    description:
      "Compare SkyCode plans for AI coding, private projects, collaboration, execution, and publishing.",
    url: "/pricing",
    type: "website",
  },
};

const plans = [
  {
    name: "Starter",
    price: "$0",
    description: "Explore the workflow and build your first browser project.",
    features: ["Unlimited Instant Builder generations", "Optional server Cloud AI", "HTML, CSS and JavaScript", "Restricted live preview", "Static project export"],
    cta: "Start free",
    available: true,
  },
  {
    name: "Creator",
    price: "$19",
    description: "For freelancers and founders shipping real products.",
    features: ["Unlimited private projects", "Monthly AI build credits", "Version history", "Production publishing", "Custom domains"],
    cta: "Join Creator waitlist",
    featured: true,
    available: false,
  },
  {
    name: "Team",
    price: "$39",
    description: "Per user, for teams that build and review together.",
    features: ["Everything in Creator", "Shared workspaces", "Roles and permissions", "Audit history", "Priority execution"],
    cta: "Join Team waitlist",
    available: false,
  },
];

export default function PricingPage() {
  return (
    <div className="marketing-site">
      <MarketingHeader />
      <main>
        <PageIntro
          eyebrow="SIMPLE PRICING"
          title="Pay for building, not for complexity."
          description="Start with a working free tier, then scale AI usage, runtime, collaboration, and deployment when the product earns it."
        />
        <section className="pricing-grid">
          {plans.map((plan) => (
            <article className={plan.featured ? "featured" : ""} key={plan.name}>
              {plan.featured && <span className="popular">PLANNED</span>}
              <h2>{plan.name}</h2>
              <p>{plan.description}</p>
              <div className="price"><strong>{plan.price}</strong>{plan.price !== "$0" && <span>/ month</span>}</div>
              <Link
                href={
                  plan.available
                    ? "/workspace"
                    : `mailto:hello@skycode.dev?subject=${encodeURIComponent(`SkyCode ${plan.name} waitlist`)}`
                }
              >
                {plan.cta} <span>↗</span>
              </Link>
              <ul>{plan.features.map((feature) => <li key={feature}><i>✓</i>{feature}</li>)}</ul>
            </article>
          ))}
        </section>
        <p className="pricing-note">
          Starter is available now. Creator and Team are roadmap plans, not
          active subscriptions. No payment is collected on this website today.
        </p>
      </main>
      <MarketingFooter />
    </div>
  );
}
