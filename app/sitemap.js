import { SITE_ROUTES, SITE_URL } from "./site";
import { getCaseSlugs } from "./records/records.data";

const lastModified = new Date("2026-07-21T00:00:00.000Z");

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
    ...SITE_ROUTES.records,
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    ...SITE_ROUTES.about,
    changeFrequency: "monthly",
    priority: 0.85,
  },
];

// One entry per court-record detail page.
const caseRoutes = getCaseSlugs().map((slug) => ({
  path: `${SITE_ROUTES.records.path}/${slug}`,
  changeFrequency: "monthly",
  priority: 0.7,
}));

export default function sitemap() {
  return [...routes, ...caseRoutes].map((route) => ({
    url: `${SITE_URL}${route.path === "/" ? "/" : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
