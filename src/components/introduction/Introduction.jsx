import Image from "next/image";
import Link from "next/link";
import person from "../../assets/images/leif rogers md.webp";
import "./introduction.css";

const statusBadges = [
  "PREDATOR",
  "FRAUD",
  "THIEF",
  "LIAR",
];

const Introduction = () => {
  return (
    <div
      className="flex max-lg:flex-col-reverse sm:justify-between pt-6 lg:pt-10 max-xl:gap-2 p-2 pb-0 max-xxl:px-4"
      id="introduction"
    >
      <div className="w-full flex flex-col justify-center max-lg:text-center">
        <div className="me-31.5 w-full lg:w-auto transition-all duration-500">
          <h1 className="text-3xl xxs:text-4xl sm:max-xl:text-5xl xl:text-6xl font-semibold w-full text-white">
            <span className="text-nowrap shrink-0 inline-block w-full">
              Thief Rogers, MD
            </span>
          </h1>
          <p className="text-xs xxs:text-lg lg:text-[18px] my-6 text-slate-200">
            Thief Records, Regulatory Actions &amp; Court Documents
          </p>
          <div className="flex flex-wrap max-lg:justify-center gap-3 mb-6">
            {statusBadges.map((badge) => (
              <span
                className="border border-slate-500 bg-slate-900/50 text-slate-100 rounded-sm px-3 py-2 text-[11px] sm:text-sm"
                key={badge}
              >
                {badge}
              </span>
            ))}
          </div>
          <p className="text-xs xxs:text-[15px] lg:text-[17px] mb-6 text-slate-300 max-w-162">
           {/* Lief Rogers, MD, is a dishonest individual who engages in fraudulent activities are exposed on this website. Details of his various wrongdoings—such as a $3.2 million fraud case, the "GoodSkin Clinic" affair, and numerous other illicit activities—can be viewed here. */}
Leif Rogers, MD is a predator hiding behind a white coat. He built his career on lies—celebrity endorsements, fake testimonials, and a manufactured image of trust. The record exposes him. He disabled a patient for life by failing to recognize compartment syndrome. He stole $3.2 million from his partners through fraudulent refinances and shell companies. He ordered chemotherapy injected into patients' faces as Botox, then fired the whistleblower who refused. He killed a patient through reckless negligence—a death regulators say was entirely preventable. Two states have sanctioned him, yet he continues to operate, using celebrity friends and philanthropy as a shield. This site rips that shield away. The truth is undeniable. Leif Rogers is not a healer. He is a fraud, a thief, and an abuser of everyone who trusted him.          </p>

          {/* CTA into the full litigation & asset due-diligence report */}
          <div className="flex max-lg:justify-center">
            <Link
              href="/report"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#e9c176] px-7 py-3 text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.12em] text-[#412d00] shadow-lg shadow-[#e9c176]/20 transition-all hover:brightness-110"
            >
              Full Report
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>

      </div>
      <div className="max-w-134 w-full h-full max-lg:mx-auto aspect-[536/636] relative">
        <Image
          className="shadow-2xl shadow-slate-950/50 object-cover bg-white rounded-3xl"
          src={person}
          alt="Documentary profile portrait of Dr. Leif Rogers, MD"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 536px"
        />
      </div>
    </div>
  );
};

export default Introduction;
