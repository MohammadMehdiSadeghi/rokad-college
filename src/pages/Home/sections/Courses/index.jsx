import { useState, useEffect } from "react";
import { courses, courseCta } from "@/data/content.js";
import RotatedHeading from "@/components/RotatedHeading.jsx";
import PatternLayer from "@/components/PatternLayer";
import { ArrowIcon } from "@/common/Icons";

// Course mode mapping (onsite = حضوری, online = آنلاین)
const MODE_MAP = [
  "onsite", "online", "online",
  "onsite", "online", "onsite", "online", "online",
];

const MODE_LABEL = { onsite: "دورهٔ حضوری", online: "دورهٔ آنلاین" };
const MODE_ICON = {
  onsite: <svg key="on" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="13" height="13"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  online: <svg key="ol" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="13" height="13"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
};

var catColors = {
  "فناوری اطلاعات": { bg: "var(--college-light)", fg: "var(--college-darker)", border: "var(--college-light-active)", accent: "var(--college)" },
  "گرافیک": { bg: "#FCE8EF", fg: "#A81344", border: "#F5B8CC", accent: "var(--female)" },
  "زبان و MBA": { bg: "#E6F5F3", fg: "#28544F", border: "#CCEAE6", accent: "var(--ecosystem)" },
};

var courseIcons = [
  <svg key="wp" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 2v10l7.07-7.07"/><path d="M22 12A10 10 0 0 0 12 2"/></svg>,
  <svg key="fe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  <svg key="seo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></svg>,
  <svg key="gph" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 22a10 10 0 1 1 10-10c0 2-1.5 3-3 3h-3a3 3 0 0 0-3 3c0 1.5 1 2 1 3a2 2 0 0 1-2 1z"/></svg>,
];

var durations = ["۱۲ هفته", "۱۶ هفته", "۸ هفته", "۱۰ هفته", "۱۲ هفته", "۴ ماه", "۶ ماه", "۱۴ هفته"];
var courseFeatures = [
  ["پروژه‌محور", "مدرس معتبر"], ["React", "پرتفولیو"],
  ["کیس‌استادی", "ابزارهای واقعی"],
  ["Photoshop", "Illustrator"], ["Premiere", "After Effects"], ["IELTS", "MBA"], ["Canvas", "UI/UX"],
  ["Figma", "پروتوتایپ"],
];
var courseTags = [
  ["WordPress", "WooCommerce", "Elementor"], ["JavaScript", "React", "Tailwind"],
  ["Google Analytics", "Ahrefs", "Search Console"], ["Photoshop", "Illustrator", "Figma"],
  ["Premiere Pro", "After Effects", "DaVinci"], ["IELTS", "General English", "Business"],
  ["Canvas", "Figma", "Prototyping"], ["User Research", "Wireframe", "Design System"],
];

var toPersianNum = function(n) {
  return String(n).padStart(2, "0").replace(/\d/g, function(d) {
    return ["\u06f0","\u06f1","\u06f2","\u06f3","\u06f4","\u06f5","\u06f6","\u06f7","\u06f8","\u06f9"][d];
  });
};

var CourseCard = function(props) {
  var course = props.course;
  var index = props.index;
  var cat = catColors[course.category] || catColors["فناوری اطلاعات"];
  var icon = courseIcons[index % courseIcons.length];
  var dur = durations[index % durations.length];
  var features = courseFeatures[index % courseFeatures.length];
  var tags = courseTags[index % courseTags.length];
  var num = toPersianNum(index + 1);
  var mode = MODE_MAP[index];

  return (
    <div
      className={"v2-stack mode-" + mode}
      data-mode={mode}
      style={{ "--cat": cat.accent, "--catBg": cat.bg, "--catFg": cat.fg, "--catBorder": cat.border }}
    >
      <article className="v2-item">
        <div className="v2-cover">
          <span className="v2-num">{num.slice(0, 1)}<span>{num.slice(1)}</span></span>
          <div className="v2-icon">{icon}</div>
        </div>
        <div className="v2-content">
          <div className="v2-body">
            <div className="v2-meta">
              <span className="v2-cat-pill">{course.category}</span>
              <span>•</span>
              <span className="mode-inline">
                {MODE_ICON[mode]}
                {MODE_LABEL[mode]}
              </span>
              {features.map(function(f) { return <span className="feat" key={f}>{"• " + f}</span>; })}
            </div>
            <h3 className="t-card">{course.title}</h3>
            <div className="v2-tags">{tags.map(function(t) { return <span key={t}>{t}</span>; })}</div>
          </div>
          <div className="v2-action">
            <div className="v2-price">
              <div className="v2-price-lbl">{"مدت دوره"}</div>
              <div className="v2-price-val">{dur.split(" ")[0]}<small>{dur.split(" ")[1]}</small></div>
            </div>
            <a href="#course/ui-ux" className="v2-btn">{"مشاهده "} <ArrowIcon width={14} height={14} /></a>
          </div>
        </div>
      </article>
    </div>
  );
};

/* Chevron SVG — RTL: prev = right-chevron, next = left-chevron */
function Chevron({ right = false }) {
  var d = right ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6";
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="20" height="20">
      <path d={d} />
    </svg>
  );
}

export default function Courses() {
  var [filter, setFilter] = useState("all");
  var [page, setPage] = useState(0);
  var displayCourses = courses.slice(0, 8);
  var counts = { all: displayCourses.length };
  displayCourses.forEach(function(_, i) {
    var m = MODE_MAP[i];
    if (!counts[m]) counts[m] = 0;
    counts[m]++;
  });

  var filtered = displayCourses.filter(function(_, i) {
    return filter === "all" || MODE_MAP[i] === filter;
  });

  /* صفحه‌بندی: هر صفحه ۴ کارت (۲×۲) */
  var perPage = 4;
  var pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  var safePage = Math.min(page, pageCount - 1);
  var visible = filtered.slice(safePage * perPage, safePage * perPage + perPage);

  /* ریست صفحه هنگام تغییر فیلتر + چرخش خودکار */
  useEffect(function() { setPage(0); }, [filter]);
  useEffect(function() {
    if (pageCount < 2) return;
    var t = setInterval(function() { setPage(function(p) { return (p + 1) % pageCount; }); }, 6000);
    return function() { clearInterval(t); };
  }, [pageCount]);

  var segs = [
    { f: "all", label: "همه", count: counts.all },
    { f: "onsite", label: "حضوری", count: counts.onsite },
    { f: "online", label: "آنلاین", count: counts.online },
  ];

  return (
    <section className="section v2-courses" id="courses" style={{ background: "var(--bg-college-tint)" }}>
      <PatternLayer rotate={180} />
      <div className="container section-inner">
        <div className="head" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: 820, margin: "0 auto 2rem" }}>
          <RotatedHeading words={"از این دوره‌ها شغلت را بساز"} className="t-section" color="var(--navy)" />
        </div>

        {/* Controls row: filters (right) + arrows (left) */}
        <div className="v2-controls">
          <div className="segment" role="tablist">
            {segs.map(function(s) {
              var isOn = filter === s.f;
              return (
                <button
                  key={s.f}
                  className={"seg-btn" + (isOn ? " on" : "")}
                  data-f={s.f}
                  onClick={function() { setFilter(s.f); }}
                >
                  <span className="dot" />
                  {s.label}
                  <span className="cnt">{s.count}</span>
                </button>
              );
            })}
          </div>
          <div className="v2-nav-arrows">
            <button className="v2-icon-btn" onClick={function() { setPage((safePage - 1 + pageCount) % pageCount); }} aria-label="قبلی">
              <Chevron right />
            </button>
            <button className="v2-icon-btn" onClick={function() { setPage((safePage + 1) % pageCount); }} aria-label="بعدی">
              <Chevron />
            </button>
          </div>
        </div>

        {/* Course list — صفحه جاری (۴ کارت ۲×۲) */}
        <div className="v2-list" key={filter + "-" + safePage}>
          {visible.map(function(c) {
            var realIndex = displayCourses.indexOf(c);
            return <CourseCard key={c.title} course={c} index={realIndex} />;
          })}
        </div>

        {/* CTA footer */}
        <div className="cta-footer">
          <p>{"ده‌ها دورهٔ تخصصی دیگر هم در رکاد منتظر توست"}</p>
          <a href="#courses-index" className="btn-all">
            {"مشاهده همه دوره‌ها"}
            <ArrowIcon width={16} height={16} />
          </a>
        </div>
      </div>
    </section>
  );
}