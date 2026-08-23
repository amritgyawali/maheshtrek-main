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
          background: "#0B1017",
          color: "#FFFFFF",
          fontSize: 104,
          fontWeight: 700,
          position: "relative",
        }}
      >
        N
        <div
          style={{
            position: "absolute",
            right: 26,
            bottom: 26,
            width: 26,
            height: 26,
            borderRadius: 13,
            background: "#D02233",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
