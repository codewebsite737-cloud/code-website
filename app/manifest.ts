import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SkyCode AI Workspace",
    short_name: "SkyCode",
    description: "Build, edit, preview, and ship software with AI.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f3ed",
    theme_color: "#ff4f1f",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
