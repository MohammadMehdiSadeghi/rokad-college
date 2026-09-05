/* ============================================================
   دوره‌های من — My Courses
   کارت دوره با بازشدن درس‌ها (done / now / locked) — DS رکاد:
   بوردر 2px ink، شدو آفست سخت، رادیوس 20px 0 20px 0، چرخش ظریف.
   ============================================================ */
import { useState } from "react";
import PanelLayout from "./PanelLayout.jsx";
import { myCourses, courseLessons } from "./panelData.js";

const FA = "۰۱۲۳۴۵۶۷۸۹";
const toFa = (n) => String(n).replace(/\d/g, (d) => FA[d]);

const PlayGlyph = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 12, height: 12 }}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default function Courses({ onNavigate }) {
  const [openId, setOpenId] = useState(1);

  const active = myCourses.filter((c) => c.status !== "done");
  const done = myCourses.filter((c) => c.status === "done");

  const CourseCard = ({ c }) => {
    const isOpen = openId === c.id;
    const statusLabel =
      c.status === "done" ? "تکمیل‌شده" : c.status === "new" ? "تازه شروع" : "در حال یادگیری";
    return (
      <div
        className={`pnl-mc${c.status === "new" ? " is-new" : ""}${c.status === "done" ? " is-done" : ""}`}
      >
        <button
          className="pnl-mc-head"
          onClick={() => setOpenId(isOpen ? null : c.id)}
          aria-expanded={isOpen}
        >
          <span className={`pnl-mc-thumb ${c.status === "new" ? "b" : c.status === "done" ? "c" : ""}`}>
            <img src={c.pattern} alt="" aria-hidden="true" />
          </span>
          <span className="pnl-mc-info">
            <b>{c.title}</b>
            <span className="m">
              {c.teacher} · {c.sessions}
            </span>
            <span className={`pnl-mc-state ${c.status}`}>{statusLabel}</span>
          </span>
          <span className="pnl-mc-side">
            <span className="pct">{toFa(c.progress)}٪</span>
            <span className={`pnl-mc-chev${isOpen ? " open" : ""}`} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </span>
        </button>

        <div className={`pnl-mc-body${isOpen ? " open" : ""}`}>
          <div className="pnl-mc-progress">
            <div className="pnl-mc-track">
              <i style={{ width: `${c.progress}%` }} />
            </div>
            <span className="pnl-mc-next">
              {c.next}
            </span>
          </div>

          {c.status !== "done" && (
            <div className="pnl-mc-lessons">
              {courseLessons.map((l) => (
                <div key={l.n} className={`pnl-les${l.now ? " now" : ""}${l.locked ? " locked" : ""}`}>
                  <span className="n">{l.done ? "✓" : toFa(l.n)}</span>
                  <span className="t">
                    <b>{l.title}</b>
                    <small>{l.now ? `${l.time} · در حال یادگیری` : `${toFa(l.n)} از ۶ · ${l.time}`}</small>
                  </span>
                  <span className="ic">
                    {l.locked ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                        <rect x="4" y="11" width="16" height="10" rx="2" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                      </svg>
                    ) : l.now ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </svg>
                    ) : (
                      <PlayGlyph />
                    )}
                  </span>
                </div>
              ))}
              <button className="pnl-cbtn wide">ادامهٔ یادگیری</button>
            </div>
          )}

          {c.status === "done" && (
            <div className="pnl-mc-done-note">
              <span className="em">🎓</span>
              در این دوره قبول شدی — گواهی‌ات در صفحهٔ گواهی‌ها آماده‌ست.
              <button className="pnl-cbtn" onClick={() => onNavigate("certs")}>مشاهدهٔ گواهی</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="panel">
      <PanelLayout page="courses" onNavigate={onNavigate}>
        <h1 className="pnl-h1">
          <span className="w" style={{ transform: "rotate(-1.5deg)", display: "inline-block" }}>دوره‌های</span>{" "}
          <span className="w accent" style={{ transform: "rotate(1.5deg)", display: "inline-block" }}>من</span>
        </h1>
        <p className="pnl-sub">
          {toFa(active.length)} دورهٔ فعال — روی هر دوره بزن تا درس‌هاش باز بشه.
        </p>

        <div className="pnl-panel">
          <h4>
            در حال یادگیری
            <span className="pnl-pill">{toFa(active.length)} دوره</span>
          </h4>
          <div className="pnl-mc-list">
            {active.map((c) => (
              <CourseCard key={c.id} c={c} />
            ))}
          </div>
        </div>

        <div className="pnl-panel" style={{ marginTop: 22 }}>
          <h4>
            تکمیل‌شده
            <span className="pnl-pill">{toFa(done.length)} دوره</span>
          </h4>
          <div className="pnl-mc-list">
            {done.map((c) => (
              <CourseCard key={c.id} c={c} />
            ))}
          </div>
        </div>
      </PanelLayout>
    </section>
  );
}
