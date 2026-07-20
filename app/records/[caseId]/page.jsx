import { notFound } from "next/navigation";
import NavBar from "../../../src/components/common/navbar/NavBar";
import Footer from "../../../src/components/common/footer/Footer";
import CaseWorkspace from "../_components/CaseWorkspace";
import { getCaseBySlug, getCaseSlugs } from "../records.data";
import { SITE_ROUTES } from "../../site";
import { buildMetadata, breadcrumbSchema, graph, webPageSchema } from "../../seo";

// Pre-render every record at build time.
export function generateStaticParams() {
  return getCaseSlugs().map((caseId) => ({ caseId }));
}

export async function generateMetadata({ params }) {
  const { caseId } = await params;
  const c = getCaseBySlug(caseId);
  if (!c) {
    return buildMetadata({
      title: "Record not found",
      description: "The requested court record could not be found.",
      path: `${SITE_ROUTES.records.path}/${caseId}`,
    });
  }
  const description =
    c.overview ||
    `${c.caseType} — ${c.jurisdiction}. Case ${c.caseNumber}, filed ${c.filed}. Structured public court-record detail for Leif L. Rogers, MD.`;
  return buildMetadata({
    title: `${c.shortTitle} — ${c.caseNumber}`,
    description,
    path: `${SITE_ROUTES.records.path}/${c.slug}`,
    type: "article",
    keywords: [c.caseNumber, c.shortTitle, "Leif Rogers court record", c.jurisdiction],
  });
}

export default async function CaseRecordPage({ params }) {
  const { caseId } = await params;
  const caseData = getCaseBySlug(caseId);
  if (!caseData) notFound();

  const path = `${SITE_ROUTES.records.path}/${caseData.slug}`;
  const jsonLd = graph(
    webPageSchema({
      path,
      name: `${caseData.shortTitle} — ${caseData.caseNumber}`,
      description: caseData.overview || caseData.title,
      type: "Article",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Court Records", path: SITE_ROUTES.records.path },
      { name: caseData.shortTitle, path },
    ])
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div data-theme="light" className="relative">
        <div className="print:hidden">
          <NavBar />
        </div>
        <CaseWorkspace caseData={caseData} />
        <div className="bg-[#010f20] pt-16 md:pt-20">
          <Footer />
        </div>
      </div>
    </>
  );
}
