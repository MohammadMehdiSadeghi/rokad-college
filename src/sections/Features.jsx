import { features } from "../data/content.js";
import OffsetCard from "../components/OffsetCard.jsx";
import RotatedHeading from "../components/RotatedHeading.jsx";

// Refined rotations for feature cards — very subtle
const featureRotations = [
  { rotate: "rotate-minus1", radius: "cut-tl-br" },
  { rotate: "rotate-1",      radius: "cut-tr-bl" },
  { rotate: "rotate-minus1", radius: "cut-tl-br" },
  { rotate: "rotate-1",      radius: "cut-tr-bl" },
];

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="container section-inner">
        {/* Section header */}
        <div className="text-center mx-auto" style={{ marginBottom: "var(--space-12)", maxWidth: 760 }}>
          <span className="tag tag-amber" style={{ marginBottom: "var(--space-4)", display: "inline-block" }}>
            ویژگی‌های کالج رکاد
          </span>
          <RotatedHeading
            words="یادگیری که از کلاس فراتر می‌رود"
            className="t-section"
            color="var(--navy)"
          />
        </div>

        {/* Feature cards grid */}
        <div className="grid-4">
          {features.map((f, i) => {
            const rot = featureRotations[i % featureRotations.length];
            return (
              <OffsetCard
                key={f.title}
                backColor="var(--ink)"
                radius={rot.radius}
                rotate={rot.rotate}
                className="animate-fade-in-up"
              >
                <div
                  style={{
                    padding: "var(--space-6)",
                    minHeight: 230,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Badge */}
                  <span
                    className="tag tag-amber"
                    style={{
                      alignSelf: "flex-start",
                      marginBottom: "var(--space-4)",
                    }}
                  >
                    {f.badge}
                  </span>

                  {/* Title */}
                  <h3
                    className="t-card"
                    style={{
                      color: "var(--ink)",
                      marginBottom: "var(--space-3)",
                      fontWeight: 900,
                      lineHeight: 1.25,
                    }}
                  >
                    {f.title}
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
                    {f.text}
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
