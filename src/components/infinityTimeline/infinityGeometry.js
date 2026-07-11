// Generate a continuous, vertically-stacked infinity (∞) braid — a lemniscate
// column that begins at the top center and descends through repeated loops.
//
//   x(t) = cx + A·sin(t)
//   y(t) = yStart + C·t + (A/2)·sin(2t)
//
// With A > C the strands overlap and self-cross once per loop, producing the
// stacked-∞ look. Milestones are placed at the loop tips (t = π/2 + kπ), which
// alternate right / left and sit exactly on the curve.

export function buildInfinity({
  count,
  width = 1000,
  cx = 500,
  A = 160,
  C = 54,
  yStart = 70,
  tailPad = 70,
}) {
  const x = (t) => cx + A * Math.sin(t);
  const y = (t) => yStart + C * t + (A / 2) * Math.sin(2 * t);

  const tEnd = Math.PI / 2 + (count - 1) * Math.PI + Math.PI / 2;
  const height = y(tEnd) + tailPad;

  // Milestone tips.
  const nodes = [];
  for (let k = 0; k < count; k++) {
    const t = Math.PI / 2 + k * Math.PI;
    const side = Math.sin(t) > 0 ? "right" : "left";
    const nx = x(t);
    const ny = y(t);
    // Card anchor sits a little further out along the tip's side.
    const anchorX = side === "right" ? nx + 46 : nx - 46;
    nodes.push({
      index: k,
      number: k + 1,
      t,
      x: nx,
      y: ny,
      side,
      anchorX,
      tFrac: t / tEnd,
      leftPct: (nx / width) * 100,
      topPct: (ny / height) * 100,
      anchorLeftPct: (anchorX / width) * 100,
      anchorTopPct: (ny / height) * 100,
    });
  }

  // Dense polyline → smooth path string.
  const samples = Math.ceil((tEnd / Math.PI) * 60);
  let path = "";
  for (let i = 0; i <= samples; i++) {
    const t = (tEnd * i) / samples;
    path += `${i === 0 ? "M" : "L"}${x(t).toFixed(2)} ${y(t).toFixed(2)} `;
  }

  return {
    path,
    nodes,
    width,
    height,
    tEnd,
    start: { x: x(0), y: y(0) },
    end: { x: x(tEnd), y: y(tEnd) },
  };
}
