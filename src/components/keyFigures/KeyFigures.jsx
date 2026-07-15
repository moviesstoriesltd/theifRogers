const keyFigures = [
  {
    id: 1,
    value: "$3.2M",
    label: "Alleged equity drain",
    detail:
      "Equity allegedly stripped via unauthorized cash-out refinances on the Valley Spring and Laurelgrove II properties (Gurion cross-complaint, Case No. EC065373).",
  },
  {
    id: 2,
    value: "$2.026M",
    label: "Mechanic's liens filed",
    detail:
      "Total claimed by KG Construction Solutions USA, Inc. for unpaid labor and materials across the three partnership properties.",
  },
  {
    id: 3,
    value: "5 yrs",
    label: "California probation",
    detail:
      "Stayed license revocation and five-year probation ordered by the Medical Board of California (decision effective September 17, 2021).",
  },
  {
    id: 4,
    value: "36 mo",
    label: "New York suspension",
    detail:
      "Stayed 36-month license suspension and probation with a practice monitor, effective May 30, 2022.",
  },
  {
    id: 5,
    value: "11",
    label: "Causes of action",
    detail:
      "Distinct causes of action pleaded against Dr. Rogers and associates in the First Amended Verified Cross-Complaint.",
  },
  {
    id: 6,
    value: "3",
    label: "Partnership properties",
    detail:
      "Valley Spring, Laurelgrove I, and Laurelgrove II — the 'tear-down flip' homes at the center of the partnership dispute.",
  },
];

const KeyFigures = () => {
  return (
    <div className="content px-2 max-xxl:px-4 py-12 md:py-16" id="key-figures">
      <div className="max-w-144.25 mx-auto text-center mb-12">
        <p className="section-title text-slate-950">Key Figures from the Report</p>
        <p className="text-[14px] sm:text-lg text-slate-600 font-normal pt-6">
          Financial and regulatory figures drawn directly from the investigative
          report. Amounts tied to civil litigation reflect allegations, not
          adjudicated findings.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {keyFigures.map((figure) => (
          <div
            key={figure.id}
            className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300"
          >
            <p className="text-3xl sm:text-4xl font-semibold text-brand-primary">
              {figure.value}
            </p>
            <p className="text-[15px] sm:text-[17px] font-semibold text-slate-900 mt-2">
              {figure.label}
            </p>
            <p className="text-[13px] sm:text-[14px] text-slate-600 mt-3 leading-relaxed">
              {figure.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyFigures;
