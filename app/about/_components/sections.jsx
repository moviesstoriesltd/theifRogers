"use client";

import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Icon, GlassCard, Counter, ScoreRing, Badge, cx } from "./ui";
import { TABS } from "./data";

/* ---------- Scroll progress indicator ---------- */

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400"
    />
  );
};

/* ---------- Hero profile ---------- */

const QuickAction = ({ icon, label, onClick }) => (
  <motion.button
    type="button"
    onClick={onClick}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.96 }}
    className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
  >
    <Icon name={icon} className="text-[11px]" />
    {label}
  </motion.button>
);

export const Hero = ({ d, actions }) => {
  const { info, addr, prop, score } = d;
  const location = info.location || [addr.city, addr.state].filter(Boolean).join(", ");
  const fullAddress = [addr.street, addr.city, addr.state, addr.zip_code].filter(Boolean).join(", ");

  const facts = [
    { icon: "faUser", label: "Age", value: info.age ?? "—" },
    { icon: "faMapPin", label: "Location", value: location || "—" },
    { icon: "faIdCard", label: "Marital Status", value: info.marital_status || "—" },
    { icon: "faHouse", label: "Current Property", value: prop.estimated_value || "—" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b1f3f] via-[#12315c] to-[#0a1830] p-6 shadow-2xl sm:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 12% 15%, rgba(59,130,246,0.35), transparent 42%)," +
            "radial-gradient(circle at 88% 85%, rgba(34,211,238,0.20), transparent 45%)",
        }}
      />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-3xl font-bold text-white shadow-lg">
            {(info.full_name || info.name || "?").charAt(0)}
          </div>
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge tone="blue" dot className="!bg-blue-500/20 !text-blue-200 !ring-blue-400/30">
                Public Record
              </Badge>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
                <Icon name="faCircleCheck" className="text-[10px]" /> Verified Source
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {info.full_name || info.name}
            </h1>
            <p className="mt-1 flex items-center gap-2 text-sm text-slate-300">
              <Icon name="faLocationDot" className="text-blue-300" />
              {fullAddress || location}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-slate-400">
                    <Icon name={f.icon} className="text-[9px]" /> {f.label}
                  </p>
                  <p className="mt-0.5 truncate text-sm font-semibold text-white">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <ScoreRing score={score} />
          <div className="flex flex-wrap justify-center gap-2">
            <QuickAction icon="faDownload" label="Export" onClick={actions.export} />
            <QuickAction icon="faShareNodes" label="Share" onClick={actions.share} />
            <QuickAction icon="faFileCode" label="JSON" onClick={actions.json} />
            <QuickAction icon="faDownload" label="PDF" onClick={actions.pdf} />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

/* ---------- KPI grid ---------- */

const KpiCard = ({ kpi }) => {
  const tone = kpi.tone || "blue";
  const toneBg = {
    blue: "from-blue-500/10 to-blue-500/0 text-blue-600",
    green: "from-emerald-500/10 to-emerald-500/0 text-emerald-600",
    orange: "from-orange-500/10 to-orange-500/0 text-orange-600",
  }[tone] || "from-blue-500/10 to-blue-500/0 text-blue-600";

  return (
    <GlassCard hover className="p-4">
      <div className={cx("mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br", toneBg)}>
        <Icon name={kpi.icon} className="text-sm" />
      </div>
      <p className="text-2xl font-bold text-slate-900 sm:text-3xl">
        {kpi.display != null ? kpi.display : <Counter value={kpi.value} />}
      </p>
      <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">
        {kpi.label}
      </p>
    </GlassCard>
  );
};

export const Kpis = ({ kpis }) => (
  <motion.section
    initial="hidden"
    animate="show"
    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
    className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
  >
    {kpis.map((kpi) => (
      <motion.div
        key={kpi.key}
        variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
      >
        <KpiCard kpi={kpi} />
      </motion.div>
    ))}
  </motion.section>
);

/* ---------- Sticky tab bar ---------- */

export const TabBar = ({ active, onChange }) => (
  <div className="sticky top-16 z-30 -mx-4 border-b border-slate-200/70 bg-slate-50/80 px-4 py-2 backdrop-blur-xl sm:top-20">
    <div className="flex gap-1 overflow-x-auto scrollbar-none">
      {TABS.map((tab) => {
        const isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={cx(
              "relative flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors",
              isActive ? "text-blue-700" : "text-slate-500 hover:text-slate-800"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              <Icon name={tab.icon} className="text-xs" />
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

/* ---------- Toast ---------- */

export const Toast = ({ message }) => (
  <AnimatePresence>
    {message && (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-2xl"
      >
        <Icon name="faCircleCheck" className="mr-2 text-emerald-400" />
        {message}
      </motion.div>
    )}
  </AnimatePresence>
);
