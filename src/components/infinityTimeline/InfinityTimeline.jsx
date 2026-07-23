"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { timelineEvents, colorFor } from "./timelineData";
import { buildInfinity } from "./infinityGeometry";
import InfinityPath from "./InfinityPath";
import InfinityNode from "./InfinityNode";
import InfinityCard from "./InfinityCard";

const InfinityTimeline = () => {
  const sectionRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [progress, setProgress] = useState(0);

  const inf = useMemo(() => buildInfinity({ count: timelineEvents.length }), []);

  // Draw the line as the section scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.35"],
  });
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => setProgress(v));

  // The current node is the last one the drawn line has reached.
  const currentIndex = useMemo(() => {
    let idx = -1;
    for (const n of inf.nodes) if (progress >= n.tFrac - 0.005) idx = n.index;
    return idx;
  }, [inf.nodes, progress]);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative overflow-hidden bg-white py-10 md:py-16"
      style={{ fontFamily: "var(--font-poppins), var(--font-work-sans), sans-serif" }}
    >
      {/* Minimal white background with soft radial gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 12% 6%, rgba(139,92,246,0.07), transparent 30%)," +
            "radial-gradient(circle at 88% 28%, rgba(6,182,212,0.07), transparent 30%)," +
            "radial-gradient(circle at 85% 70%, rgba(236,72,153,0.06), transparent 32%)," +
            "radial-gradient(circle at 15% 94%, rgba(59,130,246,0.06), transparent 32%)",
        }}
      />

      <div className="content relative max-xxl:px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-10 max-w-2xl text-center md:mb-16"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            A Journey Through the Record
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            The Timeline of Deception
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-500 sm:text-base">
            Fifteen documented events, from the first filing in 2006 to the
            present — traced along one continuous roadmap. Scroll to follow the
            line.
          </p>
        </motion.div>

        {/* ---- Infinity curve (tablet + desktop) ---- */}
        <div className="hidden md:block">
          <div
            className="relative mx-auto w-full max-w-[860px] lg:max-w-[1060px]"
            style={{ aspectRatio: `${inf.width} / ${Math.round(inf.height)}` }}
          >
            <svg
              viewBox={`0 0 ${inf.width} ${inf.height}`}
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 h-full w-full overflow-visible"
              role="img"
              aria-label="Infinity-shaped timeline of public-record events from 2006 to 2026"
            >
              <InfinityPath path={inf.path} height={inf.height} pathLength={pathLength} />

              {/* Numbered markers */}
              {inf.nodes.map((node) => (
                <InfinityNode
                  key={node.index}
                  node={node}
                  reached={progress >= node.tFrac - 0.005}
                  current={hovered === node.index || currentIndex === node.index}
                  onEnter={() => setHovered(node.index)}
                  onLeave={() => setHovered(null)}
                />
              ))}
            </svg>

            {/* Floating cards overlay (aligned to the same viewBox) */}
            <div className="pointer-events-none absolute inset-0">
              {inf.nodes.map((node) => (
                <div key={node.index} className="pointer-events-auto">
                  <InfinityCard
                    node={node}
                    index={node.index}
                    event={timelineEvents[node.index]}
                    isActive={hovered === node.index || currentIndex === node.index}
                    onEnter={() => setHovered(node.index)}
                    onLeave={() => setHovered(null)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---- Vertical detail view (mobile) ---- */}
        <div className="md:hidden">
          <ol className="relative mx-auto max-w-md space-y-4 pl-8">
            <span className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-violet-400 via-cyan-400 to-pink-400" />
            {timelineEvents.map((event, index) => {
              const color = colorFor(index);
              return (
                <li key={event.date + index} className="relative">
                  <span
                    className="absolute -left-8 top-2 flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold text-white ring-4 ring-white"
                    style={{
                      background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
                      boxShadow: `0 0 0 2px ${color.glow}`,
                    }}
                  >
                    {index + 1}
                  </span>
                  <InfinityCard
                    variant="stacked"
                    index={index}
                    event={event}
                    isActive={false}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default InfinityTimeline;
