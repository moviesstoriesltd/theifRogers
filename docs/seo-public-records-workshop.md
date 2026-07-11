# SEO Workshop Handout
## Structuring Public-Records Websites for Healthcare Compliance Professionals

> All materials in this handout are generic, hypothetical, and instructional. Every
> example uses placeholders such as `[PROFESSIONAL_NAME]`, `[ENTITY_NAME]`, `[STATE]`,
> `[DOMAIN]`, and `[CASE_NUMBER]`. Nothing here refers to a specific individual or entity.

**Labeling convention**
- **EXAMPLE** — demonstration content
- **TEMPLATE** — reusable structure
- **PLACEHOLDER** — generic content

A note that belongs in this specific curriculum: public-records SEO carries a duty of
accuracy. Throughout, the templates model the single most important habit for this content
type — **distinguish a documented _finding_ (e.g., a board decision) from an _allegation_
(e.g., a civil complaint)**, and attribute every claim to its source. This is both an
ethical standard and the primary legal safeguard for the site operator.

---

## Table of Contents

**Part 1 — Core Templates**
1. XML Sitemap
2. SEO Header Structure
3. Meta Tags
4. Keyword Strategy (Methodology)
5. Schema Markup (JSON-LD)
6. Technical SEO Checklist
7. Content Rewrite Examples

**Part 2 — Advanced Modules, Worksheet & Facilitator Guide**
8. Information Architecture & Internal Linking
9. Content Freshness & Update Cadence
10. Image & Media SEO
11. Measurement, KPIs & Tooling
12. What to Avoid (Anti-Patterns)
13. Fill-in-the-Blanks Worksheet
14. Facilitator Session Outline

---

# Part 1 — Core Templates

## 1. XML Sitemap

**TEMPLATE — `sitemap.xml` (static)**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://[DOMAIN]/</loc>
    <lastmod>[YYYY-MM-DD]</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://[DOMAIN]/#summary</loc>
    <lastmod>[YYYY-MM-DD]</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://[DOMAIN]/#regulatory-actions</loc>
    <lastmod>[YYYY-MM-DD]</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://[DOMAIN]/#court-proceedings</loc>
    <lastmod>[YYYY-MM-DD]</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://[DOMAIN]/#documents</loc>
    <lastmod>[YYYY-MM-DD]</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

**TEMPLATE — dynamic sitemap (Next.js App Router, `app/sitemap.js`)**
```js
// Generates /sitemap.xml automatically. Replace BASE and the sections array.
const BASE = "https://[DOMAIN]";

export default function sitemap() {
  const sections = ["", "#summary", "#regulatory-actions", "#court-proceedings", "#documents"];
  const lastModified = new Date();
  return sections.map((path) => ({
    url: `${BASE}/${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "" ? 1.0 : 0.8,
  }));
}
```

**TEMPLATE — sitemap index** (use when you exceed 50,000 URLs or 50 MB; split into multiple child sitemaps)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://[DOMAIN]/sitemap-core.xml</loc>
    <lastmod>[YYYY-MM-DD]</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://[DOMAIN]/sitemap-records.xml</loc>
    <lastmod>[YYYY-MM-DD]</lastmod>
  </sitemap>
</sitemapindex>
```

**TEMPLATE — `robots.txt`**
```
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://[DOMAIN]/sitemap.xml
```

---

## 2. SEO Header Structure

**Rule:** exactly **one `<h1>` per page**; `<h2>` for top-level sections; `<h3>` for items
nested under an `<h2>`. Never skip levels, and never pick a heading tag for its size (style
with CSS instead).

**TEMPLATE — heading outline**
```html
<h1>[PROFESSIONAL_NAME] — Public Record of Regulatory Actions & Court Proceedings</h1>

  <h2>Executive Summary: What the Record Shows</h2>

  <h2>Documented Findings on [PROFESSIONAL_NAME]</h2>
    <h3>[STATE] Medical Board — [DECISION_TYPE] ([YEAR])</h3>
    <h3>[STATE] Medical Board — [ACTION_TYPE] ([YEAR])</h3>

  <h2>Court Proceedings & Civil Allegations</h2>
    <h3>[CASE_CAPTION] — Case No. [CASE_NUMBER]</h3>

  <h2>Public Documents & Sources</h2>

  <h2>Frequently Asked Questions</h2>
```

**PLACEHOLDER — labeling convention inside headings/sections**
- Regulatory board outcomes → label as **Finding** (adjudicated).
- Civil/whistleblower/pending matters → label as **Allegation** or **Pending**.

---

## 3. Meta Tags

**TEMPLATE — core meta (place in `<head>`)**
```html
<title>[PROFESSIONAL_NAME] | Regulatory Actions, Proceedings & Public Record</title>
<meta name="description"
      content="Documented findings on [PROFESSIONAL_NAME] from state regulatory boards and court records, presented with sources. Findings and allegations are clearly distinguished." />
<link rel="canonical" href="https://[DOMAIN]/" />
<meta name="robots" content="index, follow, max-image-preview:large" />
```

**TEMPLATE — Open Graph + Twitter (social/link previews)**
```html
<meta property="og:type" content="website" />
<meta property="og:title" content="[PROFESSIONAL_NAME] | Public Record & Regulatory History" />
<meta property="og:description" content="Documented regulatory actions and court records for [PROFESSIONAL_NAME], with cited sources." />
<meta property="og:url" content="https://[DOMAIN]/" />
<meta property="og:image" content="https://[DOMAIN]/og-cover.png" />
<meta property="og:site_name" content="[ENTITY_NAME] Public Records Archive" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="[PROFESSIONAL_NAME] | Public Record & Regulatory History" />
<meta name="twitter:description" content="Documented regulatory actions and court records, with cited sources." />
<meta name="twitter:image" content="https://[DOMAIN]/og-cover.png" />
```

**TEMPLATE — Next.js Metadata API (`app/layout.js` or `page.js`)**
```js
export const metadata = {
  metadataBase: new URL("https://[DOMAIN]"),
  title: {
    default: "[PROFESSIONAL_NAME] | Regulatory Actions, Proceedings & Public Record",
    template: "%s | [ENTITY_NAME] Public Records Archive",
  },
  description:
    "Documented findings on [PROFESSIONAL_NAME] from state regulatory boards and court records, with sources. Findings and allegations are distinguished.",
  keywords: ["[PROFESSIONAL_NAME]", "[STATE] Medical Board", "public records", "regulatory actions", "court proceedings"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: { type: "website", url: "/", siteName: "[ENTITY_NAME] Public Records Archive" },
  twitter: { card: "summary_large_image" },
};
```

**Character-length guidance:** Title ≈ 50–60 chars; meta description ≈ 140–160 chars.
Front-load the most specific, factual term.

---

## 4. Keyword Strategy (Methodology)

The goal for public-records content is to match **information-seeking intent** — people
trying to _verify_ a record — not to manufacture sensational hooks.

**PLACEHOLDER — keyword clusters**

| Cluster | Pattern | Generic examples |
|---|---|---|
| Entity + record type | `[PROFESSIONAL_NAME]` + modifier | "[PROFESSIONAL_NAME] medical board", "[PROFESSIONAL_NAME] public record" |
| Regulatory body | `[STATE] [BOARD_TYPE]` | "[STATE] Medical Board decision", "[STATE] Department of Health action" |
| Document type | official filing names | "decision and order", "verified cross-complaint", "accusation", "consent order" |
| Procedural status | neutral status terms | "probation", "stayed suspension", "pending proceeding" |
| Informational | broad discovery terms | "public record", "regulatory actions", "court proceedings", "license status lookup" |
| Spelling variants | common misspellings of a name | include as `<meta>` keywords / natural body text, _not_ as deceptive cloaked content |

**Method:**
1. Seed with the entity + neutral record terms above.
2. Expand with the _actual_ document names in your dataset (case numbers, decision titles) — these are high-intent, low-competition long-tail terms.
3. Validate volume/intent in a keyword tool; keep only terms a records-verifier would type.
4. Map one primary intent per page/section; avoid keyword stuffing.
5. **Accuracy filter:** discard any phrasing that states an unproven claim as fact.
   "Regulatory actions" and "allegations" are defensible; accusatory epithets are not — and
   they also underperform, because they signal low quality to both readers and search engines.

---

## 5. Schema Markup (JSON-LD)

Use `application/ld+json`. For this content type, keep structured data **descriptive and
neutral** — describe the _website_ and _documents/sources_, and represent outcomes with
accurate, attributed language. Do **not** encode accusations of wrongdoing as
machine-readable "facts."

**TEMPLATE — WebSite**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "[ENTITY_NAME] Public Records Archive",
  "url": "https://[DOMAIN]/",
  "description": "A documentary archive of public regulatory and court records for [PROFESSIONAL_NAME]."
}
</script>
```

**TEMPLATE — Article / Report (the documentary content)**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Report",
  "headline": "Public Record of Regulatory Actions & Court Proceedings — [PROFESSIONAL_NAME]",
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]",
  "author": { "@type": "Organization", "name": "[ENTITY_NAME]" },
  "publisher": { "@type": "Organization", "name": "[ENTITY_NAME]" },
  "about": "Regulatory findings and civil allegations documented in public records.",
  "citation": [
    "[STATE] Medical Board — [DECISION_TYPE] ([YEAR])",
    "[COURT_NAME] — Case No. [CASE_NUMBER]"
  ]
}
</script>
```

**TEMPLATE — BreadcrumbList**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://[DOMAIN]/" },
    { "@type": "ListItem", "position": 2, "name": "Regulatory Actions", "item": "https://[DOMAIN]/#regulatory-actions" }
  ]
}
</script>
```

**TEMPLATE — FAQPage** (only for Q&A that is genuinely on the page)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is the current license status referenced in the record?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "According to [STATE] Medical Board records, the license is subject to [STATUS] as of [DATE]. See cited decision for details."
    }
  }]
}
</script>
```

**Guardrail note:** Avoid `@type: Person` markup that attaches negative attributes to a named
individual, and avoid `Rating`/`Review` schema that scores a person. Structured data is quoted
verbatim by search engines and treated as a factual assertion by the publisher — keep it to
neutral, verifiable descriptors and citations.

---

## 6. Technical SEO Checklist

**Crawlability & indexing**
- [ ] `robots.txt` present and references the sitemap
- [ ] `sitemap.xml` valid, submitted in Google Search Console & Bing Webmaster Tools
- [ ] One self-referencing `<link rel="canonical">` per URL
- [ ] No accidental `noindex` on pages meant to rank
- [ ] Clean, readable URL slugs; consistent trailing-slash policy

**On-page structure**
- [ ] Exactly one `<h1>`; logical `<h2>`/`<h3>` nesting (no skipped levels)
- [ ] Unique, length-appropriate `<title>` and meta description per page
- [ ] Descriptive `alt` text on every meaningful image
- [ ] Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`
- [ ] Internal links between related sections with descriptive anchor text

**Structured data**
- [ ] JSON-LD validates in the Rich Results Test / Schema validator
- [ ] Schema matches visible on-page content (no markup-only claims)
- [ ] Neutral, attributed language; no accusatory or unverifiable assertions

**Performance & Core Web Vitals**
- [ ] LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] Images optimized (next-gen formats, width/height set, lazy-loaded)
- [ ] Fonts loaded efficiently (`display: swap`, preloaded/subsetted)
- [ ] Minified CSS/JS; critical CSS inlined where helpful

**Mobile & accessibility (ranking-adjacent)**
- [ ] Responsive at all breakpoints; tap targets adequately sized
- [ ] `<html lang>` set; sufficient color contrast; keyboard navigable

**Trust & E-E-A-T for public records**
- [ ] Every claim attributed to a named, dated, linkable source
- [ ] **Findings vs. allegations** clearly labeled in copy and headings
- [ ] Visible "last updated" date and a corrections/contact method
- [ ] Publisher identity and sourcing methodology disclosed

**Monitoring**
- [ ] Search Console coverage/enhancements monitored
- [ ] Analytics for query intent and section engagement
- [ ] Periodic re-crawl after content updates (refresh `lastmod`)

---

## 7. Content Rewrite Examples (generic)

**EXAMPLE — intro paragraph**
- _Original (generic):_ "This site contains public records and regulatory information about medical professionals."
- _Optimized (generic):_ "Access comprehensive public records, regulatory actions, and court proceedings for medical professionals. This information source provides documented findings from state medical boards and civil courts, with each item attributed to its original source."

**EXAMPLE — section lead that models finding vs. allegation**
- _Optimized (generic):_ "According to the [STATE] Medical Board's [YEAR] Decision and Order, [PROFESSIONAL_NAME] was subject to [OUTCOME] (a documented finding). Separately, a civil cross-complaint (Case No. [CASE_NUMBER]) _alleges_ [CLAIM]; these allegations remain unadjudicated."

**EXAMPLE — H1 rewrite**
- _Weak/risky (generic):_ subjective epithets or unproven labels in the H1.
- _Strong (generic):_ "[PROFESSIONAL_NAME] — Public Record of Regulatory Actions & Court Proceedings."

---

# Part 2 — Advanced Modules, Worksheet & Facilitator Guide

## 8. Information Architecture & Internal Linking

Public-records sites live or die on **crawl clarity** — search engines must understand which
page is authoritative for each topic.

**PLACEHOLDER — recommended structure**
```
/                         → Overview (hub / pillar page)
/regulatory-actions       → Cluster page: board decisions
   /regulatory-actions/[STATE]-[YEAR]-decision
/court-proceedings        → Cluster page: civil matters
   /court-proceedings/case-[CASE_NUMBER]
/documents                → Source library
/about  /methodology      → E-E-A-T & sourcing disclosure
/corrections              → Corrections & contact
```

**TEMPLATE — internal-link rules**
- Pillar page links **down** to every cluster page; each cluster page links **up** to the pillar.
- Sibling cluster pages cross-link only where genuinely related (e.g., a board decision that references a civil case).
- Anchor text is **descriptive and neutral**: "[STATE] Medical Board [YEAR] decision," not "click here," and not an accusatory phrase.
- Every source-library document links to the page(s) that cite it, and vice-versa.

**Rule of thumb:** any page worth indexing should be reachable within **3 clicks** of the homepage.

---

## 9. Content Freshness & Update Cadence

Regulatory/court records change (appeals, status updates, dismissals). Freshness signals
matter _and_ accuracy obligations are ongoing.

**TEMPLATE — per-page freshness block**
```html
<p class="record-meta">
  Source: [SOURCE_NAME] · Filed/Decided: [YYYY-MM-DD] ·
  Last verified: <time datetime="[YYYY-MM-DD]">[YYYY-MM-DD]</time>
</p>
```

**PLACEHOLDER — cadence policy**
| Content type | Re-verify | On change |
|---|---|---|
| Active/pending proceedings | Monthly | Update copy + `dateModified` + `lastmod` |
| Closed findings (adjudicated) | Quarterly | Update only if superseded/appealed |
| Source library links | Quarterly | Fix rot; archive a copy (e.g., permalink) |

**Correction protocol (models good E-E-A-T):** when a record is updated, amended, or dismissed,
revise the on-page statement, timestamp it, and — for material changes — add a brief
"Correction / Update" note rather than silently editing.

---

## 10. Image & Media SEO

**TEMPLATE — accessible, indexable image**
```html
<img
  src="/documents/[STATE]-[YEAR]-decision-p1.webp"
  alt="Page 1 of the [STATE] Medical Board [DECISION_TYPE], dated [YYYY-MM-DD]"
  width="1200" height="1553" loading="lazy" decoding="async" />
```

**Checklist:**
- [ ] `alt` describes the document/scene factually and neutrally
- [ ] Descriptive file names (`[STATE]-[YEAR]-decision.webp`, not `IMG_2048.webp`)
- [ ] Next-gen formats (WebP/AVIF), explicit `width`/`height` to prevent layout shift
- [ ] For scanned PDFs: provide an HTML transcript so text is crawlable/accessible
- [ ] Add image entries to the sitemap for a media-heavy source library

---

## 11. Measurement, KPIs & Tooling

**PLACEHOLDER — metrics that reflect _information-seeking_ success**
| Goal | KPI | Tool |
|---|---|---|
| Discoverability | Indexed pages, impressions by query | Search Console |
| Intent match | CTR on record-verification queries | Search Console |
| Content quality | Scroll depth / time on record sections | Analytics |
| Technical health | Core Web Vitals pass rate, crawl errors | Search Console / Lighthouse / CrUX |
| Trust | % of claims with a linked source | Manual audit |

**Validation tools:** XML Sitemap validator · Rich Results Test · Schema Markup Validator ·
Lighthouse / PageSpeed Insights · a broken-link crawler.

---

## 12. What to Avoid (Anti-Patterns Specific to This Vertical)

- **Stating allegations as facts** in titles, headings, meta, or schema. (Accuracy + defamation risk; also a quality signal to search engines.)
- **Rating/Review or negative Person schema** attached to a named individual.
- **Cloaking / hidden keyword text**, including deceptive use of name misspellings.
- **Doorway pages** that duplicate a name across near-identical pages to flood SERPs.
- **Unsourced superlatives** ("worst," "notorious"). Prefer attributed, dated facts.
- **Orphan pages** (indexable but unlinked) and **thin pages** (a heading with no substantive, sourced content).

---

## 13. Fill-in-the-Blanks Worksheet (attendee handout)

**A. Page inventory**
```
Primary URL:            https://[DOMAIN]/______________________
Page intent (1 line):   ____________________________________
Primary keyword:        ____________________________________
```

**B. Headings**
```
H1: __________________ — Public Record of Regulatory Actions & Court Proceedings
H2: Executive Summary: What the Record Shows
H2: Documented Findings on __________________
   H3: [STATE] ___________ Board — ___________ (____)
H2: Court Proceedings & Civil Allegations
   H3: ___________________ — Case No. ______________
```

**C. Meta**
```
Title (<=60): ______________________ | Regulatory Actions, Proceedings & Public Record
Description (<=160): Documented findings on ______________________ from __________ and court records, with sources.
Canonical: https://[DOMAIN]/______________________
```

**D. Source-accuracy check (do before publishing every claim)**
```
Claim: _________________________________________________
Type (circle):   FINDING   /   ALLEGATION   /   PENDING
Source name & date: ____________________________________
Source link: ___________________________________________
Verified by / on: ______________________________________
```

**E. Schema chosen (circle all that apply):** WebSite · Report/Article · BreadcrumbList · FAQPage
`Validated in Rich Results Test?  [ ] Yes   [ ] No`

---

## 14. Facilitator Session Outline (90 minutes)

| Time | Segment | Activity |
|---|---|---|
| 0–10 | Framing | Why accuracy is the ranking _and_ legal foundation for public-records SEO |
| 10–25 | Headings & metadata | Walk Modules 2–3; attendees fill Worksheet B–C for a sample page |
| 25–45 | Sitemap & robots | Build a `sitemap.xml` from Module 1; submit-flow demo |
| 45–65 | Schema lab | Fill a JSON-LD template (Module 5); validate live |
| 65–80 | Accuracy drill | Worksheet D — classify sample claims as finding vs. allegation, attribute each |
| 80–90 | Technical checklist | Run Module 6 against a demo site; assign follow-ups |

**Learning outcomes:** attendees can (1) produce a valid sitemap and heading hierarchy,
(2) write neutral, high-intent metadata, (3) implement and validate non-defamatory schema, and
(4) apply a source-attribution workflow that distinguishes findings from allegations.

---

### Instructor's closing note

The techniques above are standard, neutral, and portable to any public-information site. For
this subject matter specifically, the accuracy discipline (attribution + finding/allegation
labeling) is not a footnote — it is what makes the page rank _and_ keeps it defensible. If you
later apply these templates to a live site, the one step that can't be templated is verifying
that each on-page statement matches its cited source before publication.

*End of handout — Modules 1–14 (templates, examples, checklist, worksheet, and facilitator guide).*
