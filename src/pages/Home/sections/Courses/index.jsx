import { courses } from "@/data/content.js";
import RotatedHeading from "@/components/RotatedHeading.jsx";
import PatternLayer from "@/components/PatternLayer";
import { ArrowIcon } from "@/common/Icons";

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

var durations = ["۱۲ هفته", "۱۶ هفته", "۸ هفته", "۱۰ هفته", "۱۲ هفته", "۴ ماه", "۶ ماه"];
var courseFeatures = [
  ["پروژه‌محور", "مدرس معتبر"], ["React", "پرتفولیو"],
  ["کی‌استاژ", "ابزارهای واقعی"],
  ["Photoshop", "Illustrator"], ["Premiere", "After Effects"], ["IELTS", "MBA"], ["Canvas", "UI/UX"],
];
var courseTags = [
  ["WordPress", "WooCommerce", "Elementor"], ["JavaScript", "React", "Tailwind"],
  ["Google Analytics", "Ahrefs", "Search Console"], ["Photoshop", "Illustrator", "Figma"],
  ["Premiere Pro", "After Effects", "DaVinci"], ["IELTS", "General English", "Business"],
  ["Canvas", "Figma", "Prototyping"],
];
var toPersianNum = function(n) { return String(n).padStart(2, "0").replace(/\d/g, function(d) { return ["\u06f0","\u06f1","\u06f2","\u06f3","\u06f4","\u06f5","\u06f6","\u06f7","\u06f8","\u06f9"][d]; }); };

var CourseCard = function(props) {
  var course = props.course;
  var index = props.index;
  var cat = catColors[course.category] || catColors["فناوری اطلاعات"];
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
            {features.map(function(f) { return <span key={f}>{"• " + f}</span>; })}
          </div>
          <h3 className="t-card">{course.title}</h3>
          <p className="t-sm">{course.text}</p>
          <div className="v2-tags">{tags.map(function(t) { return <span key={t}>{t}</span>; })}</div>
        </div>
        <div className="v2-action">
          <div className="v2-price">
            <div className="v2-price-lbl">{"مدت دوره"}</div>
            <div className="v2-price-val">{dur.split(" ")[0]}<small>{dur.split(" ")[1]}</small></div>
          </div>
          <a href="#courses" className="v2-btn">{"مشاهده "} <ArrowIcon width={14} height={14} /></a>
        </div>
      </article>
    </div>
  );
};

export default function Courses() {
  var displayCourses = courses.slice(0, 4);

  return (
    <section className="section v2-courses" id="courses" style={{ background: "var(--bg-college-tint)" }}>
      {/* Background pattern (mask fade) */}
      <PatternLayer rotate={0} />
      <div className="container section-inner">
        <div className="head" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: 820, margin: "0 auto 2rem" }}>
          <span className="eyebrow">
            <span className="dot" />
            {"لیست دوره‌های تخصصی"}
          </span>
          <RotatedHeading words={"از این دوره‌ها شغلت را بساز"} className="t-section" color="var(--navy)" />
          <p style={{ fontSize: 16.5, lineHeight: 1.75, fontWeight: 600, color: "var(--ink-subtle)", maxWidth: 560, margin: "1rem auto 0" }}>{"لیست کامل دوره‌های کالج در یک نگه — با جزئیات سرفصل و شهریه."}</p>
        </div>
        <div className="v2-list">
          {displayCourses.map(function(c, i) { return <CourseCard key={c.title} course={c} index={i} />; })}
        </div>
      </div>
    </section>
  );
}
