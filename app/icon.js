import { ImageResponse } from "next/og";

// Generated PNG favicon (raster) so browsers and crawlers that don't request
// the SVG still get a real icon. Rendered as an "LR" monogram on the brand navy.
export const runtime = "nodejs";
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 260,
          fontWeight: 700,
          fontFamily: "sans-serif",
          letterSpacing: -8,
        }}
      >
        LR
      </div>
    ),
    { ...size }
  );
}
