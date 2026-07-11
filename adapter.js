/**
 * adapter.js
 * ----------
 * Transforms the raw `Leif_L_Rogers.json` structure into the schema that
 * `profile.html` expects.
 *
 * ES module — usable two ways:
 *   1. Node CLI — `node adapter.js [input.json] [output.json]`
 *                 Reads the raw file and writes the transformed `data.json`.
 *   2. Import   — `import { transformProfile } from './adapter.js'`
 *                 (Node or a browser <script type="module">).
 *
 * `transformProfile` is a PURE function: same input -> same output, no side
 * effects, and never throws on missing/blank fields.
 */

// ---------- small helpers ----------
const isArr = Array.isArray;
const arr = (v) => (isArr(v) ? v : []);
const str = (v) => (v === null || v === undefined ? "" : String(v).trim());

/**
 * Transform raw source data into the profile.html schema.
 * @param {object} raw - parsed Leif_L_Rogers.json
 * @returns {object} data in profile.html's expected shape
 */
export function transformProfile(raw) {
  const src = raw && typeof raw === "object" ? raw : {};
  const info = src.info && typeof src.info === "object" ? src.info : {};

  return {
    profile: mapProfile(info),
    current_address: mapCurrentAddress(info.current_address),
    past_addresses: mapPastAddresses(src.past_addresses),
    contacts: mapContacts(src.phone_numbers, src.emails, src.breaches),
    aliases: mapAliases(src.aliases),
    associates: mapAssociates(src.relatives, src.associates),
    records: mapRecords(src),
  };
}

// ---------- profile ----------
function mapProfile(info) {
  return {
    name: str(info.full_name) || str(info.name),
    location: str(info.location),
    age: info.age,
    // Source has no occupation field — leave blank rather than fabricate.
    occupation: "",
    status: str(info.marital_status),
    // No image in source; omit so the page renders initials.
    image: "",
  };
}

// ---------- current address ----------
function mapCurrentAddress(ca) {
  if (!ca || typeof ca !== "object") return null;
  const pd = ca.property_details && typeof ca.property_details === "object" ? ca.property_details : {};
  return {
    street: str(ca.street),
    city: str(ca.city),
    state: str(ca.state),
    zip: str(ca.zip_code), // zip_code -> zip
    since: str(ca.since),
    details: {
      type: str(pd.land_use), // land_use -> type
      bedrooms: pd.bedrooms,
      bathrooms: pd.bathrooms,
      square_feet: str(pd.square_feet),
      year_built: str(pd.year_built),
      estimated_value: str(pd.estimated_value),
    },
  };
}

// ---------- past addresses ----------
function mapPastAddresses(list) {
  return arr(list).map((a) => ({
    street: str(a.street),
    city: str(a.city),
    state: str(a.state),
    zip: str(a.zip_code), // zip_code -> zip
    period: str(a.recorded), // recorded -> period
  }));
}

// ---------- contacts (phones + emails) ----------
function mapContacts(phones, emails, breaches) {
  const contacts = [];
  const breachMap = breaches && typeof breaches === "object" ? breaches : {};

  // Phones -> { type: "Phone", value, label }
  arr(phones).forEach((p) => {
    const value = str(p.number);
    if (!value) return;
    contacts.push({
      type: "Phone",
      value,
      label: str(p.type), // "Landline" / "Wireless" / "Voip"
    });
  });

  // Emails -> { type: "Email", value, label }
  // Surface breach counts (the only security signal the schema can carry).
  arr(emails).forEach((e) => {
    const value = str(e);
    if (!value) return;
    const count = breachMap[value];
    let label = "";
    if (typeof count === "number" && count > 0) {
      label = count === 1 ? "1 breach" : `${count} breaches`;
    }
    contacts.push({ type: "Email", value, label });
  });

  return contacts;
}

// ---------- aliases (dedupe, drop blanks) ----------
function mapAliases(list) {
  const seen = new Set();
  const out = [];
  arr(list).forEach((a) => {
    const v = str(a);
    const key = v.toLowerCase();
    if (v && !seen.has(key)) {
      seen.add(key);
      out.push(v);
    }
  });
  return out;
}

// ---------- associates (relatives + associates, deduped) ----------
function mapAssociates(relatives, associates) {
  const out = [];
  const seen = new Set();

  const add = (person, relationship) => {
    const name = str(person && person.name);
    if (!name) return;
    const key = name.toLowerCase();
    if (seen.has(key)) return; // relatives list has trailing duplicates
    seen.add(key);
    const age = person.age;
    const rel = typeof age === "number" ? `${relationship}, age ${age}` : relationship;
    out.push({ name, relationship: rel });
  };

  arr(relatives).forEach((p) => add(p, "Relative"));
  arr(associates).forEach((p) => add(p, "Associate"));
  return out;
}

// ---------- records ----------
// The source has no regulatory/court records. `breaches` / `stealerLogs`
// don't fit the agency/case schema, so they are surfaced on email contacts
// instead (see mapContacts). Return empty, schema-valid record buckets.
function mapRecords(/* src */) {
  return { regulatory: [], court: [] };
}

// ---------- Node CLI entry point ----------
// Runs only when executed directly (`node adapter.js`), not when imported.
if (typeof process !== "undefined" && process.argv && process.argv[1]) {
  const invokedPath = process.argv[1].replace(/\\/g, "/");
  const thisPath = import.meta.url.replace(/^file:\/\/\/?/, "").replace(/\\/g, "/");
  const isMain = thisPath.toLowerCase().endsWith(invokedPath.toLowerCase().replace(/^\/*/, ""))
    || invokedPath.toLowerCase().endsWith("adapter.js");

  if (isMain) {
    const fs = await import("node:fs");
    const path = await import("node:path");

    const inputFile = process.argv[2] || "Leif_L_Rogers.json";
    const outputFile = process.argv[3] || "data.json";

    try {
      const raw = JSON.parse(fs.readFileSync(path.resolve(inputFile), "utf8"));
      const transformed = transformProfile(raw);
      fs.writeFileSync(path.resolve(outputFile), JSON.stringify(transformed, null, 2), "utf8");
      console.log(`✓ Transformed "${inputFile}" -> "${outputFile}"`);
      console.log(
        `  name: ${transformed.profile.name || "(none)"} | ` +
          `past_addresses: ${transformed.past_addresses.length} | ` +
          `contacts: ${transformed.contacts.length} | ` +
          `aliases: ${transformed.aliases.length} | ` +
          `associates: ${transformed.associates.length}`
      );
    } catch (err) {
      console.error(`✗ Transform failed: ${err.message}`);
      process.exit(1);
    }
  }
}
