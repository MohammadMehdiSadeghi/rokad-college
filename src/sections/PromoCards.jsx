import { promoCards } from "../data/content.js";
import OffsetCard from "../components/OffsetCard.jsx";

// Theme cycles: college(amber) → navy → teal → accent(magenta)
const themeByIndex = [
  { back: "var(--college)", tag: "tag-amber",  radius: "cut-tl-br", rotate: "rotate-minus1" },
  { back: "var(--navy)",    tag: "tag-navy",   radius: "cut-tr-bl", rotate: "rotate-1" },
  { back: "var(--teal)",    tag: "tag-teal",   radius: "cut-tl-br", rotate: "rotate-minus1" },
  { back: "var(--accent)",  tag: "tag-magenta",radius: "cut-tr-bl", rotate: "rotate-1" },
];

export default function PromoCards() {
  return (
    <section className="section" id="promo" style={{ background: "var(--college-light)" }}>
      <div className="bg-pattern">
        <img src="/assets/Hero/Hero-Pattern.png" alt="" aria-hidden="true" />
      </div>
      <div className="container section-inner">
        <div className="grid-4">
          {promoCards.map((c, i) => {
            const t = themeByIndex[i % themeByIndex.length];
            return (
              <OffsetCard
                key={c.title}
                backColor={t.back}
                radius={t.radius}
                rotate={t.rotate}
                className="animate-fade-in-up"
              >
                <div
                  style={{
                    padding: "var(--space-5) var(--space-6)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-4)",
                  }}
                >
                  {/* Icon badge */}
                  <div
                    className="icon-badge"
                    style={{
                      background: t.back,
                      border: `2px solid ${t.back}`,
                      color: i === 0 ? "#fff" : "var(--college-dark)",
                    }}
                  >
                    {c.icon}
                  </div>

                  {/* Title */}
                  <h3
                    className="t-card"
                    style={{
                      color: "var(--ink)",
                      fontWeight: 900,
                      lineHeight: 1.25,
                    }}
                  >
                    {c.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="t-sm"
                    style={{
                      color: "var(--ink-subtle)",
                      lineHeight: 1.8,
                      flex: 1,
                    }}
                  >
                    {c.text}
                  </p>
                </div>
              </OffsetCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
