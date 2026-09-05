/* ============================================================
   تک‌صفحهٔ دوره — Course Single
   از آرت‌بورد «Course Landing Pages» (ترکیب طرح ۰۵ داشبورد + ۰۱
   ادیتوریال) بازطراحی‌شده با DS رکاد:
   بوردر 2px ink، شدو آفست سخت 2.75px، رادیوس 12/17/24،
   کات‌کورنر متناوب، کهربایی فقط برای تاکید.
   باز شدن: #course/<slug>
   ============================================================ */
import { useState } from "react";
import "./course.css";
import PatternLayer from "../../components/PatternLayer";
import { courseSingle as course } from "./courseData.js";

const Chevron = ({ open }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: 16, height: 16, transform: open ? "rotate(180deg)" : "none", transition: "transform .25s ease" }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function CourseSingle() {
  const [tab, setTab] = useState(0);
  const [openChapter, setOpenChapter] = useState(0);

  return (
    <main className="cs-page" id="course">
      <PatternLayer rotate={0} />

        {/* ---------- Topbar: بردکرامب ---------- */}
        <div className="cs-topbar container">
          <a href="#courses-index" className="cs-back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            همهٔ دوره‌ها
          </a>
          <nav className="cs-crumbs">
            دوره‌ها › طراحی › <b>{course.title}</b>
          </nav>
          <span className="cs-students">{course.students} دانشجو</span>
        </div>

        <div className="cs-grid container">
          {/* ================= ستون اصلی ================= */}
          <div className="cs-main">
            {/* Hero */}
            <div className="cs-hero">
              <span className="cs-eyebrow">
                <span className="dot" />
                {course.eyebrow}
              </span>
              <h1>
                <span style={{ display: "inline-block", transform: "rotate(-0.5deg)" }}>{course.title}</span>
              </h1>
              <p className="cs-lede">{course.lede}</p>
              <div className="cs-meta">
                {course.meta.map((m) => (
                  <span className="m" key={m}>{m}</span>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="cs-tabs" role="tablist">
              {course.tabs.map((t, i) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={tab === i}
                  className={tab === i ? "on" : ""}
                  onClick={() => setTab(i)}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Curriculum */}
            <div className="cs-curriculum">
              <div className="cs-progress">
                <b>۱۲ فصل · ۴۸ درس · ۳۲ ساعت</b>
                <div className="bar"><span /></div>
                <b>{course.progressLabel}</b>
              </div>

              <div className="cs-chapters">
                {course.chapters.map((ch, i) => {
                  const open = openChapter === i;
                  return (
                    <div key={ch.n} className={`cs-ch${open ? " open" : ""}`}>
                      <button className="cs-ch-head" onClick={() => setOpenChapter(open ? -1 : i)} aria-expanded={open}>
                        <span className="num">{ch.n}</span>
                        <span className="info">
                          <b>{ch.title}</b>
                          <small>{ch.sub}</small>
                        </span>
                        <span className="dur">{ch.dur}</span>
                        <span className="chev"><Chevron open={open} /></span>
                      </button>

                      {ch.lessons.length > 0 && (
                        <div className={`cs-lessons${open ? " open" : ""}`}>
                          {ch.lessons.map((l) => (
                            <div key={l.t} className={`cs-lesson${l.free ? " free" : " locked"}`}>
                              <span className="ic">
                                {l.free ? (
                                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 11, height: 11 }}><path d="M8 5v14l11-7z" /></svg>
                                ) : (
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" style={{ width: 13, height: 13 }}>
                                    <rect x="4" y="11" width="16" height="10" rx="2" />
                                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                                  </svg>
                                )}
                              </span>
                              <span className="t">{l.t}</span>
                              <span className="tag">{l.free ? "رایگان ✓" : l.time}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ================= سایدبار ================= */}
          <aside className="cs-side">
            <div className="cs-card">
              <div className="cs-thumb">
                <img src={course.pattern} alt="" aria-hidden="true" />
                <span className="play">
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 26, height: 26 }}><path d="M8 5v14l11-7z" /></svg>
                </span>
              </div>

              <div className="cs-price">
                <span className="old">{course.oldPrice}</span>
                <b>{course.price}</b>
                <span className="cur">تومان</span>
              </div>
              <span className="cs-discount">{course.discount}</span>

              <button className="cs-btn">ثبت‌نام در دوره</button>
              <button className="cs-sub-btn">افزودن به علاقه‌مندی‌ها</button>

              <div className="cs-divider" />

              <div className="cs-facts">
                {course.facts.map((f) => (
                  <div className="f" key={f.k}>
                    <div className="k">{f.k}</div>
                    <div className="v">{f.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cs-instr">
              <span className="av">{course.teacher.initial}</span>
              <span className="who">
                <b>{course.teacher.name}</b>
                <small>{course.teacher.role}</small>
              </span>
            </div>
          </aside>
        </div>
      </main>
  );
}
