import { SITE_NAME, SITE_SHORT_NAME, SITE_DESCRIPTION } from "./site";

// PWA / web app manifest. Improves mobile add-to-home-screen, theming, and is
// one of the technical-SEO checklist items (media & icons).
export default function manifest() {
  return {
    name: SITE_NAME,
    short_name: SITE_SHORT_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#010f20",
    theme_color: "#010f20",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
