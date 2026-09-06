/* ============================================================
   رویدادها — Events
   کارت رویداد با روز بزرگ + ثبت‌نام؛ featured = سایه کهربایی.
   ============================================================ */
import { useState } from "react";
import PanelLayout from "./PanelLayout.jsx";
import { events } from "./panelData.js";

const CalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export default function Events({ onNavigate }) {
  const [reg, setReg] = useState(() => new Set(events.filter((e) => e.registered).map((e) => e.id)));

  const toggle = (id) => {
    setReg((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section id="panel">
      <PanelLayout page="events" onNavigate={onNavigate}>
        <h1 className="pnl-h1">
          <span className="w accent" style={{ transform: "rotate(-1.5deg)", display: "inline-block" }}>رویدادها</span>
        </h1>
        <p className="pnl-sub">کلاس‌های زنده، وبینارها و رویدادهای حضوری رکاد.</p>

        <div className="pnl-events">
          {events.map((e, i) => (
            <article key={e.id} className={`pnl-event${e.featured ? " featured" : ""}${i % 2 ? " alt" : ""}`}>
              <div className={`day${e.featured ? " hot" : ""}`}>
                <b>{e.day}</b>
                <span>{e.month}</span>
              </div>
              <div className="body">
                <div className="top">
                  <h3>{e.title}</h3>
                  <span className="pnl-chip open">{e.kind}</span>
                </div>
                <div className="meta">
                  <span><CalIcon /> {e.time}</span>
                  <span>{e.host}</span>
                  <span>{e.place}</span>
                  {e.seats && <span className="seats">{e.seats}</span>}
                </div>
              </div>
              <div className="side">
                {reg.has(e.id) ? (
                  <>
                    <span className="pnl-chip done">ثبت‌نام شدی</span>
                    <button className="pnl-cbtn ok">یادآوری بذار</button>
                  </>
                ) : (
                  <button className="pnl-cbtn" onClick={() => toggle(e.id)}>ثبت‌نام رایگان</button>
                )}
              </div>
            </article>
          ))}
        </div>
      </PanelLayout>
    </section>
  );
}
