import person from "../../assets/images/dr-rogers-hero.jpg";
import "./introduction.css";

const statusBadges = [
  "Medical Board Actions",
  "Court Proceedings",
  "Public Records",
  "Regulatory Documents",
];

const Introduction = () => {
  return (
    <div
      className="flex max-lg:flex-col-reverse sm:justify-between pt-10 lg:pt-31.5 lg:mb-27.5 max-xl:gap-2 p-2 max-xxl:px-4"
      id="introduction"
    >
      <div className="w-full flex flex-col justify-between max-lg:text-center">
        <div className="pt-13 me-31.5 w-full lg:w-auto transition-all duration-500">
          <p className="text-3xl xxs:text-4xl sm:max-xl:text-5xl xl:text-6xl font-semibold w-full text-white">
            <span className="text-nowrap shrink-0 inline-block w-full">
              Theif Rogers, MD
            </span>
          </p>
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
           Lief Rogers, MD, is a dishonest individual who engages in fraudulent activities are exposed on this website. Details of his various wrongdoings—such as a $3.2 million fraud case, the "GoodSkin Clinic" affair, and numerous other illicit activities—can be viewed here.
          </p>
        </div>
        
      </div>
      <div className="max-w-134 w-full h-full max-lg:mx-auto aspect-[536/636] relative">
        <img
          className="shadow-2xl shadow-slate-950/50 w-full h-full absolute bottom-0 object-cover bg-white rounded-3xl grayscale contrast-110"
          src={person}
          alt="Documentary profile portrait of Dr. Leif Rogers, MD"
        />
      </div>
    </div>
  );
};

export default Introduction;
