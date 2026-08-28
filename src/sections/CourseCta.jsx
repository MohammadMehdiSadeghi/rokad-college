import { courseCta } from "../data/content.js";
import OffsetCard from "../components/OffsetCard.jsx";
import BrandButton from "../components/BrandButton.jsx";

export default function CourseCta() {
  return (
    <section className="section" id="path">
      <div className="container section-inner">
        <OffsetCard backColor="var(--teal)" radius="cut-tl-br" rotate="rotate-minus3" className="">
          <div style={{ background: "var(--navy)", padding: "var(--space-12)", textAlign: "center" }}>
            <h2 className="t-section" style={{ color: "#fff", marginBottom: "var(--space-4)", fontWeight: 950 }}>{courseCta.title}</h2>
            <p className="t-body mx-auto" style={{ color: "var(--bg-lavender)", marginBottom: "var(--space-8)" }}>{courseCta.text}</p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <BrandButton href="#courses" variant="teal" rotate="rotate-3">{courseCta.cta}</BrandButton>
            </div>
          </div>
        </OffsetCard>
      </div>
    </section>
  );
}
