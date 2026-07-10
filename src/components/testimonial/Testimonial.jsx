import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import TestimonialTemplate from "./TestimonialTemplate";
import "./testimonial.css";

const testimonialData = [
  {
    message: "What is the current status of his medical license?",
    quote:
      "The report states that the California license is active but restricted by a five-year probation ending in late 2026, and that New York imposed a stayed 36-month suspension with probation and notice requirements.",
    name: "License Status",
    designation: "FAQ from report",
  },
  {
    message: "Explain the details of the $3.2 million fraud case.",
    quote:
      "The report describes Case No. EC065373 as a civil cross-complaint alleging unauthorized cash-out refinances on joint properties and diversion of $3.2 million into LRMD Holdings, LLC.",
    name: "Partnership Litigation",
    designation: "FAQ from report",
  },
  {
    message: "Tell me more about the chemotherapy injection allegations.",
    quote:
      "The report summarizes a whistleblower lawsuit alleging staff were ordered to inject 5-Fluorouracil off-label for cosmetic use and that the whistleblower was fired after raising concerns.",
    name: "GoodSkin Clinics Allegations",
    designation: "FAQ from report",
  },
  {
    message: "What are the findings in the ongoing patient death investigation?",
    quote:
      "The report says the Medical Board alleged a profound deviation from the standard of care in a pulmonary embolism death, including claims about preoperative clearance and blood-thinner prophylaxis.",
    name: "Pending Regulatory Proceeding",
    designation: "FAQ from report",
  },
];

const Testimonial = () => {
  return (
    <div className="flex mx-auto justify-center px-2 max-w-218 pb-10 md:pb-25">
      <div className="w-full h-full cursor-grab">
        <p className="section-title mb-6 text-center text-slate-950">
          Frequently Asked Questions
        </p>
        <Swiper
          id="testimonialSwiper"
          spaceBetween={30}
          navigation={false}
          pagination={{
            clickable: true,
          }}
          modules={[EffectFade, Navigation, Pagination]}
        >
          {testimonialData.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <TestimonialTemplate testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
