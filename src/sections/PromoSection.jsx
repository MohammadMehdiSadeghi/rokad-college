import { promoSection } from "../data/content.js";
import OffsetCard from "../components/OffsetCard.jsx";
import BrandButton from "../components/BrandButton.jsx";
import RotatedHeading from "../components/RotatedHeading.jsx";

export default function PromoSection() {
  return (
    <section className="section" id="about">
      <div className="container section-inner">
        <OffsetCard backColor="var(--college)" radius="cut-tl-br-lg" rotate="rotate-minus2">
          <div
            style={{
              background: "var(--white)",
              padding: "var(--space-12) var(--space-10)",
              border: "2.75px solid var(--ink)",
              borderRadius: "0 28px 0 28px",
            }}
          >
            <div className="text-center" style={{ maxWidth: 860, marginInline: "auto" }}>
              <span
                className="tag tag-amber"
                style={{ marginBottom: "var(--space-6)" }}
              >
                درباره کالج رکاد
              </span>
              <RotatedHeading
                words={promoSection.title}
                className="t-section"
                color="var(--navy)"
              />
              <p
                className="t-body mx-auto"
                style={{ color: "var(--ink)", marginTop: "var(--space-6)", maxWidth: "72ch" }}
              >
                {promoSection.text}
              </p>
              <p
                className="t-card"
                style={{
                  marginBlock: "var(--space-8)",
                  fontWeight: 900,
                  background: "linear-gradient(135deg, var(--college) 0%, var(--college-dark) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {promoSection.highlight}
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <BrandButton href="#about" variant="amber" rotate="rotate-2">
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
