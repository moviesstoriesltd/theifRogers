"use client";

import { useEffect, useMemo, useState } from "react";
import profileData from "../../Leif_L_Rogers.json";
import NavBar from "../../src/components/common/navbar/NavBar";
import Footer from "../../src/components/common/footer/Footer";
import { deriveData, TABS } from "./_components/data";
import { DashboardSkeleton, SearchInput } from "./_components/ui";
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
  // The profile JSON is a static local import available at render time, so we
  // seed state with it directly. This makes the full dashboard part of the
  // server-rendered HTML (crawlable by every search engine, not just JS-capable
  // ones) and avoids a skeleton flash on first paint.
  const [raw] = useState(profileData);
  const [loading] = useState(false);
  const [active, setActive] = useState("overview");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");

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

      <div className="mt-10 bg-[#010f20] pt-16 md:pt-20">
        <Footer />
      </div>

      <Toast message={toast} />
    </main>
  );
}
