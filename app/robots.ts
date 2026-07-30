import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/workspace",
        "/dashboard",
        "/signin-with-chatgpt",
        "/signout-with-chatgpt",
        "/callback",
      ],
    },
    sitemap: "https://skycode-ai-workspace.skymarketing737.chatgpt.site/sitemap.xml",
    host: "https://skycode-ai-workspace.skymarketing737.chatgpt.site",
  };
}
