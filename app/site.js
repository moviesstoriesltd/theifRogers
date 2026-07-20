// Single source of truth for the site's absolute URL and identity.
// Priority: explicit env -> Vercel production URL -> placeholder.
// Set NEXT_PUBLIC_SITE_URL to your real domain so canonical URLs,
// sitemap entries, robots.txt, Open Graph tags, and JSON-LD are correct.
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : null;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  fromVercel ||
  "https://example.com"
).replace(/\/$/, "");

export const SITE_NAME = "Leif Rogers MD Public Records Archive";

export const SITE_SHORT_NAME = "Leif Rogers Public Records";

export const SITE_PUBLISHER = "Public Records Archive";

export const SITE_DESCRIPTION =
  "Public-records archive for Dr. Leif L. Rogers, MD: litigation reports, medical board history, court filings, and source-linked references.";

export const SITE_KEYWORDS = [
  "Leif Rogers MD public records",
  "Dr. Leif Rogers",
  "Leif L. Rogers",
  "Leif Liu Rogers",
  "Leif Rogers litigation report",
  "Leif Rogers medical board",
  "Leif Rogers lawsuit",
  "Leif Rogers court records",
  "public records archive",
  "medical board discipline",
  "court filings",
  "OSINT dashboard",
  "asset due diligence",
  "litigation due diligence",
];

export const SITE_ROUTES = {
  home: {
    path: "/",
    title: "Leif Rogers MD Public Records Archive",
    description: SITE_DESCRIPTION,
  },
  report: {
    path: "/report",
    title: "Leif Rogers MD Litigation & Asset Due Diligence Report",
    description:
      "Litigation, lien, property, medical board, and court-record due-diligence report for Dr. Leif L. Rogers, MD, with source references and reliability notes.",
  },
  records: {
    path: "/records",
    title: "Leif Rogers MD Court Records Index",
    description:
      "Structured index of court records associated with Dr. Leif L. Rogers, MD, reproduced from the public case index, with per-case detail pages and reliability tiers.",
  },
  about: {
    path: "/about",
    title: "Leif Rogers MD OSINT Profile & Public-Record Dashboard",
    description:
      "Searchable OSINT profile dashboard for Dr. Leif L. Rogers, MD: addresses, phones, emails, aliases, relatives, associates, property, and security exposure.",
  },
};
