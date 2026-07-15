import {
  faEnvelope,
  faFileLines,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import Address from "./Address";
import Form from "./Form";

const addressData = [
  {
    icon: faFileLines,
    title: "Accepted Materials",
    description: "Board records, court filings, news links, docket references",
  },
  {
    icon: faShieldHalved,
    title: "Review Standard",
    description: "Allegations, lawsuits, and confirmed actions are separated",
  },
  {
    icon: faEnvelope,
    title: "Submission Purpose",
    description: "Provide additional public documents or factual corrections",
  },
];

const Contact = () => {
  return (
    <div className="relative -bottom-15 -mt-15 z-10 px-2">
      <div
        className="content p-4 md:p-10 lg:p-22 bg-white rounded-2xl shadow-[0px_0px_90px_9px_rgba(0,_0,_0,_0.1)]"
        id="contact"
      >
        <div className="flex flex-col-reverse lg:gap-5 xl:gap-25.75 lg:flex-row justify-between">
          <div>
            <div>
              <h2 className="text-[35px] max-lg:hidden font-semibold text-nowrap text-[#132238]">
                Submit Additional Information
              </h2>
              <p className="text-[12px] xs:text-[14px] sm:text-lg md:text-lg max-lg:text-center pt-4 font-normal text-soft-dark">
                Share public records, corrections, or source documents for
                review. Submissions should include enough context to distinguish
                allegations from confirmed regulatory or court actions.
              </p>
            </div>
            <div className="my-8.75 sm:max-lg:flex justify-between items-center">
              {addressData.map((item, index) => (
                <Address item={item} key={index} />
              ))}
            </div>
          </div>
          <div className="w-full overflow-y-scroll py-6.5">
            <h2 className="text-xl mb-2 xs:text-2xl sm:text-2xl md:text-[38px] font-semibold text-[#132238] lg:hidden text-center">
              Submit Additional Information
            </h2>
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
