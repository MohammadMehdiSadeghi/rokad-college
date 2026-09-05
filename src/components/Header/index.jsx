import { useState, useEffect, useRef, useMemo } from "react";
import Logo from "../Logo.jsx";

// Rotations for menu links (sticker feel)
const ROTS = [-1, 0.5, -0.5, 1, -1, 0.5];

/* ─── Searchable site content ─── */
const searchableData = [
  { section: "دوره‌ها", icon: "🎓", title: "طراحی سایت با وردپرس", text: "از آشنایی با وردپرس تا طراحی سایت حرفه‌ای", link: "#courses", tags: "وردپرس wordpress وب طراحی سایت" },
  { section: "دوره‌ها", icon: "💻", title: "برنامه‌نویسی فرانت‌اند", text: "با HTML، CSS و JavaScript وارد دنیای توسعه وب شو", link: "#courses", tags: "javascript react فرانت‌اند frontend html css" },
  { section: "دوره‌ها", icon: "📈", title: "سئو و بهینه‌سازی سایت", text: "بهینه‌سازی سایت برای موتورهای جست‌وجو", link: "#courses", tags: "seo سئو بهینه‌سازی google analytics" },
  { section: "دوره‌ها", icon: "🎨", title: "فتوشاپ و طراحی گرافیک", text: "اصول طراحی و Photoshop", link: "#courses", tags: "فتوشاپ photoshop گرافیک طراحی illustrator" },
  { section: "دوره‌ها", icon: "🎬", title: "تدوین و موشن گرافیک", text: "Premiere و After Effects", link: "#courses", tags: "موشن تدوین premiere after effects ویدیو" },
  { section: "دوره‌ها", icon: "🌐", title: "زبان انگلیسی (IELTS)", text: "از پایه تا آمادگی آیلتس", link: "#courses", tags: "زبان انگلیسی ielts آیلتس english" },
  { section: "دوره‌ها", icon: "📊", title: "MBA و مهارت‌های مدیریتی", text: "مدیریت و کسب‌وکار", link: "#courses", tags: "mba مدیریت کسب‌وکار بازار کار" },
  { section: "وبلاگ", icon: "📝", title: "از کجا یادگیری یک مهارت را شروع کنیم؟", text: "مسیر یادگیری مهارت تخصصی", link: "#blog", tags: "یادگیری مهارت شروع مسیر شغلی" },
  { section: "وبلاگ", icon: "📝", title: "۴ دپارتمان کالج رکاد", text: "فناوری اطلاعات، گرافیک، زبان یا MBA؟", link: "#blog", tags: "دپارتمان مسیر رشته" },
  { section: "وبلاگ", icon: "📝", title: "یادگیری پروژه‌محور", text: "پروژه‌های واقعی سرعت یادگیری را بالا می‌برد", link: "#blog", tags: "پروژه‌محور پروژه تمرین عملی" },
  { section: "سوالات", icon: "❓", title: "آیا پیش‌نیاز لازم دارم؟", text: "خیر. از سطح مقدماتی شروع می‌شود", link: "#faq", tags: "پیش‌نیاز مبتدی شروع" },
  { section: "سوالات", icon: "❓", title: "مدرک دریافت می‌کنم؟", text: "گواهینامه داخلی با کد QR", link: "#faq", tags: "مدرک گواهینامه certificate" },
  { section: "سوالات", icon: "❓", title: "پشتیبانی آموزشی دارم؟", text: "منتور اختصاصی و پاسخ‌گویی زیر ۲۴ ساعت", link: "#faq", tags: "پشتیبانی منتور استاد" },
  { section: "نظرات", icon: "💬", title: "سارا — وردپرس", text: "از پایه شروع کردم، الان فریلنسرم", link: "#comments", tags: "تجربه نظر هنرجو وردپرس فریلنسر" },
  { section: "نظرات", icon: "💬", title: "امیر — فرانت‌اند", text: "بازار کار لازم داشتم، الان در اسنپ", link: "#comments", tags: "تجربه نظر هنرجو فرانت‌اند استخدام" },
  { section: "نظرات", icon: "💬", title: "نگار — گرافیک", text: "از صفر تا حرفه‌ای عالی بود", link: "#comments", tags: "تجربه نظر هنرجو گرافیک فریلنسر" },
  { section: "نظرات", icon: "💬", title: "مریم — زبان", text: "آیلسم رو ۶.۵ گرفتم", link: "#comments", tags: "تجربه نظر هنرجو زبان ielts" },
  { section: "ویژگی‌ها", icon: "🎓", title: "اساتید متخصص شاغل در بازار", text: "تجربه سال‌ها کار واقعی", link: "#promo", tags: "اساتید تجربه بازار کار" },
  { section: "ویژگی‌ها", icon: "🚀", title: "ورود به بازار کار", text: "معرفی به شرکت‌های همکار", link: "#promo", tags: "شغل استخدام بازار کار" },
  { section: "آمار", icon: "📊", title: "+۲.۵k هنرجوی فعال", text: "بیش از دو هزار هنرجو", link: "#features", tags: "آمار هنرجو تعداد" },
  { section: "آمار", icon: "⭐", title: "۹۸٪ رضایت", text: "رضایت بالای هنرجوها", link: "#features", tags: "آمار رضایت" },
];

function matchItem(item, query) {
  const q = query.toLowerCase().trim();
  if (!q) return false;
  const hay = (item.title + " " + item.text + " " + item.tags + " " + item.section).toLowerCase();
  return q.split(/\s+/).every((w) => hay.includes(w));
}
  
const sectionBadge = {
  "دوره‌ها": { bg: "var(--college-light)", fg: "var(--college-darker)" },
  "وبلاگ": { bg: "var(--bg-lavender)", fg: "var(--navy)" },
  "سوالات": { bg: "var(--bg-college-tint)", fg: "var(--college-darker)" },
  "نظرات": { bg: "var(--teal-light)", fg: "var(--teal-dark)" },
  "ویژگی‌ها": { bg: "var(--bg-college-tint)", fg: "var(--college-darker)" },
  "آمار": { bg: "var(--bg-lavender)", fg: "var(--navy)" },
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  /* Scroll spy: scrolled + active nav section */
  useEffect(() => {
    const sectionIds = ["promo", "features", "courses", "about", "blog", "comments"];

    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      /* find which section is in view */
      let current = 0;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 90) {
          current = i + 1;
          break;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ─── Search logic: filter + group ─── */
  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchableData.filter((item) => matchItem(item, query));
  }, [query]);

  const grouped = useMemo(() => {
    const map = {};
    results.forEach((item) => {
      if (!map[item.section]) map[item.section] = [];
      map[item.section].push(item);
    });
    return map;
  }, [results]);

  /* ─── Navigate to a result ─── */
  const handleResultClick = (link) => {
    setSearchOpen(false);
    setQuery("");
    const el = document.querySelector(link);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  /* Open search on Cmd/Ctrl + K */
  useEffect(() => {
    const onGlobal = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", onGlobal);
    return () => document.removeEventListener("keydown", onGlobal);
  }, []);

  /* Close search on Escape or click outside */
  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setSearchOpen(false); };
    const onClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setSearchOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    document.body.style.overflow = "hidden";
    if (searchInputRef.current) searchInputRef.current.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  const links = [
    { t: "صفحهٔ اصلی", href: "#top" },
    { t: "ویژگی‌ها", href: "#features" },
    { t: "دوره‌ها", href: "#courses" },
    { t: "اساتید", href: "#about" },
    { t: "مجله", href: "#blog" },
    { t: "تماس با ما", href: "#consult" },
  ];

  return (
    <>
      <header
        className={"site-header" + (scrolled ? " scrolled" : "")}
        id="top"
      >
        <div className="v1-header">
          <div className="pill">
            {/* Logo */}
            <Logo />

            {/* Desktop nav — hidden on mobile */}
            <nav className="nav-links">
              {links.map((l, i) => (
                <a
                  key={i}
                  href={l.href}
                  className={"nav-link" + (active === i ? " active" : "")}
                  onClick={() => setActive(i)}
                >
                  {l.t}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="actions">
              <button
                className="ibtn"
                aria-label="جستجو"
                onClick={() => setSearchOpen(true)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </button>

              {/* Desktop-only: login + CTA */}
              <a href="#consult" className="login-pill desktop-only">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
                  <path d="M10 17l5-5-5-5" />
                  <path d="M15 12H3" />
                </svg>
                ورود
              </a>
              <a href="#consult" className="cta-pill desktop-only">
                مشاورهٔ رایگان
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </a>

              {/* Mobile hamburger v1 */}
              <button
                className="mobile-menu-btn"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="منو"
                aria-expanded={mobileOpen}
              >
                <span className={`hb1-bars ${mobileOpen ? "hb1-bars--open" : ""}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <div className={`search-backdrop${searchOpen ? " search-backdrop--open" : ""}`} onClick={() => { setSearchOpen(false); setQuery(""); }} />

      {/* Search panel overlay */}
      <div className={`search-panel${searchOpen ? " search-panel--open" : ""}`} ref={searchRef}>
        <div className="search-panel-inner">
          <div className="search-panel-field">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="دوره، مقاله، سوال، نظر... تایپ کنید"
              className="search-panel-input"
              value={query}
              dir="rtl"
              autoFocus
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && results.length > 0) handleResultClick(results[0].link); }}
            />

          </div>
          <button
            className="search-panel-close"
            onClick={() => { setSearchOpen(false); setQuery(""); }}
            aria-label="بستن"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Results */}
        {query.trim() && (
          <div className="search-panel-results">
            {results.length === 0 && (
              <div className="search-panel-empty">
                <p>چیزی پیدا نشد — کلمه دیگری امتحان کنید</p>
                <div className="search-panel-tags">
                  {["وردپرس", "فرانت‌اند", "سئو", "گرافیک", "زبان"].map((tag) => (
                    <button key={tag} className="search-panel-tag" onClick={() => setQuery(tag)}>{tag}</button>
                  ))}
                </div>
              </div>
            )}
            {Object.keys(grouped).map((section) => {
              const items = grouped[section];
              const sc = sectionBadge[section] || { bg: "var(--bg-neutral)", fg: "var(--ink)" };
              return (
                <div key={section} className="search-group">
                  <div className="search-group-title" style={{ background: sc.bg, color: sc.fg }}>
                    {section}
                    <span className="search-group-cnt">{items.length}</span>
                  </div>
                  {items.map((item) => (
                    <button key={item.title} className="search-hit" onClick={() => handleResultClick(item.link)}>
                      <span className="search-hit-ic">{item.icon}</span>
                      <div className="search-hit-body">
                        <div className="search-hit-title">{item.title}</div>
                        <div className="search-hit-text">{item.text}</div>
                      </div>
                      <svg className="search-hit-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="14" height="14">
                        <path d="M15 6l-6 6 6 6" />
                      </svg>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* Suggestions when empty */}
        {!query.trim() && searchOpen && (
          <div className="search-panel-results">
            <div className="search-panel-empty">
              <p>دوره‌ها، مقالات، سوالات، نظرات...</p>
              <div className="search-panel-tags">
                {["وردپرس", "فرانت‌اند", "سئو", "گرافیک", "زبان", "MBA"].map((tag) => (
                  <button key={tag} className="search-panel-tag" onClick={() => setQuery(tag)}>{tag}</button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile fullscreen amber overlay */}
      <div className={`hb1-panel ${mobileOpen ? "hb1-panel--open" : ""}`}>
        <div className="hb1-panel-head">
          <Logo size={28} />
          <button
            className="hb1-close"
            onClick={() => setMobileOpen(false)}
            aria-label="بستن"
          >
            ×
          </button>
        </div>

        <ul className="hb1-list">
          {links.map((l, i) => (
            <li key={i}>
              <a
                href={l.href}
                onClick={() => {
                  setActive(i);
                  setMobileOpen(false);
                }}
                style={{ transform: `rotate(${ROTS[i]}deg)` }}
              >
                {l.t}
              </a>
              <span className="hb1-chev">‹</span>
            </li>
          ))}
        </ul>

        <div className="hb1-actions">
          <a
            href="#consult"
            className="hb1-cta"
            onClick={() => setMobileOpen(false)}
          >
            مشاورهٔ رایگان
          </a>
        </div>
      </div>
    </>
  );
}