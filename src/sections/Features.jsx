import { features } from "../data/content.js";
import OffsetCard from "../components/OffsetCard.jsx";
import RotatedHeading from "../components/RotatedHeading.jsx";

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="container section-inner">
        <div className="text-center" style={{ marginBottom: "var(--space-12)", maxWidth: 760, marginInline: "auto" }}>
          <span className="tag tag-amber" style={{ marginBottom: "var(--space-6)" }}>ویژگی‌های کالج رکاد</span>
          <RotatedHeading words="یادگیری که از کلاس فراتر می‌رود" className="t-section" color="var(--navy)" />
        </div>
        <div className="grid-4">
          {features.map((f, i) => (
            <OffsetCard
              key={f.title}
              backColor="var(--ink)"
              radius="cut-tl-br"
              rotate={i % 2 ? "rotate-3" : "rotate-minus3"}
            >
              <div
                style={{
                  background: i === 0 ? "var(--college-light)" : "var(--bg-neutral)",
                  padding: "var(--space-6)",
                  minHeight: 230,
                  display: "flex",
                  flexDirection: "column",
                  border: "2.75px solid var(--ink)",
                  borderRadius: "0 21px 0 21px",
                }}
              >
                {/* index number overlay */}
                <span
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    fontFamily: "var(--font)",
                    fontWeight: 950,
                    fontSize: 26,
                    color: "rgba(0,0,0,0.08)",
                    lineHeight: 1,
                    pointerEvents: "none",
                  }}
                  aria-hidden="true"
                >
                  {f.badge}
                </span>
                <span
                  className="tag tag-amber"
                  style={{ alignSelf: "flex-start", marginBottom: "var(--space-4)", marginTop: 8 }}
                >
                  {f.badge}
                </span>
                <h3
                  className="t-card"
                  style={{ color: "var(--ink)", marginBottom: "var(--space-3)", fontWeight: 900, lineHeight: 1.25 }}
                >
                  {f.title}
                </h3>
                <p className="t-sm" style={{ color: "var(--ink-subtle)", lineHeight: 1.8, flex: 1 }}>
                  {f.text}
                </p>
              </div>
            </OffsetCard>
          ))}
        </div>
      </div>
    </section>
  );
}
