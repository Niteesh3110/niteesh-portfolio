import { ImageResponse } from "next/og";

export const alt = "Niteesh Panchal, Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#174d38",
          backgroundImage:
            "radial-gradient(1000px 520px at 82% -12%, rgba(178,255,158,0.20), transparent 60%), radial-gradient(820px 640px at -12% 120%, rgba(0,0,0,0.32), transparent 55%)",
          color: "#edf6f9",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              backgroundColor: "#b2ff9e",
              color: "#174d38",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              fontWeight: 700,
            }}
          >
            N
          </div>
          <div style={{ fontSize: "28px", color: "#b2ff9e", letterSpacing: "2px" }}>
            PORTFOLIO
          </div>
        </div>

        <div style={{ fontSize: "94px", fontWeight: 700, lineHeight: 1.04 }}>
          Niteesh Panchal
        </div>
        <div style={{ fontSize: "46px", color: "#b2ff9e", marginTop: "16px" }}>
          Software Engineer at HOS Management
        </div>
        <div
          style={{
            fontSize: "30px",
            color: "rgba(242,242,242,0.72)",
            marginTop: "30px",
          }}
        >
          Next.js · React · TypeScript · PostgreSQL · Google Cloud
        </div>
      </div>
    ),
    { ...size },
  );
}
