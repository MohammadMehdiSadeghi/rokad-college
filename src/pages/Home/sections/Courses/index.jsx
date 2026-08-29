import { courses } from "@/data/content.js";
import OffsetCard from "@/components/OffsetCard.jsx";
import RotatedHeading from "@/components/RotatedHeading.jsx";

// Subtle rotations for course cards
const courseRotations = [
  { rotate: "rotate-minus1", radius: "cut-tl-br" },
  { rotate: "rotate-1",      radius: "cut-tr-bl" },
  { rotate: "rotate-minus1", radius: "cut-tl-br" },
  { rotate: "rotate-1",      radius: "cut-tr-bl" },
  { rotate: "rotate-minus1", radius: "cut-tl-br" },
  { rotate: "rotate-1",      radius: "cut-tr-bl" },
  { rotate: "rotate-minus1", radius: "cut-tl-br" },
];

export default function Courses() {
  return (
    <section className="section" id="courses" style={{ background: "var(--college-light)" }}>
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
            دوره‌های کالج رکاد
          </span>
          <RotatedHeading
            words="از فناوری و گرافیک تا زبان و مدیریت"
            className="t-section"
            color="var(--navy)"
          />
        </div>

        {/* Course cards grid */}
        <div className="grid-3">
          {courses.map((c, i) => {
            const rot = courseRotations[i % courseRotations.length];
            return (
              <OffsetCard
                key={c.title}
                backColor="var(--ink)"
                radius={rot.radius}
                rotate={rot.rotate}
                className="animate-fade-in-up"
              >
                {/* Card content — NO extra border, NO extra borderRadius */}
                <div
                  style={{
                    padding: "var(--space-6)",
                    minHeight: 250,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Category tag */}
                  <span
                    className={`tag ${c.tagClass}`}
                    style={{ alignSelf: "flex-start", marginBottom: "var(--space-4)" }}
                  >
                    {c.category}
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
                    {c.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="t-sm"
                    style={{
                      color: "var(--ink-subtle)",
                      marginBottom: "var(--space-6)",
                      lineHeight: 1.8,
                      flex: 1,
                    }}
                  >
                    {c.text}
                  </p>

                  {/* CTA button */}
                  <a
                    href="#courses"
                    className="btn btn-ghost btn-sm"
                    style={{ alignSelf: "flex-start", marginTop: "auto" }}
                  >
                    {c.cta}
                  </a>
                </div>
              </OffsetCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
