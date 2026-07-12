// Serpentine "roadmap" layout — a boustrophedon grid of milestones.
//
// Cards are laid out 3 per row on desktop. Odd rows read left → right and
// slope gently downward; even rows read right → left and slope down again,
// so the connecting line snakes down the page like a road with rounded
// U-turns at each row end. Milestones sit on the road; their cards float
// above / below alternately so they never cover the line.

const COLS = 3;

export function buildInfinity({
  count,
  width = 1200,
  colX = [220, 600, 980],
  topY = 340, // room for the first band of cards above the road
  rowH = 360, // vertical distance between road rows (one card band each)
  slope = 60, // how far a row drops from its start to its end
  anchorGap = 26, // gap between a node and the card it anchors
  bottomPad = 90,
}) {
  const rows = Math.ceil(count / COLS);

  // --- Node points, in chronological (reading) order ---
  // Every card floats ABOVE its node so consecutive rows never collide:
  // each row's cards sit in the empty band above that row's road.
  const pts = [];
  const nodes = [];
  for (let i = 0; i < count; i++) {
    const r = Math.floor(i / COLS);
    const j = i % COLS; // position within the row, in reading order
    const ltr = r % 2 === 0;
    const x = ltr ? colX[j] : colX[COLS - 1 - j];
    const y = topY + r * rowH + (j / (COLS - 1)) * slope;
    nodes.push({ index: i, number: i + 1, x, y, placement: "up" });
    pts.push({ x, y });
  }

  const height = topY + (rows - 1) * rowH + slope + bottomPad;

  // Cumulative chord length → scroll-progress fraction per node.
  const cum = [0];
  for (let i = 1; i < pts.length; i++) {
    cum.push(cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
  }
  const total = cum[cum.length - 1] || 1;

  nodes.forEach((n, i) => {
    const anchorY = n.placement === "up" ? n.y - anchorGap : n.y + anchorGap;
    n.tFrac = cum[i] / total;
    n.anchorX = n.x;
    n.anchorY = anchorY;
    n.leftPct = (n.x / width) * 100;
    n.topPct = (n.y / height) * 100;
    n.anchorLeftPct = (n.x / width) * 100;
    n.anchorTopPct = (anchorY / height) * 100;
  });

  return {
    path: catmullRom(pts),
    nodes,
    width,
    height,
    start: pts[0] || { x: 0, y: 0 },
    end: pts[pts.length - 1] || { x: 0, y: 0 },
  };
}

// Smooth Catmull-Rom spline through the points → SVG path. The outward-bulging
// control points at row ends give the road its rounded U-turns.
function catmullRom(p) {
  if (p.length < 2) return p.length ? `M${p[0].x} ${p[0].y}` : "";
  let d = `M${p[0].x.toFixed(2)} ${p[0].y.toFixed(2)} `;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] || p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += `C${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} `;
  }
  return d;
}
