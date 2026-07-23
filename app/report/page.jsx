"use client";

import { useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation, faScaleBalanced, faGavel, faFileLines, faListCheck,
  faTableList, faUserTag, faHouse, faSackDollar, faFolderOpen, faShieldHalved,
  faLink, faArrowUpRightFromSquare, faPrint, faDownload, faCopy, faCircleCheck,
  faChevronDown, faLandmark, faBuilding, faMagnifyingGlass, faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

import NavBar from "../../src/components/common/navbar/NavBar";
import Footer from "../../src/components/common/footer/Footer";

/* ==========================================================================
   ICONS + SHARED PRIMITIVES
   Mirrors app/about/_components/ui.jsx so the two pages feel like one system.
   ========================================================================== */

const ICONS = {
  faTriangleExclamation, faScaleBalanced, faGavel, faFileLines, faListCheck,
  faTableList, faUserTag, faHouse, faSackDollar, faFolderOpen, faShieldHalved,
  faLink, faArrowUpRightFromSquare, faPrint, faDownload, faCopy, faCircleCheck,
  faChevronDown, faLandmark, faBuilding, faMagnifyingGlass, faCircleInfo,
};

const Icon = ({ name, className }) =>
  ICONS[name] ? <FontAwesomeIcon icon={ICONS[name]} className={className} /> : null;

const cx = (...c) => c.filter(Boolean).join(" ");

const TONES = {
  blue: "bg-blue-50 text-blue-700 ring-blue-200",
  slate: "bg-slate-100 text-slate-600 ring-slate-200",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  yellow: "bg-amber-50 text-amber-700 ring-amber-200",
  orange: "bg-orange-50 text-orange-700 ring-orange-200",
  red: "bg-red-50 text-red-700 ring-red-200",
};

const Badge = ({ tone = "slate", children, className, dot = false }) => (
  <span
    className={cx(
      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1",
      TONES[tone] || TONES.slate,
      className
    )}
  >
    {dot && (
      <span
        className={cx(
          "h-1.5 w-1.5 rounded-full",
          { blue: "bg-blue-500", green: "bg-emerald-500", yellow: "bg-amber-500",
            orange: "bg-orange-500", red: "bg-red-500", slate: "bg-slate-400" }[tone]
        )}
      />
    )}
    {children}
  </span>
);

const Card = ({ className, children, hover = false, ...rest }) => (
  <div
    className={cx(
      "rounded-2xl border border-white/60 bg-white/80 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.18)] backdrop-blur-xl",
      hover &&
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgba(37,99,235,0.35)]",
      "print:border-slate-300 print:bg-white print:shadow-none print:backdrop-blur-none",
      className
    )}
    {...rest}
  >
    {children}
  </div>
);

// Section wrapper: gives every section a scroll anchor + consistent heading.
const Section = ({ id, num, icon, title, subtitle, children }) => (
  <section id={id} className="scroll-mt-28 print:break-inside-avoid">
    <div className="mb-5 flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 print:bg-slate-100">
        <Icon name={icon} className="text-sm" />
      </span>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          {num && (
            <span className="rounded-md bg-slate-900 px-1.5 py-0.5 text-[11px] font-bold text-white print:bg-slate-700">
              {num}
            </span>
          )}
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{title}</h2>
        </div>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
    </div>
    {children}
  </section>
);

// Highlights a case number / court name inline, per the "special handling" spec.
const Ref = ({ children }) => (
  <span className="rounded-md bg-blue-50 px-1.5 py-0.5 font-mono text-[0.9em] font-semibold text-blue-800 ring-1 ring-blue-200 print:bg-slate-100 print:text-slate-900">
    {children}
  </span>
);

const SourceLink = ({ href, children, className }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cx(
      "group inline-flex items-center gap-2 font-semibold text-blue-700 underline-offset-4 transition-colors hover:text-blue-900 hover:underline",
      className
    )}
  >
    {children}
    <Icon
      name="faArrowUpRightFromSquare"
      className="text-[10px] opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    />
  </a>
);

/* ==========================================================================
   REPORT DATA — transcribed verbatim from
   Leif_Rogers_Litigation_Asset_Due_Diligence_Report.docx (research date 13 July 2026)
   ========================================================================== */

const META = [
  {
    label: "Subject",
    value:
      "Leif Liu Rogers, M.D.; Leif L. Rogers, MD, Professional Corporation; identified affiliated entities",
  },
  { label: "Research date", value: "13 July 2026" },
  {
    label: "Geographic focus",
    value: "Los Angeles County, California; related out-of-state commercial-finance filings",
  },
  {
    label: "Scope",
    value: "Civil cases, commercial equipment finance, real-property disputes, liens and asset leads",
  },
];

const MATTERS = [
  {
    id: "2.1",
    title: "Gary Chamberlain and Leif Rogers v. Eran Gurion; Gurion Cross-Complaint",
    caseNo: "EC065373",
    court: "Los Angeles Superior Court, North Central District (Burbank)",
    status: "A",
    tone: "green",
    statusLabel: "A — Verified pleading reviewed",
    accent: "from-emerald-500 to-teal-400",
    intro:
      "Filed in Los Angeles Superior Court, North Central District (Burbank). The cross-complaint was filed 14 June 2016. It identifies Rogers, his professional corporation, Robin Chamberlain, Gary Chamberlain, LRMD Holdings LLC and several real-estate parties as cross-defendants.",
    claims:
      "The verified cross-complaint alleged breach of partnership agreement, partition and sale of real property, conversion of partnership assets, intentional interference with prospective economic relations, breach of fiduciary duty, constructive fraud, quiet title, civil conspiracy and declaratory relief. It alleged that Gurion and Rogers were partners in real-estate investments and alleged that a 18 March 2016 refinance generated $3.2 million that was diverted without authorization. The pleading sought, among other relief, an accounting, constructive trust, sale of partnership properties and a 50/50 division of proceeds.",
    disposition:
      "No final judgment, dismissal, settlement or appellate disposition was located in the sources reviewed. The allegations must not be presented as adjudicated facts. Obtain the official Register of Actions and all disposition documents.",
    sourceLabel: "Primary pleading",
    href: "https://www.lawsuitpressrelease.com/wp-content/uploads/2016/08/Summons-Cross-Complaint-Svc-Pkg.pdf",
  },
  {
    id: "2.2",
    title:
      "Navitas Credit Corp. v. Leif L. Rogers, MD, Professional Corporation; Leif Rogers individually",
    caseNo: null,
    court: "Louisiana summons language indexed (jurisdiction to be confirmed)",
    status: "B",
    tone: "blue",
    statusLabel: "B — Docket/index confirmation",
    accent: "from-blue-500 to-cyan-400",
    intro:
      "A public docket entry identifies Navitas Credit Corp. as plaintiff and Leif L. Rogers, MD, Professional Corporation and Leif Rogers individually as defendants. The indexed entry states that a civil summons was issued on 15 January 2021 and uses Louisiana summons language, suggesting the filing may have been pursued in Louisiana or involved Louisiana service.",
    claims:
      "Likely commercial equipment-finance or guaranty enforcement, but the contract amount, financed equipment, causes of action and alleged default cannot be responsibly stated without the petition and docket.",
    disposition:
      "Outcome not established from the accessible entry. Obtain the petition, contract/guaranty, service returns, any default judgment, satisfaction and appellate history.",
    sourceLabel: "Docket index",
    href: "https://trellis.law/doc/88840846/personal-individual-summons-status-set-to-civil-summons-issued-on-01-15-2021-for-rogers-leif",
  },
  {
    id: "2.3",
    title: "Leif L. Rogers, MD, Professional Corporation v. Right Choice Construction, et al.",
    caseNo: "20STCV37907",
    court: "Los Angeles County — Department 58",
    status: "B",
    tone: "blue",
    statusLabel: "B — Docket/ruling confirmation",
    accent: "from-blue-500 to-indigo-400",
    intro:
      "Los Angeles County case 20STCV37907 is publicly indexed as an action by Leif L. Rogers, MD, Professional Corporation against Right Choice Construction and others. A tentative ruling is indexed for 4 January 2024 in Department 58.",
    claims:
      "Based on the parties, the dispute appears construction-related. The specific contract, property, defects, damages and counterclaims were not available in the accessible result.",
    disposition:
      "Final disposition was not verified. Obtain the complaint, operative cross-complaints, the 4 January 2024 minute order and final judgment/dismissal.",
    sourceLabel: "Case/ruling index",
    href: "https://trellis.law/ruling/20stcv37907/leif-l-rogers-md-professional-corporation-vs-right-choice-construction-et-al/20240104949638",
  },
  {
    id: "2.4",
    title: "Danielle Von Lutzow v. Leif L. Rogers, MD, Professional Corporation, et al.",
    caseNo: "26STCV11299",
    court: "Los Angeles County — general employment/labor",
    status: "B",
    tone: "blue",
    statusLabel: "B — Docket/index confirmation",
    accent: "from-sky-500 to-blue-400",
    intro:
      "A public case index states that Danielle Von Lutzow filed a general employment/labor case in Los Angeles County on 8 April 2026 against Leif L. Rogers, MD, Professional Corporation and additional defendant(s).",
    claims:
      "The precise employment causes of action, alleged events and damages are not visible in the accessible index.",
    disposition:
      "Pending or recent as of the research date; no disposition was verified. Obtain the complaint, answer, case management filings and any arbitration petition.",
    sourceLabel: "Case index",
    href: "https://trellis.law/case/26stcv11299/danielle-von-lutzow-vs-leif-l-rogers-md-professional-corporation-et-al",
  },
  {
    id: "2.5",
    title: "California Medical Board Decision",
    caseNo: "License A86603",
    court: "Medical Board of California",
    status: "A",
    tone: "green",
    statusLabel: "A — Official regulator decision identified",
    accent: "from-emerald-500 to-green-400",
    intro:
      "An official California Medical Board decision dated 18 August 2021 concerns Leif Liu Rogers, M.D., license A86603. The decision states that the license was revoked, the revocation was stayed, and the physician was placed on probation for five years.",
    claims:
      "The exact factual findings, admitted conduct, probation terms and any subsequent modification or completion must be taken from the full order and current license profile.",
    disposition:
      "Historical order verified; current status was not established in this report. Check the live BreEZe license record and all later disciplinary documents.",
    sourceLabel: "Official decision",
    href: "https://www2.mbc.ca.gov/BreezePDL/document.aspx?did=AAAJD210818210449649.DID&path=%5CDIDOCS%5C20210818%5CDMRAAAJD2%5C",
  },
  {
    id: "2.6",
    title: "GoodSkin Medspa / Abramov Litigation Mention",
    caseNo: null,
    court: "Secondary reporting — The Independent",
    status: "C",
    tone: "orange",
    statusLabel: "C — Reputable secondary report with explicit correction/update",
    accent: "from-orange-500 to-amber-400",
    intro:
      "The Independent reported on a lawsuit by a former GoodSkin employee. The article originally discussed Dr. Rogers in the surrounding narrative.",
    claims:
      "The report described allegations made by the plaintiff against GoodSkin. Importantly, the article was later updated to state that the case settled in November 2024 before trial, that Dr. Rogers was not a defendant, and that there was no official court ruling against him for misconduct.",
    disposition:
      "Settled before trial according to the publication. This matter should not be represented as a judgment against Dr. Rogers.",
    sourceLabel: "Updated article",
    href: "https://www.independent.co.uk/news/world/americas/instagram-plastic-surgery-goodskin-leif-rogers-malpractice-b2613008.html",
  },
];

const LEADS = [
  {
    lead: "LF 120 vs. Leif Rogers",
    finding:
      "Could refer to a case prefix, creditor abbreviation, lease account or shorthand. No reliable exact match located.",
    verify:
      "Obtain spelling, county, year or case number; search LA Superior Court party index and nationwide dockets.",
  },
  {
    lead: "Butker v. Rogers",
    finding:
      "No reliable exact match located; possible misspelling of Butcher, Butler, Bucker or another surname.",
    verify: "Run wildcard party-name searches and review source document containing the name.",
  },
  {
    lead: "Pawnee Leasing",
    finding: "No conclusive public match to Rogers located.",
    verify:
      "Search Colorado and California courts, UCC filings, guarantor names and professional corporation variations.",
  },
  {
    lead: "Partners Capital",
    finding: "Ambiguous lender name; no conclusive case located.",
    verify:
      "Identify full legal name (e.g., Partners Capital Group) and search UCC/California civil dockets.",
  },
  {
    lead: "American Express v. Robin",
    finding:
      "Likely a consumer/business card collection matter involving Robin Chamberlain, but not verified.",
    verify:
      "Search Robin Chamberlain and all address/name variants in LA Superior Court and arbitration/judgment records.",
  },
  {
    lead: "First Lease",
    finding: "Ambiguous company name; no conclusive match located.",
    verify:
      "Determine whether FirstLease, First American Equipment Finance, First Financial or another lessor.",
  },
  {
    lead: "NHP-PNB Pasadena LLC",
    finding:
      "Potential property-owning/financing entity; not verified as Rogers-controlled from sources reviewed.",
    verify:
      "California Secretary of State statement history, Statement of Information, deed/grantor-grantee index and UCC search.",
  },
  {
    lead: "Bank of the West loan in default",
    finding: "No verified case or notice of default located in open web results.",
    verify:
      "Search successor BMO records, deeds of trust, notices of default, trustee-sale notices and civil complaints.",
  },
  {
    lead: "Great American / GreatAmerica",
    finding:
      "Could refer to GreatAmerica Financial Services or Great American Insurance; no match verified.",
    verify: "Identify exact entity and search contract, UCC and guaranty litigation.",
  },
  {
    lead: "Foamberg v. Rogers",
    finding:
      "No reliable exact match located; surname may be Feinberg, Fromberg or another variant.",
    verify: "Wildcard court search and source-document review.",
  },
  {
    lead: "North Mill Equipment Finance",
    finding: "No conclusive match located in accessible results.",
    verify:
      "Search Connecticut/New York/California courts, UCC filings and personal guaranty claims.",
  },
  {
    lead: "11458 Laurel Crest lien",
    finding: "Address lead not verified through an official recorder index.",
    verify:
      "LA County Registrar-Recorder grantor/grantee, property legal description, APN, liens, deeds of trust and releases.",
  },
  {
    lead: "David Page",
    finding: "Identity and connection unclear.",
    verify:
      "Determine role — lender, broker, attorney, trustee, seller, buyer or witness — and cross-reference case/property records.",
  },
  {
    lead: "Crater Camp Road home purchase; $8.5M; date shorthand '7/6/26' or '76/26'",
    finding: "No verified deed or purchase details established.",
    verify:
      "Clarify exact address and date; obtain grant deed, transfer tax, deed of trust, buyer vesting and entity records.",
  },
  {
    lead: "333 S. Arroyo Parkway purchase in March/April",
    finding:
      "The address is publicly identified as Rogers' Pasadena practice location, but purchase/ownership was not verified.",
    verify: "Search APN, grant deed, deed of trust, ownership entity, transfer tax and lease records.",
  },
  {
    lead: "EDD and Los Angeles County liens",
    finding: "No subject-specific lien confirmed in accessible public sources.",
    verify:
      "Order California EDD lien search, LA County recorder index, state tax lien, federal tax lien and judgment-lien searches.",
  },
];

const NAME_VARIANTS = [
  {
    group: "Individual",
    icon: "faUserTag",
    tone: "blue",
    items: [
      "Leif Liu Rogers",
      "Leif L. Rogers",
      "Leif Rogers",
      "Leif Rogers, M.D.",
      "Dr. Leif Rogers",
    ],
  },
  {
    group: "Professional corporation",
    icon: "faBuilding",
    tone: "green",
    items: [
      "Leif L. Rogers, MD, Professional Corporation",
      "Leif L. Rogers MD PC",
      "Rogers Medical Corporation",
    ],
  },
  {
    group: "Affiliated entities & DBAs",
    icon: "faLandmark",
    tone: "orange",
    items: ["LRMD Holdings, LLC", "LRMD", "Blush Beverly Hills", "Related practice DBAs"],
  },
  {
    group: "Possible joint borrowers / guarantors",
    icon: "faUserTag",
    tone: "yellow",
    items: ["Robin Chamberlain", "Gary Chamberlain"],
  },
  {
    group: "Addresses",
    icon: "faHouse",
    tone: "slate",
    items: ["Current and former practice addresses in Beverly Hills and Pasadena"],
  },
];

const PROPERTY_WORKPLAN = [
  "Identify the assessor parcel number (APN) and full legal description.",
  "Pull every grant deed, quitclaim deed, deed of trust, assignment, substitution of trustee, notice of default, notice of trustee sale, reconveyance, abstract of judgment and tax lien.",
  "Build a chronological title chain showing grantor, grantee, recording date, instrument number, stated consideration/transfer tax and lender.",
  "Compare transfers with filing dates in civil cases and financing disputes; do not infer fraudulent transfer without evidence and legal analysis.",
  "Search federal PACER bankruptcy records for the individual, professional corporation and affiliated LLCs.",
];

const FINANCE_DOCS = [
  "Lease or finance agreement",
  "Equipment schedule",
  "Delivery/acceptance certificate",
  "Personal guaranty",
  "UCC-1",
  "Amendments",
  "Payment history",
  "Acceleration notice",
  "Complaint",
  "Judgment",
  "Satisfaction",
];

const EVIDENCE_REQUESTS = [
  "Certified docket sheets and all operative complaints/cross-complaints for every confirmed case.",
  "Final judgments, dismissals, settlement notices, satisfactions of judgment and appellate records.",
  "California Secretary of State entity histories and UCC debtor searches.",
  "Los Angeles County recorder grantor/grantee searches and certified instrument copies.",
  "Current California Medical Board license profile and post-2021 disciplinary/compliance documents.",
  "Credit agreements, equipment schedules, guaranties and default notices for each named lender.",
];

const SOURCES = [
  {
    label: "Gurion cross-complaint, Case EC065373",
    href: "https://www.lawsuitpressrelease.com/wp-content/uploads/2016/08/Summons-Cross-Complaint-Svc-Pkg.pdf",
    host: "lawsuitpressrelease.com",
  },
  {
    label: "Navitas docket entry",
    href: "https://trellis.law/doc/88840846/personal-individual-summons-status-set-to-civil-summons-issued-on-01-15-2021-for-rogers-leif",
    host: "trellis.law",
  },
  {
    label: "Right Choice Construction case/ruling index",
    href: "https://trellis.law/ruling/20stcv37907/leif-l-rogers-md-professional-corporation-vs-right-choice-construction-et-al/20240104949638",
    host: "trellis.law",
  },
  {
    label: "Von Lutzow employment case index",
    href: "https://trellis.law/case/26stcv11299/danielle-von-lutzow-vs-leif-l-rogers-md-professional-corporation-et-al",
    host: "trellis.law",
  },
  {
    label: "California Medical Board decision",
    href: "https://www2.mbc.ca.gov/BreezePDL/document.aspx?did=AAAJD210818210449649.DID&path=%5CDIDOCS%5C20210818%5CDMRAAAJD2%5C",
    host: "mbc.ca.gov",
  },
  {
    label: "Independent article with settlement/party-status update",
    href: "https://www.independent.co.uk/news/world/americas/instagram-plastic-surgery-goodskin-leif-rogers-malpractice-b2613008.html",
    host: "independent.co.uk",
  },
  {
    label: "Practice website/address reference",
    href: "https://www.leifrogersmd.com/",
    host: "leifrogersmd.com",
  },
];

// Table of contents — drives the sticky sidebar + smooth-scroll anchors.
const TOC = [
  { id: "summary", num: "1", label: "Executive Summary" },
  { id: "matters", num: "2", label: "Confirmed Matters" },
  { id: "leads", num: "3", label: "Lead-by-Lead Matrix" },
  { id: "variants", num: "4", label: "Entity & Name Variants" },
  { id: "property", num: "5", label: "Property & Lien Workplan" },
  { id: "finance", num: "6", label: "Commercial-Finance Workplan" },
  { id: "evidence", num: "7", label: "Evidence Requests" },
  { id: "sources", num: "8", label: "Source Index" },
];

/* ==========================================================================
   PAGE
   ========================================================================== */

export default function ReportPage() {
  // Confirmed-matter cards: 3.1 is expanded by default, the rest collapsed.
  const [open, setOpen] = useState(() => ({ "2.1": true }));
  const [toast, setToast] = useState("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const toggle = (id) => setOpen((prev) => ({ ...prev, [id]: !prev[id] }));

  const notify = (msg) => {
    setToast(msg);
    window.clearTimeout(notify._t);
    notify._t = window.setTimeout(() => setToast(""), 2200);
  };

  const copy = async (text, what = "Copied to clipboard") => {
    try {
      await navigator.clipboard.writeText(text);
      notify(what);
    } catch {
      /* clipboard blocked — fail quietly */
    }
  };

  // Anchor navigation without a hash jump, so the sticky header never overlaps.
  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="relative min-h-screen bg-slate-100 text-slate-900 print:bg-white">
      {/* Reading-progress bar (hidden when printing) */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 print:hidden"
      />

      <div className="print:hidden">
        <NavBar />
      </div>

      {/* Ambient background — same recipe as the About dashboard */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 print:hidden"
        style={{
          background:
            "radial-gradient(circle at 8% 4%, rgba(59,130,246,0.10), transparent 34%)," +
            "radial-gradient(circle at 92% 12%, rgba(14,165,233,0.08), transparent 36%)," +
            "linear-gradient(180deg, #f1f5f9, #e9eef5)",
        }}
      />

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-6 print:max-w-none print:px-0">
        {/* ============================ HERO ============================ */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b1f3f] via-[#12315c] to-[#0a1830] p-6 shadow-2xl sm:p-10 print:rounded-none print:bg-white print:shadow-none"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70 print:hidden"
            style={{
              background:
                "radial-gradient(circle at 12% 15%, rgba(59,130,246,0.35), transparent 42%)," +
                "radial-gradient(circle at 88% 85%, rgba(233,193,118,0.18), transparent 45%)",
            }}
          />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1
                className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl print:text-slate-900"
                style={{ fontFamily: "var(--font-eb-garamond), serif" }}
              >
                Litigation &amp; Asset Due Diligence Report
              </h1>
              <p className="mt-3 text-base text-slate-300 sm:text-lg print:text-slate-600">
                Leif Liu Rogers, M.D.
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Detailed review of identified cases and investigative leads — litigation, financing,
                liens and property.
              </p>
            </div>

            {/* Document actions */}
            <div className="flex flex-wrap gap-2 print:hidden">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                <Icon name="faPrint" className="text-[11px]" /> Print
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                <Icon name="faDownload" className="text-[11px]" /> Download PDF
              </button>
              <button
                type="button"
                onClick={() => copy(window.location.href, "Report link copied")}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#e9c176] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-[#412d00] shadow-lg shadow-[#e9c176]/20 transition-all hover:brightness-110"
              >
                <Icon name="faCopy" className="text-[11px]" /> Copy Link
              </button>
            </div>
          </div>
        </motion.section>

        {/* ==================== REPORT HEADER CARD ==================== */}
        <Card className="overflow-hidden print:break-inside-avoid">
          <div className="grid gap-px bg-slate-200/70 sm:grid-cols-2">
            {META.map((row) => (
              <div key={row.label} className="bg-white/90 p-5 print:bg-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  {row.label}
                </p>
                <p className="mt-1.5 text-sm font-medium leading-relaxed text-slate-800">
                  {row.value}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* ===================== LAYOUT: TOC + BODY ===================== */}
        <div className="flex gap-8">
          {/* Sticky table of contents (desktop only) */}
          <aside className="hidden w-56 shrink-0 xl:block print:hidden">
            <nav className="sticky top-28">
              <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Contents
              </p>
              <ul className="space-y-0.5">
                {TOC.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={scrollTo(item.id)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium text-slate-500 transition-colors hover:bg-blue-500/10 hover:text-blue-700"
                    >
                      <span className="w-4 shrink-0 text-right font-mono text-[11px] text-slate-400">
                        {item.num}
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Report body */}
          <div className="min-w-0 flex-1 space-y-12">
            {/* ==================== 1. EXECUTIVE SUMMARY ==================== */}
            <Section
              id="summary"
              num="1"
              icon="faFileLines"
              title="Executive Summary"
              subtitle="Key findings across confirmed matters and outstanding leads"
            >
              <Card className="space-y-4 p-6 sm:p-7">
                <p className="text-[15px] leading-relaxed text-slate-700">
                  Publicly accessible records confirm multiple matters involving Dr. Leif L. Rogers
                  and/or his professional corporation. The most significant verified civil record
                  reviewed is Los Angeles Superior Court case <Ref>EC065373</Ref>, where Rogers and
                  Gary Chamberlain were plaintiffs against Eran Gurion and Gurion filed a verified
                  cross-complaint concerning an alleged real-estate partnership. The cross-complaint
                  asserted <strong>nine causes of action</strong> and alleged an unauthorized{" "}
                  <strong>$3.2 million cash-out refinance</strong>. These are allegations in a
                  pleading; this review did not locate the final judgment or settlement terms.
                </p>

                <p className="text-[15px] leading-relaxed text-slate-700">
                  A separate commercial-finance action,{" "}
                  <em>
                    Navitas Credit Corp. v. Leif L. Rogers, MD, Professional Corporation, et al.
                  </em>
                  , is confirmed through a public docket entry showing a civil summons issued on{" "}
                  <strong>15 January 2021</strong>. Public search results also identify a construction
                  dispute filed by the professional corporation against Right Choice Construction, and
                  an employment action filed on <strong>8 April 2026</strong>. A California Medical
                  Board decision dated <strong>18 August 2021</strong> imposed a stayed revocation and
                  five years of probation; the complete decision should be read before drawing
                  conclusions about the underlying conduct or present license status.
                </p>

                <p className="text-[15px] leading-relaxed text-slate-700">
                  Other names supplied — Pawnee Leasing, Partners Capital, First Lease, GreatAmerica,
                  North Mill, Bank of the West, American Express, Butker, Foamberg, David Page, LF 120,
                  EDD/Los Angeles County liens, 11458 Laurel Crest, Crater Camp Road and the 333 South
                  Arroyo Parkway acquisition — were <strong>not conclusively matched</strong> to a
                  primary-source case or recorded instrument in the freely accessible sources reviewed.
                  They remain high-priority search leads.
                </p>

                {/* At-a-glance counts */}
                {/* <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-5 sm:grid-cols-4">
                  {[
                    { value: "6", label: "Confirmed matters", tone: "text-blue-600" },
                    { value: "2", label: "Primary records (A)", tone: "text-emerald-600" },
                    { value: "16", label: "Unverified leads (D)", tone: "text-red-600" },
                    { value: "7", label: "Cited sources", tone: "text-slate-700" },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className={cx("text-2xl font-bold sm:text-3xl", s.tone)}>{s.value}</p>
                      <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div> */}
              </Card>
            </Section>

            {/* ==================== 2. CONFIRMED MATTERS ==================== */}
            <Section
              id="matters"
              num="2"
              icon="faGavel"
              title="Confirmed Matters"
              subtitle="Six matters confirmed against a primary record, docket index or reputable secondary report"
            >
              <div className="space-y-4">
                {MATTERS.map((m, i) => {
                  const isOpen = !!open[m.id];
                  return (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: i * 0.04 }}
                    >
                      <Card hover className="overflow-hidden print:break-inside-avoid">
                        {/* Accent stripe — a different gradient per matter */}
                        <div className={cx("h-1 w-full bg-gradient-to-r", m.accent)} />

                        {/* Header — click to expand/collapse */}
                        <button
                          type="button"
                          onClick={() => toggle(m.id)}
                          aria-expanded={isOpen}
                          className="flex w-full cursor-pointer items-start justify-between gap-4 p-5 text-left sm:p-6"
                        >
                          <div className="min-w-0">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <span className="rounded-md bg-slate-900 px-1.5 py-0.5 font-mono text-[11px] font-bold text-white">
                                {m.id}
                              </span>
                              <Badge tone={m.tone} dot>
                                {m.statusLabel}
                              </Badge>
                              {m.caseNo && <Ref>{m.caseNo}</Ref>}
                            </div>
                            <h3 className="text-base font-bold leading-snug text-slate-900 sm:text-lg">
                              {m.title}
                            </h3>
                            <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                              <Icon name="faLandmark" className="text-[10px] text-slate-400" />
                              {m.court}
                            </p>
                          </div>
                          <span
                            className={cx(
                              "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-transform duration-300 print:hidden",
                              isOpen && "rotate-180 bg-blue-500/10 text-blue-600"
                            )}
                          >
                            <Icon name="faChevronDown" className="text-xs" />
                          </span>
                        </button>

                        {/* Body */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden print:!h-auto print:!opacity-100"
                            >
                              <div className="space-y-5 border-t border-slate-100 px-5 py-5 sm:px-6">
                                <p className="text-sm leading-relaxed text-slate-600">{m.intro}</p>

                                <div>
                                  <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-blue-600">
                                    Claims / Allegations
                                  </p>
                                  <p className="rounded-xl bg-blue-50/60 p-4 text-sm leading-relaxed text-slate-700 ring-1 ring-blue-100">
                                    {m.claims}
                                  </p>
                                </div>

                                <div>
                                  <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                                    Disposition / Current Status
                                  </p>
                                  <p className="rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 ring-1 ring-slate-200">
                                    {m.disposition}
                                  </p>
                                </div>

                                <a
                                  href={m.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/30"
                                >
                                  <Icon name="faLink" className="text-[11px]" />
                                  {m.sourceLabel}
                                  <Icon name="faArrowUpRightFromSquare" className="text-[10px] opacity-70" />
                                </a>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </Section>

            {/* ================ 3. LEAD-BY-LEAD MATRIX ================ */}
            <Section
              id="leads"
              num="3"
              icon="faTableList"
              title="Lead-by-Lead Investigation Matrix"
              subtitle="Every supplied lead, its current finding, and the verification still required"
            >
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[680px] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80">
                        {["Lead supplied", "Current finding", "Required verification"].map((h) => (
                          <th
                            key={h}
                            className="px-5 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {LEADS.map((l) => (
                        <tr key={l.lead} className="transition-colors hover:bg-blue-50/40">
                          <td className="px-5 py-4 align-top text-sm font-semibold text-slate-800">
                            {l.lead}
                          </td>
                          <td className="max-w-xs px-5 py-4 align-top text-sm leading-relaxed text-slate-600">
                            {l.finding}
                          </td>
                          <td className="max-w-xs px-5 py-4 align-top text-sm leading-relaxed text-slate-600">
                            {l.verify}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
              <p className="mt-3 flex items-center gap-2 text-xs text-slate-400 xl:hidden">
                <Icon name="faCircleInfo" className="text-[10px]" />
                Scroll the table horizontally to see all columns.
              </p>
            </Section>

            {/* ================ 4. ENTITY AND NAME VARIANTS ================ */}
            <Section
              id="variants"
              num="4"
              icon="faUserTag"
              title="Entity and Name Variants for Searches"
              subtitle="Run every index search against all of the following variants"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {NAME_VARIANTS.map((g) => (
                  <Card key={g.group} hover className="p-5 print:break-inside-avoid">
                    <div className="mb-3.5 flex items-center gap-2.5">
                      <span
                        className={cx(
                          "flex h-8 w-8 items-center justify-center rounded-lg",
                          {
                            blue: "bg-blue-500/10 text-blue-600",
                            green: "bg-emerald-500/10 text-emerald-600",
                            orange: "bg-orange-500/10 text-orange-600",
                            yellow: "bg-amber-500/10 text-amber-600",
                            slate: "bg-slate-500/10 text-slate-600",
                          }[g.tone]
                        )}
                      >
                        <Icon name={g.icon} className="text-xs" />
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">{g.group}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {g.items.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => copy(item, `"${item}" copied`)}
                          title="Click to copy"
                          className={cx(
                            "cursor-pointer rounded-full px-3 py-1.5 text-[13px] font-medium ring-1 transition-all hover:-translate-y-0.5",
                            TONES[g.tone]
                          )}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </Section>

            {/* ============== 5. PROPERTY AND LIEN WORKPLAN ============== */}
            <Section
              id="property"
              num="5"
              icon="faHouse"
              title="Property and Lien Workplan"
              subtitle="Search by both person/entity and legal description for every target property"
            >
              <Card className="p-6 sm:p-7">
                <p className="mb-6 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-600 ring-1 ring-slate-200">
                  For each target property, search by <strong>both</strong> person/entity{" "}
                  <strong>and</strong> legal description. County indexes frequently omit unit
                  punctuation or use vesting entities rather than the operating practice name.
                </p>

                <ol className="space-y-4">
                  {PROPERTY_WORKPLAN.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow-sm">
                        {i + 1}
                      </span>
                      <p className="pt-0.5 text-sm leading-relaxed text-slate-700">{step}</p>
                    </li>
                  ))}
                </ol>
              </Card>
            </Section>

            {/* ============= 6. COMMERCIAL-FINANCE WORKPLAN ============= */}
            <Section
              id="finance"
              num="6"
              icon="faSackDollar"
              title="Commercial-Finance Workplan"
              subtitle="Equipment finance, guaranties and the documents that resolve them"
            >
              <Card className="space-y-5 p-6 sm:p-7">
                <p className="text-sm leading-relaxed text-slate-700">
                  The lender names suggest <strong>medical-equipment or business-equipment financing</strong>.
                  The key documents are listed below.
                </p>

                <div className="flex flex-wrap gap-2">
                  {FINANCE_DOCS.map((doc) => (
                    <span
                      key={doc}
                      className="rounded-lg bg-blue-50 px-3 py-1.5 text-[13px] font-medium text-blue-800 ring-1 ring-blue-200"
                    >
                      {doc}
                    </span>
                  ))}
                </div>

                <div className="rounded-xl border-l-4 border-blue-500 bg-blue-50/60 p-4">
                  <p className="text-sm leading-relaxed text-slate-700">
                    Search jurisdictions where the lender is headquartered, where the borrower is
                    located, where equipment was delivered and any contractually selected forum.{" "}
                    <strong>
                      Search Leif Rogers individually — many equipment transactions include a personal
                      guaranty even when the professional corporation is the borrower.
                    </strong>
                  </p>
                </div>
              </Card>
            </Section>

            {/* ==================== 7. EVIDENCE REQUESTS ==================== */}
            <Section
              id="evidence"
              num="7"
              icon="faFolderOpen"
              title="Evidence Requests"
              subtitle="Documents to obtain before any finding in this report is relied upon"
            >
              <Card className="p-6 sm:p-7">
                <ul className="space-y-3.5">
                  {EVIDENCE_REQUESTS.map((req) => (
                    <li key={req} className="flex gap-3">
                      <Icon
                        name="faCircleCheck"
                        className="mt-0.5 shrink-0 text-sm text-blue-500"
                      />
                      <p className="text-sm leading-relaxed text-slate-700">{req}</p>
                    </li>
                  ))}
                </ul>
              </Card>
            </Section>

            {/* ======================= 8. SOURCE INDEX ======================= */}
            <Section
              id="sources"
              num="8"
              icon="faLink"
              title="Source Index"
              subtitle="Every source cited in this report — opens in a new tab"
            >
              <Card className="divide-y divide-slate-100 overflow-hidden">
                {SOURCES.map((s, i) => (
                  <div
                    key={s.href}
                    className="flex flex-col gap-2 p-5 transition-colors hover:bg-blue-50/40 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 font-mono text-[11px] font-bold text-slate-500">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800">{s.label}</p>
                        <p className="truncate text-xs text-slate-400">{s.host}</p>
                      </div>
                    </div>
                    <SourceLink href={s.href} className="shrink-0 text-xs uppercase tracking-[0.1em]">
                      Open source
                    </SourceLink>
                  </div>
                ))}
              </Card>
            </Section>
          </div>
        </div>
      </div>

      {/* ========================== FOOTER ========================== */}
      <div className="mt-14 border-t border-slate-200 bg-white/60 py-10 backdrop-blur print:mt-8 print:bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-center">
          <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
            <Icon name="faScaleBalanced" className="text-blue-500" />
            End of Report
          </p>
        </div>
      </div>

      <div className="bg-[#010f20] pt-16 md:pt-20 print:hidden">
        <Footer />
      </div>

      {/* ===================== COPY TOAST ===================== */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-2xl print:hidden"
          >
            <Icon name="faCircleCheck" className="mr-2 text-emerald-400" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
