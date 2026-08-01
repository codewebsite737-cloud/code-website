import type { Metadata } from "next";
import { WorkspaceEnhancements } from "./components/WorkspaceEnhancements";
import "./workspace.css";
import "./code-view-visibility.css";

export const metadata: Metadata = {
  title: "Workspace",
  description:
    "Build, edit, preview, and automatically save a SkyCode browser project.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

const resumeScript = `
try {
  localStorage.setItem("skycode:workspace-layout-version:v1", "studio");
  const params = new URLSearchParams(location.search);
  const projectId = params.get("project");
  if (projectId) {
    localStorage.setItem("skycode:last-project-id:v1", projectId);
    document.documentElement.classList.add("skycode-resuming-project");
  } else {
    const navigation = performance.getEntriesByType("navigation")[0];
    const lastProjectId = localStorage.getItem("skycode:last-project-id:v1");
    if (navigation && navigation.type === "reload" && lastProjectId) {
      location.replace("/workspace?project=" + encodeURIComponent(lastProjectId));
    }
  }
} catch {}
`;

export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: resumeScript }} />
      {children}
      <WorkspaceEnhancements />
    </>
  );
}
