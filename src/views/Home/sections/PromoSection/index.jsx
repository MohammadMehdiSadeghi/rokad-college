import { promoSection } from "@/data/content.js";
import OffsetCard from "@/Components/OffsetCard.jsx";
import RotatedHeading from "@/Components/RotatedHeading.jsx";

export default function PromoSection() {
  return (
    <section className="section" id="about">
      <div className="container section-inner">
        <OffsetCard
          backColor="var(--navy)"
          radius="cut-tl-br"
          rotate=""
          shadowOffset={6}
        >
          {/* Card content — NO extra border, NO extra borderRadius */}
          <div
            style={{
              padding: "var(--space-12) var(--space-10)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="text-center" style={{ maxWidth: 860, display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* Badge */}
              <span
                className="tag tag-amber"
                style={{ marginBottom: "var(--space-4)", display: "inline-block" }}
              >
                درباره کالج رکاد
              </span>

              {/* Title */}
              <RotatedHeading
                words={promoSection.title}
                className="t-section"
                color="var(--navy)"
              />

              {/* Description */}
              <p
                className="t-body mx-auto"
                style={{
                  color: "var(--ink)",
                  marginTop: "var(--space-6)",
                  maxWidth: "72ch",
                }}
              >
                {promoSection.text}
              </p>

              {/* Highlight text */}
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

              {/* CTA button */}
              <a
                href="#about"
                className="btn btn-amber"
                style={{ padding: "14px 32px", fontSize: 16 }}
              >
                {promoSection.cta}
              </a>
            </div>
          </div>
        </OffsetCard>
      </div>
    </section>
  );
}
