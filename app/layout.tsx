import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./marketing-theme.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://skycode-ai-workspace.skymarketing737.chatgpt.site",
  ),
  title: {
    default: "SkyCode: AI App Builder & Online Code Editor",
    template: "%s | SkyCode",
  },
  description:
    "Build web apps and websites with AI, edit every file in your browser, preview changes safely, and export code you can keep.",
  applicationName: "SkyCode",
  authors: [{ name: "SkyCode" }],
  creator: "SkyCode",
  publisher: "SkyCode",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    siteName: "SkyCode",
    locale: "en_US",
    type: "website",
    title: "SkyCode: AI App Builder & Online Code Editor",
    description:
      "Build apps and websites with AI, inspect every generated file, and preview browser projects in one secure workspace.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkyCode: AI App Builder & Online Code Editor",
    description:
      "Build apps and websites with AI, edit the source, and preview changes in your browser.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SkyCode",
  },
  other: {
    "codex-preview": "development",
  },
};

const baseUrl = "https://skycode-ai-workspace.skymarketing737.chatgpt.site";
const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "SkyCode",
      url: baseUrl,
      logo: `${baseUrl}/favicon.svg`,
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      name: "SkyCode",
      alternateName: "SkyCode AI Workspace",
      url: baseUrl,
      publisher: { "@id": `${baseUrl}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData) }}
        />
      </body>
    </html>
  );
}
