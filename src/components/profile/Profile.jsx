import person from "../../assets/images/dr-rogers-about.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faScaleBalanced } from "@fortawesome/free-solid-svg-icons";

const summaryPoints = [
  "The report identifies California and New York regulatory actions involving Dr. Leif Liu Rogers' medical licenses.",
  "It states that the Medical Board of California stayed a license revocation in 2021 and placed him on five-year probation.",
  "It also describes civil litigation and cross-complaint allegations involving malpractice, real estate partnership claims, and medspa compliance issues.",
  "Allegations and pending proceedings are presented separately from confirmed disciplinary decisions.",
];

const Profile = () => {
  return (
    <div
      className="relative mx-4 xxl:mx-0.5 -bottom-20 lg:-bottom-28 z-10 rounded-2xl bg-white drop-shadow-2xl max-xl:mb-5 shadow-white xl:p-28 lg:p-20 md:p-16 sm:p-10 p-4"
      id="profile"
    >
      <div className="flex max-md:flex-col justify-between items-center gap-6">
        <div className="xxl:max-w-106 w-auto h-auto xxl:max-h-126">
          <div className="max-w-106 h-117 object-fill overflow-hidden rounded-xl bg-slate-100">
            <img
              className="h-[120%] object-cover grayscale contrast-110"
              src={person.src}
              alt="Public-record profile image of Dr. Leif Rogers"
            />
          </div>
          <div className="relative bottom-9">
            <div className="flex justify-center">
              <div className="px-6 max-w-66 py-3 z-50 text-center bg-white rounded-[4px] center shadow-2xl drop-shadow-2xl shadow-white border border-slate-200">
                <span className="text-xs sm:text-sm text-slate-600 font-semibold">
                  Report date: July 8, 2026
                </span>
              </div>
            </div>
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
          <div className="mt-8 flex max-md:justify-center max-xs:flex-col gap-3">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
