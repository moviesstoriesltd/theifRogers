const sendSVG = (
  <svg
    className="w-4 md:w-6 aspect-square"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.34 9.32 6.34 2.32A3 3 0 0 0 2.26 6.22l2.4 5.37a1 1 0 0 1 0 .82l-2.4 5.37A3 3 0 0 0 6.35 21.68l14-7a3 3 0 0 0-.01-5.36ZM19.45 12.89l-14 7a1 1 0 0 1-1.35-1.3l2.39-5.37c.03-.07.06-.15.08-.22h6.89a1 1 0 1 0 0-2H6.57a2.7 2.7 0 0 0-.08-.22L4.1 5.41a1 1 0 0 1 1.35-1.3l14 7a1 1 0 0 1 0 1.78Z"
      fill="white"
    />
  </svg>
);

const commonClass =
  "input input-lg border-0 border-b-2 focus:outline-none focus:placeholder:text-brand-primary placeholder:text-[15px] md:placeholder:text-lg focus:border-brand-primary border-[#E6E8EB] w-full rounded-none px-0";

const Form = () => {
  return (
    <div>
      <p className="text-[12px] xs:text-[14px] max-lg:text-center sm:text-lg font-normal text-soft-dark">
        Send additional public information, source links, or supporting
        documents for review.
      </p>
      <div className="mx-2">
        <form className="flex flex-col gap-4 mt-4">
          <input
            type="text"
            placeholder="Name*"
            className={commonClass}
            required
          />
          <input
            type="email"
            placeholder="Email*"
            className={commonClass}
            required
          />
          <input
            type="file"
            aria-label="Supporting Document Upload"
            className="file-input file-input-lg border-0 border-b-2 focus:outline-none border-[#E6E8EB] w-full rounded-none px-0"
          />
          <textarea
            placeholder="Message*"
            className="textarea textarea-lg border-0 border-b-2 focus:outline-none focus:placeholder:text-brand-primary placeholder:text-[15px] md:placeholder:text-lg focus:border-brand-primary border-[#E6E8EB] w-full rounded-none px-0 min-h-32"
            required
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center cursor-pointer gap-3 max-lg:mx-auto btn-primary rounded-sm mt-5 text-[13px] md:text-[16px] w-fit font-semibold lg:mt-12.5 p-2 md:px-4"
          >
            Submit Information {sendSVG}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
