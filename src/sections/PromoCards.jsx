import { promoCards } from "../data/content.js";
import OffsetCard from "../components/OffsetCard.jsx";

// Theme cycles: college(amber) → navy → teal → accent(magenta)
const themeByIndex = [
  { back: "var(--college)",      border: "var(--college)",      tag: "tag-amber",  radius: "cut-tl-br", rotate: "rotate-minus3" },
  { back: "var(--navy)",         border: "var(--navy)",         tag: "tag-navy",   radius: "cut-tr-bl", rotate: "rotate-3" },
  { back: "var(--teal)",         border: "var(--teal)",         tag: "tag-teal",   radius: "cut-tl-br", rotate: "rotate-minus3" },
  { back: "var(--accent)",       border: "var(--accent)",       tag: "tag-magenta",radius: "cut-tr-bl", rotate: "rotate-3" },
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
                style={{ minHeight: 210 }}
              >
                <div style={{ padding: "var(--space-5) var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                  <div
                    className="icon-badge"
                    style={{
                      background: t.back,
                      border: `2px solid ${t.border}`,
                      color: i === 0 ? "#fff" : "var(--college-dark)",
                    }}
                  >
                    {c.icon}
                  </div>
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
                  <p className="t-sm" style={{ color: "var(--ink-subtle)", lineHeight: 1.8, flex: 1 }}>
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
