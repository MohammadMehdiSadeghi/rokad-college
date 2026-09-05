/* ============================================================
   داشبورد هنرجو — Student Dashboard
   از آرت‌بورد «داشببود + صفحه کاربر» بازطراحی‌شده با DS رکاد.
   ============================================================ */
import PanelLayout, { panelIcons } from "./PanelLayout.jsx";
import { panelUser, streak, kpis, learning, schedule } from "./panelData.js";

const FA = "۰۱۲۳۴۵۶۷۸۹";
const toFa = (n) => String(n).replace(/\d/g, (d) => FA[d]);

/* Play glyph over thumbnails */
const PlayGlyph = () => (
  <span className="play" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
  </span>
);

export default function Dashboard({ onNavigate }) {
  return (
    <section id="panel">
      <PanelLayout page="dashboard" onNavigate={onNavigate}>
        {/* ---------- Greeting ---------- */}
        <h1 className="pnl-h1">
          <span className="w" style={{ transform: "rotate(-1.5deg)", display: "inline-block" }}>سلام</span>{" "}
          <span className="w accent" style={{ transform: "rotate(1.5deg)", display: "inline-block" }}>{panelUser.firstName}</span>{" "}
          <span style={{ display: "inline-block", transform: "rotate(-1deg)" }}>👋</span>
        </h1>
        <p className="pnl-sub">{panelUser.greeting}</p>

        {/* ---------- Streak banner ---------- */}
        <div className="pnl-streak">
          <div>
            <h3>🔥 {streak.days} روز پیاپی یادگیری</h3>
            <p>{streak.hint}</p>
          </div>
          <div className="pnl-flames" aria-hidden="true">
            {streak.week.map((d, i) => (
              <div key={i} className={`pnl-flame${d.on ? "" : " off"}`}>{toFa(i + 1)}</div>
            ))}
          </div>
        </div>

        {/* ---------- KPIs ---------- */}
        <div className="pnl-kpis">
          {kpis.map((k) => (
            <div key={k.label} className={`pnl-kpi${k.dark ? " dark" : ""}`}>
              <div className="lbl">
                {k.label}
                {k.chip && <span className="chip">{k.chip}</span>}
              </div>
              <div className="v">{k.value}</div>
            </div>
          ))}
        </div>

        {/* ---------- Learning + Schedule ---------- */}
        <div className="pnl-grid">
          <div className="pnl-panel">
            <h4>
              ادامهٔ یادگیری
              <a href="#panel" onClick={(e) => e.preventDefault()}>مشاهده همه ←</a>
            </h4>
            {learning.map((c) => (
              <div className="pnl-course" key={c.title}>
                <div className="pnl-thumb">
                  <img src={c.image} alt="" aria-hidden="true" />
                  <PlayGlyph />
                </div>
                <div>
                  <b>{c.title}</b>
                  <div className="m">{c.meta}</div>
                  <div className="pnl-prog">
                    <i style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
                <button className={`pnl-cbtn${c.done ? " ok" : ""}`}>{c.cta}</button>
              </div>
            ))}
          </div>

          <div className="pnl-panel">
            <h4>
              برنامه امروز
              <a href="#panel" onClick={(e) => e.preventDefault()}>تقویم ←</a>
            </h4>
            <div className="pnl-sched">
              {schedule.map((ev, i) => (
                <div key={i} className={`pnl-ev${ev.today ? " today" : ""}`}>
                  <div className="day">
                    <b>{ev.day}</b>
                    <span>{ev.month}</span>
                  </div>
                  <div className="info">
                    <b>{ev.title}</b>
                    <span>{ev.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PanelLayout>
    </section>
  );
}
