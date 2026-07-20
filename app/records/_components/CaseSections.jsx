"use client";

/* ==========================================================================
   CASE SECTIONS — the structured body of a record page.
   Loaded lazily (see CaseWorkspace) so "deep research" is only assembled when
   a user actually opens a case. Every section renders sourced content OR an
   explicit empty state — nothing is invented. Citations surface as in-theme
   popovers; no outbound links or raw URLs are ever shown.
   ========================================================================== */

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Icon, Card, Badge, Ref, cx, fmtDate, EmptyState } from "./ui";
import { SECTION_SPEC, TIERS, getRelatedCases } from "../records.data";

/* ---------- collapsible section shell ---------- */
const SectionBlock = ({ id, icon, title, hasContent, count, open, onToggle, children }) => (
  <section id={id} className="scroll-mt-28">
    <Card className="overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <span
            className={cx(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
              hasContent ? "bg-blue-600/10 text-blue-600" : "bg-slate-100 text-slate-400"
            )}
          >
            <Icon name={icon} className="text-sm" />
          </span>
          <h2 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">{title}</h2>
          {typeof count === "number" && count > 0 && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
              {count}
            </span>
          )}
          {!hasContent && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Pending
            </span>
          )}
        </div>
        <span
          className={cx(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-transform duration-300",
            open && "rotate-180 bg-blue-500/10 text-blue-600"
          )}
        >
          <Icon name="faChevronDown" className="text-xs" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 p-5 sm:p-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  </section>
);

/* ---------- individual list / prose renderers ---------- */
const ProseList = ({ items }) =>
  !items || items.length === 0 ? (
    <EmptyState />
  ) : (
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <Icon name="faCircleCheck" className="mt-0.5 shrink-0 text-sm text-blue-500" />
          <p className="text-sm leading-relaxed text-slate-700">{it}</p>
        </li>
      ))}
    </ul>
  );

/* ---------- citation popover ---------- */
const CitationChip = ({ citation, index }) => {
  const [open, setOpen] = useState(false);
  const tier = TIERS[citation.reliability] || TIERS.metadata;
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white/70 p-4 text-left transition-colors hover:border-blue-300 hover:bg-blue-50/40"
      >
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 font-mono text-[11px] font-bold text-slate-500">
            {index + 1}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800">{citation.filing}</p>
            <p className="mt-0.5 text-xs text-slate-500">
              {citation.court} · {fmtDate(citation.date)}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Badge tone={tier.tone}>{tier.label}</Badge>
          <Icon
            name="faCircleInfo"
            className={cx("text-sm transition-colors", open ? "text-blue-600" : "text-slate-400")}
          />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="relative z-10 mt-2 rounded-xl border border-blue-100 bg-blue-50/70 p-4 ring-1 ring-blue-100"
          >
            <div className="mb-2 flex flex-wrap items-center gap-2 text-[12px]">
              {citation.docket && <Ref>{citation.docket}</Ref>}
              <span className="text-slate-500">{tier.blurb}</span>
            </div>
            <p className="text-[13px] leading-relaxed text-slate-700">{citation.note}</p>
            <p className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
              <Icon name="faShieldHalved" className="text-[10px]" />
              Source held on file for provenance. This platform does not redirect to external sites.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ========================================================================== */
export default function CaseSections({ caseData }) {
  const related = useMemo(() => getRelatedCases(caseData.slug), [caseData.slug]);
  const [timelineQuery, setTimelineQuery] = useState("");

  // Which sections have real content? Drives default open/closed + "Pending".
  const contentMap = useMemo(() => {
    const c = caseData;
    return {
      overview: !!(c.overview || c.executiveSummary),
      executiveSummary: !!(c.executiveSummary || c.overview),
      metadata: true,
      parties: (c.parties || []).length > 0,
      attorneys: (c.attorneys || []).length > 0,
      court: true,
      timeline: (c.timeline || []).length > 0,
      claims: (c.claims || []).length > 0,
      defenses: (c.defenses || []).length > 0,
      motions: (c.motions || []).length > 0,
      orders: (c.orders || []).length > 0,
      evidence: (c.evidence || []).length > 0,
      quotes: (c.quotes || []).length > 0,
      keyFindings: (c.keyFindings || []).length > 0,
      relatedCases: related.length > 0,
      citations: (c.citations || []).length > 0,
    };
  }, [caseData, related]);

  const [open, setOpen] = useState(() => ({ ...contentMap }));
  const toggle = (k) => setOpen((p) => ({ ...p, [k]: !p[k] }));

  const filteredTimeline = useMemo(() => {
    const q = timelineQuery.trim().toLowerCase();
    const items = [...(caseData.timeline || [])].sort((a, b) => a.date.localeCompare(b.date));
    if (!q) return items;
    return items.filter((e) => `${e.date} ${e.text}`.toLowerCase().includes(q));
  }, [caseData.timeline, timelineQuery]);

  return (
    <div className="space-y-4">
      {SECTION_SPEC.map((spec) => {
        const id = spec.key.toLowerCase();
        const hasContent = contentMap[spec.key];
        const isOpen = !!open[spec.key];
        const commonProps = {
          id, icon: spec.icon, title: spec.title, hasContent,
          open: isOpen, onToggle: () => toggle(spec.key),
        };

        // -------- render per kind --------
        if (spec.kind === "prose") {
          const text = caseData[spec.key] || (spec.fallbackKey ? caseData[spec.fallbackKey] : null);
          return (
            <SectionBlock key={spec.key} {...commonProps}>
              {text ? (
                <p className="text-sm leading-relaxed text-slate-700">{text}</p>
              ) : (
                <EmptyState />
              )}
            </SectionBlock>
          );
        }

        if (spec.kind === "metadata") {
          const rows = [
            ["Case number", caseData.caseNumber],
            ["Jurisdiction", caseData.jurisdiction],
            ["Court system", caseData.courtSystem],
            ["Case type", caseData.caseType],
            ["Date filed", fmtDate(caseData.filed)],
            ["Role of Rogers", caseData.rogersRole],
          ];
          return (
            <SectionBlock key={spec.key} {...commonProps}>
              <dl className="grid gap-px overflow-hidden rounded-xl bg-slate-200/70 sm:grid-cols-2">
                {rows.map(([k, v]) => (
                  <div key={k} className="bg-white/90 p-4">
                    <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">{k}</dt>
                    <dd className="mt-1 text-sm font-medium text-slate-800">{v || "—"}</dd>
                  </div>
                ))}
              </dl>
            </SectionBlock>
          );
        }

        if (spec.kind === "parties") {
          const parties = caseData.parties || [];
          return (
            <SectionBlock key={spec.key} {...commonProps} count={parties.length}>
              {parties.length === 0 ? (
                <EmptyState />
              ) : (
                <ul className="space-y-3">
                  {parties.map((p, i) => (
                    <li key={i} className="flex items-start justify-between gap-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800">{p.name}</p>
                        <p className="mt-0.5 text-xs text-slate-500">{p.role}</p>
                      </div>
                      {p.represented !== null && (
                        <Badge tone={p.represented ? "blue" : "slate"}>
                          {p.represented ? "Represented" : "Unrepresented"}
                        </Badge>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </SectionBlock>
          );
        }

        if (spec.kind === "court") {
          return (
            <SectionBlock key={spec.key} {...commonProps}>
              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <Icon name="faLandmark" className="mt-0.5 text-sm text-slate-400" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{caseData.jurisdiction}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{caseData.courtSystem} court system</p>
                  </div>
                </div>
                <div>
                  <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    Presiding judge
                  </p>
                  {caseData.judge ? (
                    <p className="text-sm text-slate-700">{caseData.judge}</p>
                  ) : (
                    <EmptyState label="Judge not yet identified" note="The assigned judicial officer has not been sourced from the docket." />
                  )}
                </div>
              </div>
            </SectionBlock>
          );
        }

        if (spec.kind === "timeline") {
          const total = (caseData.timeline || []).length;
          return (
            <SectionBlock key={spec.key} {...commonProps} count={total}>
              {total === 0 ? (
                <EmptyState label="No docket entries sourced" note="Timeline events are drawn from the docket. None have been reviewed for this case yet." />
              ) : (
                <>
                  <div className="relative mb-5">
                    <Icon name="faMagnifyingGlass" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
                    <input
                      type="search"
                      value={timelineQuery}
                      onChange={(e) => setTimelineQuery(e.target.value)}
                      placeholder="Search the timeline…"
                      className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-[13px] text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      aria-label="Search timeline"
                    />
                  </div>
                  {filteredTimeline.length === 0 ? (
                    <p className="text-xs text-slate-400">No timeline entries match “{timelineQuery}”.</p>
                  ) : (
                    <ol className="relative space-y-5 border-l border-slate-200 pl-6">
                      {filteredTimeline.map((e, i) => (
                        <li key={i} className="relative">
                          <span className="absolute -left-[26px] top-1 flex h-3 w-3 items-center justify-center">
                            <span className="h-2.5 w-2.5 rounded-full bg-blue-500 ring-4 ring-blue-100" />
                          </span>
                          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-blue-600">
                            {fmtDate(e.date)}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-slate-700">{e.text}</p>
                        </li>
                      ))}
                    </ol>
                  )}
                </>
              )}
            </SectionBlock>
          );
        }

        if (spec.kind === "quotes") {
          const quotes = caseData.quotes || [];
          return (
            <SectionBlock key={spec.key} {...commonProps} count={quotes.length}>
              {quotes.length === 0 ? (
                <EmptyState label="No quotes extracted" note="Verbatim quotes require a reviewed filing. None have been sourced for this case." />
              ) : (
                <div className="space-y-4">
                  {quotes.map((q, i) => (
                    <blockquote key={i} className="rounded-xl border-l-4 border-blue-400 bg-blue-50/50 p-4">
                      <Icon name="faQuoteLeft" className="text-sm text-blue-300" />
                      <p className="mt-1 text-sm italic leading-relaxed text-slate-700">{q.text}</p>
                      {q.source && <p className="mt-2 text-xs font-medium text-slate-500">— {q.source}</p>}
                    </blockquote>
                  ))}
                </div>
              )}
            </SectionBlock>
          );
        }

        if (spec.kind === "related") {
          return (
            <SectionBlock key={spec.key} {...commonProps} count={related.length}>
              {related.length === 0 ? (
                <EmptyState label="No related cases detected" note="No shared parties or matching case themes were found across the other records." />
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {related.map(({ case: rc, sharedEntities, sameTheme }) => (
                    <Link
                      key={rc.slug}
                      href={`/records/${rc.slug}`}
                      className="group flex flex-col rounded-xl border border-slate-200 bg-white/70 p-4 transition-colors hover:border-blue-300 hover:bg-blue-50/40"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <Ref>{rc.caseNumber}</Ref>
                        <Icon name="faArrowUpRightFromSquare" className="text-[10px] text-slate-300 group-hover:text-blue-500" />
                      </div>
                      <p className="mt-2 text-sm font-semibold text-slate-800 group-hover:text-blue-700">
                        {rc.shortTitle}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {sharedEntities.map((e) => (
                          <span key={e} className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 ring-1 ring-amber-200">
                            {e}
                          </span>
                        ))}
                        {sameTheme && sharedEntities.length === 0 && (
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                            Same matter type
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </SectionBlock>
          );
        }

        if (spec.kind === "citations") {
          const citations = caseData.citations || [];
          return (
            <SectionBlock key={spec.key} {...commonProps} count={citations.length}>
              {citations.length === 0 ? (
                <EmptyState label="No citations on record" note="No sourced filing supports this record yet." />
              ) : (
                <div className="space-y-3">
                  {citations.map((c, i) => (
                    <CitationChip key={i} citation={c} index={i} />
                  ))}
                </div>
              )}
            </SectionBlock>
          );
        }

        // default: list kind (attorneys, claims, defenses, motions, orders, evidence, keyFindings)
        const items = caseData[spec.key] || [];
        return (
          <SectionBlock key={spec.key} {...commonProps} count={items.length}>
            <ProseList items={items} />
          </SectionBlock>
        );
      })}
    </div>
  );
}
