import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_DESCRIPTION, SITE_PUBLISHER } from "./site";

// Static, build-time generated share image. Produces a real 1200x630 PNG so
// links render a proper preview on Facebook, LinkedIn, X/Twitter, Slack,
// WhatsApp, and iMessage (an SVG share image renders on none of them).
export const runtime = "nodejs";
export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #010f20 0%, #0f172a 55%, #1f2937 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 44,
              borderRadius: 4,
              background: "#b64040",
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#cbd5e1",
            }}
          >
            {SITE_PUBLISHER}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 980,
            }}
          >
            Dr. Leif L. Rogers, MD — Public Records Archive
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.35,
              color: "#94a3b8",
              maxWidth: 980,
            }}
          >
            {SITE_DESCRIPTION}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            color: "#cbd5e1",
          }}
        >
          <span>Litigation reports</span>
          <span style={{ color: "#475569" }}>•</span>
          <span>Medical board history</span>
          <span style={{ color: "#475569" }}>•</span>
          <span>Court filings</span>
          <span style={{ color: "#475569" }}>•</span>
          <span>OSINT dashboard</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
