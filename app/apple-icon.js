import { ImageResponse } from "next/og";

// Apple touch icon. iOS ignores SVG icons, so this generates the required PNG
// (180x180) for home-screen bookmarks and Safari — same logo glyph as /logo.svg.
export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same artwork as public/logo.svg (white glyph → shown on the dark brand navy).
const LOGO_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M16.428,0H5.547c-1.93,0-3.5,1.57-3.5,3.5V24H21.996l.053-18.334L16.428,0ZM5.047,21V3.5c0-.275,.225-.5,.5-.5H14.047v5h4.995l-.038,13H5.047Zm1.953-5h10v3H7v-3Zm1.5-8c0-1.105,.895-2,2-2s2,.895,2,2-.895,2-2,2-2-.895-2-2Zm5.5,6H7v-1c0-1.105,.895-2,2-2h3c1.105,0,2,.895,2,2v1Z' fill='#ffffff'/></svg>";
const LOGO_DATA_URI = `data:image/svg+xml,${encodeURIComponent(LOGO_SVG)}`;

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
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO_DATA_URI} width={110} height={110} alt="" />
      </div>
    ),
    { ...size }
  );
}
