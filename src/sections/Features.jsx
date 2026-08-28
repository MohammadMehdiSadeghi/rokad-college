import { features } from "../data/content.js";
import OffsetCard from "../components/OffsetCard.jsx";
import RotatedHeading from "../components/RotatedHeading.jsx";

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="container section-inner">
        <div className="text-center mx-auto" style={{ marginBottom: "var(--space-12)", maxWidth: 760 }}>
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
              className="hover-lift animate-fade-in-up"
            >
              {/* wrapper needs relative for the absolute badge */}
              <div className="relative" style={{ padding: "var(--space-6)", minHeight: 230, display: "flex", flexDirection: "column" }}>
                {/* index number overlay */}
                <span
                  className="absolute select-none"
                  style={{
                    top: 12,
                    right: 12,
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
