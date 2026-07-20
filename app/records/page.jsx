import NavBar from "../../src/components/common/navbar/NavBar";
import Footer from "../../src/components/common/footer/Footer";
import RecordsIndex from "./_components/RecordsIndex";
import { getAllCases, getRecordStats } from "./records.data";
import { SITE_ROUTES } from "../site";
import {
  breadcrumbSchema,
  buildMetadata,
  graph,
  webPageSchema,
} from "../seo";

export const metadata = buildMetadata({
  title: SITE_ROUTES.records.title,
  description: SITE_ROUTES.records.description,
  path: SITE_ROUTES.records.path,
  type: "website",
  keywords: [
    "Leif Rogers court records",
    "Leif Rogers case index",
    "Leif Rogers lawsuits list",
    "Leif L. Rogers docket",
  ],
});

// Only ship the fields the index actually needs to the client bundle.
const toIndexCard = (c) => ({
  slug: c.slug,
  title: c.title,
  shortTitle: c.shortTitle,
  caseNumber: c.caseNumber,
  jurisdiction: c.jurisdiction,
  courtSystem: c.courtSystem,
  caseType: c.caseType,
  filed: c.filed,
  tier: c.tier,
  rogersRole: c.rogersRole,
  entities: c.entities || [],
  parties: (c.parties || []).map((p) => ({ name: p.name })),
});

const indexJsonLd = graph(
  webPageSchema({
    path: SITE_ROUTES.records.path,
    name: SITE_ROUTES.records.title,
    description: SITE_ROUTES.records.description,
    type: "CollectionPage",
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Court Records", path: SITE_ROUTES.records.path },
  ])
);

export default function RecordsPage() {
  const cases = getAllCases().map(toIndexCard);
  const stats = getRecordStats();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(indexJsonLd) }}
      />
      <div data-theme="light" className="relative min-h-screen bg-slate-100">
        <NavBar />
        <RecordsIndex cases={cases} stats={stats} />
        <div className="bg-[#010f20] pt-16 md:pt-20">
          <Footer />
        </div>
      </div>
    </>
  );
}
