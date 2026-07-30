import type { Metadata } from "next";
import {
  SeoLandingPage,
  type SeoFaq,
} from "../components/SeoLandingPage";

const title = "Online Code Editor with AI and Live Preview";
const description =
  "Edit HTML, CSS, JavaScript, and project files in your browser, search the codebase, review changes, and preview the result beside an AI coding assistant.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/online-code-editor" },
  openGraph: {
    title: `${title} | SkyCode`,
    description,
    url: "/online-code-editor",
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
    question: "What is an online code editor?",
    answer:
      "An online code editor is a browser-based environment for reading and changing source files without installing a desktop IDE. SkyCode combines the editor with project navigation, search, local checkpoints, preview, and AI-assisted changes.",
  },
  {
    question: "Which languages work in the current editor?",
    answer:
      "The current public workspace supports HTML, CSS, JavaScript, and JSON projects. The wider product architecture can add other languages only when separate disposable execution containers and security controls are available.",
  },
  {
    question: "Is the live preview isolated from the editor?",
    answer:
      "Yes. The current preview uses a sandboxed iframe and a restrictive content security policy. It does not receive same-origin access to the editor and blocks network requests, forms, object plugins, framing, and other unnecessary capabilities.",
  },
  {
    question: "Can I save and export a project?",
    answer:
      "Authenticated users can save supported projects through protected APIs, and the workspace can export a static HTML result. Local source checkpoints also help review and restore recent file changes.",
  },
];

export default function OnlineCodeEditorPage() {
  return (
    <SeoLandingPage
      path="/online-code-editor"
      eyebrow="ONLINE CODE EDITOR"
      title={title}
      description={description}
      proof={["Browser-based workspace", "Cross-file search", "Local change history", "Sandboxed preview"]}
      sectionTitle="The fast feedback loop of an online IDE."
      sectionDescription="SkyCode puts the project tree, editable source, terminal feedback, preview, and AI conversation on one screen. You can move from an idea to a visible result without losing access to the code."
      benefits={[
        {
          title: "Navigate a familiar project tree",
          description:
            "Open files, expand folders, switch between HTML, CSS, JavaScript, and project configuration, and see which files changed.",
        },
        {
          title: "Search across the whole project",
          description:
            "Find matching code by file and line, then jump directly into the relevant source instead of scanning each file manually.",
        },
        {
          title: "Review and restore local changes",
          description:
            "Use the Source Control panel to view modified files, create a named local checkpoint, and restore a file to the last checkpoint.",
        },
        {
          title: "Run beside the source",
          description:
            "Refresh a restricted browser preview and read terminal-style feedback without leaving the workspace or hiding the implementation.",
        },
      ]}
      steps={[
        {
          title: "Open or create a project",
          description:
            "Start from the browser template or load a project securely attached to your authenticated account.",
        },
        {
          title: "Edit or ask AI for a focused change",
          description:
            "Change the active file directly, search the project, or describe one specific improvement to Sky AI.",
        },
        {
          title: "Run and inspect the preview",
          description:
            "Check the visible result and terminal feedback before you treat the change as complete.",
        },
        {
          title: "Checkpoint or export",
          description:
            "Record a useful local state, save the project, or export the static browser result.",
        },
      ]}
      useCases={[
        {
          title: "Front-end experiments",
          description:
            "Test layout, typography, responsive CSS, and small JavaScript interactions in a contained project.",
        },
        {
          title: "Rapid UI prototypes",
          description:
            "Create and refine a clickable interface before connecting a production backend or larger application stack.",
        },
        {
          title: "Code learning",
          description:
            "Change a real file and see the effect immediately while using AI to explain unfamiliar structure or syntax.",
        },
        {
          title: "Shareable browser demos",
          description:
            "Save a small project, export its static output, and use it to communicate an interface or interaction concept.",
        },
      ]}
      faqs={faqs}
    />
  );
}
