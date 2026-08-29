import { stats } from "@/data/content.js";
import OffsetCard from "@/components/OffsetCard.jsx";

// Subtle rotations for stat cards
const statRotations = [
  { rotate: "rotate-xs",        radius: "cut-tl-br" },
  { rotate: "rotate-minus-xs",  radius: "cut-tr-bl" },
  { rotate: "rotate-xs",        radius: "cut-tl-br" },
  { rotate: "rotate-minus-xs",  radius: "cut-tr-bl" },
];

export default function PromoCards2() {
  return (
    <section className="section" id="stats" style={{ background: "var(--white)" }}>
      <div className="container section-inner">
        <div className="grid-4">
          {stats.map((s, i) => {
            const rot = statRotations[i % statRotations.length];
            return (
              <OffsetCard
                key={s.lbl}
                backColor={
                  i === 0 ? "var(--college)"
                  : i === 1 ? "var(--navy)"
                  : i === 2 ? "var(--teal)"
                  : "var(--accent)"
                }
                radius={rot.radius}
                rotate={rot.rotate}
                className="animate-fade-in-up"
              >
                <div
                  className="stat-mini"
                  style={{ padding: "var(--space-8) var(--space-6)", minHeight: 160 }}
                >
                  <span className="num">{s.num}</span>
                  <span className="lbl">{s.lbl}</span>
                </div>
              </OffsetCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
