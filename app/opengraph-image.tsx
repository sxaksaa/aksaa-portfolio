import { ImageResponse } from "next/og";

export const alt =
  "Akbar Salahudin Purnomo - Junior Laravel Full Stack Developer portfolio preview";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f7f8fb",
          color: "#111111",
          fontFamily: "Arial, Helvetica, sans-serif",
          padding: "64px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 220,
            background:
              "linear-gradient(180deg, rgba(124, 58, 237, 0.18), rgba(247, 248, 251, 0))",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "58%",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                border: "1px solid #ddd6fe",
                borderRadius: 8,
                background: "#f5f3ff",
                color: "#6d28d9",
                padding: "10px 14px",
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              Portfolio Developer
            </div>

            <div
              style={{
                marginTop: 32,
                fontSize: 78,
                lineHeight: 0.95,
                fontWeight: 900,
                letterSpacing: -1,
              }}
            >
              Akbar Salahudin Purnomo
            </div>

            <div
              style={{
                marginTop: 28,
                fontSize: 31,
                lineHeight: 1.28,
                color: "#374151",
              }}
            >
              Junior Laravel Full Stack Developer focused on Laravel, PHP,
              MySQL, REST API, payment integration, and usable web products.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
              color: "#4b5563",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            <span>Malang, Indonesia</span>
            <span style={{ color: "#8b5cf6" }}>/</span>
            <span>github.com/sxaksaa</span>
          </div>
        </div>

        <div
          style={{
            width: "42%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              width: 420,
              border: "1px solid #e5e7eb",
              borderRadius: 18,
              background: "#ffffff",
              padding: 28,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {[
              ["Main Stack", "Laravel / PHP / MySQL"],
              ["Project Focus", "Digital license, learning, e-commerce"],
              ["Strength", "Payment flow, admin dashboard, REST API"],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  borderBottom: label === "Strength" ? "0" : "1px solid #eeeeee",
                  paddingBottom: label === "Strength" ? 0 : 14,
                }}
              >
                <div
                  style={{
                    color: "#6d28d9",
                    fontSize: 16,
                    fontWeight: 900,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </div>
                <div style={{ color: "#111827", fontSize: 30, fontWeight: 900 }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
