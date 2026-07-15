"use client";

import { motion } from "framer-motion";
import TestimonialTemplate from "./TestimonialTemplate";

// Each entry juxtaposes a public testimonial with a documented finding from an
// official source. Regulatory decisions are identified as findings; civil and
// pending matters are identified as allegations.
const juxtapositionData = [
  {
    review: {
      name: "Jenn K.",
      subtitle: "Verified Patient",
      rating: 5,
      avatar: "https://i.pravatar.cc/120?img=12",
      date: "March 4, 2026",
      text: "Dr. Rogers has a wonderful bedside manner and fixed areas of my body that were botched by surgeons at a well-known hospital.",
    },
    record: {
      source: "Medical Board of California — 2021 Decision & Order",
      status: "Regulatory Finding",
      tone: "finding",
      summary:
        "According to the 2021 Decision and Order, Dr. Rogers committed gross negligence and repeated negligent acts during a fat-grafting procedure.",
      points: [
        "Fat was injected into a patient's calves; acute compartment syndrome was not recognized, leaving the patient unable to move her legs.",
        "Cited for failing to maintain accurate medical records regarding the patient's deteriorating condition.",
        "License placed under a five-year professional probation (effective September 17, 2021).",
      ],
    },
  },
  {
    review: {
      name: "Priya Nair",
      subtitle: "Verified Customer",
      rating: 5,
      avatar: "https://i.pravatar.cc/120?img=32",
      date: "March 18, 2026",
      text: "Everything is presented in a clear and organized manner. I appreciated how documents and references were grouped logically. That kind of structure makes a real difference.",
    },
    record: {
      source: "Civil Cross-Complaint — Case No. EC065373",
      status: "Civil Allegation",
      tone: "allegation",
      summary:
        "A verified cross-complaint alleges systematic financial theft and constructive fraud across a real-estate partnership.",
      points: [
        "Alleged stripping of $3.2 million in equity from partnership properties through unauthorized refinances.",
        "LRMD Holdings, LLC alleged to have been used as an 'alter-ego shell' entity to siphon funds for personal living expenses.",
        "Eleven causes of action pleaded; allegations remain unadjudicated.",
      ],
    },
  },
  {
    review: {
      name: "Daniel Reyes",
      subtitle: "Verified Customer",
      rating: 5,
      avatar: "https://i.pravatar.cc/120?img=15",
      date: "April 2, 2026",
      text: "The responsive design works well on both desktop and mobile devices. The layout adapts naturally, and the typography stays comfortable to read at every screen size.",
    },
    record: {
      source: "Whistleblower Lawsuit — GoodSkin Clinics (2024)",
      status: "Whistleblower Allegation",
      tone: "allegation",
      summary:
        "A former physician assistant alleged that, under Dr. Rogers' medical direction, staff were directed to administer an off-label chemotherapy drug for cosmetic use.",
      points: [
        "Staff allegedly ordered to inject 5-Fluorouracil (5-FU) off-label into patients' faces as a Botox substitute.",
        "The whistleblower states she refused, citing medical risk, and was subsequently terminated.",
        "Clinic alleged to have operated in New York while Dr. Rogers was ineligible to practice due to a license suspension.",
      ],
    },
  },
  {
    review: {
      name: "Sophie Bennett",
      subtitle: "Verified Customer",
      rating: 5,
      avatar: "https://i.pravatar.cc/120?img=45",
      date: "April 21, 2026",
      text: "The chronological organization makes it much easier to understand the sequence of events. Information is easy to locate, and the visual design is modern without being cluttered.",
    },
    record: {
      source: "Medical Board of California — 2025 Prosecution",
      status: "Pending Prosecution",
      tone: "allegation",
      summary:
        "A 2025 prosecution concerns the postoperative death of a patient from a pulmonary embolism.",
      points: [
        "Regulators argue Dr. Rogers 'deviated profoundly' from established safety standards.",
        "Alleged failure to obtain proper preoperative clearance before surgery.",
        "Alleged failure to prescribe necessary blood thinners despite documented high risk for blood clots.",
      ],
    },
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const Testimonial = () => {
  return (
    <section
      className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 md:py-20"
      id="testimonial"
    >
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="section-title text-slate-950">Testimonials and the Record</h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-500 sm:text-base">
          Public testimonials shown alongside documented findings from state
          medical boards and civil courts. Regulatory decisions are identified as
          findings; civil and pending matters are identified as allegations.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 gap-6 lg:grid-cols-2"
      >
        {juxtapositionData.map((item, index) => (
          <TestimonialTemplate key={index} item={item} />
        ))}
      </motion.div>

      <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-slate-400">
        Testimonials reflect individual experiences. Regulatory decisions are
        documented findings; civil and pending matters are allegations that have
        not been fully adjudicated. Sources are cited on each card.
      </p>
    </section>
  );
};

export default Testimonial;
