import { useEffect, useMemo, useRef, useState } from "react";
import "./department.css";
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
  plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
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
const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>
);
const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="4" y1="7" x2="20" y2="7"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="10" y1="17" x2="14" y2="17"/></svg>
);

/* فلش‌های ناوبری ردیف دوره‌ها — راست = قبلی، چپ = بعدی (جهت RTL) */
const ChevronIcon = ({ dir = "left" }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
  </svg>
);

/* ---- تبدیل اعداد فارسی برای فیلتر/مرتب‌سازی/نمایش ---- */
const faToNum = (s) =>
  Number(
    String(s)
      .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
      .replace(/[^\d.]/g, "")
  ) || 0;
const faNum = (n) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

/* بلوک سکشن با تیتر و کلمهٔ تاکیدی رنگ دپارتمان */
const SectionHead = ({ pre, accent }) => (
  <div className="dp-sec-head">
    <h2 className="dp-sec-title">
      {pre} <span className="dp-sec-accent">{accent}</span>
    </h2>
  </div>
);

/* ---- کارت دوره — عمودی: کاور (پترن + آیکون) بالای کارت ---- */
const CourseCard = ({ c, rot, pattern }) => (
  <a className="dp-card" href="#courses-index" style={{ "--rot": `rotate(${rot}deg)` }}>
    <div className="dp-card-cover">
      <img className="dp-cover-pattern" src={pattern} alt="" aria-hidden="true" />
      {c.tag && <span className="dp-card-tag">{c.tag}</span>}
      <CourseIcon id={c.ic} size={34} />
    </div>
    <div className="dp-card-body">
      <div className="dp-card-cat">{c.cat}</div>
      <div className="dp-card-title">{c.title}</div>
      <div className="dp-card-inst">
        <span className="dp-av">{c.inst.charAt(0)}</span>
        <span>{c.inst}</span>
      </div>
      <div className="dp-card-meta">
        <span className="dp-rate"><StarIcon /> {c.rating}</span>
        <span><ClockIcon /> {c.hours}</span>
        <span><UsersIcon /> {c.students}</span>
      </div>
      <div className="dp-card-foot">
        {c.free ? (
          <span className="dp-free">رایگان</span>
        ) : (
          <span className="dp-price">
            {c.old && <s>{c.old}</s>}
            <b>{c.price}</b>
          </span>
        )}
        <span className="dp-card-btn">مشاهده</span>
      </div>
    </div>
  </a>
);

/* ---- ناوبری ردیف اسکرولی دوره‌ها (فلش‌ها بالای ردیف، کنار تب‌ها) ----
   انیمیشن با rAF دستی است: این وب‌ویو behavior:"smooth" را اجرا نمی‌کند */
function useRtlRowNav() {
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
    if (!el) return;
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

  return { rowRef, nav, update, scroll };
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

/* فیلترها و مرتب‌سازی بخش «همهٔ دوره‌ها» */
const RATING_FILTERS = [
  { id: 0, label: "همه" },
  { id: 4.8, label: "۴.۸ به بالا" },
  { id: 4.5, label: "۴.۵ به بالا" },
];
const DUR_FILTERS = [
  { id: "all", label: "همه" },
  { id: "short", label: "زیر ۲۰ ساعت" },
  { id: "long", label: "۲۰ ساعت به بالا" },
];
const TYPE_FILTERS = [
  { id: "all", label: "همه" },
  { id: "free", label: "رایگان" },
  { id: "off", label: "تخفیف‌دار" },
];
const SORTS = [
  { id: "default", label: "پیشفرض" },
  { id: "popular", label: "محبوب‌ترین" },
  { id: "rating", label: "بالاترین امتیاز" },
  { id: "cheap", label: "ارزان‌ترین" },
];

export default function DepartmentPage({ deptId }) {
  const currentId = departments[deptId] ? deptId : "languages";
  const persona = DEPT_PERSONA[currentId] || DEPT_PERSONA.languages;
  const dept = departments[currentId] || departments.languages;

  /* تب ردیف دوره‌های پیشنهادی: محبوب‌ترین / جدیدترین */
  const [tab, setTab] = useState("popular");

  /* فیلترها و مرتب‌سازی همهٔ دوره‌ها */
  const [ratingF, setRatingF] = useState(0);
  const [durF, setDurF] = useState("all");
  const [typeF, setTypeF] = useState("all");
  const [sort, setSort] = useState("default");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);

  /* درِاور فیلتر (موبایل) */
  const [filterOpen, setFilterOpen] = useState(false);

  /* نمایش کارت فیلترها در سایدبار فقط وقتی سکشن دوره‌ها در دید است */
  const allRef = useRef(null);
  const [filtersVisible, setFiltersVisible] = useState(false);

  /* دکمهٔ شناور انتخاب دپارتمان (موبایل) */
  const [fabOpen, setFabOpen] = useState(false);

  /* ناوبری ردیف دوره‌های پیشنهادی */
  const suggestNav = useRtlRowNav();

  /* بعد از تعویض تب، وضعیت دکمه‌ها را به‌روز کن */
  useEffect(() => {
    suggestNav.update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  /* بستن منوی مرتب‌سازی با کلیک بیرون */
  useEffect(() => {
    if (!sortOpen) return;
    const onDoc = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [sortOpen]);

  /* کارت فیلترها فقط هنگام دید بودن سکشن «همهٔ دوره‌ها» */
  useEffect(() => {
    const el = allRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setFiltersVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setFiltersVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* درِاور فیلتر: قفل اسکرول بدنه + بستن با Escape */
  useEffect(() => {
    if (!filterOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setFilterOpen(false); };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [filterOpen]);

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

  /* ---- همهٔ دوره‌های دپارتمان: فیلتر + مرتب‌سازی ---- */
  const allCourses = useMemo(() => {
    let list = [...dept.popular, ...dept.newest];
    if (ratingF) list = list.filter((c) => faToNum(c.rating) >= ratingF);
    if (durF === "short") list = list.filter((c) => faToNum(c.hours) < 20);
    if (durF === "long") list = list.filter((c) => faToNum(c.hours) >= 20);
    if (typeF === "free") list = list.filter((c) => c.free);
    if (typeF === "off") list = list.filter((c) => c.old);
    if (sort === "popular") list.sort((a, b) => faToNum(b.students) - faToNum(a.students));
    if (sort === "rating") list.sort((a, b) => faToNum(b.rating) - faToNum(a.rating));
    if (sort === "cheap") list.sort((a, b) => faToNum(a.price) - faToNum(b.price));
    return list;
  }, [dept, ratingF, durF, typeF, sort]);

  const activeFilterCount = (ratingF ? 1 : 0) + (durF !== "all" ? 1 : 0) + (typeF !== "all" ? 1 : 0);
  const resetFilters = () => {
    setRatingF(0);
    setDurF("all");
    setTypeF("all");
    setSort("default");
  };

  /* گروه‌های فیلتر — مشترک بین سایدبار و درِاور موبایل */
  const filterGroups = (
    <>
      <div className="dp-fgroup">
        <div className="dp-fgroup-t">امتیاز دوره</div>
        <div className="dp-fchips">
          {RATING_FILTERS.map((f) => (
            <button key={f.id} type="button" className={`dp-fchip${ratingF === f.id ? " on" : ""}`} onClick={() => setRatingF(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div className="dp-fgroup">
        <div className="dp-fgroup-t">طول دوره</div>
        <div className="dp-fchips">
          {DUR_FILTERS.map((f) => (
            <button key={f.id} type="button" className={`dp-fchip${durF === f.id ? " on" : ""}`} onClick={() => setDurF(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div className="dp-fgroup">
        <div className="dp-fgroup-t">نوع دوره</div>
        <div className="dp-fchips">
          {TYPE_FILTERS.map((f) => (
            <button key={f.id} type="button" className={`dp-fchip${typeF === f.id ? " on" : ""}`} onClick={() => setTypeF(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  const tabList = tab === "popular" ? dept.popular : dept.newest;

  const quickLinks = [
    { id: "dp-suggest", label: "دوره‌های پیشنهادی" },
    { id: "dp-topics", label: "موضوعات پرطرفدار" },
    { id: "dp-all", label: "همهٔ دوره‌ها" },
    { id: "dp-paths", label: "مسیرهای یادگیری" },
    { id: "dp-insts", label: "مدرسان برتر" },
  ];

  return (
    <div className="dp-page" style={styleVars} data-dept={currentId} key={currentId}>
      {/* ---------- HERO (تیتر + لید + نوار آمار + پترن دپارتمان) ---------- */}
      <header className="dp-hero">
        <img src={persona.pattern} alt="" aria-hidden="true" className="dp-hero-pattern" />
        <div className="container dp-hero-inner">
          <nav className="dp-crumb" aria-label="مسیر">
            <a href="#">خانه</a>
            <span className="sep">›</span>
            <a href="#departments">دپارتمان‌ها</a>
            <span className="sep">›</span>
            <span className="cur">{dept.name}</span>
          </nav>

          <div className="dp-badge">
            <span className="dot" />
            {dept.crumb}
          </div>

          <h1 className="dp-hero-title">
            دوره‌های {dept.name} —{" "}
            <span className="dp-hero-accent">{dept.headline[1]}</span>
          </h1>
          <p className="dp-hero-lead">{dept.lead}</p>

          <div className="dp-hero-actions">
            <a className="dp-btn dp-btn-primary" href="#dp-all" onClick={(e) => scrollToSection(e, "dp-all")}>
              مشاهدهٔ دوره‌ها
              <ArrowIcon />
            </a>
            <a className="dp-btn dp-btn-ghost" href="#dp-paths" onClick={(e) => scrollToSection(e, "dp-paths")}>
              مسیر یادگیری
            </a>
          </div>

          {/* نوار آمار — الگوی مکتب‌خونه */}
          <div className="dp-hero-stats">
            {dept.stats.map((s) => (
              <div className="dp-hstat" key={s.lab}>
                <b>{s.num}</b>
                <span>{s.lab}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ---------- چیدمان دو ستونه: سایدبار چسبان + محتوا ---------- */}
      <div className="container dp-layout">
        {/* ----- سایدبار ----- */}
        <aside className="dp-side">
          <div className="dp-side-card dp-side-depts-card">
            <div className="dp-side-title">دپارتمان‌ها</div>
            <div className="dp-side-depts">
              {ALL_DEPTS.map((d) => {
                const active = d.id === currentId;
                return (
                  <a key={d.id} href={`#dept/${d.id}`} className={`dp-side-dept${active ? " active" : ""}`}>
                    <span
                      className="dp-side-ic"
                      style={active ? { background: d.color, color: d.id === "it" ? "#fff" : "var(--ink)" } : {}}
                    >
                      <CourseIcon id={DEPT_ICONS[d.id].hero} size={17} />
                    </span>
                    <span className="dp-side-dept-name">{d.name}</span>
                    {active && <span className="dp-side-dot" />}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="dp-side-card">
            <div className="dp-side-title">دسترسی سریع</div>
            <nav className="dp-side-links">
              {quickLinks.map((l) => (
                <a key={l.id} href={`#${l.id}`} onClick={(e) => scrollToSection(e, l.id)}>
                  {l.label}
                  <ArrowIcon />
                </a>
              ))}
            </nav>
          </div>

          {/* فیلترها — فقط وقتی سکشن «همهٔ دوره‌ها» در دید است */}
          {filtersVisible && (
            <div className="dp-side-card dp-side-filters">
              <div className="dp-side-title">
                فیلترها
                {activeFilterCount > 0 && (
                  <button type="button" className="dp-reset" onClick={resetFilters}>
                    پاک کردن ×
                  </button>
                )}
              </div>
              {filterGroups}
            </div>
          )}
        </aside>

        {/* ----- محتوای اصلی ----- */}
        <main className="dp-main">
          {/* دوره‌های پیشنهادی — تب‌ها راست، فلش‌ها چپ */}
          <section className="dp-block" id="dp-suggest">
            <SectionHead pre="دوره‌های پیشنهادی برای شروع" accent={dept.name} />
            <div className="dp-suggest-ctrl">
              <div className="dp-tabs" role="tablist">
                <button type="button" role="tab" aria-selected={tab === "popular"} className={`dp-tab${tab === "popular" ? " active" : ""}`} onClick={() => setTab("popular")}>
                  محبوب‌ترین
                </button>
                <button type="button" role="tab" aria-selected={tab === "newest"} className={`dp-tab${tab === "newest" ? " active" : ""}`} onClick={() => setTab("newest")}>
                  جدیدترین
                </button>
              </div>
              <div className="dp-row-nav">
                <button
                  type="button"
                  className="dp-nav"
                  onClick={() => suggestNav.scroll(false)}
                  disabled={!suggestNav.nav.prev}
                  aria-label="دوره‌های قبلی"
                >
                  <ChevronIcon dir="right" />
                </button>
                <button
                  type="button"
                  className="dp-nav"
                  onClick={() => suggestNav.scroll(true)}
                  disabled={!suggestNav.nav.next}
                  aria-label="دوره‌های بعدی"
                >
                  <ChevronIcon dir="left" />
                </button>
              </div>
            </div>
            <div className="dp-row" ref={suggestNav.rowRef} aria-label={`دوره‌های پیشنهادی ${dept.name}`}>
              {tabList.map((c, i) => (
                <CourseCard c={c} rot={[-1, 1, -0.5, 0.5][i % 4]} pattern={persona.pattern} key={i} />
              ))}
            </div>
            <div className="dp-more">
              <a href="#dp-all" onClick={(e) => scrollToSection(e, "dp-all")} className="dp-btn dp-btn-ghost">
                همهٔ دوره‌های {dept.name}
                <ArrowIcon />
              </a>
            </div>
          </section>

          {/* موضوعات پرطرفدار */}
          <section className="dp-block dp-card-block" id="dp-topics">
            <SectionHead pre="موضوعات" accent="پرطرفدار" />
            <div className="dp-topics">
              {dept.topics.map((t, i) => (
                <a key={t} href={`#courses-index/${currentId}`} className="dp-topic" style={{ "--rot": `rotate(${i % 2 ? 1 : -1}deg)` }}>
                  {t}
                </a>
              ))}
            </div>
          </section>

          {/* همهٔ دوره‌ها — گرید (فیلترها در سایدبار / درِاور موبایل) */}
          <section className="dp-block" id="dp-all" ref={allRef}>
            <SectionHead pre="همهٔ" accent="دوره‌ها" />

            <div className="dp-toolbar">
              <div className="dp-count">
                <b>{faNum(allCourses.length)}</b> دوره
              </div>
              <div className="dp-tools">
                <button type="button" className="dp-filter-btn" onClick={() => setFilterOpen(true)} aria-haspopup="dialog">
                  <FilterIcon />
                  <span>فیلترها</span>
                  {activeFilterCount > 0 && <span className="dp-filter-count">{faNum(activeFilterCount)}</span>}
                </button>
                <div className="dp-sort" ref={sortRef}>
                  <span className="dp-sort-lab">ترتیب:</span>
                  <button type="button" className="dp-sort-btn" onClick={() => setSortOpen((v) => !v)} aria-haspopup="listbox" aria-expanded={sortOpen}>
                    {SORTS.find((s) => s.id === sort)?.label} <span className="caret">▼</span>
                  </button>
                  {sortOpen && (
                    <ul className="dp-sort-menu" role="listbox">
                      {SORTS.map((s) => (
                        <li key={s.id}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={sort === s.id}
                            className={sort === s.id ? "active" : ""}
                            onClick={() => {
                              setSort(s.id);
                              setSortOpen(false);
                            }}
                          >
                            {s.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {allCourses.length === 0 ? (
              <div className="dp-empty">دوره‌ای با این فیلترها پیدا نشد. فیلترها را تغییر دهید.</div>
            ) : (
              <div className="dp-grid">
                {allCourses.map((c, i) => (
                  <CourseCard c={c} rot={[-0.5, 0.5, -0.25, 0.25][i % 4]} pattern={persona.pattern} key={i} />
                ))}
              </div>
            )}
          </section>

          {/* مسیرهای یادگیری */}
          <section className="dp-block dp-card-block" id="dp-paths">
            <SectionHead pre="مسیرهای" accent="یادگیری" />
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
          </section>

          {/* مدرسان برتر */}
          <section className="dp-block" id="dp-insts">
            <SectionHead pre="مدرسان" accent="برتر" />
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
          </section>

          {/* تجربهٔ هنرجویان */}
          <section className="dp-block dp-card-block">
            <SectionHead pre="تجربهٔ" accent="هنرجویان" />
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
          </section>

          {/* CTA دپارتمان */}
          <section className="dp-block dp-cta-block">
            <div className="dp-cta">
              <img src={persona.pattern} alt="" aria-hidden="true" className="dp-cta-pattern" />
              <div className="dp-cta-copy">
                <h2>{dept.cta.title}</h2>
                <p>{dept.cta.text}</p>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
                  <a href="#consult" className="dp-btn dp-btn-ink">
                    دریافت مشاورهٔ تخصصی {dept.name}
                    <ArrowIcon />
                  </a>
                  <a href="#dp-all" onClick={(e) => scrollToSection(e, "dp-all")} className="dp-btn dp-btn-ghost">
                    مشاهدهٔ همهٔ دوره‌ها
                  </a>
                </div>
              </div>
              <div className="dp-cta-visual">
                <CourseIcon id={DEPT_ICONS[currentId].cta} size={96} />
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* ---------- درِاور فیلتر (فقط موبایل) ---------- */}
      {filterOpen && (
        <div
          className="dp-drawer-scrim"
          onClick={() => setFilterOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="فیلترها"
        >
          <div className="dp-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="dp-drawer-head">
              <span className="dp-drawer-title">فیلترها</span>
              <div className="dp-drawer-actions">
                {activeFilterCount > 0 && (
                  <button type="button" className="dp-reset" onClick={resetFilters}>
                    پاک کردن ×
                  </button>
                )}
                <button type="button" className="dp-drawer-close" onClick={() => setFilterOpen(false)} aria-label="بستن">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="dp-drawer-body">
              {filterGroups}
            </div>
          </div>
        </div>
      )}

      {/* ---------- دکمهٔ شناور انتخاب دپارتمان (فقط موبایل — مثل چت‌بات) ---------- */}
      <div className="dp-fab-wrap">
        {fabOpen && (
          <>
            <div className="dp-fab-backdrop" onClick={() => setFabOpen(false)} />
            <div className="dp-fab-menu" role="menu">
              {ALL_DEPTS.map((d) => {
                const active = d.id === currentId;
                return (
                  <a
                    key={d.id}
                    href={`#dept/${d.id}`}
                    role="menuitem"
                    className={`dp-fab-item${active ? " active" : ""}`}
                    style={active ? { background: d.color, color: d.id === "it" ? "#fff" : "var(--ink)" } : {}}
                    onClick={() => setFabOpen(false)}
                  >
                    <span className="dp-fab-ic">
                      <CourseIcon id={DEPT_ICONS[d.id].hero} size={16} />
                    </span>
                    {d.name}
                  </a>
                );
              })}
            </div>
          </>
        )}
        <button
          type="button"
          className={`dp-fab${fabOpen ? " open" : ""}`}
          onClick={() => setFabOpen((v) => !v)}
          aria-label="انتخاب دپارتمان"
          aria-expanded={fabOpen}
        >
          <CourseIcon id="globe" size={24} />
        </button>
      </div>
    </div>
  );
}
