export const dynamic = "force-static";

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SkyCode AI Website Builder",
    short_name: "SkyCode",
    description:
      "Build, edit, autosave, preview, and export websites and web apps in your browser.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f3ec",
    theme_color: "#ff5a24",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
