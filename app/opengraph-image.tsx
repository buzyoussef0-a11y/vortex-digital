import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Vortex Digital — مواقع احترافية وأتمتة AI في المغرب";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#00050A",
          padding: "0 80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow left */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,229,255,0.18) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Background glow right */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(123,97,255,0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Left — Text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            flex: 1,
            zIndex: 1,
          }}
        >
          {/* Tag */}
          <div
            style={{
              display: "flex",
              color: "#00E5FF",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            [ VORTEX DIGITAL ]
          </div>

          {/* Main heading */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div
              style={{
                fontSize: 58,
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              مواقع احترافية
            </div>
            <div
              style={{
                fontSize: 58,
                fontWeight: 900,
                color: "#00E5FF",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              + أتمتة AI
            </div>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,0.5)",
              marginTop: 8,
            }}
          >
            نجاوبك في أقل من 24 ساعة — المغرب
          </div>

          {/* CTA pill */}
          <div
            style={{
              display: "flex",
              marginTop: 24,
              background: "rgba(0,229,255,0.12)",
              border: "1px solid rgba(0,229,255,0.4)",
              borderRadius: 100,
              padding: "12px 28px",
              color: "#00E5FF",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.15em",
              width: "fit-content",
            }}
          >
            vortex-digital-phi.vercel.app
          </div>
        </div>

        {/* Right — Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://vortex-digital-phi.vercel.app/vortex.jpeg"
          alt="Vortex Digital Logo"
          width={300}
          height={300}
          style={{
            objectFit: "contain",
            zIndex: 1,
            filter: "drop-shadow(0 0 40px rgba(0,229,255,0.5))",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
