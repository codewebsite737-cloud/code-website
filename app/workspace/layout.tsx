import type { Metadata } from "next";
import "./workspace.css";
import "./code-view-visibility.css";

export const metadata: Metadata = {
  title: "Workspace",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
