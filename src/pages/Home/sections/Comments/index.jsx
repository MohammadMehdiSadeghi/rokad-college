import { comments } from "@/data/content.js";
import OffsetCard from "@/components/OffsetCard.jsx";
import RotatedHeading from "@/components/RotatedHeading.jsx";

// Subtle rotations and colors for comment cards
const themes = [
  { back: "var(--college)", color: "var(--college-dark)", radius: "cut-tl-br", rotate: "rotate-minus1" },
  { back: "var(--navy)",    color: "var(--navy)",        radius: "cut-tr-bl", rotate: "rotate-1" },
  { back: "var(--accent)",  color: "var(--accent-text)", radius: "cut-tl-br", rotate: "rotate-minus1" },
];

export default function Comments() {
  return (
    <section className="section" id="comments" style={{ background: "var(--college-light)" }}>
      <div className="bg-pattern">
        <img src="/assets/Hero/Hero-Pattern.png" alt="" aria-hidden="true" />
      </div>
      <div className="container section-inner">
        {/* Section header */}
        <div
          className="text-center"
          style={{ marginBottom: "var(--space-12)", maxWidth: 760, marginInline: "auto" }}
        >
          <span className="tag tag-amber" style={{ marginBottom: "var(--space-4)", display: "inline-block" }}>
            نظرات هنرجویان
          </span>
          <RotatedHeading words={comments.title} className="t-section" color="var(--navy)" />
          <p className="t-body mx-auto" style={{ marginTop: "var(--space-4)" }}>
            {comments.text}
          </p>
        </div>

        {/* Comment cards grid */}
        <div className="grid-3">
          {comments.items.map((c, i) => {
            const t = themes[i % themes.length];
            return (
              <OffsetCard
                key={c.name}
                backColor={t.back}
                radius={t.radius}
                rotate={t.rotate}
                className="animate-fade-in-up"
              >
                {/* Card content */}
                <div
                  style={{
                    padding: "var(--space-6)",
                    minHeight: 200,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Quote mark */}
                  <div
                    style={{
                      fontSize: 42,
                      color: t.color,
                      lineHeight: 1,
                      fontWeight: 950,
                    }}
                    aria-hidden="true"
                  >
                    "
                  </div>

                  {/* Comment text */}
                  <p
                    className="t-sm"
                    style={{
                      color: "var(--ink)",
                      marginBlock: "var(--space-3)",
                      lineHeight: 1.9,
                      flex: 1,
                    }}
                  >
                    {c.text}
                  </p>

                  {/* Author info */}
                  <div
                    style={{
                      borderTop: `1.5px dashed ${t.color}`,
                      paddingTop: "var(--space-3)",
                      marginTop: "var(--space-3)",
                    }}
                  >
                    <p style={{ fontWeight: 900, color: t.color }}>{c.name}</p>
                    <p className="t-sm muted">{c.role}</p>
                  </div>
                </div>
              </OffsetCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
