import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import MonoBlog from "./MonoBlog";
import "swiper/css";
import "swiper/css/pagination";
import "./blog.css";

const custom_breakpoints = {
  640: {
    slidesPerView: 2,
    spaceBetween: 15,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 15,
  },
  1220: {
    slidesPerView: 4,
    spaceBetween: 24,
  },
};

const blogData = [
  {
    id: 1,
    date: "Regulatory",
    comments: "MBC",
    title: "Medical Board Records",
    summary:
      "California decision, probation terms, and pulmonary embolism investigative case summary described in the report.",
    link: "#profile",
  },
  {
    id: 2,
    date: "Court",
    comments: "LASC",
    title: "Court Filings",
    summary:
      "Page v. Rogers, Grossman v. Rogers, and Gurion partnership cross-complaint records referenced by the report.",
    link: "#records",
  },
  {
    id: 3,
    date: "Regulatory",
    comments: "NY",
    title: "Regulatory Documents",
    summary:
      "New York professional misconduct finding, stayed license suspension, and probation terms cited in the report.",
    link: "#records",
  },
  {
    id: 4,
    date: "Press",
    comments: "News",
    title: "News Coverage",
    summary:
      "The report references The Independent coverage of the GoodSkin Clinics whistleblower allegations.",
    link: "#testimonial",
  },
  {
    id: 5,
    date: "Public",
    comments: "Records",
    title: "Thief Rogers MD",
    summary:
      "Case numbers, agency decisions, docket summaries, and source-link categories listed in the report.",
    link: "#contact",
  },
];

const Blog = () => {
  return (
    <div className="content py-25 px-2 relative" id="blog">
      <div className="max-w-135 text-center mx-auto pb-17.5">
        <p className="section-title pb-6 text-white">Public Documents</p>
        <p className="text-xs xs:text-[16px] md:text-lg text-slate-300">
          Source categories drawn from the report, including medical board
          decisions, court records, regulatory summaries, news coverage, and
          public-record references.
        </p>
      </div>
      <Swiper
        grabCursor={true}
        breakpoints={custom_breakpoints}
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        {blogData?.map((data, index) => (
          <SwiperSlide
            key={index}
            className="mb-10"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
          >
            <MonoBlog data={data} key={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Blog;
