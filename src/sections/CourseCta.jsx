import { courseCta } from "../data/content.js";
import OffsetCard from "../components/OffsetCard.jsx";
import BrandButton from "../components/BrandButton.jsx";

export default function CourseCta() {
  return (
    <section className="section" id="path" style={{ background: "var(--college)" }}>
      <div className="container section-inner">
        <div className="text-center" style={{ maxWidth: 720, marginInline: "auto" }}>
          <h2 className="t-section" style={{ color: "#fff", marginBottom: "var(--space-4)", fontWeight: 950 }}>
            {courseCta.title}
          </h2>
          <p className="t-body mx-auto" style={{ color: "rgba(255,255,255,0.9)", marginBottom: "var(--space-8)" }}>
            {courseCta.text}
          </p>
          <BrandButton href="#courses" variant="white" rotate="rotate-3">
            {courseCta.cta}
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
