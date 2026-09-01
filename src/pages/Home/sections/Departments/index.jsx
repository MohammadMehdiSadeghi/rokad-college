import "./departments.css";
import PatternLayer from "@/components/PatternLayer";

/* ---- دپارتمانها — از HTML V5 (محتوا) + فرمول رنگ PromoBenefits ---- */
const departments = [
  {
    id: "it",
    title: ["فناوری", "اطلاعات"],
    count: "۱۸ دوره",
    desc: "از طراحی سایت تا برنامه‌نویسی مدرن — پرتقاضاترین دپارتمان کالج رکاد.",
    chips: ["وردپرس", "فرانت‌اند", "سئو", "React"],
    stat: "+۹۰۰",
    statLabel: "هنرجو",
    pattern: "/assets/StatCard/blue.png",
    dept: "var(--navy-alt)",
    deptLight: "var(--male-light)",
    deptDark: "var(--navy)",
  },
  {
    id: "graphic",
    title: ["گرافیک", "و دیزاین"],
    count: "۱۲ دوره",
    desc: "خلاقیتت را به مهارت درآمدزا تبدیل کن — از پایه تا برندسازی حرفه‌ای.",
    chips: ["فتوشاپ", "ایلوستریتور", "لوگو", "UI Design"],
    stat: "+۶۵۰",
    statLabel: "هنرجو",
    pattern: "/assets/StatCard/pink.png",
    dept: "var(--female)",
    deptLight: "var(--female-light)",
    deptDark: "var(--female-dark)",
  },
  {
    id: "motion",
    title: ["تدوین", "و موشن"],
    count: "۸ دوره",
    desc: "حرکت، ریتم، داستان — یاد بگیر با تصویر متحرک احساس بسازی و پیام برسانی.",
    chips: ["پریمیر", "افترافکت", "موشن‌گرافیک", "DaVinci"],
    stat: "+۴۲۰",
    statLabel: "هنرجو",
    pattern: "/assets/StatCard/green.png",
    dept: "var(--teal-alt)",
    deptLight: "var(--teal-light)",
    deptDark: "var(--teal-dark)",
  },
  {
    id: "mba",
    title: ["MBA", "و زبان"],
    count: "۶ دوره",
    desc: "مهارت مدیریتی و تسلط زبان — دو ابزار حیاتی برای رشد شغلی و ورود به بازار جهانی.",
    chips: ["Business English", "IELTS", "مدیریت", "مذاکره"],
    stat: "+۲۸۰",
    statLabel: "هنرجو",
    pattern: "/assets/StatCard/yellow.png",
    dept: "var(--college)",
    deptLight: "var(--college-light)",
    deptDark: "var(--college-darker)",
  },
];

/* ---- آیکونها (مطابق HTML V5) ---- */
const deptIcons = {
  it: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  graphic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r="1" />
      <circle cx="17.5" cy="10.5" r="1" />
      <circle cx="8.5" cy="7.5" r="1" />
      <circle cx="6.5" cy="12.5" r="1" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-5.52-4.48-10-10-10z" />
    </svg>
  ),
  motion: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  mba: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  ),
};

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 6l-6 6 6 6" />
  </svg>
);

export default function Departments() {
  return (
    <section className="dept5-section" id="departments">
      {/* Background pattern (mask fade) */}
      <PatternLayer rotate={0} />

      <div className="dept5-inner">
        {/* Head */}
        <div className="dept5-head">
          <span className="dept5-eyebrow">دپارتمان‌های تخصصی</span>
          <h2>
            <span className="w w1">چهار</span>
            <span className="w w2">دپارتمان،</span>
            <span className="w w3">چهار جهان</span>
          </h2>
          <p>
            هر کارت یک دنیای کامل است — رنگ، دوره‌ها، و شخصیت مستقل خودش.
            کدام‌یک آیندهٔ توست؟
          </p>
          <a href="#courses" className="dept5-cta-top">
            مشاهدهٔ همهٔ دوره‌ها
            <ArrowIcon />
          </a>
        </div>

        {/* Grid 2×2 */}
        <div className="dept5-grid">
          {departments.map((d) => (
            <div
              key={d.id}
              className={`dept5-stack ${d.id}`}
              style={{
                "--dept": d.dept,
                "--dept-light": d.deptLight,
                "--dept-dark": d.deptDark,
              }}
            >
              <article className="dept5-card">
                {/* Colored header + pattern PNG (مثل وعده‌های کالج رکاد) */}
                <div className="dept5-header">
                  <img
                    src={d.pattern}
                    alt=""
                    aria-hidden="true"
                    className="dept5-pattern"
                  />
                  <div className="dept5-icon-box">{deptIcons[d.id]}</div>
                  <span className="dept5-count">{d.count}</span>
                </div>

                {/* Body */}
                <div className="dept5-body">
                  <h3>
                    <span className="w w1">{d.title[0]}</span>
                    <span className="w w2">{d.title[1]}</span>
                  </h3>
                  <p>{d.desc}</p>
                  <div className="dept5-chips">
                    {d.chips.map((c) => (
                      <span key={c} className="dept5-chip">{c}</span>
                    ))}
                  </div>
                  <div className="dept5-foot">
                    <div className="dept5-stat">
                      <strong>{d.stat}</strong>
                      <span>{d.statLabel}</span>
                    </div>
                    <a href="#courses" className="dept5-cta">
                      ورود به دپارتمان
                      <ArrowIcon />
                    </a>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
