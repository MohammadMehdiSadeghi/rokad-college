import { blogs } from "@/data/content.js";
import OffsetCard from "@/components/OffsetCard.jsx";
import RotatedHeading from "@/components/RotatedHeading.jsx";

// Subtle rotations for blog cards
const blogRotations = [
  { rotate: "rotate-minus1", radius: "cut-tl-br" },
  { rotate: "rotate-1",      radius: "cut-tr-bl" },
  { rotate: "rotate-minus1", radius: "cut-tl-br" },
];

export default function Blogs() {
  return (
    <section className="section" id="blog">
      <div className="container section-inner">
        {/* Section header */}
        <div
          className="text-center"
          style={{ marginBottom: "var(--space-12)", maxWidth: 760, marginInline: "auto" }}
        >
          <span className="tag tag-amber" style={{ marginBottom: "var(--space-4)", display: "inline-block" }}>
            وبلاگ رکاد
          </span>
          <RotatedHeading words={blogs.title} className="t-section" color="var(--navy)" />
        </div>

        {/* Blog cards grid */}
        <div className="grid-3">
          {blogs.items.map((b, i) => {
            const rot = blogRotations[i % blogRotations.length];
            return (
              <OffsetCard
                key={b.title}
                backColor="var(--ink)"
                radius={rot.radius}
                rotate={rot.rotate}
                className="animate-fade-in-up"
              >
                {/* Card content */}
                <div
                  style={{
                    padding: "var(--space-5)",
                    minHeight: 300,
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: 0,
                  }}
                >
                  {/* Blog cover image */}
                  {b.image ? (
                    <div
                      style={{
                        width: "100%",
                        height: 170,
                        marginBottom: "var(--space-5)",
                        borderRadius: "var(--r-lg)",
                        overflow: "hidden",
                        background: "var(--bg-neutral)",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={b.image}
                        alt={b.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.4s ease",
                          display: "block",
                        }}
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    /* Icon badge fallback (if no image) */
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "14px 0 14px 0",
                        background: "var(--college-light)",
                        border: "2px solid var(--college)",
                        display: "grid",
                        placeItems: "center",
                        fontSize: 20,
                        marginBottom: "var(--space-4)",
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    >
                      ✏️
                    </div>
                  )}

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
                    {b.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="t-sm"
                    style={{
                      color: "var(--ink-subtle)",
                      marginBottom: "var(--space-4)",
                      lineHeight: 1.8,
                      flex: 1,
                    }}
                  >
                    {b.text}
                  </p>

                  {/* Date */}
                  {b.date && (
                    <p
                      className="t-sm"
                      style={{
                        color: "var(--college-dark)",
                        fontWeight: 700,
                        marginBottom: "var(--space-3)",
                      }}
                    >
                      {b.date}
                    </p>
                  )}

                  {/* CTA button */}
                  <a
                    href="#blog"
                    className="btn btn-ghost btn-sm"
                    style={{ alignSelf: "flex-start", marginTop: "auto" }}
                  >
                    {b.cta}
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