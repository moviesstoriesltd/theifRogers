/* ==========================================================================
   COURT-RECORDS DATASET — single source of truth for /records
   --------------------------------------------------------------------------
   Every field is either (a) transcribed from a real source we hold, or
   (b) null / [] so the UI can render an honest "awaiting verified source"
   state. NOTHING here is invented. Data provenance per case:

     • metadata      → UniCourt public case-index (case no., court, type,
                        filing date, party role, docket snippets)
     • verified      → primary pleading / regulator / docket confirmed and
                        already transcribed in app/report/page.jsx

   `sourceUrl` values are kept for internal provenance ONLY. Per the platform
   spec, record pages never render outbound links or raw URLs to users —
   citations surface as in-theme popovers describing the filing.
   ========================================================================== */

export const REVIEW_DATE = "2026-07-21";

// Reliability tiers, mirrored from the litigation report's A/B/C grading.
export const TIERS = {
  verified: {
    label: "Primary source verified",
    tone: "green",
    blurb: "A primary filing, docket entry, or regulator decision has been reviewed.",
  },
  indexed: {
    label: "Court-index confirmed",
    tone: "blue",
    blurb: "Confirmed in the public court-record index; underlying filings not yet reviewed.",
  },
  metadata: {
    label: "Index metadata only",
    tone: "slate",
    blurb: "Case exists in the public index; no filing content has been sourced yet.",
  },
};

// Honest placeholder used everywhere a field has no sourced content.
export const PENDING = "Awaiting verified source — not yet reviewed.";

/* --------------------------------------------------------------------------
   THE 19 CASES
   -------------------------------------------------------------------------- */
const CASES = [
  {
    slug: "von-lutzow-federal-2026",
    title: "Danielle Von Lutzow v. Leif L. Rogers, M.D., Professional Corporation, et al.",
    shortTitle: "Von Lutzow v. Rogers (Federal removal)",
    caseNumber: "2:26-cv-05135",
    jurisdiction: "U.S. District Court — Central District of California",
    courtSystem: "Federal",
    caseType: "Labor — Other Labor",
    filed: "2026-05-13",
    tier: "indexed",
    rogersRole: "Defendant / Counter-Claimant",
    theme: "employment",
    entities: ["Danielle Von Lutzow", "Robin Chamberlain"],
    parties: [
      { name: "Danielle Von Lutzow", role: "Plaintiff", represented: null },
      { name: "Leif L. Rogers, MD (Professional Corporation)", role: "Defendant / Counter-Claimant", represented: true },
      { name: "Robin Chamberlain", role: "Co-defendant (per cover sheet)", represented: null },
    ],
    overview:
      "The state employment/labor action (26STCV11299) was removed to federal court on May 13, 2026. Rogers and his professional corporation appear as defendants and filed a counter-claim on removal.",
    timeline: [
      { date: "2026-05-13", text: "Notice of Removal filed by Defendant (Receipt No. ACACDC-42259146; fee $405)." },
      { date: "2026-05-13", text: "Civil Cover Sheet filed by defendants (Robin Chamberlain; Professional Corporation)." },
      { date: "2026-05-13", text: "Defendants Leif L. Rogers, MD, Professional Corporation appearance docketed." },
    ],
    citations: [
      {
        filing: "Notice of Removal",
        docket: "#1",
        court: "U.S. District Court, C.D. Cal.",
        date: "2026-05-13",
        reliability: "indexed",
        note: "Docket entry confirmed in the public case index. Removal moves the underlying state labor case into federal court.",
      },
    ],
    relatedNote: "Federal removal of the state labor case 26STCV11299.",
    sourceUrl: null,
  },
  {
    slug: "von-lutzow-labor-2026",
    title: "Danielle Von Lutzow vs Leif L. Rogers, MD, Professional Corporation, et al.",
    shortTitle: "Von Lutzow v. Rogers (State labor)",
    caseNumber: "26STCV11299",
    jurisdiction: "California — Los Angeles County Superior Court",
    courtSystem: "State (California)",
    caseType: "Labor — Other Labor",
    filed: "2026-04-08",
    tier: "verified",
    rogersRole: "Defendant",
    theme: "employment",
    entities: ["Danielle Von Lutzow"],
    parties: [
      { name: "Danielle Von Lutzow", role: "Plaintiff", represented: null },
      { name: "Leif L. Rogers, MD Professional Corporation (a California Professional Corporation)", role: "Defendant", represented: true },
    ],
    overview:
      "A public case index states that Danielle Von Lutzow filed a general employment/labor case in Los Angeles County on April 8, 2026 against Leif L. Rogers, MD, Professional Corporation and additional defendant(s).",
    claims: [
      "The precise employment causes of action, alleged events, and damages are not visible in the accessible index and have not been sourced.",
    ],
    disposition:
      "Pending or recent as of the review date; no disposition was verified. The complaint, answer, case-management filings, and any arbitration petition should be obtained.",
    timeline: [
      { date: "2026-04-08", text: "Complaint filed by Danielle Von Lutzow (Plaintiff)." },
      { date: "2026-04-08", text: "Summons on Complaint issued and filed by Plaintiff." },
      { date: "2026-04-08", text: "Civil Case Cover Sheet filed by Plaintiff." },
    ],
    citations: [
      {
        filing: "Case index record",
        docket: "26STCV11299",
        court: "Los Angeles County Superior Court",
        date: "2026-04-08",
        reliability: "indexed",
        note: "Employment/labor filing confirmed in the public case index. Later removed to federal court (see related case).",
      },
    ],
    relatedNote: "Subsequently removed to federal court as 2:26-cv-05135.",
    sourceUrl:
      "https://trellis.law/case/26stcv11299/danielle-von-lutzow-vs-leif-l-rogers-md-professional-corporation-et-al",
  },
  {
    slug: "rogers-v-dyer-2025",
    title: "Leif L Rogers MD vs. Brian Dyer",
    shortTitle: "Rogers v. Brian Dyer",
    caseNumber: "25-006224-CI",
    jurisdiction: "Florida — Pinellas County Court System",
    courtSystem: "State (Florida)",
    caseType: "Other — Other Judgment",
    filed: "2025-11-04",
    tier: "metadata",
    rogersRole: "Plaintiff",
    theme: "other-judgment",
    entities: ["Brian Dyer"],
    parties: [
      { name: "Leif L Rogers MD", role: "Plaintiff", represented: true },
      { name: "Brian Dyer", role: "Defendant", represented: null },
    ],
    overview: null,
    timeline: [],
    citations: [
      {
        filing: "Case index record",
        docket: "25-006224-CI",
        court: "Pinellas County, Florida",
        date: "2025-11-04",
        reliability: "metadata",
        note: "One of the few actions where Rogers is the plaintiff. Nature of the judgment sought is not yet sourced.",
      },
    ],
    sourceUrl: null,
  },
  {
    slug: "medical-buildings-2023",
    title:
      "Medical Buildings of America LLC vs Leif L. Rogers MD, Professional Corporation, a California Corporation",
    shortTitle: "Medical Buildings of America v. Rogers",
    caseNumber: "23SMCV05156",
    jurisdiction: "California — Los Angeles County Superior Court",
    courtSystem: "State (California)",
    caseType: "Property — Commercial Eviction",
    filed: "2023-11-01",
    tier: "indexed",
    rogersRole: "Defendant",
    theme: "commercial-eviction",
    entities: ["Medical Buildings of America LLC"],
    parties: [
      { name: "Medical Buildings of America LLC", role: "Plaintiff", represented: null },
      { name: "Leif L. Rogers MD Professional Corporation (a California Corporation)", role: "Defendant", represented: false },
    ],
    overview:
      "A commercial unlawful-detainer (eviction) action brought against the professional corporation. A request for dismissal was filed within a month of the complaint.",
    timeline: [
      { date: "2023-11-01", text: "Complaint filed by Medical Buildings of America LLC (Plaintiff)." },
      { date: "2023-11-01", text: "Summons on Complaint issued and filed by Plaintiff." },
      { date: "2023-11-29", text: "Request for Dismissal filed by Plaintiff." },
    ],
    citations: [
      {
        filing: "Case index record",
        docket: "23SMCV05156",
        court: "Los Angeles County Superior Court",
        date: "2023-11-01",
        reliability: "indexed",
        note: "Commercial eviction confirmed in the index. The recorded dismissal request suggests early resolution, but the terms are not sourced.",
      },
    ],
    relatedNote: "One of several commercial landlord/eviction actions against the practice.",
    sourceUrl: null,
  },
  {
    slug: "wang-anesthesia-2023",
    title: "Wang Anesthesia Nursing Management, Inc. vs Leif Rogers, et al.",
    shortTitle: "Wang Anesthesia Nursing Mgmt v. Rogers",
    caseNumber: "23SMCV04838",
    jurisdiction: "California — Los Angeles County Superior Court",
    courtSystem: "State (California)",
    caseType: "Contract — Other Contract",
    filed: "2023-10-12",
    tier: "indexed",
    rogersRole: "Defendant",
    theme: "contract",
    entities: ["Wang Anesthesia Nursing Management, Inc."],
    parties: [
      { name: "Wang Anesthesia Nursing Management, Inc.", role: "Plaintiff", represented: null },
      { name: "Leif L. Rogers MD Professional Corporation", role: "Defendant", represented: false },
    ],
    overview:
      "A contract action in which a default was entered against the Rogers defendants in March 2024.",
    timeline: [
      { date: "2024-03-08", text: "Filing by Plaintiff as to Leif Rogers (Defendant)." },
      { date: "2024-03-08", text: "Default entered as to Leif Rogers." },
    ],
    citations: [
      {
        filing: "Case index record",
        docket: "23SMCV04838",
        court: "Los Angeles County Superior Court",
        date: "2023-10-12",
        reliability: "indexed",
        note: "Contract action confirmed in the index; a default entry is recorded. The underlying contract and amount are not yet sourced.",
      },
    ],
    sourceUrl: null,
  },
  {
    slug: "butker-2021",
    title: "Vanessa Butker vs Leif L. Rogers, MD, Professional Corporation",
    shortTitle: "Vanessa Butker v. Rogers",
    caseNumber: "21STCV42758",
    jurisdiction: "California — Los Angeles County Superior Court",
    courtSystem: "State (California)",
    caseType: "Labor — Other Labor",
    filed: "2021-11-19",
    tier: "indexed",
    rogersRole: "Defendant",
    theme: "employment",
    entities: ["Vanessa Butker"],
    parties: [
      { name: "Vanessa Butker", role: "Plaintiff", represented: null },
      { name: "Leif L. Rogers MD Professional Corporation", role: "Defendant", represented: true },
    ],
    overview:
      "An employment/labor action against the professional corporation. Docket entries show a stipulation and order, a substitution of attorney, and a (not-entered) request for dismissal.",
    timeline: [
      { date: "2022-04-21", text: "Stipulation and Order — Walter B. Batt for Defendant." },
      { date: "2022-06-28", text: "Substitution of Attorney filed by Leif L. Rogers, MD, Professional Corporation (Defendant)." },
      { date: "2022-12-29", text: "Request for Dismissal (Not Entered); party changes noted." },
    ],
    citations: [
      {
        filing: "Case index record",
        docket: "21STCV42758",
        court: "Los Angeles County Superior Court",
        date: "2021-11-19",
        reliability: "indexed",
        note: "Employment/labor action confirmed in the index. Note: an earlier report listed 'Butker v. Rogers' as an unverified lead; the court index now confirms the case number.",
      },
    ],
    sourceUrl: null,
  },
  {
    slug: "bank-of-the-west-2021",
    title:
      "Bank of the West, a California Banking Corporation vs Leif L. Rogers, MD, Professional Corporation, a California Corporation, et al.",
    shortTitle: "Bank of the West v. Rogers",
    caseNumber: "21STCV27481",
    jurisdiction: "California — Los Angeles County Superior Court",
    courtSystem: "State (California)",
    caseType: "Contract — Other Contract",
    filed: "2021-07-27",
    tier: "indexed",
    rogersRole: "Defendant",
    theme: "commercial-finance",
    entities: ["Bank of the West"],
    parties: [
      { name: "Bank of the West (a California banking corporation)", role: "Plaintiff", represented: null },
      { name: "Leif L. Rogers MD Professional Corporation (a California Corporation)", role: "Defendant", represented: false },
    ],
    overview:
      "A contract action by Bank of the West against the professional corporation, filed July 27, 2021.",
    timeline: [
      { date: "2021-07-27", text: "Complaint filed by Bank of the West (Plaintiff)." },
      { date: "2021-07-27", text: "Summons issued and filed by Plaintiff." },
      { date: "2021-07-27", text: "Case Cover Sheet filed by Plaintiff." },
    ],
    citations: [
      {
        filing: "Case index record",
        docket: "21STCV27481",
        court: "Los Angeles County Superior Court",
        date: "2021-07-27",
        reliability: "indexed",
        note: "Contract action confirmed in the index. Whether this is a loan, guaranty, or deposit dispute is not yet sourced.",
      },
    ],
    relatedNote: "Part of a cluster of commercial-finance/creditor actions.",
    sourceUrl: null,
  },
  {
    slug: "nhp-pmb-pasadena-2021",
    title: "NHP/PMB Pasadena LLC vs Leif L. Rogers, MD, Professional Corporation",
    shortTitle: "NHP/PMB Pasadena v. Rogers (2021)",
    caseNumber: "21GDCV00356",
    jurisdiction: "California — Los Angeles County Superior Court",
    courtSystem: "State (California)",
    caseType: "Property — Commercial Eviction",
    filed: "2021-03-10",
    tier: "indexed",
    rogersRole: "Defendant",
    theme: "commercial-eviction",
    entities: ["NHP/PMB Pasadena LLC"],
    parties: [
      { name: "NHP/PMB Pasadena LLC", role: "Plaintiff", represented: null },
      { name: "Leif L. Rogers MD Professional Corporation", role: "Defendant", represented: true },
    ],
    overview:
      "A commercial eviction action by NHP/PMB Pasadena LLC — the second matter involving this landlord entity. Docket entries include an answer, a status report, and a notice of withdrawal.",
    timeline: [
      { date: "2021-03-17", text: "Answer filed by Leif L. Rogers, MD, Professional Corporation (Defendant)." },
      { date: "2021-04-07", text: "Status Report filed by Defendant." },
      { date: "2021-06-11", text: "Notice (of Withdrawal) filed by Defendant." },
    ],
    citations: [
      {
        filing: "Case index record",
        docket: "21GDCV00356",
        court: "Los Angeles County Superior Court",
        date: "2021-03-10",
        reliability: "indexed",
        note: "Commercial eviction confirmed in the index. Same landlord entity as case 20STCV42735.",
      },
    ],
    relatedNote: "NHP/PMB Pasadena LLC also appears in 20STCV42735.",
    sourceUrl: null,
  },
  {
    slug: "navitas-credit-2021",
    title: "Navitas Credit Corp. vs. Leif L. Rogers, MD, Professional Corporation",
    shortTitle: "Navitas Credit Corp. v. Rogers",
    caseNumber: "CA21-0060",
    jurisdiction: "Florida — Seventh Judicial Circuit, St. Johns County",
    courtSystem: "State (Florida)",
    caseType: "Contract — Debt Collection",
    filed: "2021-01-14",
    tier: "verified",
    rogersRole: "Defendant",
    theme: "commercial-finance",
    entities: ["Navitas Credit Corp."],
    parties: [
      { name: "Navitas Credit Corp.", role: "Plaintiff", represented: null },
      { name: "Leif L. Rogers, MD, Professional Corporation", role: "Defendant", represented: false },
      { name: "Leif Rogers (individually)", role: "Defendant", represented: false },
    ],
    overview:
      "A public docket entry confirms Navitas Credit Corp. as plaintiff against the professional corporation and Leif Rogers individually. The index records that a civil summons was issued on January 15, 2021 and returned served on March 4, 2021.",
    claims: [
      "The matter is likely commercial equipment-finance or guaranty enforcement, but the contract amount, financed equipment, causes of action, and alleged default cannot be responsibly stated without the petition and docket.",
    ],
    disposition:
      "Outcome not established from the accessible entry. The petition, contract/guaranty, service returns, any default judgment, satisfaction, and appellate history should be obtained.",
    timeline: [
      { date: "2021-01-15", text: "Corporate summons status set to Civil Summons Issued." },
      { date: "2021-03-16", text: "Corporate summons status set to Civil Summons Returned Served (served 2021-03-04)." },
      { date: "2021-06-24", text: "Docket activity recorded (entry text truncated in index)." },
    ],
    citations: [
      {
        filing: "Docket entry — civil summons issued",
        docket: "CA21-0060",
        court: "Seventh Judicial Circuit, St. Johns County, FL",
        date: "2021-01-15",
        reliability: "verified",
        note: "Docket entry reviewed. The January 15, 2021 summons issuance aligns with the entry previously indexed in the litigation report.",
      },
    ],
    relatedNote: "Part of a cluster of commercial-finance/creditor actions.",
    sourceUrl:
      "https://trellis.law/doc/88840846/personal-individual-summons-status-set-to-civil-summons-issued-on-01-15-2021-for-rogers-leif",
  },
  {
    slug: "firstlease-2020",
    title: "Firstlease Inc vs. Leif L Rogers MD Professional Corporation",
    shortTitle: "Firstlease Inc. v. Rogers",
    caseNumber: "2020-20867",
    jurisdiction: "Pennsylvania — Montgomery County Court of Common Pleas",
    courtSystem: "State (Pennsylvania)",
    caseType: "Other",
    filed: "2020-12-17",
    tier: "indexed",
    rogersRole: "Defendant",
    theme: "commercial-finance",
    entities: ["Firstlease Inc."],
    parties: [
      { name: "Firstlease Inc.", role: "Plaintiff", represented: null },
      { name: "Leif L. Rogers MD Professional Corporation", role: "Defendant", represented: false },
    ],
    overview:
      "An out-of-state equipment-lease/finance action. Docket entries reference preliminary objections, an answer and new matter, and a stated amount of $14,215.34.",
    timeline: [
      { date: "2021-01-19", text: "Entry No. 1 — Preliminary Objections (E-Filing)." },
      { date: "2022-05-13", text: "Entry No. 13 — Answer & New Matter (E-Filing)." },
      { date: "2024-03-12", text: "For Firstlease Inc. against Leif L Rogers MD Professional Corporation; amount $14,215.34." },
    ],
    citations: [
      {
        filing: "Case index record",
        docket: "2020-20867",
        court: "Montgomery County, PA",
        date: "2020-12-17",
        reliability: "indexed",
        note: "Equipment-lease/finance action confirmed in the index, including a stated amount. Full contract and disposition not yet sourced.",
      },
    ],
    relatedNote: "Part of a cluster of commercial-finance/creditor actions.",
    sourceUrl: null,
  },
  {
    slug: "greatamerica-2020",
    title:
      "GreatAmerica Financial Services Corporation vs Leif L. Rogers, MD, Professional Corporation, et al.",
    shortTitle: "GreatAmerica Financial Services v. Rogers",
    caseNumber: "20SMCP00415",
    jurisdiction: "California — Los Angeles County Superior Court",
    courtSystem: "State (California)",
    caseType: "Other — Other Judgment",
    filed: "2020-11-20",
    tier: "indexed",
    rogersRole: "Defendant",
    theme: "commercial-finance",
    entities: ["GreatAmerica Financial Services Corporation"],
    parties: [
      { name: "GreatAmerica Financial Services Corporation", role: "Plaintiff", represented: null },
      { name: "Leif L. Rogers MD Professional Corporation", role: "Defendant", represented: false },
    ],
    overview:
      "A sister-state judgment proceeding: GreatAmerica sought to domesticate an out-of-state judgment in California. A Satisfaction of Judgment was filed June 10, 2021.",
    timeline: [
      { date: "2020-11-20", text: "Application on Sister-State Judgment filed by GreatAmerica (Plaintiff)." },
      { date: "2020-11-20", text: "Civil Case Cover Sheet filed by Plaintiff." },
      { date: "2021-06-10", text: "Satisfaction of Judgment filed by Plaintiff." },
    ],
    citations: [
      {
        filing: "Case index record",
        docket: "20SMCP00415",
        court: "Los Angeles County Superior Court",
        date: "2020-11-20",
        reliability: "indexed",
        note: "Sister-state judgment domestication confirmed in the index; a satisfaction of judgment is recorded. The originating judgment is not yet sourced.",
      },
    ],
    relatedNote: "Part of a cluster of commercial-finance/creditor actions.",
    sourceUrl: null,
  },
  {
    slug: "nhp-pmb-pasadena-2020",
    title:
      "NHP/PMB Pasadena LLC, a Delaware Limited Liability Company vs Leif L. Rogers, M.D., an Individual",
    shortTitle: "NHP/PMB Pasadena v. Rogers (2020)",
    caseNumber: "20STCV42735",
    jurisdiction: "California — Los Angeles County Superior Court",
    courtSystem: "State (California)",
    caseType: "Contract — Other Contract",
    filed: "2020-11-06",
    tier: "indexed",
    rogersRole: "Defendant",
    theme: "commercial-eviction",
    entities: ["NHP/PMB Pasadena LLC"],
    parties: [
      { name: "NHP/PMB Pasadena LLC (a Delaware LLC)", role: "Plaintiff", represented: null },
      { name: "Leif L. Rogers MD Professional Corporation", role: "Defendant", represented: true },
      { name: "Leif L. Rogers, MD (an individual)", role: "Defendant", represented: true },
    ],
    overview:
      "A contract action by the NHP/PMB Pasadena landlord entity naming both the professional corporation and Rogers individually. Docket entries include answers and a notice of withdrawal.",
    timeline: [
      { date: "2021-03-17", text: "Answer filed by Leif L. Rogers, MD, Professional Corporation (Defendant)." },
      { date: "2021-06-10", text: "Answer filed by Leif L. Rogers, MD, a Professional Corporation (Defendant)." },
      { date: "2021-06-11", text: "Notice (Notice of Withdrawal) filed by Leif L. Rogers, M.D., an Individual (Defendant)." },
    ],
    citations: [
      {
        filing: "Case index record",
        docket: "20STCV42735",
        court: "Los Angeles County Superior Court",
        date: "2020-11-06",
        reliability: "indexed",
        note: "Contract action confirmed in the index. Same landlord entity as case 21GDCV00356.",
      },
    ],
    relatedNote: "NHP/PMB Pasadena LLC also appears in 21GDCV00356.",
    sourceUrl: null,
  },
  {
    slug: "amex-chamberlain-2020",
    title: "American Express National Bank vs Robin Chamberlain, et al.",
    shortTitle: "American Express v. Robin Chamberlain",
    caseNumber: "20BBCV00674",
    jurisdiction: "California — Los Angeles County Superior Court",
    courtSystem: "State (California)",
    caseType: "Contract — Debt Collection",
    filed: "2020-10-13",
    tier: "indexed",
    rogersRole: "Co-defendant (professional corporation named)",
    theme: "debt-collection",
    entities: ["American Express National Bank", "Robin Chamberlain"],
    parties: [
      { name: "American Express National Bank", role: "Plaintiff", represented: null },
      { name: "Robin Chamberlain", role: "Defendant", represented: null },
      { name: "Leif L. Rogers MD Professional Corporation Inc", role: "Co-defendant", represented: true },
    ],
    overview:
      "A card/debt-collection action naming Robin Chamberlain, with the Rogers professional corporation also named. Robin Chamberlain is a recurring entity across the real-estate partnership matters.",
    timeline: [
      { date: "2020-10-13", text: "Complaint filed by American Express National Bank (Plaintiff)." },
      { date: "2020-12-23", text: "Notice and Acknowledgment of Receipt filed by Plaintiff." },
      { date: "2021-02-25", text: "Case Management Statement filed by Robin Chamberlain (Defendant)." },
    ],
    citations: [
      {
        filing: "Case index record",
        docket: "20BBCV00674",
        court: "Los Angeles County Superior Court",
        date: "2020-10-13",
        reliability: "indexed",
        note: "Debt-collection action confirmed in the index. Robin Chamberlain links this matter to the Chamberlain/Gurion partnership dispute.",
      },
    ],
    relatedNote: "Robin Chamberlain also appears in EC065373 (Chamberlain/Gurion).",
    sourceUrl: null,
  },
  {
    slug: "right-choice-construction-2020",
    title: "Leif L. Rogers, MD, Professional Corporation vs Right Choice Construction, et al.",
    shortTitle: "Rogers v. Right Choice Construction",
    caseNumber: "20STCV37907",
    jurisdiction: "California — Los Angeles County Superior Court (Dept. 58)",
    courtSystem: "State (California)",
    caseType: "Contract — Other Contract",
    filed: "2020-10-02",
    tier: "verified",
    rogersRole: "Plaintiff / Cross-Defendant",
    theme: "construction-contract",
    entities: ["Right Choice Construction"],
    parties: [
      { name: "Leif L. Rogers MD Professional Corporation", role: "Plaintiff / Cross-Defendant", represented: true },
      { name: "Right Choice Construction, et al.", role: "Defendant", represented: null },
    ],
    overview:
      "Los Angeles County case 20STCV37907 is a construction dispute brought by the Rogers professional corporation against Right Choice Construction and others. A tentative ruling is indexed for January 4, 2024 in Department 58.",
    claims: [
      "Based on the parties, the dispute appears construction-related. The specific contract, property, defects, damages, and any counterclaims were not available in the accessible result.",
    ],
    disposition:
      "Final disposition was not verified. The complaint, operative cross-complaints, the January 4, 2024 minute order, and final judgment/dismissal should be obtained.",
    timeline: [
      { date: "2020-10-02", text: "Complaint filed by Leif L. Rogers, MD, Professional Corporation (Plaintiff)." },
      { date: "2021-06-07", text: "Notice of Change of Address filed by Plaintiff." },
      { date: "2022-03-22", text: "Substitution of Attorney filed by Plaintiff." },
      { date: "2022-05-11", text: "Response filed (Plaintiff)." },
      { date: "2024-01-04", text: "Tentative ruling indexed — Department 58." },
    ],
    citations: [
      {
        filing: "Case / tentative-ruling index",
        docket: "20STCV37907",
        court: "Los Angeles County Superior Court, Dept. 58",
        date: "2024-01-04",
        reliability: "verified",
        note: "Case and a January 4, 2024 tentative ruling confirmed. One of the few matters where Rogers is the plaintiff.",
      },
    ],
    relatedNote: "Construction/real-property matter connected to the practice's build-out activity.",
    sourceUrl:
      "https://trellis.law/ruling/20stcv37907/leif-l-rogers-md-professional-corporation-vs-right-choice-construction-et-al/20240104949638",
  },
  {
    slug: "partners-capital-2020",
    title: "Partners Capital Group, Inc. vs. Leif L Rogers MD",
    shortTitle: "Partners Capital Group v. Rogers",
    caseNumber: "30-2020-01158736-CU-BC-WJC",
    jurisdiction: "California — Orange County Superior Court",
    courtSystem: "State (California)",
    caseType: "Contract — Other Contract",
    filed: "2020-09-03",
    tier: "indexed",
    rogersRole: "Defendant",
    theme: "commercial-finance",
    entities: ["Partners Capital Group, Inc."],
    parties: [
      { name: "Partners Capital Group, Inc.", role: "Plaintiff", represented: null },
      { name: "Leif L Rogers, MD", role: "Defendant", represented: true },
    ],
    overview:
      "A breach-of-contract action in Orange County against Rogers individually. Docket entries include an answer to complaint and later notices.",
    timeline: [
      { date: "2020-11-09", text: "Answer to Complaint filed by Rogers." },
      { date: "2021-06-07", text: "Notice — Other filed." },
      { date: "2021-06-11", text: "Notice — Other filed." },
    ],
    citations: [
      {
        filing: "Case index record",
        docket: "30-2020-01158736-CU-BC-WJC",
        court: "Orange County Superior Court",
        date: "2020-09-03",
        reliability: "indexed",
        note: "Breach-of-contract action confirmed in the index. Earlier reports flagged 'Partners Capital' as an unverified lead; the case number now confirms it.",
      },
    ],
    relatedNote: "Part of a cluster of commercial-finance/creditor actions.",
    sourceUrl: null,
  },
  {
    slug: "north-mill-2020",
    title:
      "North Mill Equipment Finance LLC vs Leif L. Rogers, MD, Professional Corporation, a California Corporation, et al.",
    shortTitle: "North Mill Equipment Finance v. Rogers",
    caseNumber: "20SMCV01139",
    jurisdiction: "California — Los Angeles County Superior Court",
    courtSystem: "State (California)",
    caseType: "Contract — Other Contract",
    filed: "2020-08-24",
    tier: "indexed",
    rogersRole: "Defendant",
    theme: "commercial-finance",
    entities: ["North Mill Equipment Finance LLC"],
    parties: [
      { name: "North Mill Equipment Finance LLC (servicing agent for North Mill Credit Trust f/k/a EFS Credit)", role: "Plaintiff", represented: null },
      { name: "Leif L. Rogers MD Professional Corporation (a California Corporation)", role: "Defendant", represented: true },
    ],
    overview:
      "An equipment-finance action. Docket entries include a case-management statement and two notices of opposition to a right-to-attach order and claim of exemption.",
    timeline: [
      { date: "2020-12-10", text: "Notice of Opposition to Right to Attach Order and Claim of Exemption filed." },
      { date: "2020-12-15", text: "Notice of Opposition to Right to Attach Order and Claim of Exemption filed." },
      { date: "2021-02-09", text: "Case Management Statement filed." },
    ],
    citations: [
      {
        filing: "Case index record",
        docket: "20SMCV01139",
        court: "Los Angeles County Superior Court",
        date: "2020-08-24",
        reliability: "indexed",
        note: "Equipment-finance action confirmed in the index, including right-to-attach activity. Full contract and disposition not yet sourced.",
      },
    ],
    relatedNote: "Part of a cluster of commercial-finance/creditor actions.",
    sourceUrl: null,
  },
  {
    slug: "lf-120-spalding-2020",
    title:
      "LF-120 Spalding, LLC, a Delaware Limited Liability Company vs Leif L. Rogers, MD, a Professional Corporation",
    shortTitle: "LF-120 Spalding v. Rogers",
    caseNumber: "20SMCV00032",
    jurisdiction: "California — Los Angeles County Superior Court",
    courtSystem: "State (California)",
    caseType: "Property — Commercial Eviction",
    filed: "2020-01-07",
    tier: "indexed",
    rogersRole: "Defendant",
    theme: "commercial-eviction",
    entities: ["LF-120 Spalding, LLC"],
    parties: [
      { name: "LF-120 Spalding, LLC (a Delaware LLC)", role: "Plaintiff", represented: null },
      { name: "Leif L. Rogers MD Professional Corporation", role: "Defendant", represented: true },
    ],
    overview:
      "A commercial eviction action. Docket entries include a case-management statement, an answer, and a substitution of attorney. An earlier report listed 'LF 120 vs. Leif Rogers' as an unverified lead; the court index confirms the case number.",
    timeline: [
      { date: "2021-01-15", text: "Answer filed by Leif L Rogers (Defendant)." },
      { date: "2021-04-02", text: "Case Management Statement filed by Leif L Rogers (Defendant)." },
      { date: "2021-10-29", text: "Substitution of Attorney filed by Leif L. Rogers, MD (Defendant)." },
    ],
    citations: [
      {
        filing: "Case index record",
        docket: "20SMCV00032",
        court: "Los Angeles County Superior Court",
        date: "2020-01-07",
        reliability: "indexed",
        note: "Commercial eviction confirmed in the index. Resolves the earlier unverified 'LF 120' lead.",
      },
    ],
    relatedNote: "One of several commercial landlord/eviction actions against the practice.",
    sourceUrl: null,
  },
  {
    slug: "skatteforvaltningen-mdl-2018",
    title:
      "In Re: Customs and Tax Administration of the Kingdom of Denmark (Skatteforvaltningen) Tax Refund Scheme Litigation",
    shortTitle: "In Re: Skatteforvaltningen Tax Refund MDL",
    caseNumber: "1:18-md-02865",
    jurisdiction: "U.S. District Court — Southern District of New York",
    courtSystem: "Federal",
    caseType: "Property — Personal Property Fraud (MDL)",
    filed: "2018-10-09",
    tier: "metadata",
    rogersRole: "Connection not established in the index",
    theme: "fraud-mdl",
    entities: ["Skatteforvaltningen (Kingdom of Denmark)"],
    parties: [
      { name: "Skatteforvaltningen (Customs and Tax Administration of the Kingdom of Denmark)", role: "Plaintiff (MDL)", represented: null },
    ],
    overview: null,
    // Deliberately no asserted Rogers role: the index returned this multidistrict
    // litigation on the name search but did not show a party role for Rogers.
    reviewFlag:
      "This large multidistrict litigation surfaced on the name search, but the index does not establish a party role for Leif Rogers. It may be a false-positive name match. Do not treat any connection as established without a primary docket confirming it.",
    timeline: [
      { date: "2022-05-12", text: "Motions for Summary Judgment referenced (member cases 1:18-cv-09840-LAK and others)." },
    ],
    citations: [
      {
        filing: "MDL index record",
        docket: "1:18-md-02865",
        court: "U.S. District Court, S.D.N.Y.",
        date: "2018-10-09",
        reliability: "metadata",
        note: "Returned on the name search only. No party role for Rogers is shown; connection unverified and possibly a false positive.",
      },
    ],
    sourceUrl: null,
  },
  {
    slug: "chamberlain-gurion-2016",
    title: "Gary Chamberlain, et al vs. Eran Gurion",
    shortTitle: "Chamberlain / Rogers v. Gurion",
    caseNumber: "EC065373",
    jurisdiction: "California — Los Angeles County Superior Court, North Central District (Burbank)",
    courtSystem: "State (California)",
    caseType: "Property — Other Real Property",
    filed: "2016-05-20",
    tier: "verified",
    rogersRole: "Plaintiff / Cross-Defendant",
    theme: "real-estate-partnership",
    entities: ["Gary Chamberlain", "Robin Chamberlain", "Eran Gurion"],
    parties: [
      { name: "Gary Chamberlain; Leif Rogers (plaintiffs)", role: "Plaintiff", represented: null },
      { name: "Eran Gurion; KG Construction Solutions USA, Inc.", role: "Defendant / Cross-Complainant", represented: null },
      { name: "Leif L. Rogers, MD, Professional Corporation", role: "Cross-Defendant", represented: false },
      { name: "Robin Chamberlain; Gary Chamberlain; LRMD Holdings, LLC", role: "Cross-Defendants", represented: null },
    ],
    overview:
      "The most significant verified civil record reviewed. Rogers and Gary Chamberlain sued Eran Gurion; Gurion filed a verified cross-complaint concerning an alleged real-estate partnership, naming Rogers, his professional corporation, the Chamberlains, and LRMD Holdings LLC as cross-defendants. The cross-complaint was filed June 14, 2016.",
    claims: [
      "The verified cross-complaint alleged breach of partnership agreement, partition and sale of real property, conversion of partnership assets, intentional interference with prospective economic relations, breach of fiduciary duty, constructive fraud, quiet title, civil conspiracy, and declaratory relief.",
      "It alleged that Gurion and Rogers were partners in real-estate investments, and that a March 18, 2016 refinance generated approximately $3.2 million that was diverted without authorization.",
      "It sought, among other relief, an accounting, a constructive trust, sale of partnership properties, and a 50/50 division of proceeds.",
    ],
    disposition:
      "No final judgment, dismissal, settlement, or appellate disposition was located in the sources reviewed. These are allegations in a pleading and must not be presented as adjudicated facts. The official Register of Actions and all disposition documents should be obtained.",
    evidence: [
      "Claimed partnership properties referenced in the report include Valley Spring (Toluca Lake) and two Laurelgrove Avenue properties (Studio City), against which KG Construction is said to have filed mechanic's liens totaling roughly $2.03M. These figures come from the pleading/report, not from an adjudication.",
    ],
    timeline: [
      { date: "2016-05-20", text: "Underlying action filed (Chamberlain / Rogers v. Gurion)." },
      { date: "2016-06-14", text: "Verified cross-complaint filed by Gurion (nine-plus causes of action)." },
    ],
    citations: [
      {
        filing: "Verified cross-complaint (service package)",
        docket: "EC065373",
        court: "LA Superior Court, North Central District (Burbank)",
        date: "2016-06-14",
        reliability: "verified",
        note: "Primary pleading reviewed. All statements are allegations within the pleading, not judicial findings.",
      },
    ],
    relatedNote: "Anchor case of the real-estate partnership dispute; connected to the Chamberlain entities.",
    sourceUrl:
      "https://www.lawsuitpressrelease.com/wp-content/uploads/2016/08/Summons-Cross-Complaint-Svc-Pkg.pdf",
  },
];

/* --------------------------------------------------------------------------
   DERIVED HELPERS
   -------------------------------------------------------------------------- */

// Section spec — the fixed structure every record page renders, in order.
// `key` maps to a field on the case object; missing/empty → honest empty state.
export const SECTION_SPEC = [
  { key: "overview", title: "Case Overview", icon: "faFileLines", kind: "prose" },
  { key: "executiveSummary", title: "Executive Summary", icon: "faListCheck", kind: "prose", fallbackKey: "overview" },
  { key: "metadata", title: "Case Metadata", icon: "faTableList", kind: "metadata" },
  { key: "parties", title: "Parties", icon: "faUserTag", kind: "parties" },
  { key: "attorneys", title: "Attorneys", icon: "faScaleBalanced", kind: "list" },
  { key: "court", title: "Court Information", icon: "faLandmark", kind: "court" },
  { key: "timeline", title: "Timeline", icon: "faGavel", kind: "timeline" },
  { key: "claims", title: "Claims", icon: "faTriangleExclamation", kind: "list" },
  { key: "defenses", title: "Defenses", icon: "faShieldHalved", kind: "list" },
  { key: "motions", title: "Motions", icon: "faFileLines", kind: "list" },
  { key: "orders", title: "Orders", icon: "faGavel", kind: "list" },
  { key: "evidence", title: "Evidence", icon: "faFolderOpen", kind: "list" },
  { key: "quotes", title: "Important Quotes", icon: "faCircleInfo", kind: "quotes" },
  { key: "keyFindings", title: "Key Findings", icon: "faListCheck", kind: "list" },
  { key: "relatedCases", title: "Related Cases", icon: "faLink", kind: "related" },
  { key: "citations", title: "Source Citations", icon: "faLink", kind: "citations" },
];

// Which sections actually have sourced content for a given case?
// Single source of truth shared by the record body and its table of contents,
// so a section is never listed in the TOC while hidden from the page (or vice
// versa). `metadata` and `court` always render (core case facts).
export const getSectionContentMap = (c) => {
  if (!c) return {};
  const related = getRelatedCases(c.slug);
  return {
    overview: !!(c.overview || c.executiveSummary),
    executiveSummary: !!(c.executiveSummary || c.overview),
    metadata: true,
    parties: (c.parties || []).length > 0,
    attorneys: (c.attorneys || []).length > 0,
    court: true,
    timeline: (c.timeline || []).length > 0,
    claims: (c.claims || []).length > 0,
    defenses: (c.defenses || []).length > 0,
    motions: (c.motions || []).length > 0,
    orders: (c.orders || []).length > 0,
    evidence: (c.evidence || []).length > 0,
    quotes: (c.quotes || []).length > 0,
    keyFindings: (c.keyFindings || []).length > 0,
    relatedCases: related.length > 0,
    citations: (c.citations || []).length > 0,
  };
};

export const getAllCases = () => CASES;

export const getCaseSlugs = () => CASES.map((c) => c.slug);

export const getCaseBySlug = (slug) => CASES.find((c) => c.slug === slug) || null;

// "Relationship Agent" output, computed from real shared entities/themes.
// Shared named entity = strong link; shared theme = weak link. Rogers himself
// is intentionally excluded (he is in every case, so he is not a signal).
export const getRelatedCases = (slug) => {
  const base = getCaseBySlug(slug);
  if (!base) return [];
  const baseEntities = new Set(base.entities || []);
  return CASES.filter((c) => c.slug !== slug)
    .map((c) => {
      const sharedEntities = (c.entities || []).filter((e) => baseEntities.has(e));
      const sameTheme = c.theme && c.theme === base.theme;
      const strength = sharedEntities.length * 10 + (sameTheme ? 1 : 0);
      return { case: c, sharedEntities, sameTheme, strength };
    })
    .filter((r) => r.strength > 0)
    .sort((a, b) => b.strength - a.strength)
    .slice(0, 6);
};

// Quick aggregate stats for the index hero — all derived, none hard-coded.
export const getRecordStats = () => {
  const tiers = { verified: 0, indexed: 0, metadata: 0 };
  const systems = new Set();
  let earliest = null;
  let latest = null;
  for (const c of CASES) {
    tiers[c.tier] = (tiers[c.tier] || 0) + 1;
    systems.add(c.courtSystem);
    if (!earliest || c.filed < earliest) earliest = c.filed;
    if (!latest || c.filed > latest) latest = c.filed;
  }
  return { total: CASES.length, tiers, jurisdictions: systems.size, earliest, latest };
};
