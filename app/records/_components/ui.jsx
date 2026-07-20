"use client";

/* ==========================================================================
   SHARED UI PRIMITIVES for the /records platform.
   Deliberately mirrors app/report/page.jsx and app/about so the whole site
   reads as one design system (blue/slate, soft cards, rounded-2xl).
   ========================================================================== */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation, faScaleBalanced, faGavel, faFileLines, faListCheck,
  faTableList, faUserTag, faHouse, faSackDollar, faFolderOpen, faShieldHalved,
  faLink, faArrowUpRightFromSquare, faChevronDown, faLandmark, faBuilding,
  faMagnifyingGlass, faCircleInfo, faCircleCheck, faCircleQuestion, faQuoteLeft,
  faArrowLeft, faScroll, faLocationDot, faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";

const ICONS = {
  faTriangleExclamation, faScaleBalanced, faGavel, faFileLines, faListCheck,
  faTableList, faUserTag, faHouse, faSackDollar, faFolderOpen, faShieldHalved,
  faLink, faArrowUpRightFromSquare, faChevronDown, faLandmark, faBuilding,
  faMagnifyingGlass, faCircleInfo, faCircleCheck, faCircleQuestion, faQuoteLeft,
  faArrowLeft, faScroll, faLocationDot, faHourglassHalf,
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
};

const DOTS = {
  blue: "bg-blue-500", green: "bg-emerald-500", yellow: "bg-amber-500",
  orange: "bg-orange-500", red: "bg-red-500", slate: "bg-slate-400",
};

export const Badge = ({ tone = "slate", children, className, dot = false }) => (
  <span
    className={cx(
      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1",
      TONES[tone] || TONES.slate,
      className
    )}
  >
    {dot && <span className={cx("h-1.5 w-1.5 rounded-full", DOTS[tone])} />}
    {children}
  </span>
);

export const Card = ({ className, children, hover = false, ...rest }) => (
  <div
    className={cx(
      "rounded-2xl border border-white/60 bg-white/80 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.18)] backdrop-blur-xl",
      hover &&
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgba(37,99,235,0.35)]",
      className
    )}
    {...rest}
  >
    {children}
  </div>
);

// Inline case-number / court reference chip.
export const Ref = ({ children }) => (
  <span className="rounded-md bg-blue-50 px-1.5 py-0.5 font-mono text-[0.9em] font-semibold text-blue-800 ring-1 ring-blue-200">
    {children}
  </span>
);

// Honest empty state — used everywhere a field has no sourced content.
export const EmptyState = ({ label = "Not yet available", note }) => (
  <div className="flex items-start gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-4">
    <Icon name="faCircleQuestion" className="mt-0.5 shrink-0 text-sm text-slate-400" />
    <div>
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-0.5 text-xs leading-relaxed text-slate-400">
        {note || "This field awaits a verified primary source. It is intentionally left blank rather than filled with unverified content."}
      </p>
    </div>
  </div>
);

// Date helpers — ISO in the data, human display in the UI.
export const fmtDate = (iso) => {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[m - 1]} ${d}, ${y}`;
};

/* ---------- Skeleton loaders (shown while the record chunk loads) ---------- */

export const SkeletonLine = ({ w = "100%" }) => (
  <div className="h-3.5 animate-pulse rounded bg-slate-200" style={{ width: w }} />
);

export const SkeletonBlock = () => (
  <div className="space-y-3 rounded-2xl border border-white/60 bg-white/70 p-6">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200" />
      <SkeletonLine w="40%" />
    </div>
    <SkeletonLine />
    <SkeletonLine w="92%" />
    <SkeletonLine w="76%" />
  </div>
);
