import { useState, useMemo, useEffect, useRef } from "react";
import { courses, courseCta } from "@/data/content.js";
import OffsetCard from "@/Components/OffsetCard.jsx";
import RotatedHeading from "@/Components/RotatedHeading.jsx";
import clsx from "@/lib/clsx";
import {
  WordpressIcon, CodeIcon, SearchChartIcon, PaletteIcon, FilmIcon, ChartLineIcon, ArrowIcon,
} from "@/Components/Icons";

// Theme + icon per course (sample structure: category pill + icon in course-top)
const courseStyles = [
  { icon: WordpressIcon, theme: "var(--college)", radius: "cut-tl-br", rotate: "rotate-minus1" },
  { icon: CodeIcon, theme: "var(--teal)", radius: "cut-tr-bl", rotate: "rotate-1" },
  { icon: SearchChartIcon, theme: "var(--navy)", radius: "cut-tl-br", rotate: "rotate-minus1" },
  { icon: PaletteIcon, theme: "var(--accent)", radius: "cut-tr-bl", rotate: "rotate-1" },
  { icon: FilmIcon, theme: "var(--teal)", radius: "cut-tl-br", rotate: "rotate-minus1" },
  { icon: ChartLineIcon, theme: "var(--college)", radius: "cut-tr-bl", rotate: "rotate-1" },
];

const ITEMS_PER_PAGE = 6;

// Course card — sample structure: course-top (category pill + icon), title, text, CTA
const CourseCard = ({ course, index }) => {
  const style = courseStyles[index % courseStyles.length];
  const Icon = style.icon;
  return (
    <OffsetCard
      key={course.title}
      backColor={style.theme}
      borderColor={style.theme}
      radius={style.radius}
      rotate={style.rotate}
      className="animate-fade-in-up"
    >
      <div
        style={{
          padding: "var(--space-6)",
          minHeight: 300,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* course-top: category pill + icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "2px dashed #e2e2e2",
            paddingBottom: "var(--space-4)",
            marginBottom: "var(--space-5)",
          }}
        >
          <span
            style={{
              background: `color-mix(in srgb, ${style.theme} 12%, white)`,
              color: style.theme,
              border: `1px solid ${style.theme}`,
              borderRadius: 10,
              padding: ".25rem .7rem",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            {course.category}
          </span>
          <Icon width={24} height={24} style={{ color: style.theme }} />
        </div>

        {/* Title */}
        <h3
          className="t-card"
          style={{
            color: "var(--ink)",
            fontWeight: 950,
            lineHeight: 1.3,
            fontSize: 20,
            marginBottom: "var(--space-3)",
          }}
        >
          {course.title}
        </h3>

        {/* Description */}
        <p
          className="t-sm"
          style={{
            color: "var(--ink-subtle)",
            lineHeight: 1.8,
            marginBottom: "var(--space-6)",
            flex: 1,
          }}
        >
          {course.text}
        </p>

        {/* CTA link */}
        <a
          href="#consult"
          style={{
            marginTop: "auto",
            color: style.theme,
            fontSize: 14,
            fontWeight: 900,
            display: "flex",
            alignItems: "center",
            gap: ".4rem",
            alignSelf: "flex-start",
          }}
        >
          {course.cta} <ArrowIcon width={15} height={15} />
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
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      const section = document.getElementById("courses");
      if (section) {
        window.scrollTo({ top: section.offsetTop - 80, behavior: "smooth" });
      }
      requestAnimationFrame(() => setIsTransitioning(false));
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
    <section className="section" id="courses" style={{ background: "var(--college-light)" }}>
      <style>{`
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
        .courses-pagination-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .courses-pagination-btn.active {
          background: var(--college);
          color: var(--white);
          box-shadow: var(--shadow-college);
        }
        .courses-pagination-btn:focus-visible { outline: 2px solid var(--college); outline-offset: 2px; }
        .courses-pagination-ellipsis { color: var(--ink-subtle); padding: 0 var(--space-2); }
      `}</style>

      <div className="bg-pattern">
        <img src="/assets/Hero/Hero-Pattern.png" alt="" aria-hidden="true" />
      </div>
      <div className="container section-inner">
        {/* Section header — sample structure */}
        <div className="section-head">
          <span className="eyebrow-tag">دوره‌های کالج</span>
          <RotatedHeading words="مسیر یادگیری خودت را پیدا کن" className="t-section" />
          <p className="section-sub">دوره‌های تخصصی رکاد را ببین و مهارتی را انتخاب کن که می‌تواند قدم بعدی تو باشد.</p>
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

            {(() => {
              const pages = [];
              const maxVisible = 7;
              if (totalPages <= maxVisible) {
                for (let i = 1; i <= totalPages; i++) pages.push(i);
              } else {
                const show = new Set([1, totalPages, currentPage]);
                for (let i = -2; i <= 2; i++) {
                  const p = currentPage + i;
                  if (p > 1 && p < totalPages) show.add(p);
                }
                const sorted = Array.from(show).sort((a, b) => a - b);
                for (let i = 0; i < sorted.length; i++) {
                  if (i > 0 && sorted[i] - sorted[i - 1] > 1) pages.push("...");
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

        {/* Course callout — sample structure */}
        <OffsetCard
          className="course-callout"
          backColor="var(--navy)"
          radius="cut-tl-br"
          rotate="rotate-minus1"
          shadowOffset={6}
          style={{ marginTop: "var(--space-12)" }}
        >
          <div className="course-callout-inner">
            <div className="ccopy">
              <small>هنوز مطمئن نیستی؟</small>
              <strong>{courseCta.title}</strong>
              <p>{courseCta.text}</p>
            </div>
            <a className="btn btn-navypill" href="#consult">
              {courseCta.cta} <ArrowIcon width={16} height={16} />
            </a>
          </div>
        </OffsetCard>
      </div>
    </section>
  );
}
