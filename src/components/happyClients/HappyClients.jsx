import Marquee from "react-fast-marquee";

const sourceNames = [
  "Medical Board of California",
  "New York State Department of Health",
  "Superior Court of California",
  "Los Angeles Superior Court",
  "PlainSite Docket Reference",
  "The Independent",
  "Verified First Amended Cross-Complaint",
];

const sourceLogos = sourceNames.map((name) => (
  <span
    key={name}
    className="text-[#B8BCC2] font-semibold text-lg sm:text-2xl md:text-3xl whitespace-nowrap"
  >
    {name}
  </span>
));

const HappyClients = () => {
  return (
    <section className="content py-10 md:py-25 flex flex-col items-center px-2" aria-labelledby="referenced-sources-title">
      <div className="max-w-144.25 text-center">
        <h2 id="referenced-sources-title" className="section-title mb-6 text-slate-950">
          Referenced Sources
        </h2>
        <p className="text-[14px] sm:text-lg text-slate-600 font-normal">
          Agencies, courts, news coverage, dockets, and public records named in
          the provided investigative report.
        </p>
      </div>
      <Marquee pauseOnHover={true} speed={100}>
        <p className="flex items-center pt-4 md:pt-10">
          {sourceLogos?.map((logo, index) => (
            <span className="ps-5 sm:ps-10 md:ps-20" key={index}>
              {logo}
            </span>
          ))}
        </p>
      </Marquee>
    </section>
  );
};

export default HappyClients;
