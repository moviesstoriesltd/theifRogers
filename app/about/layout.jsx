import { SITE_ROUTES } from "../site";
import {
  breadcrumbSchema,
  buildMetadata,
  graph,
  profileDatasetSchema,
  webPageSchema,
} from "../seo";

export const metadata = buildMetadata({
  title: SITE_ROUTES.about.title,
  description: SITE_ROUTES.about.description,
  path: SITE_ROUTES.about.path,
  type: "website",
  keywords: [
    "Leif Rogers OSINT profile",
    "Leif Rogers public-record dashboard",
    "Leif Rogers addresses",
    "Leif Rogers aliases",
    "public-record profile dataset",
  ],
  modifiedTime: "2026-07-15",
});

const aboutJsonLd = graph(
  webPageSchema({
    path: SITE_ROUTES.about.path,
    name: SITE_ROUTES.about.title,
    description: SITE_ROUTES.about.description,
    type: "ProfilePage",
  }),
  profileDatasetSchema,
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "OSINT Profile Dashboard", path: SITE_ROUTES.about.path },
  ])
);

export default function AboutLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      {children}
    </>
  );
}
