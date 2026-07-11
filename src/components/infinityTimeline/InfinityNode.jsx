import { motion } from "framer-motion";
import { colorFor } from "./timelineData";

// A milestone marker on the infinity curve. Dim until the scroll-drawn line
// reaches it; the current node glows and pulses.
const InfinityNode = ({ node, reached, current, onEnter, onLeave }) => {
  const color = colorFor(node.index);
  const gid = `inf-node-${node.index}`;
  const lit = reached || current;

  return (
    <g onMouseEnter={onEnter} onMouseLeave={onLeave} style={{ cursor: "pointer" }}>
      <defs>
        <radialGradient id={gid}>
          <stop offset="0%" stopColor={color.to} />
          <stop offset="100%" stopColor={color.from} />
        </radialGradient>
      </defs>

      {/* Connector from the tip out to its card */}
      <line
        x1={node.x}
        y1={node.y}
        x2={node.anchorX}
        y2={node.y}
        stroke={color.from}
        strokeWidth={current ? 3 : 1.8}
        strokeLinecap="round"
        strokeDasharray="4 5"
        opacity={lit ? 0.8 : 0.35}
      />

      {/* Glow halo — animates on the current node */}
      <motion.circle
        cx={node.x}
        cy={node.y}
        fill={color.glow}
        initial={false}
        animate={
          current
            ? { r: [26, 38, 26], opacity: [0.7, 1, 0.7] }
            : { r: 22, opacity: lit ? 0.5 : 0 }
        }
        transition={
          current
            ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.4 }
        }
      />

      {/* White ring */}
      <circle cx={node.x} cy={node.y} r={current ? 19 : 16} fill="#ffffff" />

      {/* Colored disc */}
      <circle
        cx={node.x}
        cy={node.y}
        r={current ? 15 : 12.5}
        fill={lit ? `url(#${gid})` : "#cbd5e1"}
      />

      {/* Step number */}
      <text
        x={node.x}
        y={node.y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={current ? 15 : 13}
        fontWeight="700"
        fill="#ffffff"
        style={{ pointerEvents: "none", fontFamily: "var(--font-poppins), sans-serif" }}
      >
        {node.number}
      </text>
    </g>
  );
};

export default InfinityNode;
