// Chronological public-record timeline events (kept in strict chronological order).
// `label` -> prominent date shown on the card
// `tag`   -> concise headline
// `title` -> full description
export const timelineEvents = [
  {
    date: "2006",
    label: "2006",
    tag: "Susan Burke — Notice of Ruling",
    title: "Susan Burke v. Leif Rogers - Notice of Ruling filed",
  },
  {
    date: "2016-02-04",
    label: "Feb 4, 2016",
    tag: "Grossman v. Rogers — malpractice",
    title: "Polly Powers Grossman et al. v. Leif Rogers MD et al. filed",
  },
  {
    date: "2016-06-14",
    label: "Jun 14, 2016",
    tag: "EC065373 cross-complaint filed",
    title:
      "EC065373 verified cross-complaint filed against Rogers and related entities",
  },
  {
    date: "2016-08-03",
    label: "Aug 3, 2016",
    tag: "EC065373 amended & published",
    title:
      "EC065373 first amended verified cross-complaint served / filed copy published",
  },
  {
    date: "2021-01-15",
    label: "Jan 15, 2021",
    tag: "Navitas Credit status",
    title: "Navitas Credit Corp. summary status visible against Rogers and PC",
  },
  {
    date: "2021-08-18",
    label: "Aug 18, 2021",
    tag: "CA Board — 5-yr probation",
    title:
      "California Medical Board decision - revocation stayed, 5 years probation",
  },
  {
    date: "2022-05-30",
    label: "May 30, 2022",
    tag: "NY OPMC — probation",
    title:
      "New York OPMC final action effective - 36 month suspension stayed, probation",
  },
  {
    date: "2024-01-04",
    label: "Jan 4, 2024",
    tag: "Right Choice ruling",
    title: "Right Choice Construction case tentative ruling visible",
  },
  {
    date: "2024-09-11",
    label: "Sep 11, 2024",
    tag: "Abramov v. GoodSkin (NY)",
    title: "Michelle Abramov v. GoodSkin filed in New York Supreme Court",
  },
  {
    date: "2024-11",
    label: "Nov 2024",
    tag: "Abramov settled",
    title: "Abramov matter settled before trial",
  },
  {
    date: "2025-06-13",
    label: "Jun 13, 2025",
    tag: "CA Board — later accusation",
    title: "California Medical Board later accusation filed",
  },
  {
    date: "2025",
    label: "2025",
    tag: "Accusation dismissed",
    title:
      "California Medical Board alert sheet lists later accusation dismissed",
  },
  {
    date: "2026-04-08",
    label: "Apr 8, 2026",
    tag: "Von Lutzow case filed",
    title:
      "Danielle Von Lutzow employment case filed in Los Angeles Superior Court",
  },
  {
    date: "2026-05-13",
    label: "May 13, 2026",
    tag: "Removed to C.D. Cal.",
    title: "Von Lutzow case removed to C.D. California",
  },
  {
    date: "2026-06-03",
    label: "Jun 3, 2026",
    tag: "Federal remand — back to LASC",
    title:
      "Federal remand order sends Von Lutzow back to Los Angeles Superior Court",
  },
];

// Smooth gradient palette cycled across the milestones.
// Purple, Cyan, Lime, Yellow, Orange, Pink, Blue.
export const palette = [
  { name: "purple", from: "#8b5cf6", to: "#a855f7", glow: "rgba(139, 92, 246, 0.55)" },
  { name: "cyan", from: "#06b6d4", to: "#22d3ee", glow: "rgba(6, 182, 212, 0.55)" },
  { name: "lime", from: "#65a30d", to: "#a3e635", glow: "rgba(132, 204, 22, 0.55)" },
  { name: "yellow", from: "#eab308", to: "#facc15", glow: "rgba(234, 179, 8, 0.55)" },
  { name: "orange", from: "#f97316", to: "#fb923c", glow: "rgba(249, 115, 22, 0.55)" },
  { name: "pink", from: "#db2777", to: "#f472b6", glow: "rgba(236, 72, 153, 0.55)" },
  { name: "blue", from: "#2563eb", to: "#60a5fa", glow: "rgba(59, 130, 246, 0.55)" },
];

export const colorFor = (index) => palette[index % palette.length];
