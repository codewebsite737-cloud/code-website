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

const baseUrl = "https://code-website.codewebsite737.workers.dev";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "SkyCode: AI Website Builder & Online Code Editor",
    template: "%s | SkyCode",
  },
  description:
    "Build websites and web apps, edit sections visually or in code, autosave private projects, preview safely, and export source you can keep.",
  applicationName: "SkyCode",
  authors: [{ name: "SkyCode", url: baseUrl }],
  creator: "SkyCode",
  publisher: "SkyCode",
  category: "technology",
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    siteName: "SkyCode",
    locale: "en_US",
    type: "website",
    title: "SkyCode: AI Website Builder & Online Code Editor",
    description:
      "Generate complete browser projects, edit every section or file, autosave your work, and export the source.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkyCode: AI Website Builder & Online Code Editor",
    description:
      "Build, edit, autosave, preview, undo, redo, and export real browser projects.",
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
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    "codex-preview": "development",
  },
};

const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "SkyCode",
      url: baseUrl,
      logo: `${baseUrl}/favicon.svg`,
      description:
        "SkyCode develops a browser workspace for building and editing websites and web applications.",
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      name: "SkyCode",
      alternateName: "SkyCode AI Website Builder",
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
