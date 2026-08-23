import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          position: "relative",
        }}
      >
        <div
          style={{ position: "absolute", left: 44, top: 76, width: 28, height: 28, borderRadius: 14, background: "#08090C" }}
        />
        <div
          style={{
            position: "absolute",
            left: 82,
            top: 50,
            width: 40,
            height: 80,
            borderRadius: 40,
            border: "12px solid #08090C",
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
