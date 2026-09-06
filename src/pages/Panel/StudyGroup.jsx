/* ============================================================
   گروه مطالعه — Study Groups
   ============================================================ */
import PanelLayout from "./PanelLayout.jsx";
import { studyGroups } from "./panelData.js";

const FA = "۰۱۲۳۴۵۶۷۸۹";
const toFa = (n) => String(n).replace(/\d/g, (d) => FA[d]);

const GroupIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22, color }}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export default function StudyGroup({ onNavigate }) {
  const joined = studyGroups.filter((g) => g.joined);

  return (
    <section id="panel">
      <PanelLayout page="group" onNavigate={onNavigate}>
        <h1 className="pnl-h1">
          <span className="w" style={{ transform: "rotate(-1.5deg)", display: "inline-block" }}>گروه</span>{" "}
          <span className="w accent" style={{ transform: "rotate(1.5deg)", display: "inline-block" }}>مطالعه</span>
        </h1>
        <p className="pnl-sub">
          توی {toFa(joined.length)} گروه فعالی — یادگیری گروهی سرعتت رو ۲ برابر می‌کنه.
        </p>

        <div className="pnl-groups">
          {studyGroups.map((g, i) => (
            <article key={g.id} className={`pnl-group${g.joined ? " joined" : ""}${i % 2 ? " alt" : ""}`}>
              <span className="pnl-group-ic" style={{ background: "var(--college-light)" }}>
                <GroupIcon color={g.color} />
              </span>
              <div className="body">
                <h3>{g.name}</h3>
                <span className="course">{g.course}</span>
                <div className="pnl-group-meta">
                  <span>
                    {toFa(g.members)} از {toFa(g.max)} عضو
                    <i className="bar">
                      <i style={{ width: `${(g.members / g.max) * 100}%` }} />
                    </i>
                  </span>
                  <span className="next">{g.next}</span>
                </div>
              </div>
              <div className="side">
                {g.joined ? (
                  <>
                    <span className="pnl-chip open">عضو هستی</span>
                    <button className="pnl-cbtn">ورود به جلسه</button>
                  </>
                ) : (
                  <>
                    <span className="pnl-chip done">لیست انتظار</span>
                    <button className="pnl-cbtn ghost">اعلام علاقه‌مندی</button>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="pnl-cert-note">
          گروه‌های جدید هر ترم توسط منتورها چیده می‌شن — از رویدادها هم می‌تونی هم‌گروهی پیدا کنی.
          <button className="pnl-cbtn ghost" onClick={() => onNavigate("events")}>رویدادها</button>
        </div>
      </PanelLayout>
    </section>
  );
}
