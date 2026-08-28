import { promoCards } from "../data/content.js";
import OffsetCard from "../components/OffsetCard.jsx";

const themeByIndex = [
  { back: "var(--teal)", border: "var(--teal)", tag: "tag-teal", radius: "cut-tl-br", rotate: "rotate-minus3" },
  { back: "var(--college)", border: "var(--college)", tag: "tag-amber", radius: "cut-tr-bl", rotate: "rotate-3" },
  { back: "var(--navy)", border: "var(--navy)", tag: "tag-navy", radius: "cut-tl-br", rotate: "rotate-minus3" },
  { back: "var(--accent)", border: "var(--accent)", tag: "tag-magenta", radius: "cut-tr-bl", rotate: "rotate-3" },
];

export default function PromoCards() {
  return (
    <section className="section" id="promo">
      <div className="container section-inner">
        <div className="grid-4">
          {promoCards.map((c, i) => {
            const t = themeByIndex[i % themeByIndex.length];
            return (
              <OffsetCard key={c.title} backColor={t.back} radius={t.radius} rotate={t.rotate} className="" style={{ minHeight: 220 }}>
                <div style={{ padding: "var(--space-6)" }}>
                  <div className="icon-badge" style={{ marginBottom: "var(--space-4)" }}>{c.icon}</div>
                  <h3 className="t-card" style={{ color: "var(--ink)", marginBottom: "var(--space-3)", fontWeight: 900 }}>{c.title}</h3>
                  <p className="t-sm" style={{ color: "var(--ink-subtle)" }}>{c.text}</p>
                </div>
              </OffsetCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
