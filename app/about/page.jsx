"use client";

import { useEffect, useMemo, useState } from "react";
import profileData from "../../Leif_L_Rogers.json";
import NavBar from "../../src/components/common/navbar/NavBar";
import { deriveData, TABS } from "./_components/data";
import { DashboardSkeleton, SearchInput, Icon } from "./_components/ui";
import { ScrollProgress, Hero, SideIndex, SectionNav, Toast } from "./_components/sections";
import {
  OverviewPanel, TimelinePanel, AddressesPanel, PhonesPanel, EmailsPanel,
  PropertyPanel, RelativesPanel, AssociatesPanel, AliasesPanel, SecurityPanel,
  RawJsonPanel,
} from "./_components/panels";

const PANELS = {
  overview: OverviewPanel,
  timeline: TimelinePanel,
  addresses: AddressesPanel,
  phones: PhonesPanel,
  emails: EmailsPanel,
  property: PropertyPanel,
  relatives: RelativesPanel,
  associates: AssociatesPanel,
  aliases: AliasesPanel,
  security: SecurityPanel,
  raw: RawJsonPanel,
};

// Tabs where the global search box actually filters content.
const SEARCHABLE = new Set([
  "timeline", "addresses", "phones", "emails", "relatives", "associates", "aliases",
]);

export default function AboutPage() {
  const [raw, setRaw] = useState(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("overview");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");

  // Client data flow: hydrate from the imported JSON after mount.
  useEffect(() => {
    setRaw(profileData);
    setLoading(false);
  }, []);

  const d = useMemo(() => deriveData(raw), [raw]);

  const notify = (msg) => {
    setToast(msg);
    window.clearTimeout(notify._t);
    notify._t = window.setTimeout(() => setToast(""), 2200);
  };

  const actions = useMemo(
    () => ({
      export: () => {
        const blob = new Blob([JSON.stringify(profileData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "leif-rogers-profile.json";
        a.click();
        URL.revokeObjectURL(url);
        notify("Profile exported as JSON");
      },
      share: async () => {
        const shareData = { title: "Intelligence Profile", url: window.location.href };
        try {
          if (navigator.share) await navigator.share(shareData);
          else {
            await navigator.clipboard.writeText(window.location.href);
            notify("Link copied to clipboard");
          }
        } catch {
          /* user dismissed share sheet */
        }
      },
      json: () => {
        const el = document.getElementById("raw");
        if (el)
          window.scrollTo({
            top: el.getBoundingClientRect().top + window.scrollY - 130,
            behavior: "smooth",
          });
      },
      pdf: () => window.print(),
    }),
    []
  );

  // Smooth-scroll the directory link to its section.
  const goToSection = (key) => {
    const el = document.getElementById(key);
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 130,
      behavior: "smooth",
    });
  };

  // Scroll-spy: highlight the directory entry for whichever section is in view.
  useEffect(() => {
    if (loading || !d) return;
    const els = TABS.map((t) => document.getElementById(t.key)).filter(Boolean);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [loading, d]);

  if (loading || !d) {
    return (
      <main className="min-h-screen bg-slate-100">
        <DashboardSkeleton />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-slate-100 text-slate-900">
      <ScrollProgress />
      <NavBar />

      {/* Ambient background */}
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

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6">
        <Hero d={d} actions={actions} />

        {/* Global filter — narrows every searchable section of the report at once */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Filter the report — addresses, phones, emails, aliases, people…"
            className="sm:max-w-md"
          />
          {query && (
            <p className="text-xs text-slate-400">
              Filtering addresses, phones, emails, aliases &amp; people across the report.
            </p>
          )}
        </div>

        {/* Mobile directory — horizontal jump nav (hanging sidebar replaces it on xl) */}
        <div className="xl:hidden">
          <SectionNav active={active} onJump={goToSection} />
        </div>

        {/* Report layout — hanging index on the left, data on the right */}
        <div className="flex gap-8">
          <SideIndex active={active} onJump={goToSection} />

          {/* Full report — every section rendered top to bottom */}
          <div className="min-w-0 flex-1 space-y-14">
            {TABS.map((t) => {
              const Panel = PANELS[t.key];
              return (
                <section key={t.key} id={t.key} className="scroll-mt-28">
                  <Panel d={d} query={SEARCHABLE.has(t.key) ? query : ""} notify={notify} />
                </section>
              );
            })}
          </div>
        </div>
      </div>

      <footer className="mt-10 border-t border-slate-200 bg-white/60 py-8 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-1 px-4 text-center">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
            <Icon name="faShieldHalved" className="text-blue-500" />
            OSINT Intelligence Dashboard
          </p>
          <p className="text-[11px] text-slate-400">
            Compiled from public records · Presentation layer only — source data unmodified
          </p>
        </div>
      </footer>

      <Toast message={toast} />
    </main>
  );
}
