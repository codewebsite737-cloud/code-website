export const dynamic = "force-static";

import type { MetadataRoute } from "next";

const baseUrl = "https://code-website.codewebsite737.workers.dev";

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
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
