import { motion } from "framer-motion";
import { colorFor } from "./timelineData";

// Floating glass card. Fades/rises in individually when scrolled into view
// (Framer Motion `whileInView` → IntersectionObserver) and lifts on hover.
const InfinityCard = ({ node, event, index, isActive, onEnter, onLeave, variant = "floating" }) => {
  const color = colorFor(index);
  const gradient = `linear-gradient(135deg, ${color.from}, ${color.to})`;

  const Inner = (
    <motion.div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[20px] border border-slate-100 bg-white p-4 lg:p-5"
      style={{
        textAlign: "left",
        boxShadow: isActive
          ? `0 30px 60px -20px ${color.glow}, 0 12px 24px -14px rgba(15,23,42,0.22)`
          : "0 24px 50px -24px rgba(15,23,42,0.28)",
      }}
    >
      <span
        className="block h-1.5 w-10 rounded-full"
        style={{ background: gradient }}
      />
      <p
        className="mt-3 text-lg font-semibold leading-none lg:text-xl"
        style={{ background: gradient, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
      >
        {event.label}
      </p>
      <p className="mt-2 line-clamp-2 text-[13px] font-semibold leading-snug text-slate-700 lg:text-sm">
        {event.tag}
      </p>
      <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-slate-500">
        {event.title}
      </p>
    </motion.div>
  );

  // ---- Mobile stacked ----
  if (variant === "stacked") {
    return <div className="w-full">{Inner}</div>;
  }

  // ---- Floating (positioned over the SVG, above or below the node) ----
  const centerY = node.placement === "up" ? "translateY(-100%)" : "translateY(0)";
  return (
    <div
      className="absolute w-[190px] lg:w-[230px]"
      style={{
        left: `${node.anchorLeftPct}%`,
        top: `${node.anchorTopPct}%`,
        transform: `translateX(-50%) ${centerY}`,
      }}
    >
      {Inner}
    </div>
  );
};

export default InfinityCard;
