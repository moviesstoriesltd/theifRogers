import Image from "next/image";
import person from "../../assets/images/dr-rogers-about.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faScaleBalanced } from "@fortawesome/free-solid-svg-icons";

const summaryPoints = [
  "DISABLED A PATIENT - Failed to recognize compartment syndrome. Left her permanently unable to walk. Found guilty of gross negligence.",
  "SANCTIONED BUT STILL PRACTICING — California probation. New York suspension. Celebrity shield still protecting him.",
  "STOLE $3.2 MILLION - Systematic financial theft from his own partners. Fraudulent refinances. Shell entities to siphon funds.",
  "INJECTED CHEMOTHERAPY INTO FACES - Ordered staff to use cancer drugs as Botox. Fired the whistleblower who refused.",
  "KILLED A PATIENT — Prosecuted for a preventable death. Profound deviation from safety standards.",
];

const Profile = () => {
  return (
    <div
      className="relative mx-4 xxl:mx-0.5 -bottom-20 lg:-bottom-28 z-10 rounded-2xl bg-white drop-shadow-2xl max-xl:mb-5 shadow-white xl:p-28 lg:p-20 md:p-16 sm:p-10 p-4"
      id="profile"
    >
      <div className="flex max-md:flex-col justify-between items-center gap-6">
        <div className="xxl:max-w-106 w-auto h-auto xxl:max-h-126">
          <div className="max-w-106 h-117 overflow-hidden rounded-xl bg-slate-100">
            <Image
              className="h-[120%] w-full object-cover grayscale contrast-110"
              src={person}
              alt="Public-record profile image of Dr. Leif Rogers"
              sizes="(max-width: 768px) 100vw, 424px"
            />
          </div>
        </div>

        <div className="max-sm:w-full w-[33rem]">
          <h2 className="text-2xl xxs:text-3xl sm:text-4xl lg:text-[38px] max-md:text-center font-semibold mb-8 text-slate-950">
            Executive Summary
          </h2>
          <div className="text-xs xs:text-[16px] lg:text-lg font-normal max-md:text-center text-slate-600">
            {summaryPoints.map((point) => (
              <p className="mt-3" key={point}>
                {point}
              </p>
            ))}
          </div>
          {/* <div className="mt-8 flex max-md:justify-center max-xs:flex-col gap-3">
            <a
              className="btn xxs:btn-lg px-6 max-xs:px-2 xxs:py-3 btn-primary text-xs xxs:text-[14px] sm:text-[16px]"
              href="#key-figures"
            >
              <FontAwesomeIcon icon={faScaleBalanced} /> Key Figures
            </a>
            <a
              className="btn xxs:btn-lg px-6 max-xs:px-2 xxs:py-3 hover:border-brand-primary bg-white duration-300 transition-all hover:text-brand-primary text-xs xxs:text-[14px] sm:text-[16px]"
              href="#blog"
            >
              <FontAwesomeIcon icon={faFileLines} /> Public Documents
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
