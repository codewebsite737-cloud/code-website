import type { Metadata } from "next";
import { chatGPTSignOutPath, getChatGPTUser } from "../chatgpt-auth";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects Dashboard",
  description: "Create, open, manage, and continue your SkyCode projects.",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const user = await getChatGPTUser();
  return (
    <DashboardClient
      authenticated={Boolean(user)}
      displayName={user?.displayName ?? "Guest"}
      signOutPath={user ? chatGPTSignOutPath("/") : null}
    />
  );
}
