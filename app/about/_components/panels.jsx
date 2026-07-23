"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Icon, GlassCard, Badge, Chip, SectionTitle, SearchInput, ProgressBar,
  Donut, EmptyState, ICON_BG, cx,
} from "./ui";
import { phoneTone, phoneTypeLabel } from "./data";

/* ---------- shared helpers ---------- */

const fade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
};

const includes = (hay, q) => String(hay || "").toLowerCase().includes(q);

// Progressive "Load More" so large arrays never render all at once.
function usePaged(list, step = 12) {
  const [count, setCount] = useState(step);
  useEffect(() => setCount(step), [list, step]);
  return {
    items: list.slice(0, count),
    hasMore: count < list.length,
    remaining: list.length - count,
    loadMore: () => setCount((c) => c + step),
  };
}

const LoadMore = ({ paged }) =>
  paged.hasMore ? (
    <div className="mt-6 flex justify-center">
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={paged.loadMore}
        className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-blue-300 hover:text-blue-700"
      >
        Load {Math.min(12, paged.remaining)} more · {paged.remaining} left
      </motion.button>
    </div>
  ) : null;

const PersonCard = ({ person, relation }) => (
  <motion.a
    {...fade}
    href={person.profile_url || "#"}
    target={person.profile_url ? "_blank" : undefined}
    rel="noreferrer"
    whileHover={{ y: -4 }}
    className="group flex items-center gap-3 rounded-2xl border border-white/60 bg-white/70 p-3 shadow-sm backdrop-blur-xl transition-shadow hover:shadow-lg"
  >
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-sm font-semibold text-white">
      {person.name?.charAt(0) || "?"}
    </span>
    <span className="min-w-0 flex-1">
      <span className="block truncate text-sm font-semibold text-slate-800">{person.name}</span>
      <span className="block text-xs text-slate-400">
        {person.age ? `Age ${person.age}` : "Age unknown"}
      </span>
    </span>
    <Badge tone={relation === "Relative" ? "blue" : "teal"}>{relation}</Badge>
    {person.profile_url && (
      <Icon name="faArrowUpRightFromSquare" className="text-xs text-slate-300 transition-colors group-hover:text-blue-500" />
    )}
  </motion.a>
);

const InfoCard = ({ icon, title, rows, tone = "blue" }) => (
  <GlassCard hover className="p-5">
    <div className="mb-4 flex items-center gap-2.5">
      <span className={cx("flex h-8 w-8 items-center justify-center rounded-lg", ICON_BG[tone] || ICON_BG.blue)}>
        <Icon name={icon} className="text-sm" />
      </span>
      <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-slate-500">{title}</h3>
    </div>
    <dl className="space-y-2.5">
      {rows.filter((r) => r.value != null && r.value !== "").map((r) => (
        <div key={r.label} className="flex items-start justify-between gap-4">
          <dt className="text-xs text-slate-400">{r.label}</dt>
          <dd className="text-right text-sm font-medium text-slate-800">{r.value}</dd>
        </div>
      ))}
    </dl>
  </GlassCard>
);

/* ================================================================== */
/* OVERVIEW                                                            */
/* ================================================================== */

export function OverviewPanel({ d }) {
  const { info, addr, prop, security, phones, emails } = d;
  const primaryPhone = phones[0];
  return (
    <div>
      <SectionTitle
        icon="faGauge" title="Overview"
        subtitle="Key identity, residence, property, and contact facts at a glance."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <InfoCard
        icon="faIdCard" title="Identity Summary"
        rows={[
          { label: "Full Name", value: info.full_name },
          { label: "Known As", value: info.name },
          { label: "Age", value: info.age },
          { label: "Marital Status", value: info.marital_status },
        ]}
      />
      <InfoCard
        icon="faLocationDot" title="Current Residence"
        rows={[
          { label: "Street", value: addr.street },
          { label: "City", value: [addr.city, addr.state].filter(Boolean).join(", ") },
          { label: "ZIP", value: addr.zip_code },
          { label: "County", value: addr.county },
          { label: "Since", value: addr.since },
        ]}
      />
      <InfoCard
        icon="faHouse" title="Property Overview"
        rows={[
          { label: "Est. Value", value: prop.estimated_value },
          { label: "Est. Equity", value: prop.estimated_equity },
          { label: "Beds / Baths", value: prop.bedrooms && `${prop.bedrooms} / ${prop.bathrooms}` },
          { label: "Square Feet", value: prop.square_feet },
          { label: "Year Built", value: prop.year_built },
        ]}
      />
      <InfoCard
        icon="faPhone" title="Primary Contact"
        rows={[
          { label: "Phone", value: primaryPhone?.number },
          { label: "Type", value: primaryPhone && phoneTypeLabel(primaryPhone.type) },
          { label: "Email", value: emails[0] },
          { label: "Total Reach", value: `${phones.length} phones · ${emails.length} emails` },
        ]}
      />
      <GlassCard hover className="p-5">
        <div className="mb-4 flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10">
            <Icon name="faTriangleExclamation" className="text-sm text-orange-600" />
          </span>
          <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-slate-500">Risk Indicators</h3>
        </div>
        <div className="space-y-3">
          <ProgressBar label="Compromised emails" tone="red"
            value={security.compromised} max={security.totalEmails}
            valueLabel={`${security.compromised}/${security.totalEmails}`} />
          <ProgressBar label="Total breaches" tone="orange"
            value={Math.min(security.totalBreaches, 20)} max={20}
            valueLabel={security.totalBreaches} />
          <ProgressBar label="Stealer-log hits" tone="yellow"
            value={security.stealerHits} max={security.totalEmails}
            valueLabel={security.stealerHits} />
        </div>
      </GlassCard>
      <InfoCard
        icon="faFileCode" title="Profile Metadata"
        tone="slate"
        rows={[
          { label: "Aliases", value: d.aliases.length },
          { label: "Relatives", value: d.relatives.length },
          { label: "Associates", value: d.associates.length },
          { label: "Addresses on file", value: (d.raw.past_addresses || []).length },
          { label: "Years of history", value: d.yearsOfHistory },
        ]}
      />
      </div>
    </div>
  );
}

/* ================================================================== */
/* TIMELINE                                                            */
/* ================================================================== */

export function TimelinePanel({ d }) {
  const { addr, datedAddresses } = d;
  const paged = usePaged(datedAddresses, 15);
  return (
    <div>
      <SectionTitle icon="faClockRotateLeft" title="Address Timeline" count={datedAddresses.length + 1}
        subtitle="Chronological residence history, most recent first." />
      <ol className="relative ml-3 border-l-2 border-slate-200">
        <motion.li {...fade} className="relative mb-6 pl-8">
          <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-blue-500 ring-4 ring-blue-500/20" />
          <GlassCard className="border-blue-200 bg-gradient-to-br from-white to-blue-50/60 p-4">
            <div className="flex items-center gap-2">
              <Badge tone="blue" dot>Current</Badge>
              <span className="text-xs text-slate-400">{addr.since}</span>
            </div>
            <p className="mt-1.5 font-semibold text-slate-900">{addr.street}</p>
            <p className="text-sm text-slate-500">
              {[addr.city, addr.state, addr.zip_code].filter(Boolean).join(", ")}
            </p>
          </GlassCard>
        </motion.li>
        {paged.items.map((a, i) => (
          <motion.li key={`${a.street}-${i}`} {...fade} transition={{ ...fade.transition, delay: (i % 15) * 0.03 }} className="relative mb-5 pl-8">
            <span className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-slate-300 ring-4 ring-slate-50" />
            <div className="rounded-xl border border-slate-100 bg-white/80 p-4 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-xs font-medium text-blue-500">{a.recorded}</p>
              <p className="mt-0.5 font-medium text-slate-800">{a.street}</p>
              <p className="text-sm text-slate-500">
                {[a.city, a.state, a.zip_code].filter(Boolean).join(", ")}
                {a.county ? ` · ${a.county}` : ""}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
      <LoadMore paged={paged} />
    </div>
  );
}

/* ================================================================== */
/* ADDRESSES (accordion grouped by year)                              */
/* ================================================================== */

function YearGroup({ group, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <GlassCard className="overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-slate-50/60"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-sm font-bold text-blue-600">
            <Icon name="faLayerGroup" className="text-xs" />
          </span>
          <span className="text-base font-bold text-slate-800">{group.year}</span>
          <Badge tone="slate">{group.items.length}</Badge>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <Icon name="faChevronDown" className="text-slate-400" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-3 px-5 pb-5 sm:grid-cols-2">
              {group.items.map((a, i) => (
                <div key={`${a.street}-${i}`} className="rounded-xl border border-slate-100 bg-white/70 p-3.5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-blue-500">{a.recorded}</p>
                    <Icon name="faMapPin" className="text-xs text-slate-300" />
                  </div>
                  <p className="mt-1 text-sm font-semibold text-slate-800">{a.street}</p>
                  <p className="text-xs text-slate-500">
                    {[a.city, a.state, a.zip_code].filter(Boolean).join(", ")}
                  </p>
                  {a.county && <p className="mt-0.5 text-[11px] text-slate-400">{a.county}</p>}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}

export function AddressesPanel({ d, query }) {
  const [local, setLocal] = useState("");
  const q = (query || local).trim().toLowerCase();

  const groups = useMemo(() => {
    if (!q) return d.addressesByYear;
    return d.addressesByYear
      .map((g) => ({
        ...g,
        items: g.items.filter((a) =>
          [a.street, a.city, a.state, a.county, a.zip_code, a.recorded].some((f) => includes(f, q))
        ),
      }))
      .filter((g) => g.items.length);
  }, [d.addressesByYear, q]);

  return (
    <div>
      <SectionTitle
        icon="faLocationDot" title="Addresses by Year" count={d.datedAddresses.length}
        subtitle="Expand a year to reveal its records."
        right={<SearchInput value={local} onChange={setLocal} placeholder="Filter addresses…" className="w-56" />}
      />
      {groups.length ? (
        <div className="space-y-3">
          {groups.map((g, i) => (
            <YearGroup key={g.year} group={g} defaultOpen={i === 0 || !!q} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

/* ================================================================== */
/* PHONES                                                             */
/* ================================================================== */

export function PhonesPanel({ d, query }) {
  const [local, setLocal] = useState("");
  const [type, setType] = useState("all");
  const q = (query || local).trim().toLowerCase();
  const types = ["all", "Wireless", "Landline", "Voip"];

  const list = useMemo(
    () => d.phones.filter((p) => {
      const matchQ = !q || [p.number, p.carrier, p.type].some((f) => includes(f, q));
      const matchT = type === "all" || (p.type || "").toLowerCase() === type.toLowerCase();
      return matchQ && matchT;
    }),
    [d.phones, q, type]
  );

  return (
    <div>
      <SectionTitle
        icon="faPhone" title="Phone Numbers" count={d.phones.length}
        right={<SearchInput value={local} onChange={setLocal} placeholder="Search numbers…" className="w-56" />}
      />
      <div className="mb-5 flex flex-wrap gap-2">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={cx(
              "rounded-full px-3.5 py-1.5 text-xs font-semibold ring-1 transition-colors",
              type === t ? "bg-blue-600 text-white ring-blue-600" : "bg-white text-slate-500 ring-slate-200 hover:text-slate-800"
            )}
          >
            {t === "all" ? "All" : phoneTypeLabel(t)}
          </button>
        ))}
      </div>
      {list.length ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <motion.div {...fade} transition={{ ...fade.transition, delay: (i % 12) * 0.02 }} key={`${p.number}-${i}`}>
              <GlassCard hover className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                    <Icon name="faPhone" />
                  </span>
                  <Badge tone={phoneTone(p.type)} dot>{phoneTypeLabel(p.type)}</Badge>
                </div>
                <p className="text-lg font-bold text-slate-900">{p.number}</p>
                <p className="mt-0.5 truncate text-xs text-slate-400">{p.carrier || "Unknown carrier"}</p>
                {p.first_reported && (
                  <p className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Icon name="faCalendarDays" className="text-[10px]" /> First reported {p.first_reported}
                  </p>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

/* ================================================================== */
/* EMAILS                                                             */
/* ================================================================== */

export function EmailsPanel({ d, query }) {
  const [local, setLocal] = useState("");
  const q = (query || local).trim().toLowerCase();
  const list = d.security.byEmail.filter((e) => !q || includes(e.email, q));

  return (
    <div>
      <SectionTitle
        icon="faEnvelope" title="Email Addresses" count={d.emails.length}
        subtitle="Verification & breach exposure per address."
        right={<SearchInput value={local} onChange={setLocal} placeholder="Search emails…" className="w-56" />}
      />
      {list.length ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {list.map((e, i) => (
            <motion.div {...fade} transition={{ ...fade.transition, delay: i * 0.03 }} key={e.email}>
              <GlassCard hover className={cx("p-4 border-l-4", {
                green: "border-l-emerald-400", yellow: "border-l-amber-400",
                orange: "border-l-orange-400", red: "border-l-red-400",
              }[e.risk.tone])}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 truncate font-semibold text-slate-800">
                      <Icon name="faEnvelope" className="text-xs text-slate-400" />
                      {e.email}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                      <Icon name="faCircleCheck" className="text-emerald-500" /> Verified address
                    </p>
                  </div>
                  <Badge tone={e.risk.tone} dot>{e.risk.label}</Badge>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-slate-50 px-3 py-2">
                    <p className="text-lg font-bold text-slate-900">{e.breaches}</p>
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">Breaches</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 px-3 py-2">
                    <p className="text-lg font-bold text-slate-900">{e.logs}</p>
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">Stealer Logs</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

/* ================================================================== */
/* PROPERTY                                                           */
/* ================================================================== */

const HouseIllustration = () => (
  <svg viewBox="0 0 200 160" className="h-full w-full" role="img" aria-label="House illustration">
    <defs>
      <linearGradient id="roof" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
    </defs>
    <rect x="40" y="80" width="120" height="70" rx="6" fill="#e0e7ff" />
    <polygon points="100,28 172,84 28,84" fill="url(#roof)" />
    <rect x="88" y="104" width="24" height="46" rx="3" fill="#1e3a8a" />
    <rect x="54" y="98" width="22" height="22" rx="3" fill="#bfdbfe" />
    <rect x="124" y="98" width="22" height="22" rx="3" fill="#bfdbfe" />
    <circle cx="106" cy="128" r="2" fill="#e0e7ff" />
  </svg>
);

export function PropertyPanel({ d }) {
  const { prop, addr } = d;
  const stats = [
    { icon: "faBed", label: "Bedrooms", value: prop.bedrooms },
    { icon: "faBath", label: "Bathrooms", value: prop.bathrooms },
    { icon: "faRulerCombined", label: "Square Feet", value: prop.square_feet },
    { icon: "faCalendarDays", label: "Year Built", value: prop.year_built },
    { icon: "faUser", label: "Owner Type", value: prop.occupancy_type },
    { icon: "faLayerGroup", label: "Lot Size", value: prop.lot_sqft && `${prop.lot_sqft} sqft` },
    { icon: "faBuilding", label: "Land Use", value: prop.land_use },
    { icon: "faLandmark", label: "Ownership", value: prop.ownership_type },
  ].filter((s) => s.value);

  return (
    <div>
      <SectionTitle icon="faHouse" title="Property of Record"
        subtitle={[addr.street, addr.city, addr.state, addr.zip_code].filter(Boolean).join(", ")} />
      <div className="grid gap-4 lg:grid-cols-3">
        <GlassCard className="relative overflow-hidden bg-gradient-to-br from-[#0b1f3f] to-[#12315c] p-6 text-white lg:col-span-1">
          <div className="mx-auto mb-4 h-32 w-40"><HouseIllustration /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/10 p-3">
              <p className="text-xl font-bold text-cyan-300">{prop.estimated_value || "—"}</p>
              <p className="text-[10px] uppercase tracking-wide text-slate-300">Est. Value</p>
            </div>
            <div className="rounded-xl bg-white/10 p-3">
              <p className="text-xl font-bold text-emerald-300">{prop.estimated_equity || "—"}</p>
              <p className="text-[10px] uppercase tracking-wide text-slate-300">Est. Equity</p>
            </div>
          </div>
        </GlassCard>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-2 lg:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <GlassCard key={s.label} hover className="flex flex-col items-center p-4 text-center">
              <span className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                <Icon name={s.icon} />
              </span>
              <p className="text-lg font-bold text-slate-900">{s.value}</p>
              <p className="text-[11px] uppercase tracking-wide text-slate-400">{s.label}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {(prop.last_sale_amount || prop.subdivision) && (
        <GlassCard className="mt-4 p-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <InfoRow label="Last Sale" value={prop.last_sale_amount} />
            <InfoRow label="Last Sale Date" value={prop.last_sale_date} />
            <InfoRow label="Subdivision" value={prop.subdivision} />
            <InfoRow label="Property Class" value={prop.property_class} />
            <InfoRow label="County" value={addr.county} />
            <InfoRow label="Resident Since" value={addr.since} />
          </div>
        </GlassCard>
      )}
    </div>
  );
}

const InfoRow = ({ label, value }) =>
  value ? (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  ) : null;

/* ================================================================== */
/* RELATIVES                                                          */
/* ================================================================== */

export function RelativesPanel({ d, query }) {
  const [local, setLocal] = useState("");
  const q = (query || local).trim().toLowerCase();
  const filtered = useMemo(
    () => d.relatives.filter((p) => !q || includes(p.name, q)),
    [d.relatives, q]
  );
  const paged = usePaged(filtered, 12);

  return (
    <div>
      <SectionTitle
        icon="faUsers" title="Relatives" count={filtered.length}
        right={<SearchInput value={local} onChange={setLocal} placeholder="Search relatives…" className="w-56" />}
      />
      {filtered.length ? (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paged.items.map((p, i) => <PersonCard key={`${p.name}-${i}`} person={p} relation="Relative" />)}
          </div>
          <LoadMore paged={paged} />
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

/* ================================================================== */
/* ASSOCIATES (alphabetical + sort + search)                          */
/* ================================================================== */

export function AssociatesPanel({ d, query }) {
  const [local, setLocal] = useState("");
  const [asc, setAsc] = useState(true);
  const q = (query || local).trim().toLowerCase();

  const sorted = useMemo(() => {
    const list = d.associates.filter((p) => !q || includes(p.name, q));
    return [...list].sort((a, b) =>
      asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
  }, [d.associates, q, asc]);

  const paged = usePaged(sorted, 16);

  // Letter dividers within the paged slice.
  const withLetters = [];
  let lastLetter = null;
  paged.items.forEach((p) => {
    const letter = (p.name[0] || "#").toUpperCase();
    if (letter !== lastLetter) { withLetters.push({ divider: letter }); lastLetter = letter; }
    withLetters.push({ person: p });
  });

  return (
    <div>
      <SectionTitle
        icon="faUserGroup" title="Associates" count={sorted.length}
        right={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAsc((v) => !v)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:text-blue-700"
            >
              <Icon name="faSort" className="text-[11px]" /> {asc ? "A-Z" : "Z-A"}
            </button>
            <SearchInput value={local} onChange={setLocal} placeholder="Search associates…" className="w-52" />
          </div>
        }
      />
      {sorted.length ? (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {withLetters.map((row, i) =>
              row.divider ? (
                <div key={`d-${row.divider}-${i}`} className="col-span-full mt-2 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-xs font-bold text-white">
                    {row.divider}
                  </span>
                  <span className="h-px flex-1 bg-slate-200" />
                </div>
              ) : (
                <PersonCard key={`${row.person.name}-${i}`} person={row.person} relation="Associate" />
              )
            )}
          </div>
          <LoadMore paged={paged} />
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

/* ================================================================== */
/* ALIASES (animated tag cloud)                                       */
/* ================================================================== */

export function AliasesPanel({ d, query, notify }) {
  const [local, setLocal] = useState("");
  const q = (query || local).trim().toLowerCase();
  const tones = ["blue", "teal", "orange", "green", "yellow", "slate"];
  const list = d.aliases.filter((a) => !q || includes(a, q));

  const copy = async (alias) => {
    try {
      await navigator.clipboard.writeText(alias);
      notify?.(`Copied “${alias}”`);
    } catch {
      notify?.("Copy failed");
    }
  };

  return (
    <div>
      <SectionTitle
        icon="faUserTag" title="Known Aliases" count={d.aliases.length}
        subtitle="Recorded name variations — click a tag to copy."
        right={<SearchInput value={local} onChange={setLocal} placeholder="Search aliases…" className="w-56" />}
      />
      {list.length ? (
        <motion.div
          className="flex flex-wrap gap-3"
          initial="hidden" animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
        >
          {list.map((alias, i) => (
            <motion.div key={`${alias}-${i}`} variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}>
              <Chip tone={tones[i % tones.length]} onClick={() => copy(alias)} title="Click to copy">
                <span className="flex items-center gap-2">
                  {alias}
                  <Icon name="faCopy" className="text-[10px] opacity-50" />
                </span>
              </Chip>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

/* ================================================================== */
/* SECURITY                                                           */
/* ================================================================== */

export function SecurityPanel({ d }) {
  const s = d.security;
  const widgets = [
    { label: "Total Emails", value: s.totalEmails, icon: "faEnvelope", tone: "blue" },
    { label: "Compromised", value: s.compromised, icon: "faTriangleExclamation", tone: "red" },
    { label: "Total Breaches", value: s.totalBreaches, icon: "faShieldHalved", tone: "orange" },
    { label: "Safe Emails", value: s.safe, icon: "faLock", tone: "green" },
  ];
  const donut = [
    { value: s.safe, tone: "green", label: "Safe" },
    { value: s.compromised, tone: "red", label: "Compromised" },
  ];

  return (
    <div className="space-y-5">
      <SectionTitle
        icon="faShieldHalved" title="Security & Breach Exposure"
        subtitle="Compromised credentials, breach counts, and stealer-log exposure per email."
      />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {widgets.map((w) => (
          <GlassCard key={w.label} hover className="p-4">
            <div className={cx("mb-2 flex h-9 w-9 items-center justify-center rounded-lg", ICON_BG[w.tone] || ICON_BG.blue)}>
              <Icon name={w.icon} className="text-sm" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{w.value}</p>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{w.label}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <GlassCard className="flex flex-col items-center justify-center p-6">
          <h3 className="mb-4 self-start text-sm font-bold uppercase tracking-[0.1em] text-slate-500">Exposure Split</h3>
          <Donut segments={donut} centerLabel={`${Math.round((s.safe / (s.totalEmails || 1)) * 100)}%`} centerSub="Safe" />
          <div className="mt-4 flex gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Safe ({s.safe})</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-500" /> Compromised ({s.compromised})</span>
          </div>
        </GlassCard>

        <GlassCard className="p-6 lg:col-span-2">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.1em] text-slate-500">Per-Email Breach Load</h3>
          <div className="space-y-4">
            {s.byEmail.map((e) => (
              <ProgressBar
                key={e.email}
                label={e.email}
                tone={e.risk.tone}
                value={e.breaches}
                max={Math.max(...s.byEmail.map((x) => x.breaches), 1)}
                valueLabel={`${e.breaches} · ${e.risk.label}`}
              />
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 text-xs uppercase tracking-[0.1em] text-slate-400">
              <th className="px-5 py-3 font-semibold">Email</th>
              <th className="px-5 py-3 font-semibold">Breaches</th>
              <th className="px-5 py-3 font-semibold">Stealer Logs</th>
              <th className="px-5 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {s.byEmail.map((e) => (
              <tr key={e.email} className="transition-colors hover:bg-slate-50/60">
                <td className="px-5 py-3 font-medium text-slate-700">{e.email}</td>
                <td className="px-5 py-3"><Badge tone={e.risk.tone}>{e.breaches}</Badge></td>
                <td className="px-5 py-3 text-slate-600">{e.logs}</td>
                <td className="px-5 py-3"><Badge tone={e.risk.tone} dot>{e.risk.label}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}

/* ================================================================== */
/* RAW JSON                                                            */
/* ================================================================== */

export function RawJsonPanel({ d, notify }) {
  const text = useMemo(() => JSON.stringify(d.raw, null, 2), [d.raw]);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); notify?.("JSON copied to clipboard"); }
    catch { notify?.("Copy failed"); }
  };
  return (
    <div>
      <SectionTitle
        icon="faFileCode" title="Raw JSON"
        subtitle="The complete, unmodified source record."
        right={
          <button onClick={copy} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-blue-700">
            <Icon name="faCopy" className="text-[11px]" /> Copy
          </button>
        }
      />
      <div className="max-h-[70vh] overflow-auto rounded-2xl border border-slate-800 bg-[#0b1220] p-4">
        <pre className="text-xs leading-relaxed text-slate-300"><code>{text}</code></pre>
      </div>
    </div>
  );
}
