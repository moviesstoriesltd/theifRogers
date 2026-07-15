import { ImageResponse } from "next/og";

// Apple touch icon. iOS ignores SVG icons, so this generates the required PNG
// (180x180) for home-screen bookmarks and Safari.
export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #010f20 0%, #1f2937 100%)",
          color: "#f8fafc",
          fontSize: 92,
          fontWeight: 700,
          fontFamily: "sans-serif",
          letterSpacing: -3,
        }}
      >
        LR
      </div>
    ),
    { ...size }
  );
}
