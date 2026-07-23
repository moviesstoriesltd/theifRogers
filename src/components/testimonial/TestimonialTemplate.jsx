"use client";

import { motion } from "framer-motion";

const Star = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-amber-400" aria-hidden="true">
    <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.98l-5.2 2.53.99-5.79-4.21-4.1 5.82-.85L10 1.5z" />
  </svg>
);

// Small scales-of-justice mark for the documented record.
const RecordMark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
    <path d="M12 3v18M7 21h10M5 7h14M5 7l-2.5 6a3 3 0 0 0 5 0L5 7zM19 7l-2.5 6a3 3 0 0 0 5 0L19 7z" />
  </svg>
);

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

// Tone styling for the record's status chip.
const toneStyles = {
  finding: "bg-rose-50 text-rose-700 ring-rose-200",
  allegation: "bg-amber-50 text-amber-700 ring-amber-200",
};

const TestimonialTemplate = ({ item }) => {
  const { review, record } = item;
  const tone = toneStyles[record.tone] || toneStyles.allegation;

  return (
    <motion.figure
      variants={cardVariants}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="flex h-full flex-col overflow-hidden rounded-[20px] border border-slate-200/80 bg-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.25)] transition-shadow duration-300 hover:shadow-[0_22px_45px_-20px_rgba(15,23,42,0.35)]"
    >
      {/* ---- The Review ---- */}
      {/* <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={review.avatar}
              alt={review.name}
              loading="lazy"
              className="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-slate-200"
            />
            <figcaption>
              <p className="text-base font-semibold text-slate-900">{review.name}</p>
              <p className="text-sm font-light text-slate-500">{review.subtitle}</p>
            </figcaption>
          </div>
          <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-200">
            Testimonial
          </span>
        </div>

        <div className="mt-4 flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} />
          ))}
        </div>

        <blockquote className="mt-4 text-[15px] leading-relaxed text-slate-600">
          &ldquo;{review.text}&rdquo;
        </blockquote>

        <time className="mt-5 block text-sm font-light text-slate-400">{review.date}</time>
      </div> */}

      {/* ---- Divider ---- */}
      {/* <div className="relative px-6 sm:px-7">
        <div className="border-t border-dashed border-slate-200" />
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white px-3 py-0.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
          The Factual Record
        </span>
      </div> */}

      {/* ---- The Factual Record ---- */}
      <div className="mt-auto m-4 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100 sm:m-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-700">
            <span className="text-brand-primary">
              <RecordMark />
            </span>
            <p className="text-[13px] font-semibold leading-snug text-slate-800">
              {record.source}
            </p>
          </div>
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ring-1 ${tone}`}>
            {record.status}
          </span>
        </div>

        <p className="mt-3 text-[13.5px] leading-relaxed text-slate-600">
          {record.summary}
        </p>

        <ul className="mt-3 space-y-2">
          {record.points.map((point, i) => (
            <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-slate-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.figure>
  );
};

export default TestimonialTemplate;
