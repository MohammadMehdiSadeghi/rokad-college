import { stats } from "../data/content.js";
import OffsetCard from "../components/OffsetCard.jsx";

export default function PromoCards2() {
  return (
    <section className="section" id="stats" style={{ background: "var(--white)" }}>
      <div className="container section-inner">
        <div className="grid-4">
          {stats.map((s, i) => (
            <OffsetCard
              key={s.lbl}
              backColor={i === 0 ? "var(--college)" : i === 1 ? "var(--navy)" : i === 2 ? "var(--teal)" : "var(--accent)"}
              radius={i % 2 === 0 ? "cut-tl-br" : "cut-tr-bl"}
              rotate={i % 2 === 0 ? "rotate-minus3" : "rotate-3"}
            >
              <div
                className="stat-mini"
                style={{ padding: "var(--space-8) var(--space-6)", minHeight: 160 }}
              >
                <span className="num">{s.num}</span>
                <span className="lbl">{s.lbl}</span>
              </div>
            </OffsetCard>
          ))}
        </div>
      </div>
    </section>
  );
}
