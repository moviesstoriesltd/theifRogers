import { SITE_NAME } from "../site";

export const metadata = {
  title: "Litigation & Asset Due Diligence Report — Leif L. Rogers, MD",
  description:
    "Litigation, financing, liens and property due-diligence report on Leif Liu Rogers, M.D. — confirmed court matters, California Medical Board discipline, commercial-finance filings, and the lead-by-lead investigation matrix.",
  alternates: { canonical: "/report" },
  openGraph: {
    type: "article",
    url: "/report",
    siteName: SITE_NAME,
    title: "Litigation & Asset Due Diligence Report — Leif L. Rogers, MD",
    description:
      "Confirmed court matters, regulator decisions, commercial-finance filings and outstanding investigative leads, with reliability ratings and full source index.",
  },
};

export default function ReportLayout({ children }) {
  return children;
}
