import infographic from "../../assets/images/partnership-infographic.png";

const partnershipProperties = [
  {
    name: "Valley Spring",
    address: "10331 Valley Spring, Toluca Lake",
    description:
      "Rogers' initial \"troubled\" project that Gurion rescued; intended for a full tear-down and rebuild.",
    lien: "$720,000",
  },
  {
    name: "Laurelgrove I",
    address: "4053 Laurelgrove Avenue, Studio City",
    description:
      "Target acquisition of $900k; construction budget of $675k; projected sale of $2.2M.",
    lien: "$723,000",
  },
  {
    name: "Laurelgrove II",
    address: "4121 Laurelgrove Avenue, Studio City",
    description:
      "Purchased for approx. $910k; construction budget of $675k; projected sale of $2.2M.",
    lien: "$583,000",
  },
];

const legalProceedings = [
  {
    caseNumber: "EC065373",
    filed: "June 14, 2016",
    court:
      "Superior Court of California, County of Los Angeles — North Central District (Burbank)",
    plaintiff: "Eran Gurion; KG Construction Solutions USA, Inc.",
    defendant:
      "Leif L. Rogers; Leif L. Rogers, MD, Professional Corporation; Gary Chamberlain; Robin Chamberlain; LRMD Holdings, LLC; et al.",
    action:
      "Breach of partnership, partition, conversion of assets, fraud, breach of fiduciary duty (11 causes of action)",
    status: "First Amended Verified Cross-Complaint filed",
    source: "[1][2][3]",
  },
  {
    caseNumber: "BC608547",
    filed: "February 4, 2016",
    court: "Superior Court of California, County of Los Angeles",
    plaintiff: "Polly Powers Grossman and Howard Grossman",
    defendant:
      "Leif Rogers MD; Leif L. Rogers MD Professional Corporation; Allergan Inc.; Does 1-20",
    action: "Medical Malpractice (Drs & Surgeons) and Products Liability",
    status: "Active; partial dismissal of corporation in December 2016",
    source: "[3][4]",
  },
  {
    caseNumber: "BC669758",
    filed: "July 25, 2017",
    court: "Superior Court of California, County of Los Angeles",
    plaintiff: "David J. Page",
    defendant: "Leif Rogers MD, FACS; Does 1-10",
    action: "Medical Malpractice (Drs & Surgeons); surgical negligence",
    status: "Pending / active docket",
    source: "[5][3]",
  },
  {
    caseNumber: "800-2019-054186",
    filed: "January 20, 2021",
    court: "Medical Board of California, Department of Consumer Affairs",
    plaintiff: "William Prasifka (Executive Director, Medical Board of California)",
    defendant: "Leif Liu Rogers, M.D.",
    action:
      "Medical disciplinary action (gross negligence, repeated negligent acts, inadequate records)",
    status: "Decision effective September 17, 2021; five years probation",
    source: "[6]",
  },
  {
    caseNumber: "Not in source",
    filed: "September 2024",
    court: "New York State Supreme Court / Civil Court",
    plaintiff: "Michelle Abramov",
    defendant: "GoodSkin Clinics LLC; Lisa Goodman; et al.",
    action:
      "Whistleblower lawsuit; unlawful termination; unlicensed practice of medicine",
    status: "Settled November 2024; Dr. Rogers not a named defendant",
    source: "[3][7]",
  },
];

const sourceReferences = [
  "[1] FA Cross Complaint — Lawsuit Press Release",
  "[2] MC-025 — Lawsuit Press Release",
  "[3] The Clinical, Financial, and Regulatory History of Dr. Leif Liu Rogers: An Investigation into Surgical Malpractice, Licensing Sanctions, and Asset Conversion Allegations",
  "[4] Polly Powers Grossman et al v. Leif Rogers MD et al :: Superior Court of California",
  "[5] David J. Page v. Leif Rogers MD et al :: Superior Court of California, County of Los Angeles :: No. BC669758 — PlainSite",
  "[6] Rogers, Leif Liu, M.D. (A 86603), Beverly Hills, CA — Decision and Order — Medical Board of California",
  "[7] Prestigious medspa operated illicitly under influencer surgeon who had been fired for malpractice — The Independent",
];

const CaseRecords = () => {
  return (
    <div className="content px-2 max-xxl:px-4 py-15 md:py-25" id="records">
      <div className="max-w-176 mx-auto text-center mb-12">
        <p className="section-title text-slate-950">Case Records &amp; Legal Proceedings</p>
        <p className="text-[14px] sm:text-lg text-slate-600 font-normal pt-6">
          Structured public-record data reproduced from the investigative
          report, covering the real estate partnership dispute and the related
          civil and regulatory proceedings.
        </p>
      </div>

      {/* Infographic */}
      <figure className="mb-14">
        <img
          src={infographic}
          alt="Infographic: Anatomy of a High-Stakes Real Estate Partnership Collapse — Gurion v. Rogers"
          className="w-full h-auto rounded-2xl border border-slate-200 shadow-lg"
          loading="lazy"
        />
        <figcaption className="text-center text-[12px] sm:text-[13px] text-slate-500 mt-3">
          Report exhibit: &ldquo;Anatomy of a High-Stakes Real Estate Partnership
          Collapse: Gurion v. Rogers.&rdquo;
        </figcaption>
      </figure>

      {/* Partnership Properties table */}
      <div className="mb-14">
        <h3 className="text-xl sm:text-2xl font-semibold text-slate-950 mb-5">
          Partnership Properties
        </h3>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-160 text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-slate-100 text-[13px] sm:text-[14px]">
                <th className="p-4 font-semibold">Property</th>
                <th className="p-4 font-semibold">Address</th>
                <th className="p-4 font-semibold">Status / Description</th>
                <th className="p-4 font-semibold whitespace-nowrap">Mechanic&apos;s Lien</th>
              </tr>
            </thead>
            <tbody className="text-[13px] sm:text-[14px] text-slate-700">
              {partnershipProperties.map((property) => (
                <tr key={property.name} className="border-t border-slate-200 even:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-950 whitespace-nowrap">
                    {property.name}
                  </td>
                  <td className="p-4 whitespace-nowrap">{property.address}</td>
                  <td className="p-4 min-w-72">{property.description}</td>
                  <td className="p-4 font-semibold text-brand-primary whitespace-nowrap">
                    {property.lien}
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-slate-300 bg-slate-100 font-semibold text-slate-950">
                <td className="p-4" colSpan={3}>
                  Total mechanic&apos;s liens filed by KG Construction
                </td>
                <td className="p-4 text-brand-primary whitespace-nowrap">$2,026,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Legal Proceedings table */}
      <div>
        <h3 className="text-xl sm:text-2xl font-semibold text-slate-950 mb-5">
          Legal Proceedings Summary
        </h3>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-320 text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-slate-100 text-[12px] sm:text-[13px]">
                <th className="p-4 font-semibold whitespace-nowrap">Case Number</th>
                <th className="p-4 font-semibold whitespace-nowrap">Filed</th>
                <th className="p-4 font-semibold">Court / Jurisdiction</th>
                <th className="p-4 font-semibold">Plaintiff / Petitioner</th>
                <th className="p-4 font-semibold">Defendant / Respondent</th>
                <th className="p-4 font-semibold">Action Type / Causes</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold whitespace-nowrap">Source</th>
              </tr>
            </thead>
            <tbody className="text-[12px] sm:text-[13px] text-slate-700 align-top">
              {legalProceedings.map((row) => (
                <tr key={row.caseNumber + row.filed} className="border-t border-slate-200 even:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-950 whitespace-nowrap">
                    {row.caseNumber}
                  </td>
                  <td className="p-4 whitespace-nowrap">{row.filed}</td>
                  <td className="p-4 min-w-52">{row.court}</td>
                  <td className="p-4 min-w-48">{row.plaintiff}</td>
                  <td className="p-4 min-w-56">{row.defendant}</td>
                  <td className="p-4 min-w-56">{row.action}</td>
                  <td className="p-4 min-w-52">{row.status}</td>
                  <td className="p-4 text-brand-primary font-medium whitespace-nowrap">
                    {row.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Source references */}
        <div className="mt-8 bg-slate-50 border border-slate-200 rounded-xl p-6">
          <p className="text-[13px] sm:text-[14px] font-semibold text-slate-950 mb-3">
            Source References
          </p>
          <ul className="space-y-2">
            {sourceReferences.map((reference) => (
              <li key={reference} className="text-[12px] sm:text-[13px] text-slate-600 leading-relaxed">
                {reference}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CaseRecords;
