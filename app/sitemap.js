import { SITE_URL } from "./site";

// Generates /sitemap.xml. Add new routes here as the site grows.
export default function sitemap() {
  const lastModified = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/report`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
