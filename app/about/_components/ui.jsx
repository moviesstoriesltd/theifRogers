"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot, faPhone, faEnvelope, faUserTag, faUsers, faUserGroup,
  faClockRotateLeft, faTriangleExclamation, faSackDollar, faHouse, faGauge,
  faShieldHalved, faFileCode, faBed, faBath, faRulerCombined, faCalendarDays,
  faKey, faUser, faMagnifyingGlass, faCopy, faDownload, faShareNodes,
  faCircleCheck, faChevronDown, faLandmark, faBuilding, faIdCard, faLock,
  faArrowUpRightFromSquare, faMapPin, faFilter, faSort, faLayerGroup, faXmark,
} from "@fortawesome/free-solid-svg-icons";

export const ICONS = {
  faLocationDot, faPhone, faEnvelope, faUserTag, faUsers, faUserGroup,
  faClockRotateLeft, faTriangleExclamation, faSackDollar, faHouse, faGauge,
  faShieldHalved, faFileCode, faBed, faBath, faRulerCombined, faCalendarDays,
  faKey, faUser, faMagnifyingGlass, faCopy, faDownload, faShareNodes,
  faCircleCheck, faChevronDown, faLandmark, faBuilding, faIdCard, faLock,
  faArrowUpRightFromSquare, faMapPin, faFilter, faSort, faLayerGroup, faXmark,
};

export const Icon = ({ name, className }) =>
  ICONS[name] ? <FontAwesomeIcon icon={ICONS[name]} className={className} /> : null;

export const cx = (...c) => c.filter(Boolean).join(" ");

export const TONES = {
  blue: "bg-blue-50 text-blue-700 ring-blue-200",
  slate: "bg-slate-100 text-slate-600 ring-slate-200",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  yellow: "bg-amber-50 text-amber-700 ring-amber-200",
  orange: "bg-orange-50 text-orange-700 ring-orange-200",
  red: "bg-red-50 text-red-700 ring-red-200",
  teal: "bg-teal-50 text-teal-700 ring-teal-200",
};

export const DOT = {
  blue: "bg-blue-500", slate: "bg-slate-400", green: "bg-emerald-500",
  yellow: "bg-amber-500", orange: "bg-orange-500", red: "bg-red-500", teal: "bg-teal-500",
};

// Full literal classes so Tailwind's scanner picks them up (never build these
// from template strings — the JIT can't see `bg-${tone}-500`).
export const ICON_BG = {
  blue: "bg-blue-500/10 text-blue-600",
  teal: "bg-teal-500/10 text-teal-600",
  green: "bg-emerald-500/10 text-emerald-600",
  orange: "bg-orange-500/10 text-orange-600",
  red: "bg-red-500/10 text-red-600",
  yellow: "bg-amber-500/10 text-amber-600",
  slate: "bg-slate-500/10 text-slate-600",
};

/* ---------- Primitives ---------- */

export const GlassCard = ({ className, children, hover = false, ...rest }) => (
  <div
    className={cx(
      "rounded-2xl border border-white/60 bg-white/70 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.18)] backdrop-blur-xl",
      hover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgba(37,99,235,0.35)]",
      className
    )}
    {...rest}
  >
    {children}
  </div>
);

export const Badge = ({ tone = "slate", children, className, dot = false }) => (
  <span
    className={cx(
      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1",
      TONES[tone] || TONES.slate,
      className
    )}
  >
    {dot && <span className={cx("h-1.5 w-1.5 rounded-full", DOT[tone])} />}
    {children}
  </span>
);

export const Chip = ({ children, tone = "blue", onClick, title }) => (
  <motion.button
    type="button"
    onClick={onClick}
    title={title}
    whileHover={{ y: -3, scale: 1.04 }}
    whileTap={{ scale: 0.96 }}
    className={cx(
      "rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 transition-colors",
      TONES[tone] || TONES.blue
    )}
  >
    {children}
  </motion.button>
);

export const SectionTitle = ({ icon, title, count, subtitle, right }) => (
  <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
    <div>
      <div className="flex items-center gap-2.5">
        {icon && (
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600">
            <Icon name={icon} className="text-sm" />
          </span>
        )}
        <h2 className="text-xl font-bold tracking-tight text-slate-900">{title}</h2>
        {count != null && (
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
            {count}
          </span>
        )}
      </div>
      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
    </div>
    {right}
  </div>
);

/* ---------- Animated counter ---------- */

export const Counter = ({ value, className }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || typeof value !== "number") return;
    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      {typeof value === "number" ? display.toLocaleString() : value}
    </span>
  );
};

/* ---------- Search input ---------- */

export const SearchInput = ({ value, onChange, placeholder = "Search…", className }) => (
  <div className={cx("relative", className)}>
    <Icon
      name="faMagnifyingGlass"
      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400"
    />
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-slate-200 bg-white/80 py-2 pl-9 pr-8 text-sm text-slate-700 outline-none ring-blue-500/30 transition focus:border-blue-400 focus:ring-2"
    />
    {value && (
      <button
        type="button"
        onClick={() => onChange("")}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        aria-label="Clear"
      >
        <Icon name="faXmark" className="text-xs" />
      </button>
    )}
  </div>
);

/* ---------- Progress bar ---------- */

export const ProgressBar = ({ value, max = 100, tone = "blue", label, valueLabel }) => {
  const pct = max ? Math.min(100, Math.round((value / max) * 100)) : 0;
  const fill = {
    blue: "bg-blue-500", green: "bg-emerald-500", yellow: "bg-amber-500",
    orange: "bg-orange-500", red: "bg-red-500", slate: "bg-slate-400", teal: "bg-teal-500",
  }[tone];
  return (
    <div>
      {(label || valueLabel) && (
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-medium text-slate-600">{label}</span>
          <span className="font-semibold text-slate-500">{valueLabel ?? value}</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className={cx("h-full rounded-full", fill)}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
};

/* ---------- Donut chart ---------- */

export const Donut = ({ segments, size = 160, thickness = 18, centerLabel, centerSub }) => {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  const stroke = {
    green: "#10b981", red: "#ef4444", orange: "#f97316",
    yellow: "#f59e0b", blue: "#3b82f6", slate: "#cbd5e1",
  };
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f1f5f9" strokeWidth={thickness} />
        {segments.map((seg, i) => {
          const len = (seg.value / total) * c;
          const dash = `${len} ${c - len}`;
          const el = (
            <motion.circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={stroke[seg.tone] || "#3b82f6"}
              strokeWidth={thickness}
              strokeLinecap="round"
              strokeDasharray={dash}
              initial={{ strokeDashoffset: c }}
              whileInView={{ strokeDashoffset: -offset }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-slate-900">{centerLabel}</span>
        {centerSub && <span className="text-[11px] uppercase tracking-wide text-slate-400">{centerSub}</span>}
      </div>
    </div>
  );
};

/* ---------- Radial score ring ---------- */

export const ScoreRing = ({ score = 0, size = 92 }) => {
  const thickness = 8;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const tone = score >= 80 ? "#34d399" : score >= 50 ? "#60a5fa" : "#fbbf24";
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={thickness} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={tone}
          strokeWidth={thickness} strokeLinecap="round" strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * score) / 100 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <span className="text-xl font-bold">{score}</span>
        <span className="text-[9px] uppercase tracking-wider text-white/60">Score</span>
      </div>
    </div>
  );
};

/* ---------- Loading skeletons ---------- */

export const Skeleton = ({ className }) => (
  <div className={cx("animate-pulse rounded-xl bg-slate-200/70", className)} />
);

export const DashboardSkeleton = () => (
  <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
    <Skeleton className="h-48 w-full rounded-3xl" />
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} className="h-24" />)}
    </div>
    <Skeleton className="h-12 w-full" />
    <div className="grid gap-4 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-40" />)}
    </div>
  </div>
);

/* ---------- Empty state ---------- */

export const EmptyState = ({ text = "No matching records." }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/50 py-14 text-center">
    <Icon name="faMagnifyingGlass" className="mb-2 text-2xl text-slate-300" />
    <p className="text-sm text-slate-400">{text}</p>
  </div>
);
