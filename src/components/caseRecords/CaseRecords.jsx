import Link from "next/link";
import { getAllCases } from "../../../app/records/records.data";

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

const fmt = (iso) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[m - 1]} ${d}, ${y}`;
};

const CaseRecords = () => {
  const cases = getAllCases();

  return (
    <div className="content px-2 max-xxl:px-4 py-12 md:py-16" id="records">
      <div className="max-w-176 mx-auto text-center mb-12">
        <h2 className="section-title text-slate-950">Case Records &amp; Legal Proceedings</h2>
        <p className="text-[14px] sm:text-lg text-slate-600 font-normal pt-6">
          Structured public-record data covering the real estate partnership
          dispute and the related civil and regulatory court proceedings. Select
          any case to open its full in-theme record.
        </p>
      </div>

      {/* Court records (links to dynamic detail pages) */}
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-5">
          <h3 className="text-xl sm:text-2xl font-semibold text-slate-950">
            Court Records
          </h3>
          <Link
            href="/records"
            className="text-[13px] font-semibold text-brand-primary hover:underline"
          >
            View full records index &rarr;
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((item) => (
            <Link
              key={item.slug}
              href={`/records/${item.slug}`}
              className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
            >
              <h4 className="text-[15px] sm:text-base font-semibold text-slate-950 leading-snug group-hover:text-brand-primary">
                {item.shortTitle}
              </h4>

              <p className="text-[12px] sm:text-[13px] text-slate-600 mt-2">
                {item.jurisdiction}
              </p>

              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
                <span className="inline-flex items-center rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-1">
                  {item.caseType}
                </span>
                <span className="inline-flex items-center rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-1 whitespace-nowrap">
                  No. {item.caseNumber}
                </span>
                <span className="inline-flex items-center rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-1 whitespace-nowrap">
                  Filed {fmt(item.filed)}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                  Rogers: {item.rogersRole}
                </span>
                <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-brand-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Open record &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Partnership Properties table */}
      <div className="mt-14">
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
    </div>
  );
};

export default CaseRecords;
