// Single source of truth for the site's absolute URL + identity.
// Priority: explicit env → Vercel production URL → placeholder.
// ⚠️ Set NEXT_PUBLIC_SITE_URL to your real domain (e.g. https://thiefrogersmd.com)
//    so canonical URLs, the sitemap, robots.txt and OG tags are correct.
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : null;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  fromVercel ||
  "https://example.com"
).replace(/\/$/, "");

export const SITE_NAME = "Thief Rogers MD";

export const SITE_DESCRIPTION =
  "A neutral documentary archive summarizing the investigative report on Dr. Leif L. Rogers, MD — licensing discipline, court filings, pending proceedings, and related public-record references.";
