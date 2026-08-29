import { useState, useMemo } from "react";
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

const ITEMS_PER_PAGE = 6;

export default function Courses() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => Math.ceil(courses.length / ITEMS_PER_PAGE), []);
  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return courses.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: document.getElementById("courses")?.offsetTop - 80 || 0, behavior: "smooth" });
    }
  };

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
        <div className="grid-3" style={{ gap: "var(--space-6)" }}>
          {paginatedCourses.map((c, i) => {
            const rot = courseRotations[i % courseRotations.length];
            return (
              <OffsetCard
                key={c.title}
                backColor="var(--ink)"
                radius={rot.radius}
                rotate={rot.rotate}
                className="animate-fade-in-up"
              >
                <div
                  style={{
                    padding: "var(--space-6)",
                    minHeight: 340,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Image / Illustration */}
                  {c.image && (
                    <div
                      style={{
                        width: "100%",
                        height: 160,
                        marginBottom: "var(--space-5)",
                        borderRadius: "var(--r-lg)",
                        overflow: "hidden",
                        background: "var(--bg-neutral)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={c.image}
                        alt={c.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.4s ease",
                        }}
                        loading="lazy"
                      />
                    </div>
                  )}

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

        {/* Numeric Pagination */}
        {totalPages > 1 && (
          <nav
            className="pagination"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "var(--space-2)",
              marginTop: "var(--space-12)",
              flexWrap: "wrap",
            }}
            aria-label="صفحات دوره‌ها"
          >
            {/* Previous button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="page-btn"
              style={{
                padding: "var(--space-2) var(--space-4)",
                border: "1px solid var(--college)",
                borderRadius: "var(--r-md)",
                background: currentPage === 1 ? "transparent" : "var(--college)",
                color: currentPage === 1 ? "var(--college)" : "var(--white)",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                fontWeight: 600,
                opacity: currentPage === 1 ? 0.5 : 1,
                transition: "all 0.2s ease",
              }}
              aria-label="صفحه قبلی"
            >
              قبلی
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`page-btn ${currentPage === page ? "active" : ""}`}
                style={{
                  minWidth: 44,
                  height: 44,
                  border: "1px solid var(--college)",
                  borderRadius: "var(--r-md)",
                  background: currentPage === page ? "var(--college)" : "transparent",
                  color: currentPage === page ? "var(--white)" : "var(--college)",
                  fontWeight: currentPage === page ? 700 : 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                aria-label={`صفحه ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            ))}

            {/* Next button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="page-btn"
              style={{
                padding: "var(--space-2) var(--space-4)",
                border: "1px solid var(--college)",
                borderRadius: "var(--r-md)",
                background: currentPage === totalPages ? "transparent" : "var(--college)",
                color: currentPage === totalPages ? "var(--college)" : "var(--white)",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                fontWeight: 600,
                opacity: currentPage === totalPages ? 0.5 : 1,
                transition: "all 0.2s ease",
              }}
              aria-label="صفحه بعدی"
            >
              بعدی
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}