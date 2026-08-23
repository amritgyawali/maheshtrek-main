import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Favicon. Built from plain boxes and text rather than an inline SVG mark:
 * the renderer only ships a Latin font, so shapes and "N" are safe while
 * Devanagari would fall back to blanks.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#0B1017",
          borderRadius: 7,
          color: "#FFFFFF",
          fontSize: 20,
          fontWeight: 700,
          position: "relative",
        }}
      >
        N
        <div
          style={{
            position: "absolute",
            right: 4,
            bottom: 4,
            width: 6,
            height: 6,
            borderRadius: 3,
            background: "#D02233",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
