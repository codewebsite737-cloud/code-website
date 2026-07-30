import type { Metadata } from "next";
import "./workspace.css";

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
