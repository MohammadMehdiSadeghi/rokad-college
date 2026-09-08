import { useEffect, useRef, useState } from "react";
import "./department.css";
import PatternLayer from "@/components/PatternLayer";
import { DEPT_PERSONA, departments } from "@/data/departments.js";

/* ---- آیکونهای دوره‌ها (کلید ic در دیتا) ---- */
const IC = {
  target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/></>,
  mic: <><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><path d="M12 19v3"/></>,
  briefcase: <><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/></>,
  pen: <><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></>,
  doc: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="14" y2="17"/></>,
  translate: <><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></>,
  flag: <><path d="M4 22V4M4 4l12 4-4 4 4 4-12 4"/></>,
  globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18"/></>,
  rocket: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></>,
  chart: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
  users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  calc: <><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="11" x2="8" y2="11.01"/><line x1="12" y1="11" x2="12" y2="11.01"/><line x1="16" y1="11" x2="16" y2="11.01"/><line x1="8" y1="15" x2="8" y2="15.01"/><line x1="12" y1="15" x2="12" y2="15.01"/><line x1="16" y1="15" x2="16" y2="18"/><line x1="8" y1="19" x2="12" y2="19"/></>,
  handshake: <><path d="M11 17l-1.5-1.5a2.12 2.12 0 0 1 3-3L14 14"/><path d="M2 10l5-5 5 5"/><path d="M22 10l-5-5-2 2"/><path d="M2 13l4 4 3-1"/><path d="M22 13l-4 4-4-1"/></>,
  wallet: <><path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 7V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2"/><circle cx="17" cy="14" r="1.2" fill="currentColor" stroke="none"/></>,
  spark: <><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/></>,
  code: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
  server: <><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></>,
  brain: <><circle cx="12" cy="12" r="9"/><circle cx="8.5" cy="10" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="10" r="1.2" fill="currentColor" stroke="none"/><path d="M8 15c1 1.2 2.5 2 4 2s3-.8 4-2"/></>,
  layout: <><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="9" x2="9" y2="21"/></>,
  box: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
  smartphone: <><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></>,
  search: <><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
};
const CourseIcon = ({ id, size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {IC[id] || IC.target}
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 6l-6 6 6 6" />
  </svg>
);

const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
);
const UsersIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
);
const BookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h11a3 3 0 0 1 3 3v14H7a3 3 0 0 1-3-3z"/><path d="M4 18a3 3 0 0 1 3-3h11"/></svg>
);

/* فلش دکمه‌های ناوبری ردیف دوره‌ها — با CSS-RTL خودش قرینه می‌شود */
const ChevronIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>
);

/* بلوک سکشن با تیتر چرخیدهٔ نئوبروتالیست */
const SectionHead = ({ pre, accent, sub }) => (
  <div className="dp-sec-head">
    <div>
      <h2 className="dp-sec-title">
        {pre} <span className="dp-sec-accent">{accent}</span>
      </h2>
      {sub && <div className="dp-sec-sub">{sub}</div>}
    </div>
  </div>
);

/* ---- کارت دوره (مشترک بین ردیف محبوب و جدیدترین) ---- */
const CourseCard = ({ c, rot }) => (
  <a className="dp-course" href="#courses-index" style={{ "--rot": `rotate(${rot}deg)` }}>
    {c.tag && <span className="dp-course-tag">{c.tag}</span>}
    <div className="dp-course-cover">
      <CourseIcon id={c.ic} />
    </div>
    <div className="dp-course-body">
      <div className="dp-course-cat">{c.cat}</div>
      <div className="dp-course-title">{c.title}</div>
      <div className="dp-course-inst">
        <span className="dp-av">{c.inst.charAt(0)}</span>
        <span>{c.inst}</span>
      </div>
      <div className="dp-course-meta">
        <span className="dp-rate">★ {c.rating}</span>
        <span><ClockIcon /> {c.hours}</span>
        <span><UsersIcon /> {c.students}</span>
      </div>
      <div className="dp-course-price">
        {c.free ? (
          <span className="dp-free">رایگان</span>
        ) : (
          <>
            <b>{c.price}</b>
            {c.old && <s>{c.old}</s>}
          </>
        )}
      </div>
    </div>
  </a>
);

/* ---- ردیف اسکرولی دوره‌ها + دکمه‌های قبلی/بعدی (الگوی مکتب‌خونه) ----
   انیمیشن با rAF دستی است: این وب‌ویو behavior:"smooth" را اجرا نمی‌کند */
function CourseRow({ label, children }) {
  const rowRef = useRef(null);
  const animRef = useRef(0);
  const modelRef = useRef("flip"); // flip = کروم/فایرفاکس (RTL منفی)، legacy = سافاری
  const [nav, setNav] = useState({ prev: false, next: true });

  /* مدل scrollLeft در RTL بین مرورگرها فرق دارد؛ در mount تشخیص می‌دهیم */
  const metrics = () => {
    const el = rowRef.current;
    const max = el.scrollWidth - el.clientWidth;
    const rtl = getComputedStyle(el).direction === "rtl";
    if (!rtl) return { max, pos: el.scrollLeft };
    return { max, pos: modelRef.current === "legacy" ? max - el.scrollLeft : -el.scrollLeft };
  };

  const update = () => {
    const el = rowRef.current;
    if (!el) return;
    const { max, pos } = metrics();
    setNav({ prev: pos > 4, next: max > 0 && max - pos > 4 });
  };

  useEffect(() => {
    const el = rowRef.current;
    const max = el.scrollWidth - el.clientWidth;
    if (getComputedStyle(el).direction === "rtl" && max > 0) {
      modelRef.current = Math.abs(el.scrollLeft) < max / 2 ? "flip" : "legacy";
    }
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(animRef.current);
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  /* «بعدی» یعنی حرکت پنجرهٔ دید به سمت چپ؛ در RTL دلتای منفی
     هم در مدل کروم (0 → منفی) و هم سافاری (max → 0) جلو می‌برد */
  const scroll = (toNext) => {
    const el = rowRef.current;
    if (!el) return;
    cancelAnimationFrame(animRef.current);
    const rtl = getComputedStyle(el).direction === "rtl";
    const dir = rtl ? (toNext ? -1 : 1) : (toNext ? 1 : -1);
    const from = el.scrollLeft;
    const to = from + dir * el.clientWidth * 0.85;
    const t0 = performance.now();
    const ease = (p) => 1 - Math.pow(1 - p, 3); // easeOutCubic
    const step = (now) => {
      const p = Math.min(1, (now - t0) / 450);
      el.scrollLeft = from + (to - from) * ease(p);
      if (p < 1) animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
  };

  return (
    <div className="dp-row-wrap">
      <button type="button" className="dp-nav dp-nav-prev" onClick={() => scroll(false)} disabled={!nav.prev} aria-label="دوره‌های قبلی">
        <ChevronIcon />
      </button>
      <div className="dp-row" ref={rowRef} aria-label={label}>
        {children}
      </div>
      <button type="button" className="dp-nav dp-nav-next" onClick={() => scroll(true)} disabled={!nav.next} aria-label="دوره‌های بعدی">
        <ChevronIcon />
      </button>
    </div>
  );
}

const DEPT_ICONS = {
  languages: { hero: "globe", cta: "translate" },
  business: { hero: "rocket", cta: "briefcase" },
  it: { hero: "code", cta: "server" },
};

const ALL_DEPTS = [
  { id: "it", name: "فناوری اطلاعات", color: "var(--navy-alt)" },
  { id: "business", name: "کسب و کار", color: "var(--college)" },
  { id: "languages", name: "زبان‌های خارجی", color: "var(--teal-alt)" },
];

export default function DepartmentPage({ deptId }) {
  const currentId = departments[deptId] ? deptId : "languages";
  const persona = DEPT_PERSONA[currentId] || DEPT_PERSONA.languages;
  const dept = departments[currentId] || departments.languages;
  const icons = DEPT_ICONS[currentId] || DEPT_ICONS.languages;

  /* لینک لنگری معمولی هش را عوض می‌کرد و روت #dept/<id> می‌شکست؛
     اینجا فقط اسکرول نرم می‌کنیم */
  const scrollToSection = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const styleVars = {
    "--dp": persona.colorVar,
    "--dp-light": persona.lightVar,
    "--dp-dark": persona.darkVar,
  };

  const popularCourses = dept.popular.map((c, i) => (
    <CourseCard c={c} rot={[-1, 1, -0.5, 0.5][i % 4]} key={i} />
  ));

  return (
    <div className="dp-page" style={styleVars} data-dept={currentId} key={currentId}>
      {/* ---------- HERO ---------- */}
      <header className="dp-hero">
        <PatternLayer rotate={0} />
        <div className="container dp-hero-inner">
          <div className="dp-hero-copy">
            {/* بریدکرامب + سوییچر دپارتمان‌ها */}
            <div className="dp-top-row">
              <nav className="dp-crumb" aria-label="مسیر">
                <a href="#">خانه</a>
                <span className="sep">›</span>
                <a href="#departments">دپارتمان‌ها</a>
                <span className="sep">›</span>
                <span className="cur">{dept.name}</span>
              </nav>

              {/* سوییچر سریع بین دپارتمان‌ها */}
              <div className="dp-switcher" role="tablist">
                {ALL_DEPTS.map((d) => (
                  <a
                    key={d.id}
                    href={`#dept/${d.id}`}
                    className={`dp-switch-pill${d.id === currentId ? " active" : ""}`}
                    style={d.id === currentId ? { background: d.color, color: d.id === "it" ? "#fff" : "var(--ink)", borderColor: "var(--ink)" } : {}}
                  >
                    {d.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="dp-badge">
              <span className="dot" />
              {dept.crumb}
            </div>

            <h1 className="dp-hero-title">
              {dept.headline[0]}{" "}
              <span className="dp-hero-accent">{dept.headline[1]}</span>
            </h1>
            <p className="dp-hero-lead">{dept.lead}</p>
            <div className="dp-hero-actions">
              <a className="dp-btn dp-btn-primary" href="#dp-popular" onClick={(e) => scrollToSection(e, "dp-popular")}>
                مشاهدهٔ دوره‌ها
                <ArrowIcon />
              </a>
              <a className="dp-btn dp-btn-ghost" href="#dp-paths" onClick={(e) => scrollToSection(e, "dp-paths")}>مسیر یادگیری</a>
              <a className="dp-btn dp-btn-consult" href="#consult">
                مشاوره رایگان
                <ArrowIcon />
              </a>
            </div>
            <div className="dp-stats">
              {dept.stats.map((s) => (
                <div className="dp-stat" key={s.lab}>
                  <div className="dp-stat-ic"><BookIcon /></div>
                  <div className="dp-stat-num">{s.num}</div>
                  <div className="dp-stat-lab">{s.lab}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="dp-hero-visual">
            <div className="dp-hero-card">
              {/* پترن پس‌زمینه بافت‌دار همرنگ دپارتمان */}
              <img
                src={persona.pattern}
                alt=""
                aria-hidden="true"
                className="dp-hero-card-pattern"
              />
              <div className="dp-hero-card-ic">
                <CourseIcon id={icons.hero} size={34} />
              </div>
              <h3>{dept.heroCard.title}</h3>
              <p>{dept.heroCard.text}</p>
              <div className="dp-hero-chips">
                {dept.heroCard.chips.map((c) => (
                  <span className="dp-chip" key={c}>{c}</span>
                ))}
              </div>
            </div>
            <div className="dp-float dp-float-tl">★ ۴.۹ رضایت هنرجویان</div>
            <div className="dp-float dp-float-br">{dept.stats[1].num} هنرجو</div>
          </div>
        </div>
      </header>

      {/* ---------- پرطرفدارترین دوره‌ها ---------- */}
      <section className="dp-block" id="dp-popular">
        <div className="container">
          <SectionHead pre="پرطرفدارترین" accent="دوره‌ها" sub="دوره‌هایی که بیشترین هنرجو و بالاترین رضایت را دارند" />
          <CourseRow label={`پرطرفدارترین دوره‌های ${dept.name}`}>{popularCourses}</CourseRow>
          <div className="dp-more">
            <a href={`#courses-index/${currentId}`} className="dp-btn dp-btn-ghost">
              همهٔ دوره‌های {dept.name}
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      {/* ---------- جدیدترین دوره‌ها (پس‌زمینه تینت) ---------- */}
      <section className="dp-block dp-tint">
        <div className="container">
          <SectionHead pre="جدیدترین" accent="دوره‌ها" sub="تازه‌ترین دوره‌هایی که به دپارتمان اضافه شده‌اند" />
          <CourseRow label={`جدیدترین دوره‌های ${dept.name}`}>
            {dept.newest.map((c, i) => (
              <CourseCard c={c} rot={[0.5, -0.5, 1, -1][i % 4]} key={i} />
            ))}
          </CourseRow>
        </div>
      </section>

      {/* ---------- مسیرهای یادگیری ---------- */}
      <section className="dp-block" id="dp-paths">
        <div className="container">
          <SectionHead pre="مسیرهای" accent="یادگیری" sub="نقشهٔ راه ساختاریافته برای رسیدن به هدف حرفه‌ای" />
          <div className="dp-paths">
            {dept.paths.map((p) => (
              <article className="dp-path" key={p.num}>
                <span className="dp-path-num">{p.num}</span>
                <h4>{p.title}</h4>
                <p>{p.text}</p>
                <a href={`#courses-index/${currentId}`} className="dp-path-link">
                  شروع مسیر
                  <ArrowIcon />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- مدرسان برتر (پس‌زمینه تینت) ---------- */}
      <section className="dp-block dp-tint">
        <div className="container">
          <SectionHead pre="مدرسان" accent="برتر" sub="از افراد باتجربه و شاغل در صنعت آموزش ببینید" />
          <div className="dp-insts">
            {dept.instructors.map((t) => (
              <article className="dp-inst" key={t.name}>
                <div className="dp-av-lg">{t.name.charAt(0)}</div>
                <h5>{t.name}</h5>
                <div className="dp-inst-role">{t.role}</div>
                <div className="dp-inst-meta">
                  <span><BookIcon /> {t.courses}</span>
                  <span><UsersIcon /> {t.students}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- تجربهٔ هنرجویان ---------- */}
      <section className="dp-block">
        <div className="container">
          <SectionHead pre="تجربهٔ" accent="هنرجویان" sub={`آنچه هنرجویان دپارتمان ${dept.name} گفته‌اند`} />
          <div className="dp-tests">
            {dept.testimonials.map((t) => (
              <article className="dp-test" key={t.name}>
                <p>{t.text}</p>
                <div className="dp-test-who">
                  <div className="dp-av">{t.name.charAt(0)}</div>
                  <div>
                    <div className="dp-test-name">{t.name}</div>
                    <div className="dp-test-role">{t.role}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA دپارتمان (طرح تیکت کالج) ---------- */}
      <section className="dp-block dp-cta-block">
        <div className="container">
          <div className="dp-cta">
            <img
              src={persona.pattern}
              alt=""
              aria-hidden="true"
              className="dp-cta-pattern"
            />
            <div className="dp-cta-copy">
              <h2>{dept.cta.title}</h2>
              <p>{dept.cta.text}</p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
                <a href="#consult" className="dp-btn dp-btn-ink">
                  دریافت مشاورهٔ تخصصی {dept.name}
                  <ArrowIcon />
                </a>
                <a href={`#courses-index/${currentId}`} className="dp-btn dp-btn-ghost">
                  مشاهده تمام دوره‌های {dept.name}
                </a>
              </div>
            </div>
            <div className="dp-cta-visual">
              <CourseIcon id={icons.cta} size={96} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
