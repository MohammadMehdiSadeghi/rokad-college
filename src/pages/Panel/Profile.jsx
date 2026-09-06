/* ============================================================
   صفحه کاربر (پروفایل هنرجو) — Student Profile
   از آرت‌بورد «داشببود + صفحه کاربر» بازطراحی‌شده با DS رکاد.
   ============================================================ */
import PanelLayout from "./PanelLayout.jsx";
import { panelUser, weeklyActivity, skills, badges } from "./panelData.js";

const CheckGlyph = () => (
  <span className="verified" aria-label="حساب تأییدشده">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
);

export default function Profile({ onNavigate }) {
  return (
    <section id="panel">
      <PanelLayout page="profile" onNavigate={onNavigate}>
        {/* ---------- Greeting ---------- */}
        <h1 className="pnl-h1">
          <span className="w" style={{ transform: "rotate(-1.5deg)", display: "inline-block" }}>پروفایل</span>{" "}
          <span className="w accent" style={{ transform: "rotate(1.5deg)", display: "inline-block" }}>من</span>
        </h1>
        <p className="pnl-sub">مسیر یادگیری، مهارت‌ها و دستاوردهایت این‌جا خلاصه شده.</p>

        <div className="pnl-prof-wrap">
          {/* ---------- Left: identity + level ---------- */}
          <div>
            <div className="pnl-prof">
              <div className="pnl-cover">
                <img src="/assets/Hero/Hero-Pattern.png" alt="" aria-hidden="true" />
                <span className="glyphs" aria-hidden="true">✦ ◆ ✦</span>
              </div>
              <div className="pnl-avatar-lg">
                {panelUser.initial}
                <CheckGlyph />
              </div>
              <div className="pnl-prof-body">
                <h2>{panelUser.fullName}</h2>
                <div className="role">{panelUser.role}</div>
                <div className="pnl-tags">
                  {panelUser.tags.map((t) => (
                    <span className="pnl-tag" key={t}>{t}</span>
                  ))}
                </div>
                <div className="pnl-prof-stats">
                  {panelUser.stats.map((s) => (
                    <div key={s.label}>
                      <b>{s.num}</b>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* level card */}
            <div className="pnl-level">
              <div>
                <div className="lbl">سطح فعلی</div>
                <h3>{panelUser.level.title}</h3>
                <small>{panelUser.level.pointsToNext}</small>
              </div>
              <div className="pnl-lvl-circle">{panelUser.level.number}</div>
              <div className="pnl-lvl-bar">
                <i style={{ width: `${panelUser.level.pct}%` }} />
              </div>
            </div>
          </div>

          {/* ---------- Right: activity + skills + badges ---------- */}
          <div className="pnl-right">
            <div className="pnl-panel">
              <h4>
                فعالیت هفتگی
                <span className="pnl-pill">+۱۲٪ نسبت به هفته قبل</span>
              </h4>
              <div className="pnl-chart">
                {weeklyActivity.map((b) => (
                  <div key={b.day} className={`pnl-bar${b.hi ? " hi" : ""}`} style={{ height: `${b.pct}%` }}>
                    {b.hours}س
                    <span>{b.day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pnl-panel">
              <h4>مهارت‌های تخصصی</h4>
              {skills.map((s) => (
                <div className="pnl-skill" key={s.name}>
                  <div className="n">{s.name}</div>
                  <div className="track"><i style={{ width: `${s.pct}%` }} /></div>
                  <div className="pct">{s.pct.toLocaleString("fa-IR")}٪</div>
                </div>
              ))}
            </div>

            <div className="pnl-panel">
              <h4>
                دستاوردها
                <span className="pnl-pill">۵ از ۸</span>
              </h4>
              <div className="pnl-badges">
                {badges.map((b, i) => (
                  <div key={i} className={`pnl-badge ${b.cls}`}>
                    <b>{b.label}</b>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PanelLayout>
    </section>
  );
}
