import { courseCta } from "@/data/content.js";
import BrandButton from "@/Components/BrandButton.jsx";

export default function CourseCta() {
  return (
    <section className="section" id="path" style={{ background: "linear-gradient(135deg, var(--college) 0%, var(--college-dark) 100%)", position: "relative", overflow: "hidden" }}>
      {/* Decorative shapes */}
      <div
        className="absolute animate-float"
        style={{
          top: "10%",
          right: "5%",
          width: 100,
          height: 100,
          borderRadius: "24px 0 24px 0",
          background: "rgba(255,255,255,0.08)",
          transform: "rotate(20deg)",
        }}
      />
      <div
        className="absolute animate-float delay-3"
        style={{
          bottom: "15%",
          left: "8%",
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "50%",
          left: "50%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="absolute animate-float delay-5"
        style={{
          top: "30%",
          left: "20%",
          width: 60,
          height: 60,
          borderRadius: "16px 0 16px 0",
          background: "rgba(255,255,255,0.05)",
          transform: "rotate(45deg)",
        }}
      />

      <div className="container section-inner" style={{ position: "relative", zIndex: 10 }}>
        <div className="text-center" style={{ maxWidth: 720, marginInline: "auto" }}>
          <h2 className="t-section animate-fade-in-up" style={{ color: "#fff", marginBottom: "var(--space-4)", fontWeight: 950 }}>
            {courseCta.title}
          </h2>
          <p className="t-body mx-auto animate-fade-in-up delay-2" style={{ color: "rgba(255,255,255,0.9)", marginBottom: "var(--space-8)" }}>
            {courseCta.text}
          </p>
          <div className="animate-scale-in delay-3">
            <BrandButton href="#courses" variant="white" rotate="rotate-1.5">
              {courseCta.cta}
            </BrandButton>
          </div>
        </div>
      </div>
    </section>
  );
}
