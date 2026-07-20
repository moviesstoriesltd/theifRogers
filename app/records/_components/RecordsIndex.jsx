"use client";

/* ==========================================================================
   /records INDEX — searchable, filterable directory of all 19 court records.
   App-like UX; every card routes internally to /records/[slug]. No external
   links, no raw JSON, no agent logs are ever surfaced to the user.
   ========================================================================== */

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icon, Card, Badge, Ref, cx, fmtDate } from "./ui";
import { TIERS } from "../records.data";

const TIER_ORDER = ["verified", "indexed", "metadata"];

const StatTile = ({ value, label, tone = "text-blue-600" }) => (
  <div className="text-center">
    <p className={cx("text-2xl font-bold sm:text-3xl", tone)}>{value}</p>
    <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">
      {label}
    </p>
  </div>
);

export default function RecordsIndex({ cases, stats }) {
  const [query, setQuery] = useState("");
  const [system, setSystem] = useState("all");
  const [tier, setTier] = useState("all");

  const systems = useMemo(
    () => ["all", ...Array.from(new Set(cases.map((c) => c.courtSystem)))],
    [cases]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cases.filter((c) => {
      if (system !== "all" && c.courtSystem !== system) return false;
      if (tier !== "all" && c.tier !== tier) return false;
      if (!q) return true;
      const hay = [
        c.title, c.caseNumber, c.jurisdiction, c.caseType, c.rogersRole,
        ...(c.parties || []).map((p) => p.name),
        ...(c.entities || []),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [cases, query, system, tier]);

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      {/* ============================ HERO ============================ */}
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
          <h1
            className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-eb-garamond), serif" }}
          >
            Case Records &amp; Legal Proceedings
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
            A structured index of court records associated with Leif L. Rogers, MD, reproduced
            from the public case index. Each record opens an in-theme detail page. Fields without a
            verified source are marked as such — never fabricated.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-4">
            <StatTile value={stats.total} label="Court records" tone="text-white" />
            <StatTile value={stats.tiers.verified || 0} label="Primary-source verified" tone="text-emerald-300" />
            <StatTile value={stats.jurisdictions} label="Jurisdictions" tone="text-sky-300" />
            <StatTile
              value={`${(stats.earliest || "").slice(0, 4)}–${(stats.latest || "").slice(0, 4)}`}
              label="Filing span"
              tone="text-[#e9c176]"
            />
          </div>
        </div>
      </motion.section>

      {/* ============================ CONTROLS ============================ */}
      <div className="space-y-4">
        <div className="relative">
          <Icon
            name="faMagnifyingGlass"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by case name, number, party, or jurisdiction…"
            className="w-full rounded-xl border border-slate-200 bg-white/80 py-3.5 pl-11 pr-4 text-sm text-slate-800 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            aria-label="Search court records"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Court-system filter */}
          {systems.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSystem(s)}
              className={cx(
                "cursor-pointer rounded-full px-3 py-1.5 text-[12px] font-semibold ring-1 transition-all",
                system === s
                  ? "bg-slate-900 text-white ring-slate-900"
                  : "bg-white text-slate-600 ring-slate-200 hover:ring-slate-300"
              )}
            >
              {s === "all" ? "All courts" : s}
            </button>
          ))}
          <span className="mx-1 h-4 w-px bg-slate-200" />
          {/* Reliability filter */}
          <button
            type="button"
            onClick={() => setTier("all")}
            className={cx(
              "cursor-pointer rounded-full px-3 py-1.5 text-[12px] font-semibold ring-1 transition-all",
              tier === "all"
                ? "bg-slate-900 text-white ring-slate-900"
                : "bg-white text-slate-600 ring-slate-200 hover:ring-slate-300"
            )}
          >
            All tiers
          </button>
          {TIER_ORDER.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTier(t)}
              className={cx(
                "cursor-pointer rounded-full px-3 py-1.5 text-[12px] font-semibold ring-1 transition-all",
                tier === t
                  ? "bg-slate-900 text-white ring-slate-900"
                  : cx("bg-white hover:ring-slate-300", TONES_TEXT[TIERS[t].tone])
              )}
            >
              {TIERS[t].label}
            </button>
          ))}
        </div>

        <p className="text-xs text-slate-400">
          Showing <span className="font-semibold text-slate-600">{filtered.length}</span> of{" "}
          {cases.length} records
        </p>
      </div>

      {/* ============================ GRID ============================ */}
      {filtered.length === 0 ? (
        <Card className="p-10 text-center">
          <Icon name="faMagnifyingGlass" className="text-2xl text-slate-300" />
          <p className="mt-3 text-sm font-semibold text-slate-600">No records match your search.</p>
          <p className="mt-1 text-xs text-slate-400">Try a different name, case number, or clear the filters.</p>
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {filtered.map((c, i) => {
            const tierMeta = TIERS[c.tier];
            return (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(i, 8) * 0.03 }}
              >
                <Link href={`/records/${c.slug}`} className="group block h-full">
                  <Card hover className="flex h-full flex-col p-5 sm:p-6">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <Badge tone={tierMeta.tone} dot>
                        {tierMeta.label}
                      </Badge>
                      <span className="text-[11px] font-medium text-slate-400">
                        {fmtDate(c.filed)}
                      </span>
                    </div>

                    <h2 className="text-[15px] font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-700 sm:text-base">
                      {c.shortTitle}
                    </h2>
                    <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-slate-500">
                      {c.title}
                    </p>

                    <div className="mt-3 flex items-center gap-1.5 text-[12px] text-slate-500">
                      <Icon name="faLandmark" className="text-[10px] text-slate-400" />
                      {c.jurisdiction}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
                      <Ref>{c.caseNumber}</Ref>
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                        {c.caseType}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                        Rogers: {c.rogersRole}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                        Open record
                        <Icon name="faArrowUpRightFromSquare" className="text-[9px]" />
                      </span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Text colour per tone, for the outlined (inactive) reliability chips.
const TONES_TEXT = {
  green: "text-emerald-700 ring-emerald-200",
  blue: "text-blue-700 ring-blue-200",
  slate: "text-slate-600 ring-slate-200",
};
