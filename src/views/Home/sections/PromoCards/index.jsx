import { promoCards } from "@/data/content.js";
import OffsetCard from "@/Components/OffsetCard.jsx";
import RotatedHeading from "@/Components/RotatedHeading.jsx";
import { TeamIcon, LayerGroupIcon, RouteIcon, AwardIcon } from "@/Components/Icons";

// Theme cycles: college(amber) → navy → teal → accent(magenta)
const themeByIndex = [
  { back: "var(--college)", radius: "cut-tl-br", rotate: "rotate-minus1" },
  { back: "var(--navy)",    radius: "cut-tr-bl", rotate: "rotate-1" },
  { back: "var(--teal)",    radius: "cut-tl-br", rotate: "rotate-minus1" },
  { back: "var(--accent)",  radius: "cut-tr-bl", rotate: "rotate-1" },
];

const icons = [TeamIcon, LayerGroupIcon, RouteIcon, AwardIcon];
const smallLabels = ["اساتید متخصص", "آموزش پروژه‌محور", "مسیر شغلی", "گواهی پایان دوره"];

const headingWords = [
  { text: "اینجا", deg: -1.5 },
  { text: "فقط", deg: 2 },
  { text: "آموزش", deg: -3 },
  { text: "نمی‌بینی", deg: 1.5 },
];

export default function PromoCards() {
  return (
    <section className="section" id="promo" style={{ background: "var(--college-light)" }}>
      <div className="bg-pattern">
        <img src="/assets/Hero/Hero-Pattern.png" alt="" aria-hidden="true" />
      </div>
      <div className="container section-inner">
        {/* Section header — sample structure */}
        <div className="section-head">
          <span className="eyebrow-tag">چرا کالج رُکاد؟</span>
          <RotatedHeading words={headingWords} className="t-section" />
          <p className="section-sub">مهارت یاد می‌گیری، تجربه می‌سازی و برای آیندهٔ حرفه‌ای آماده می‌شوی.</p>
        </div>

        <div className="grid-4">
          {promoCards.map((c, i) => {
            const t = themeByIndex[i % themeByIndex.length];
            const Icon = icons[i % icons.length];
            return (
              <OffsetCard
                key={c.title}
                backColor={t.back}
                borderColor={t.back}
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
                    <Icon width={22} height={22} />
                  </div>

                  {/* Small label + Title */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <small style={{ color: t.back, fontSize: 12, fontWeight: 700 }}>{smallLabels[i % smallLabels.length]}</small>
                    <h3 className="t-card" style={{ color: "var(--ink)", fontWeight: 900, lineHeight: 1.25 }}>
                      {c.title}
                    </h3>
                  </div>

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
