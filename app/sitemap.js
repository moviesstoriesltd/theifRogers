import { SITE_ROUTES, SITE_URL } from "./site";

const lastModified = new Date("2026-07-15T00:00:00.000Z");

const routes = [
  {
    ...SITE_ROUTES.home,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    ...SITE_ROUTES.report,
    changeFrequency: "weekly",
    priority: 0.95,
  },
  {
    ...SITE_ROUTES.about,
    changeFrequency: "monthly",
    priority: 0.85,
  },
];

export default function sitemap() {
  return routes.map((route) => ({
    url: `${SITE_URL}${route.path === "/" ? "/" : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
