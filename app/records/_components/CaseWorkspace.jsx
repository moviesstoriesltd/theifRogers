"use client";

/* ==========================================================================
   CASE WORKSPACE — the in-theme detail page shell for one court record.
   • Lazy-loads the heavy section body only when a case is opened (next/dynamic
     with ssr:false → real client chunk + skeleton). The chunk caches after the
     first open, so subsequent records render instantly.
   • Renders header, reliability/disclaimer banner, sticky table of contents.
   • No external links, no raw JSON, no agent logs are ever shown.
   ========================================================================== */

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { Icon, Card, Badge, Ref, cx, fmtDate, SkeletonBlock } from "./ui";
import { SECTION_SPEC, TIERS, getSectionContentMap } from "../records.data";

// Static tone → class lookups (Tailwind can't build interpolated class names).
const TIER_ICON_BG = { green: "bg-emerald-50", blue: "bg-blue-50", slate: "bg-slate-100" };
const TIER_ICON_FG = { green: "text-emerald-600", blue: "text-blue-600", slate: "text-slate-500" };

// Loading fallback: skeletons + a "compiling" progress cue while the chunk loads.
const SectionsLoading = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
        <Icon name="faHourglassHalf" className="animate-pulse text-sm text-blue-600" />
      </span>
      <div>
        <p className="text-sm font-semibold text-slate-700">Compiling case record…</p>
        <p className="text-xs text-slate-400">Assembling sourced sections for this record.</p>
      </div>
    </div>
    <SkeletonBlock />
    <SkeletonBlock />
    <SkeletonBlock />
  </div>
);

// Lazy body — deep sections load on open, then stay cached for the session.
const CaseSections = dynamic(() => import("./CaseSections"), {
  ssr: false,
  loading: SectionsLoading,
});

export default function CaseWorkspace({ caseData }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const tier = TIERS[caseData.tier] || TIERS.metadata;

  // Only list sections that actually render — keep the TOC in sync with the body.
  const contentMap = getSectionContentMap(caseData);
  const visibleSections = SECTION_SPEC.filter((s) => contentMap[s.key]);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="relative min-h-screen bg-slate-100 text-slate-900">
      {/* Reading-progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400"
      />

      {/* Ambient background — same recipe as report/about */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 8% 4%, rgba(59,130,246,0.10), transparent 34%)," +
            "radial-gradient(circle at 92% 12%, rgba(14,165,233,0.08), transparent 36%)," +
            "linear-gradient(180deg, #f1f5f9, #e9eef5)",
        }}
      />

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        {/* Back link */}
        <Link
          href="/records"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-slate-500 transition-colors hover:text-blue-700"
        >
          <Icon name="faArrowLeft" className="text-[11px]" />
          All court records
        </Link>

        {/* ============================ HEADER ============================ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b1f3f] via-[#12315c] to-[#0a1830] p-6 shadow-2xl sm:p-9"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(circle at 12% 15%, rgba(59,130,246,0.35), transparent 42%)," +
                "radial-gradient(circle at 88% 85%, rgba(233,193,118,0.18), transparent 45%)",
            }}
          />
          <div className="relative">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-white/10 px-2 py-1 font-mono text-[12px] font-semibold text-[#e9c176] ring-1 ring-white/15">
                {caseData.caseNumber}
              </span>
              <Badge tone={tier.tone} dot>{tier.label}</Badge>
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-slate-200 ring-1 ring-white/15">
                {caseData.caseType}
              </span>
            </div>

            <h1
              className="max-w-4xl text-2xl font-semibold leading-tight tracking-tight text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-eb-garamond), serif" }}
            >
              {caseData.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2">
                <Icon name="faLandmark" className="text-[12px] text-slate-400" />
                {caseData.jurisdiction}
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon name="faScroll" className="text-[12px] text-slate-400" />
                Filed {fmtDate(caseData.filed)}
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon name="faUserTag" className="text-[12px] text-slate-400" />
                Rogers: {caseData.rogersRole}
              </span>
            </div>
          </div>
        </motion.section>

        {/* ==================== RELIABILITY / DISCLAIMER ==================== */}
        <Card className="p-5">
          <div className="flex items-start gap-3">
            <span className={cx("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", TIER_ICON_BG[tier.tone])}>
              <Icon name="faShieldHalved" className={cx("text-sm", TIER_ICON_FG[tier.tone])} />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-800">Reliability: {tier.label}</p>
              <p className="mt-0.5 text-[13px] leading-relaxed text-slate-500">
                {tier.blurb} Any allegations shown are drawn from filings and are not adjudicated facts.
                Fields without a verified source are marked pending, never fabricated.
              </p>
              {caseData.reviewFlag && (
                <p className="mt-2 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-[13px] leading-relaxed text-amber-800 ring-1 ring-amber-200">
                  <Icon name="faTriangleExclamation" className="mt-0.5 shrink-0 text-[12px]" />
                  {caseData.reviewFlag}
                </p>
              )}
              {caseData.disposition && (
                <p className="mt-2 flex items-start gap-2 rounded-lg bg-slate-50 p-3 text-[13px] leading-relaxed text-slate-600 ring-1 ring-slate-200">
                  <Icon name="faGavel" className="mt-0.5 shrink-0 text-[12px] text-slate-400" />
                  <span><span className="font-semibold text-slate-700">Disposition / status:</span> {caseData.disposition}</span>
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* ===================== LAYOUT: TOC + BODY ===================== */}
        <div className="flex gap-8">
          <aside className="hidden w-52 shrink-0 xl:block">
            <nav className="sticky top-28">
              <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Sections
              </p>
              <ul className="space-y-0.5">
                {visibleSections.map((s) => (
                  <li key={s.key}>
                    <a
                      href={`#${s.key.toLowerCase()}`}
                      onClick={scrollTo(s.key.toLowerCase())}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium text-slate-500 transition-colors hover:bg-blue-500/10 hover:text-blue-700"
                    >
                      <Icon name={s.icon} className="w-3.5 shrink-0 text-[11px] text-slate-400" />
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="min-w-0 flex-1">
            <CaseSections caseData={caseData} />
          </div>
        </div>
      </div>
    </main>
  );
}
