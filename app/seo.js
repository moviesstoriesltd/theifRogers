import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_PUBLISHER,
  SITE_ROUTES,
  SITE_SHORT_NAME,
  SITE_URL,
} from "./site";

export const absoluteUrl = (path = "/") => {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "/" : normalized}`;
};

// Vector logo, used only for the Organization/ImageObject JSON-LD node.
// Social share previews use the generated raster image from
// app/opengraph-image.js (SVG does not render as an OG/Twitter card image).
export const LOGO_IMAGE = {
  url: absoluteUrl("/logo.svg"),
  width: 512,
  height: 512,
  alt: SITE_NAME,
};

export const buildMetadata = ({
  title,
  description,
  path = "/",
  type = "website",
  keywords = [],
  publishedTime,
  modifiedTime,
} = {}) => {
  const resolvedTitle = title || SITE_ROUTES.home.title;
  const resolvedDescription = description || SITE_DESCRIPTION;
  const url = absoluteUrl(path);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: [...new Set([...SITE_KEYWORDS, ...keywords])],
    authors: [{ name: SITE_PUBLISHER, url: SITE_URL }],
    creator: SITE_PUBLISHER,
    publisher: SITE_PUBLISHER,
    alternates: { canonical: path },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      title: resolvedTitle,
      description: resolvedDescription,
      locale: "en_US",
      // images supplied by the app/opengraph-image.js file convention
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      // image supplied by the app/opengraph-image.js file convention
    },
  };
};

export const organizationSchema = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_PUBLISHER,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    url: LOGO_IMAGE.url,
    width: LOGO_IMAGE.width,
    height: LOGO_IMAGE.height,
    caption: SITE_NAME,
  },
  sameAs: [],
};

export const personSchema = {
  "@type": "Person",
  "@id": `${SITE_URL}/#leif-rogers`,
  name: "Leif L. Rogers, MD",
  alternateName: ["Leif Liu Rogers", "Leif Rogers", "Dr. Leif Rogers"],
  jobTitle: "Physician",
  description:
    "Subject of a documentary public-records archive covering court filings, regulator records, and source-linked research references.",
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  alternateName: SITE_SHORT_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: "en-US",
  publisher: { "@id": organizationSchema["@id"] },
  about: { "@id": personSchema["@id"] },
};

export const breadcrumbSchema = (items) => ({
  "@type": "BreadcrumbList",
  "@id": `${absoluteUrl(items.at(-1)?.path || "/")}#breadcrumb`,
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const webPageSchema = ({
  path,
  name,
  description,
  type = "WebPage",
  dateModified = "2026-07-15",
  primaryImage,
}) => ({
  "@type": type,
  "@id": `${absoluteUrl(path)}#webpage`,
  url: absoluteUrl(path),
  name,
  headline: name,
  description,
  inLanguage: "en-US",
  isPartOf: { "@id": websiteSchema["@id"] },
  about: { "@id": personSchema["@id"] },
  publisher: { "@id": organizationSchema["@id"] },
  dateModified,
  breadcrumb: { "@id": `${absoluteUrl(path)}#breadcrumb` },
  ...(primaryImage ? { primaryImageOfPage: primaryImage } : {}),
  mainEntity: { "@id": `${absoluteUrl(path)}#main-entity` },
  potentialAction: {
    "@type": "ReadAction",
    target: [absoluteUrl(path)],
  },
});

export const reportSchema = {
  "@type": "Report",
  "@id": `${absoluteUrl(SITE_ROUTES.report.path)}#main-entity`,
  url: absoluteUrl(SITE_ROUTES.report.path),
  name: SITE_ROUTES.report.title,
  headline: SITE_ROUTES.report.title,
  description: SITE_ROUTES.report.description,
  inLanguage: "en-US",
  datePublished: "2026-07-13",
  dateModified: "2026-07-15",
  author: { "@id": organizationSchema["@id"] },
  publisher: { "@id": organizationSchema["@id"] },
  about: { "@id": personSchema["@id"] },
  keywords: [
    "litigation due diligence",
    "asset due diligence",
    "court records",
    "medical board history",
    "public records",
  ],
};

export const profileDatasetSchema = {
  "@type": "Dataset",
  "@id": `${absoluteUrl(SITE_ROUTES.about.path)}#main-entity`,
  name: "Leif Rogers MD Public-Record Profile Dataset",
  description:
    "Locally rendered public-record profile dataset used by the OSINT dashboard for addresses, phones, emails, aliases, associates, property, and security exposure.",
  inLanguage: "en-US",
  creator: { "@id": organizationSchema["@id"] },
  publisher: { "@id": organizationSchema["@id"] },
  about: { "@id": personSchema["@id"] },
  isAccessibleForFree: true,
  dateModified: "2026-07-15",
  distribution: {
    "@type": "DataDownload",
    name: "Leif_L_Rogers.json",
    encodingFormat: "application/json",
  },
};

export const graph = (...nodes) => ({
  "@context": "https://schema.org",
  "@graph": nodes.filter(Boolean),
});
