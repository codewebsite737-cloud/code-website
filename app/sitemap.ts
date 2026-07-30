import type { MetadataRoute } from "next";

const baseUrl = "https://skycode-ai-workspace.skymarketing737.chatgpt.site";
const lastModified = new Date("2026-07-30T00:00:00+03:00");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/ai-app-builder`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/ai-website-builder`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/online-code-editor`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/features`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/security`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/docs`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/guides`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/status`, lastModified, changeFrequency: "daily", priority: 0.65 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/cookies`, lastModified, changeFrequency: "yearly", priority: 0.25 },
    { url: `${baseUrl}/acceptable-use`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    {
      url: `${baseUrl}/guides/build-web-app-with-ai`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
