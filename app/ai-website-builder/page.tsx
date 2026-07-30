import type { Metadata } from "next";
import {
  SeoLandingPage,
  type SeoFaq,
} from "../components/SeoLandingPage";

const title = "AI Website Builder with Live Code Preview";
const description =
  "Create responsive landing pages and business websites with AI, then refine the HTML, CSS, and JavaScript in a full browser coding workspace.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ai-website-builder" },
  openGraph: {
    title: `${title} | SkyCode`,
    description,
    url: "/ai-website-builder",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | SkyCode`,
    description,
  },
};

const faqs: SeoFaq[] = [
  {
    question: "How does the SkyCode AI website builder work?",
    answer:
      "You describe the website, audience, desired style, sections, and calls to action. SkyCode prepares editable browser code that you can preview, refine with follow-up instructions, or change directly.",
  },
  {
    question: "Can I build a responsive website?",
    answer:
      "Yes. The generated HTML and CSS can use responsive layouts, flexible typography, and mobile breakpoints. You can inspect the result in the live preview and edit the responsive rules yourself.",
  },
  {
    question: "Does SkyCode lock my website into a template?",
    answer:
      "No. Templates can provide a starting structure, but the output remains ordinary editable files. You can change the layout, content, colors, components, and scripts or export the result.",
  },
  {
    question: "Will an AI-built website automatically rank first on Google?",
    answer:
      "No website builder can guarantee a first-place ranking. SkyCode can produce crawlable content, unique metadata, canonical URLs, structured data, and a sitemap, while rankings also depend on search demand, content quality, links, competition, domain authority, and ongoing measurement.",
  },
];

export default function AiWebsiteBuilderPage() {
  return (
    <SeoLandingPage
      path="/ai-website-builder"
      eyebrow="AI WEBSITE BUILDER"
      title={title}
      description={description}
      proof={["Responsive web code", "Live browser preview", "SEO-ready structure", "No visual lock-in"]}
      sectionTitle="Create faster, then refine beyond a template."
      sectionDescription="SkyCode connects natural-language website generation with a real code editor. That makes it useful for people who want an easy start and for teams that care about performance, accessibility, SEO, and ownership."
      benefits={[
        {
          title: "Start from a complete brief",
          description:
            "Define the audience, offer, brand tone, required sections, visual references, and conversion goal before generation begins.",
        },
        {
          title: "Generate semantic page structure",
          description:
            "Build with meaningful headings, navigation, links, sections, forms, and calls to action instead of a single flattened visual canvas.",
        },
        {
          title: "See changes as you work",
          description:
            "Use the live preview beside the code to evaluate typography, spacing, color, responsiveness, and interactions after every focused revision.",
        },
        {
          title: "Prepare for organic discovery",
          description:
            "Create unique page titles and descriptions, canonical URLs, crawlable internal links, sitemap entries, robots rules, and structured data where appropriate.",
        },
      ]}
      steps={[
        {
          title: "Write the website brief",
          description:
            "Explain the business, target customer, offer, brand personality, pages, and one primary conversion goal.",
        },
        {
          title: "Generate the first responsive version",
          description:
            "Create the hierarchy, copy structure, components, and styling as editable web files.",
        },
        {
          title: "Review content and mobile behavior",
          description:
            "Check whether every section answers a real customer question and whether the layout works on smaller screens.",
        },
        {
          title: "Add SEO and publish deliberately",
          description:
            "Use a stable custom domain, submit the sitemap, measure real search queries, and improve pages from evidence over time.",
        },
      ]}
      useCases={[
        {
          title: "Landing pages",
          description:
            "Build a focused campaign page with a clear headline, proof, offer, FAQ, and conversion action.",
        },
        {
          title: "Small-business websites",
          description:
            "Create service, about, contact, and location content that helps a visitor understand and trust the business.",
        },
        {
          title: "Product marketing sites",
          description:
            "Explain a software product through benefits, workflows, use cases, security details, documentation, and pricing.",
        },
        {
          title: "Portfolio websites",
          description:
            "Present selected work, process, capabilities, and contact information in a distinctive responsive layout.",
        },
      ]}
      faqs={faqs}
    />
  );
}
