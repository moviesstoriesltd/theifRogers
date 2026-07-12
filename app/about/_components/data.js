// Pure data-shaping helpers for the Intelligence Profile dashboard.
// IMPORTANT: this only *derives views* over the JSON — nothing is removed,
// the original API/JSON mapping is preserved and passed through untouched.

export const MONTHS = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

// "July 2023" -> { ts, year }. Returns nulls for missing/unparseable input.
export const parseRecorded = (recorded) => {
  if (!recorded || typeof recorded !== "string") return { ts: 0, year: null };
  const [month, year] = recorded.trim().split(/\s+/);
  const m = MONTHS[(month || "").toLowerCase()];
  const y = Number(year);
  if (Number.isNaN(y)) return { ts: 0, year: null };
  return { ts: new Date(y, m ?? 0, 1).getTime(), year: y };
};

export const dedupeByName = (list = []) => {
  const seen = new Set();
  return list.filter((item) => {
    const name = item?.name?.trim();
    if (!name || seen.has(name)) return false;
    seen.add(name);
    return true;
  });
};

// Risk tiers: green (0) / yellow (1-2) / orange (3-4) / red (5+).
export const riskFor = (n = 0) => {
  if (n >= 5) return { tone: "red", label: "Critical" };
  if (n >= 3) return { tone: "orange", label: "Elevated" };
  if (n >= 1) return { tone: "yellow", label: "Low" };
  return { tone: "green", label: "Clean" };
};

export const phoneTone = (type) => {
  switch ((type || "").toLowerCase()) {
    case "wireless": return "blue";
    case "voip": return "teal";
    case "landline":
    default: return "slate";
  }
};

export const phoneTypeLabel = (type) =>
  (type || "").toLowerCase() === "voip" ? "VoIP" : type || "Unknown";

// "$5,405,000" -> "$5.4M"  (compact form for KPIs; full string kept elsewhere).
export const compactCurrency = (str) => {
  if (!str) return "—";
  const n = Number(String(str).replace(/[^0-9.]/g, ""));
  if (Number.isNaN(n)) return str;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return `$${n}`;
};

export function deriveData(raw) {
  if (!raw) return null;

  const info = raw.info || {};
  const addr = info.current_address || {};
  const prop = addr.property_details || {};

  const relatives = dedupeByName(raw.relatives);
  const associates = dedupeByName(raw.associates);
  const emails = raw.emails || [];
  const breaches = raw.breaches || {};
  const stealerLogs = raw.stealerLogs || {};
  const phones = raw.phone_numbers || [];
  const aliases = raw.aliases || [];

  // --- Addresses: keep raw count, but build a clean dated + grouped view ---
  const datedAddresses = (raw.past_addresses || [])
    .filter((a) => a.street && a.recorded)
    .map((a) => ({ ...a, ...parseRecorded(a.recorded) }))
    .sort((a, b) => b.ts - a.ts);

  const byYearMap = new Map();
  datedAddresses.forEach((a) => {
    const key = a.year ?? "Unknown";
    if (!byYearMap.has(key)) byYearMap.set(key, []);
    byYearMap.get(key).push(a);
  });
  const addressesByYear = [...byYearMap.entries()]
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([year, items]) => ({ year, items }));

  // Years of history across every dated record (+ current residence).
  const years = datedAddresses.map((a) => a.year).filter(Boolean);
  const sinceYear = parseRecorded(addr.since).year;
  if (sinceYear) years.push(sinceYear);
  const nowYear = new Date().getFullYear();
  const minYear = years.length ? Math.min(...years) : nowYear;
  const yearsOfHistory = Math.max(0, nowYear - minYear);

  // --- Security roll-up ---
  const security = {
    byEmail: emails.map((email) => {
      const b = breaches[email] ?? 0;
      const logs = stealerLogs[email] ?? 0;
      return { email, breaches: b, logs, risk: riskFor(b) };
    }),
  };
  security.totalEmails = emails.length;
  security.totalBreaches = security.byEmail.reduce((s, e) => s + e.breaches, 0);
  security.compromised = security.byEmail.filter((e) => e.breaches > 0).length;
  security.safe = security.totalEmails - security.compromised;
  security.stealerHits = security.byEmail.filter((e) => e.logs > 0).length;

  // --- Deterministic "profile completeness" score (0-100) ---
  const score = Math.min(
    99,
    15 +
      (phones.length ? 8 : 0) +
      (emails.length ? 8 : 0) +
      (prop.estimated_value ? 12 : 0) +
      (relatives.length ? 10 : 0) +
      (associates.length ? 10 : 0) +
      (aliases.length ? 6 : 0) +
      ((raw.past_addresses || []).length ? 16 : 0) +
      (info.marital_status ? 5 : 0) +
      (info.age ? 5 : 0)
  );

  const kpis = [
    { key: "addresses", label: "Total Addresses", value: (raw.past_addresses || []).length, icon: "faLocationDot" },
    { key: "phones", label: "Phone Numbers", value: phones.length, icon: "faPhone" },
    { key: "emails", label: "Emails", value: emails.length, icon: "faEnvelope" },
    { key: "aliases", label: "Aliases", value: aliases.length, icon: "faUserTag" },
    { key: "relatives", label: "Relatives", value: relatives.length, icon: "faUsers" },
    { key: "associates", label: "Associates", value: associates.length, icon: "faUserGroup" },
    { key: "years", label: "Years of History", value: yearsOfHistory, icon: "faClockRotateLeft" },
    { key: "breached", label: "Breached Emails", value: security.compromised, icon: "faTriangleExclamation", tone: security.compromised ? "orange" : "green" },
    { key: "value", label: "Property Value", display: compactCurrency(prop.estimated_value), icon: "faSackDollar", tone: "blue" },
  ];

  return {
    raw, info, addr, prop,
    relatives, associates, emails, breaches, stealerLogs, phones, aliases,
    datedAddresses, addressesByYear,
    yearsOfHistory, security, score, kpis,
  };
}

export const TABS = [
  { key: "overview", label: "Overview", icon: "faGauge" },
  { key: "timeline", label: "Timeline", icon: "faClockRotateLeft" },
  { key: "addresses", label: "Addresses", icon: "faLocationDot" },
  { key: "phones", label: "Phones", icon: "faPhone" },
  { key: "emails", label: "Emails", icon: "faEnvelope" },
  { key: "property", label: "Property", icon: "faHouse" },
  { key: "relatives", label: "Relatives", icon: "faUsers" },
  { key: "associates", label: "Associates", icon: "faUserGroup" },
  { key: "aliases", label: "Aliases", icon: "faUserTag" },
  { key: "security", label: "Security", icon: "faShieldHalved" },
  { key: "raw", label: "Raw JSON", icon: "faFileCode" },
];
