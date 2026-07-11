import Roles from "./Roles";

const rolesData = [
  {
    id: 1,
    title: "Regulatory History",
    description:
      "California and New York disciplinary records, stayed license actions, probation terms, and board oversight described in the report.",
  },
  {
    id: 2,
    title: "Clinical Matters",
    description:
      "Board findings and pending allegations involving compartment syndrome, pulmonary embolism, device disclosures, and medspa protocols.",
  },
  {
    id: 3,
    title: "Financial Litigation",
    description:
      "Real estate partnership claims, alleged equity stripping, mechanic's liens, conversion claims, and related alter-ego allegations.",
  },
  {
    id: 4,
    title: "Public Record Timeline",
    description:
      "Dates, case numbers, agencies, courts, and public-record categories pulled from the report's chronology and source list.",
  },
];

const Profession = () => {
  return (
    <div
      className="content grid md:grid-cols-2 max-xxl:px-4 xxl:px-2 py-10 md:py-15 lg:py-37.5"
      id="services"
    >
      <div className="flex flex-col justify-between h-fit md:pe-8 lg:pe-35.75 max-md:text-center my-auto">
        <p className="section-title max-md:text-center text-slate-950">
          Topics Covered
        </p>
        <div className="mt-6 text-[14px]">
          <p className="text-xs sm:text-lg font-normal text-slate-600 mb-4">
            The site organizes the report into practical reading categories so
            visitors can distinguish regulatory findings from lawsuit
            allegations and pending proceedings.
          </p>
          <p className="text-xs sm:text-lg font-normal text-slate-600">
            Each topic is framed as documentary context, not as medical advice,
            legal advice, or an independent factual finding beyond the report.
          </p>
        </div>
        <a
          href="#contact"
          className="mt-5 md:mt-12.5 inline-flex items-center justify-center gap-2 rounded-lg cursor-pointer px-4 py-2 btn-primary text-white w-fit md:py-3 md:px-6 text-[12px] sm:text-[16px] font-semibold max-md:mx-auto max-md:mb-5"
        >
          Submit Additional Information
        </a>
      </div>
      <div>
        {rolesData.map((role, index) => (
          <Roles role={role} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Profession;
