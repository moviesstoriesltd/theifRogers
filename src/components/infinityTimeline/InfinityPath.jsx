import { motion } from "framer-motion";
import { palette } from "./timelineData";

// The stacked-infinity curve. A faint full-length track sits underneath a
// gradient stroke whose `pathLength` is driven by scroll progress, so the line
// appears to draw itself as the reader scrolls through the journey.
const InfinityPath = ({ path, height, pathLength }) => {
  return (
    <>
      <defs>
        <linearGradient
          id="infinity-gradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="0"
          y2={height}
        >
          {palette.map((c, i) => (
            <stop
              key={c.name}
              offset={`${(i / (palette.length - 1)) * 100}%`}
              stopColor={c.from}
            />
          ))}
        </linearGradient>

        <filter id="infinity-soft" x="-20%" y="-3%" width="140%" height="106%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* Soft under-glow of the drawn portion */}
      <motion.path
        d={path}
        fill="none"
        stroke="url(#infinity-gradient)"
        strokeWidth="16"
        strokeLinecap="round"
        opacity="0.16"
        filter="url(#infinity-soft)"
        style={{ pathLength }}
      />

      {/* Faint full-length track */}
      <path
        d={path}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Gradient stroke that draws on scroll */}
      <motion.path
        d={path}
        fill="none"
        stroke="url(#infinity-gradient)"
        strokeWidth="4.5"
        strokeLinecap="round"
        style={{ pathLength }}
      />
    </>
  );
};

export default InfinityPath;
