import { useState, useMemo, useEffect, useRef } from "react";
import { courses } from "@/data/content.js";
import RotatedHeading from "@/components/RotatedHeading.jsx";
import { ArrowIcon, ChevronLeftIcon, ChevronRightIcon } from "@/common/Icons";
import clsx from "@/lib/clsx";

/* ---- Category color maps (from HTML V2) ---- */
const catColors = {
  "فناوری اطلاعات": { bg: "var(--college-light)", fg: "var(--college-darker)", border: "var(--college-light-active)", accent: "var(--college)" },
  "گرافیک": { bg: "#FCE8EF", fg: "#A81344", border: "#F5B8CC", accent: "var(--female)" },
  "زبان و MBA": { bg: "#E6F5F3", fg: "#28544F", border: "#CCEAE6", accent: "var(--ecosystem)" },
};

/* ---- SVG icons for each course ---- */
const courseIcons = [
  <svg key="wp" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 2v10l7.07-7.07"/><path d="M22 12A10 10 0 0 0 12 2"/></svg>,
  <svg key="fe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  <svg key="seo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></svg>,
  <svg key="gph" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 22a10 10 0 1 1 10-10c0 2-1.5 3-3 3h-3a3 3 0 0 0-3 3c0 1.5 1 2 1 3a2 2 0 0 1-2 1z"/></svg>,
  <svg key="mo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  <svg key="lang" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5h12M9 3v2m1 9.5A18 18 0 0 1 6.4 9M12.75 5C11.8 10.8 8 15.6 3 18.1"/><path d="M11 21l5-10 5 10M13 17h6"/></svg>,
  <svg key="ex" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
];

const durations = ["۱۲ هفته", "۱۶ هفته", "۸ هفته", "۱۰ هفته", "۱۲ هفته", "۴ ماه", "۶ ماه"];
const courseFeatures = [
  ["پروژه‌محور", "مدرک معتبر"], ["React", "پرتفولیو"], ["کیس‌استادی", "ابزارهای واقعی"],
  ["Photoshop", "Illustrator"], ["Premiere", "After Effects"], ["IELTS", "MBA"], ["Canvas", "UI/UX"],
];
const courseTags = [
  ["WordPress", "WooCommerce", "Elementor"], ["JavaScript", "React", "Tailwind"],
  ["Google Analytics", "Ahrefs", "Search Console"], ["Photoshop", "Illustrator", "Figma"],
  ["Premiere Pro", "After Effects", "DaVinci"], ["IELTS", "General English", "Business"],
  ["Canvas", "Figma", "Prototyping"],
];
const toPersianNum = (n) => String(n).padStart(2, "0").replace(/\d/g, (d) => ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"][d]);
const ITEMS_PER_PAGE = 4;

/* ---- V2 Horizontal Card ---- */
const CourseCard = ({ course, index }) => {
  const cat = catColors[course.category] || catColors["فناوری اطلاعات"];
  const icon = courseIcons[index % courseIcons.length];
  const dur = durations[index % durations.length];
  const features = courseFeatures[index % courseFeatures.length];
  const tags = courseTags[index % courseTags.length];
  const num = toPersianNum(index + 1);

  return (
    <div className="v2-stack" style={{ "--cat": cat.accent, "--catBg": cat.bg, "--catFg": cat.fg, "--catBorder": cat.border }}>
      <article className="v2-item">
        <div className="v2-cover">
          <span className="v2-num">{num.slice(0, 1)}<span>{num.slice(1)}</span></span>
          <div className="v2-icon">{icon}</div>
        </div>
        <div className="v2-body">
          <div className="v2-meta">
            <span className="v2-cat-pill">{course.category}</span>
            {features.map((f) => <span key={f}>• {f}</span>)}
          </div>
          <h3 className="t-card">{course.title}</h3>
          <p className="t-sm">{course.text}</p>
          <div className="v2-tags">{tags.map((t) => <span key={t}>{t}</span>)}</div>
        </div>
        <div className="v2-action">
          <div className="v2-price">
            <div className="v2-price-lbl">مدت دوره</div>
            <div className="v2-price-val">{dur.split(" ")[0]}<small>{dur.split(" ")[1]}</small></div>
          </div>
          <a href="#courses" className="v2-btn">مشاهده <ArrowIcon width={14} height={14} /></a>
        </div>
      </article>
    </div>
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
    <section className="section v2-courses" id="courses" style={{ background: "var(--bg-college-tint)" }}>
      <div className="container section-inner">
        <div className="head" style={{ textAlign: "center", maxWidth: 820, margin: "0 auto 3.5rem" }}>
          <span className="eyebrow">
            <span className="dot" />
            لیست دوره‌های تخصصی
          </span>
          <RotatedHeading words="مسیر یادگیری خودت را پیدا کن" className="t-section" color="var(--navy)" />
          <p style={{ fontSize: 16.5, lineHeight: 1.75, fontWeight: 600, color: "var(--ink-subtle)", maxWidth: 560, margin: "1rem auto 0" }}>لیست کامل دوره‌های کالج در یک نگاه — با جزئیات مدت، سرفصل و شهریه.</p>
        </div>

        <div
          ref={gridRef}
          className="v2-list"
          style={{ opacity: isTransitioning ? 0 : 1, transform: isTransitioning ? "translateY(12px)" : "translateY(0)", transition: "opacity 0.25s ease, transform 0.25s ease" }}
          aria-live="polite"
        >
          {paginatedCourses.map((c, i) => (
            <CourseCard key={c.title} course={c} index={(currentPage - 1) * ITEMS_PER_PAGE + i} />
          ))}
        </div>

        <div className="cta-footer" style={{ marginTop: 35, textAlign: "center" }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: "var(--ink-subtle)", margin: "0 0 1rem" }}>هنوز مطمئن نیستی کدام دوره برای توست؟</p>
          <a href="#courses" className="btn-all" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", background: "var(--ink)", color: "#fff", padding: "1rem 1.75rem", borderRadius: ".9rem", cornerShape: "squircle", WebkitCornerShape: "squircle", fontWeight: 900, fontSize: 15.5, textDecoration: "none", border: "2px solid var(--ink)", transform: "rotate(-1.5deg)", boxShadow: "4px 4px 0 0 var(--college-normal)", transition: "all .25s ease" }}>
            مشاهده همه دوره‌ها
            <ArrowIcon width={16} height={16} />
          </a>
        </div>

        {totalPages > 1 && (
          <nav className="pagination" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "var(--space-2)", marginTop: "var(--space-8)", flexWrap: "wrap" }} aria-label="صفحات دوره‌ها">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1 || isTransitioning} className="courses-pagination-btn" aria-label="صفحه قبلی">
              <ChevronLeftIcon width={20} height={20} />
            </button>
            {(() => {
              const pages = [];
              if (totalPages <= 7) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
              else {
                const show = new Set([1, totalPages, currentPage]);
                for (let i = -2; i <= 2; i++) { const p = currentPage + i; if (p > 1 && p < totalPages) show.add(p); }
                const sorted = Array.from(show).sort((a, b) => a - b);
                for (let i = 0; i < sorted.length; i++) { if (i > 0 && sorted[i] - sorted[i - 1] > 1) pages.push("..."); pages.push(sorted[i]); }
              }
              return pages;
            })().map((page, idx) =>
              page === "..." ? (
                <span key={`e-${idx}`} className="courses-pagination-ellipsis" aria-hidden="true">…</span>
              ) : (
                <button key={page} onClick={() => handlePageChange(page)} disabled={isTransitioning} className={clsx("courses-pagination-btn", currentPage === page && "active")} aria-label={`صفحه ${page}`} aria-current={currentPage === page ? "page" : undefined}>
                  {page}
                </button>
              )
            )}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || isTransitioning} className="courses-pagination-btn" aria-label="صفحه بعدی">
              <ChevronRightIcon width={20} height={20} />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}