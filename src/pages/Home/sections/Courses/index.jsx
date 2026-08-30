import { useState, useMemo, useEffect, useRef } from "react";
import { courses } from "@/data/content.js";
import RotatedHeading from "@/components/RotatedHeading.jsx";
import { ArrowIcon, ChevronLeftIcon, ChevronRightIcon } from "@/common/Icons";
import clsx from "@/lib/clsx";

var catColors = {
  "\u0641\u0646\u0627\u0648\u0631\u06cc \u0627\u0637\u0644\u0627\u0639\u0627\u062a": { bg: "var(--college-light)", fg: "var(--college-darker)", border: "var(--college-light-active)", accent: "var(--college)" },
  "\u06af\u0631\u0627\u0641\u06cc\u06a9": { bg: "#FCE8EF", fg: "#A81344", border: "#F5B8CC", accent: "var(--female)" },
  "\u0632\u0628\u0627\u0646 \u0648 MBA": { bg: "#E6F5F3", fg: "#28544F", border: "#CCEAE6", accent: "var(--ecosystem)" },
};

var courseIcons = [
  <svg key="wp" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 2v10l7.07-7.07"/><path d="M22 12A10 10 0 0 0 12 2"/></svg>,
  <svg key="fe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  <svg key="seo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></svg>,
  <svg key="gph" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 22a10 10 0 1 1 10-10c0 2-1.5 3-3 3h-3a3 3 0 0 0-3 3c0 1.5 1 2 1 3a2 2 0 0 1-2 1z"/></svg>,
  <svg key="mo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  <svg key="lang" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5h12M9 3v2m1 9.5A18 18 0 0 1 6.4 9M12.75 5C11.8 10.8 8 15.6 3 18.1"/><path d="M11 21l5-10 5 10M13 17h6"/></svg>,
];

var durations = ["12 \u0647\u0641\u062a\u0647", "16 \u0647\u0641\u062a\u0647", "8 \u0647\u0641\u062a\u0647", "10 \u0647\u0641\u062a\u0647", "12 \u0647\u0641\u062a\u0647", "4 \u0645\u0627\u0647", "6 \u0645\u0627\u0647"];
var courseFeatures = [
  ["\u067e\u0631\u0648\u0698\u0647\u200c\u0645\u062d\u0648\u0631", "\u0645\u062f\u0631\u06a9 \u0645\u0639\u062a\u0628\u0631"], ["React", "\u067e\u0631\u062a\u0641\u0648\u0644\u06cc\u0648"],
  ["\u06a9\u06cc\u0633\u200c\u0627\u0633\u062a\u0627\u062f\u06cc", "\u0627\u0628\u0632\u0627\u0631\u0647\u200c\u0647\u0627\u06cc \u0648\u0627\u0642\u0639\u06cc"],
  ["Photoshop", "Illustrator"], ["Premiere", "After Effects"], ["IELTS", "MBA"], ["Canvas", "UI/UX"],
];
var courseTags = [
  ["WordPress", "WooCommerce", "Elementor"], ["JavaScript", "React", "Tailwind"],
  ["Google Analytics", "Ahrefs", "Search Console"], ["Photoshop", "Illustrator", "Figma"],
  ["Premiere Pro", "After Effects", "DaVinci"], ["IELTS", "General English", "Business"],
  ["Canvas", "Figma", "Prototyping"],
];
var toPersianNum = function(n) { return String(n).padStart(2, "0").replace(/\d/g, function(d) { return ["\u06f0","\u06f1","\u06f2","\u06f3","\u06f4","\u06f5","\u06f6","\u06f7","\u06f8","\u06f9"][d]; }); };
var ITEMS_PER_PAGE = 4;

var CourseCard = function(props) {
  var course = props.course;
  var index = props.index;
  var cat = catColors[course.category] || catColors["\u0641\u0646\u0627\u0648\u0631\u06cc \u0627\u0637\u0644\u0627\u0639\u0627\u062a"];
  var icon = courseIcons[index % courseIcons.length];
  var dur = durations[index % durations.length];
  var features = courseFeatures[index % courseFeatures.length];
  var tags = courseTags[index % courseTags.length];
  var num = toPersianNum(index + 1);

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
            {features.map(function(f) { return <span key={f}>{"\u2022 " + f}</span>; })}
          </div>
          <h3 className="t-card">{course.title}</h3>
          <p className="t-sm">{course.text}</p>
          <div className="v2-tags">{tags.map(function(t) { return <span key={t}>{t}</span>; })}</div>
        </div>
        <div className="v2-action">
          <div className="v2-price">
            <div className="v2-price-lbl">{"\u0645\u062f\u062a \u062f\u0648\u0631\u0647"}</div>
            <div className="v2-price-val">{dur.split(" ")[0]}<small>{dur.split(" ")[1]}</small></div>
          </div>
          <a href="#courses" className="v2-btn">{"\u0645\u0634\u0627\u0647\u062f\u0647 "} <ArrowIcon width={14} height={14} /></a>
        </div>
      </article>
    </div>
  );
};

export default function Courses() {
  var _s = useState(1);
  var currentPage = _s[0];
  var setCurrentPage = _s[1];
  var _t = useState(false);
  var isTransitioning = _t[0];
  var setIsTransitioning = _t[1];
  var gridRef = useRef(null);

  var totalPages = useMemo(function() { return Math.ceil(courses.length / ITEMS_PER_PAGE); }, []);
  var paginatedCourses = useMemo(function() { var s = (currentPage - 1) * ITEMS_PER_PAGE; return courses.slice(s, s + ITEMS_PER_PAGE); }, [currentPage]);

  var handlePageChange = function(page) {
    if (page < 1 || page > totalPages || page === currentPage || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(function() {
      setCurrentPage(page);
      var sec = document.getElementById("courses");
      if (sec) window.scrollTo({ top: sec.offsetTop - 80, behavior: "smooth" });
      requestAnimationFrame(function() { setIsTransitioning(false); });
    }, 250);
  };

  useEffect(function() {
    var h = function(e) {
      setCurrentPage(function(p) {
        if (e.key === "ArrowLeft" && p < totalPages) { handlePageChange(p + 1); return p; }
        if (e.key === "ArrowRight" && p > 1) { handlePageChange(p - 1); return p; }
        return p;
      });
    };
    window.addEventListener("keydown", h);
    return function() { window.removeEventListener("keydown", h); };
  }, [totalPages]);

  var pages = [];
  if (totalPages <= 7) { for (var i = 1; i <= totalPages; i++) pages.push(i); }
  else {
    var show = new Set([1, totalPages, currentPage]);
    for (var j = -2; j <= 2; j++) { var x = currentPage + j; if (x > 1 && x < totalPages) show.add(x); }
    var sorted = Array.from(show).sort(function(a, b) { return a - b; });
    for (var k = 0; k < sorted.length; k++) { if (k > 0 && sorted[k] - sorted[k - 1] > 1) pages.push("..."); pages.push(sorted[k]); }
  }

  return (
    <section className="section v2-courses" id="courses" style={{ background: "var(--bg-college-tint)" }}>
      <div className="container section-inner">
        <div className="head" style={{ textAlign: "center", maxWidth: 820, margin: "0 auto 2rem" }}>
          <span className="eyebrow">
            <span className="dot" />
            {"\u0644\u06cc\u0633\u062a \u062f\u0648\u0631\u0647\u200c\u0647\u0627\u06cc \u062a\u062e\u0635\u0635\u06cc"}
          </span>
          <RotatedHeading words={"\u0645\u0633\u06cc\u0631 \u06cc\u0627\u062f\u06af\u06cc\u0631\u06cc \u062e\u0648\u062f\u062a \u0631\u0627 \u067e\u06cc\u062f\u0627 \u06a9\u0646"} className="t-section" color="var(--navy)" />
          <p style={{ fontSize: 16.5, lineHeight: 1.75, fontWeight: 600, color: "var(--ink-subtle)", maxWidth: 560, margin: "1rem auto 0" }}>{"\u0644\u06cc\u0633\u062a \u06a9\u0627\u0645\u0644 \u062f\u0648\u0631\u0647\u200c\u0647\u0627\u06cc \u06a9\u0627\u0644\u062c \u062f\u0631 \u06cc\u06a9 \u0646\u06af\u0647 \u2014 \u0628\u0627 \u062c\u0632\u0626\u06cc\u0627\u062a \u0645\u062f\u062a\u060c \u0633\u0631\u0641\u0635\u0644 \u0648 \u0634\u0647\u0631\u06cc\u0647."}</p>
        </div>
        <div ref={gridRef} className="v2-list" style={{ opacity: isTransitioning ? 0 : 1, transform: isTransitioning ? "translateY(12px)" : "translateY(0)", transition: "opacity .25s,transform .25s" }} aria-live="polite">
          {paginatedCourses.map(function(c, i) { return <CourseCard key={c.title} course={c} index={(currentPage - 1) * ITEMS_PER_PAGE + i} />; })}
        </div>
        {totalPages > 1 && (
          <nav className="pagination" style={{ display: "flex", justifyContent: "center", gap: "var(--space-2)", marginTop: "var(--space-8)", flexWrap: "wrap" }} aria-label="\u0635\u0641\u062d\u0627\u062a \u062f\u0648\u0631\u0647\u200c\u0647\u0627">
            <button onClick={function() { handlePageChange(currentPage - 1); }} disabled={currentPage === 1 || isTransitioning} className="courses-pagination-btn" aria-label="\u0635\u0641\u062d\u0647 \u0642\u0628\u0644\u06cc"><ChevronRightIcon width={20} height={20} /></button>
            {pages.map(function(pg, idx) { return pg === "..." ? <span key={"e-" + idx} className="courses-pagination-ellipsis" aria-hidden="true">{"\u2026"}</span> : <button key={pg} onClick={function() { handlePageChange(pg); }} disabled={isTransitioning} className={clsx("courses-pagination-btn", currentPage === pg && "active")} aria-label={"\u0635\u0641\u062d\u0647 " + pg}>{pg}</button>; })}
            <button onClick={function() { handlePageChange(currentPage + 1); }} disabled={currentPage === totalPages || isTransitioning} className="courses-pagination-btn" aria-label="\u0635\u0641\u062d\u0647 \u0628\u0639\u062f\u06cc"><ChevronLeftIcon width={20} height={20} /></button>
          </nav>
        )}
        <div className="cta-footer" style={{ marginTop: 35, textAlign: "center" }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: "var(--ink-subtle)", margin: "0 0 1rem" }}>{"\u0647\u0646\u0648\u0632 \u0645\u0637\u0645\u0626\u0646 \u0646\u06cc\u0633\u062a\u06cc \u06a9\u062f\u0627\u0645 \u062f\u0648\u0631\u0647 \u0628\u0631\u0627\u06cc \u062a\u0648\u0633\u062a\u061f"}</p>
          <a href="#courses" className="btn-all">{"\u0645\u0634\u0627\u0647\u062f\u0647 \u0647\u0645\u0647 \u062f\u0648\u0631\u0647\u200c\u0647\u0627"} <ArrowIcon width={16} height={16} /></a>
        </div>
      </div>
    </section>
  );
}
