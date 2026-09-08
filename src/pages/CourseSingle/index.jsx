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

const Star = ({ on }) => (
  <svg viewBox="0 0 24 24" fill={on ? "var(--college)" : "none"} stroke={on ? "var(--college)" : "var(--ink-light)"} strokeWidth="1.6" style={{ width: 15, height: 15 }}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
  </svg>
);

/* ---------- پنل: سرفصل‌ها ---------- */
function CurriculumPanel({ course, openChapter, setOpenChapter }) {
  return (
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
  );
}

/* ---------- پنل: توضیحات ---------- */
function DescriptionPanel({ course }) {
  return (
    <div className="cs-panel-body cs-desc">
      {course.description.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

/* ---------- پنل: نظرات ---------- */
function ReviewsPanel({ course }) {
  return (
    <div className="cs-panel-body">
      <div className="cs-reviews">
        {course.reviews.map((r) => (
          <div className="cs-review" key={r.name}>
            <div className="cs-review-head">
              <span className="cs-review-av">{r.avatar}</span>
              <div className="cs-review-who">
                <b>{r.name}</b>
                <small>{r.date}</small>
              </div>
              <span className="cs-review-stars" aria-label={`${r.rating} از ۵`}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} on={s <= r.rating} />
                ))}
              </span>
            </div>
            <p>{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- پنل: پرسش و پاسخ ---------- */
function QaPanel({ course }) {
  return (
    <div className="cs-panel-body">
      <div className="cs-qa">
        {course.qa.map((item) => (
          <div className="cs-qa-item" key={item.q}>
            <b>{item.q}</b>
            <p>{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- پنل: منابع ---------- */
function ResourcesPanel({ course }) {
  const Icon = ({ type }) => {
    if (type === "ZIP")
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
    if (type === "لینک")
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    );
  };

  return (
    <div className="cs-panel-body">
      <div className="cs-resources">
        {course.resources.map((res) => (
          <a className="cs-resource" key={res.title} href="#course" onClick={(e) => e.preventDefault()} title="به‌زودی">
            <span className="cs-resource-ic"><Icon type={res.type} /></span>
            <span className="cs-resource-info">
              <b>{res.title}</b>
              <small>{res.type === "لینک" ? "مجموعه لینک" : `${res.type} · ${res.size}`}</small>
            </span>
            <span className="cs-resource-dl">
              {res.type === "لینک" ? "مشاهده" : "دانلود"}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}>
                {res.type === "لینک" ? (
                  <path d="M7 17L17 7M17 7H9M17 7v8" />
                ) : (
                  <path d="M12 5v14M5 12l7 7 7-7" />
                )}
              </svg>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

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
          <span className="cs-students">
            {course.students} دانشجو
            <span className="avs" aria-hidden="true">
              <span className="av" />
              <span className="av" />
              <span className="av" />
            </span>
          </span>
        </div>

        <div className="cs-grid container">
          {/* ================= ستون اصلی ================= */}
          <div className="cs-main">
            {/* Hero */}
            <div className="cs-hero">
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

            {/* Panels */}
            {tab === 0 && <CurriculumPanel course={course} openChapter={openChapter} setOpenChapter={setOpenChapter} />}
            {tab === 1 && <DescriptionPanel course={course} />}
            {tab === 2 && <ReviewsPanel course={course} />}
            {tab === 3 && <QaPanel course={course} />}
            {tab === 4 && <ResourcesPanel course={course} />}
          </div>

          {/* ================= سایدبار ================= */}
          <aside className="cs-side">
            <div className="cs-card">
              <div className="cs-thumb">
                <span className="play">
                  <span>
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  </span>
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
