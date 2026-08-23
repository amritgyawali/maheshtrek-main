import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Favicon. Boxes and arcs rather than text: the renderer ships only a Latin
 * font, so a script-neutral mark is the safe choice at 32px.
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
          background: "linear-gradient(135deg, #FF3B4F 0%, #7A6BFF 100%)",
          borderRadius: 9,
          position: "relative",
        }}
      >
        <div
          style={{ position: "absolute", left: 8, top: 13, width: 6, height: 6, borderRadius: 3, background: "#08090C" }}
        />
        <div
          style={{
            position: "absolute",
            left: 15,
            top: 8,
            width: 8,
            height: 16,
            borderRadius: 8,
            border: "2.4px solid #08090C",
            borderLeftColor: "transparent",
            borderTopColor: "transparent",
            borderBottomColor: "transparent",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
