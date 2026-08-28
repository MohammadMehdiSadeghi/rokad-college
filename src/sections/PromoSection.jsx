import { promoSection } from "../data/content.js";
import OffsetCard from "../components/OffsetCard.jsx";
import BrandButton from "../components/BrandButton.jsx";
import RotatedHeading from "../components/RotatedHeading.jsx";

export default function PromoSection() {
  return (
    <section className="section" id="about">
      <div className="container section-inner">
        <OffsetCard backColor="var(--teal)" radius="cut-tl-br" rotate="rotate-minus3" className="">
          <div style={{ background: "var(--teal-light)", padding: "var(--space-12)" }}>
            <div className="text-center" style={{ maxWidth: 920, marginInline: "auto" }}>
              <span className="tag tag-teal" style={{ marginBottom: "var(--space-6)" }}>درباره کالج رکاد</span>
              <RotatedHeading
                words={promoSection.title}
                className="t-section"
                color="var(--navy)"
              />
              <p className="t-body mx-auto" style={{ color: "var(--ink)", marginTop: "var(--space-6)", maxWidth: "70ch" }}>
                {promoSection.text}
              </p>
              <p className="t-card" style={{ color: "var(--teal-dark)", marginBlock: "var(--space-8)", fontWeight: 900 }}>
                {promoSection.highlight}
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <BrandButton href="#about" variant="teal" rotate="rotate-3">
                  {promoSection.cta}
                </BrandButton>
              </div>
            </div>
          </div>
        </OffsetCard>
      </div>
    </section>
  );
}
