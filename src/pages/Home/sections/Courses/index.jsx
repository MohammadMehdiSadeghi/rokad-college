import { useState, useMemo, useEffect, useRef } from "react";
import { courses } from "@/data/content.js";
import OffsetCard from "@/components/OffsetCard.jsx";
import RotatedHeading from "@/components/RotatedHeading.jsx";
import clsx from "@/lib/clsx";

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

// Course card component (memoized to prevent unnecessary re-renders)
const CourseCard = ({ course, index }) => {
  const rot = courseRotations[index % courseRotations.length];
  return (
    <OffsetCard
      key={course.title}
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
        {course.image && (
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
              src={course.image}
              alt={course.title}
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
          className={clsx("tag", course.tagClass)}
          style={{ alignSelf: "flex-start", marginBottom: "var(--space-4)" }}
        >
          {course.category}
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
          {course.title}
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
          {course.text}
        </p>

        {/* CTA button */}
        <a
          href="#courses"
          className={clsx("btn", "btn-ghost", "btn-sm")}
          style={{ alignSelf: "flex-start", marginTop: "auto" }}
        >
          {course.cta}
        </a>
      </div>
    </OffsetCard>
  );
};

export default function Courses() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const gridRef = useRef(null);

  const totalPages = useMemo(() => Math.ceil(courses.length / ITEMS_PER_PAGE), []);
  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return courses.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage || isTransitioning) return;
    
    // Step 1: fade out
    setIsTransitioning(true);
    
    setTimeout(() => {
      // Step 2: swap content
      setCurrentPage(page);
      
      // Scroll to section top
      const section = document.getElementById("courses");
      if (section) {
        window.scrollTo({ 
          top: section.offsetTop - 80, 
          behavior: "smooth" 
        });
      }
      
      // Step 3: fade in after content renders
      requestAnimationFrame(() => {
        setIsTransitioning(false);
      });
    }, 250);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      setCurrentPage((prev) => {
        if (e.key === "ArrowLeft" && prev < totalPages) {
          handlePageChange(prev + 1);
          return prev;
        }
        if (e.key === "ArrowRight" && prev > 1) {
          handlePageChange(prev - 1);
          return prev;
        }
        return prev;
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalPages]);

  return (
    <section className="section" id="courses" style={{ background: "var(--college-light)" }}>        <style>{`
        .courses-pagination-btn {
          min-width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--college);
          border-radius: var(--r-md);
          font-weight: 700;
          font-size: 14px;
          color: var(--college);
          background: transparent;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .courses-pagination-btn:hover:not(:disabled) {
          background: var(--college);
          color: var(--white);
          transform: translateY(-2px);
          box-shadow: var(--shadow-college);
        }
        .courses-pagination-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .courses-pagination-btn.active {
          background: var(--college);
          color: var(--white);
          box-shadow: var(--shadow-college);
        }
        .courses-pagination-btn:focus-visible {
          outline: 2px solid var(--college);
          outline-offset: 2px;
        }
        .courses-pagination-ellipsis {
          color: var(--ink-subtle);
          padding: 0 var(--space-2);
        }
      `}</style>

      <div className="bg-pattern">
        <img src="/assets/Hero/Hero-Pattern.png" alt="" aria-hidden="true" />
      </div>
      <div className="container section-inner">
        {/* Section header */}
        <div
          className="text-center"
          style={{ marginBottom: "var(--space-12)", maxWidth: 760, marginInline: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}
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
        <div
          ref={gridRef}
          className="grid-3"
          style={{
            gap: "var(--space-6)",
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? "translateY(12px)" : "translateY(0)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}
          aria-live="polite"
        >
          {paginatedCourses.map((c, i) => (
            <CourseCard key={c.title} course={c} index={i} />
          ))}
        </div>

        {/* Numeric Pagination - styled like site buttons */}
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
              disabled={currentPage === 1 || isTransitioning}
              className="courses-pagination-btn"
              aria-label="صفحه قبلی"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "rotate(180deg)" }}>
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            {/* Page numbers - show all if <= 7, otherwise smart ellipsis */}
            {(() => {
              const pages = [];
              const maxVisible = 7;
              
              if (totalPages <= maxVisible) {
                // Show all pages
                for (let i = 1; i <= totalPages; i++) pages.push(i);
              } else {
                // Always show first, last, current ±2
                const show = new Set([1, totalPages, currentPage]);
                for (let i = -2; i <= 2; i++) {
                  const p = currentPage + i;
                  if (p > 1 && p < totalPages) show.add(p);
                }
                const sorted = Array.from(show).sort((a, b) => a - b);
                
                // Add ellipsis where gaps exist
                for (let i = 0; i < sorted.length; i++) {
                  if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
                    pages.push("...");
                  }
                  pages.push(sorted[i]);
                }
              }
              return pages;
            })().map((page, idx) => (
              page === "..." ? (
                <span key={`ellipsis-${idx}`} className="courses-pagination-ellipsis" aria-hidden="true">…</span>
              ) : (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  disabled={isTransitioning}
                  className={clsx("courses-pagination-btn", currentPage === page && "active")}
                  aria-label={`صفحه ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </button>
              )
            ))}

            {/* Next button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isTransitioning}
              className="courses-pagination-btn"
              aria-label="صفحه بعدی"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}