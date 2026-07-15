import { SITE_ROUTES } from "../site";
import {
  breadcrumbSchema,
  buildMetadata,
  graph,
  reportSchema,
  webPageSchema,
} from "../seo";

export const metadata = buildMetadata({
  title: SITE_ROUTES.report.title,
  description: SITE_ROUTES.report.description,
  path: SITE_ROUTES.report.path,
  type: "article",
  keywords: [
    "Leif Rogers asset due diligence",
    "Leif Rogers court filings",
    "Leif Rogers litigation matrix",
    "California Medical Board Leif Rogers",
    "public records report",
  ],
  publishedTime: "2026-07-13",
  modifiedTime: "2026-07-15",
});

const reportJsonLd = graph(
  webPageSchema({
    path: SITE_ROUTES.report.path,
    name: SITE_ROUTES.report.title,
    description: SITE_ROUTES.report.description,
    type: "Article",
  }),
  reportSchema,
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Litigation Report", path: SITE_ROUTES.report.path },
  ])
);

export default function ReportLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reportJsonLd) }}
      />
      {children}
    </>
  );
}
