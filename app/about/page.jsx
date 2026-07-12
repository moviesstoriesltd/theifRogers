"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import profileData from "../../Leif_L_Rogers.json";
import NavBar from "../../src/components/common/navbar/NavBar";
import { deriveData } from "./_components/data";
import { DashboardSkeleton, SearchInput, Icon } from "./_components/ui";
import { ScrollProgress, Hero, Kpis, TabBar, Toast } from "./_components/sections";
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
  const [tab, setTab] = useState("overview");
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
      json: () => setTab("raw"),
      pdf: () => window.print(),
    }),
    []
  );

  if (loading || !d) {
    return (
      <main className="min-h-screen bg-slate-100">
        <DashboardSkeleton />
      </main>
    );
  }

  const ActivePanel = PANELS[tab];

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

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        <Hero d={d} actions={actions} />
        <Kpis kpis={d.kpis} />

        {/* Global search */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Global search — addresses, phones, emails, aliases, people…"
            className="sm:max-w-md"
          />
          {query && !SEARCHABLE.has(tab) && (
            <p className="text-xs text-slate-400">
              Switch to a data tab (Addresses, Phones, People…) to see filtered results.
            </p>
          )}
        </div>

        {/* Sticky tabs */}
        <TabBar active={tab} onChange={setTab} />

        {/* Animated panel swap */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <ActivePanel d={d} query={SEARCHABLE.has(tab) ? query : ""} notify={notify} />
          </motion.div>
        </AnimatePresence>
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
