import { useState, useEffect, useRef } from "react";

/* ─── All searchable site content ─── */
const searchableData = [
  // دوره‌ها
  { section: "دوره‌ها", icon: "🎓", color: "var(--college)", title: "طراحی سایت با وردپرس", text: "از آشنایی با وردپرس تا طراحی و مدیریت سایت‌های حرفه‌ای", link: "#courses", tags: "وردپرس wordpress وب طراحی سایت" },
  { section: "دوره‌ها", icon: "💻", color: "var(--navy)", title: "برنامه‌نویسی فرانت‌اند", text: "با HTML، CSS و JavaScript وارد دنیای توسعه وب شو", link: "#courses", tags: "javascript react فرانت‌اند frontend html css" },
  { section: "دوره‌ها", icon: "📈", color: "var(--teal)", title: "سئو و بهینه‌سازی سایت", text: "یاد بگیر چگونه سایت‌ها را برای موتورهای جست‌وجو بهینه کنی", link: "#courses", tags: "seo سئو بهینه‌سازی google analytics" },
  { section: "دوره‌ها", icon: "🎨", color: "var(--female)", title: "فتوشاپ و طراحی گرافیک", text: "اصول طراحی را یاد بگیر و با Photoshop طرح‌های حرفه‌ای بساز", link: "#courses", tags: "فتوشاپ photoshop گرافیک طراحی illustrator" },
  { section: "دوره‌ها", icon: "🎬", color: "var(--female)", title: "تدوین و موشن گرافیک", text: "با Premiere و After Effects محتوای ویدیویی حرفه‌ای بساز", link: "#courses", tags: "موشن تدوین premiere after effects ویدیو" },
  { section: "دوره‌ها", icon: "🌐", color: "var(--ecosystem)", title: "زبان انگلیسی (IELTS)", text: "از پایه تا آمادگی آزمون آیلتس", link: "#courses", tags: "زبان انگلیسی ielts آیلتس english" },
  { section: "دوره‌ها", icon: "📊", color: "var(--college)", title: "MBA و مهارت‌های مدیریتی", text: "مدیریت، کارآفرینی و کسب‌وکار", link: "#courses", tags: "mba مدیریت کسب‌وکار بازار کار" },

  // بلاگ
  { section: "وبلاگ", icon: "📝", color: "var(--navy)", title: "از کجا یادگیری یک مهارت تخصصی را شروع کنیم؟", text: "بررسی علاقه، توانایی‌ها و فرصت‌های شغلی برای پیدا کردن مسیر", link: "#blog", tags: "یادگیری مهارت شروع مسیر شغلی" },
  { section: "وبلاگ", icon: "📝", color: "var(--navy)", title: "۴ دپارتمان کالج رکاد", text: "فناوری اطلاعات، گرافیک، زبان یا MBA؟ مسیر مناسب خودت را پیدا کن", link: "#blog", tags: "دپارتمان مسیر یادگیری رشته" },
  { section: "وبلاگ", icon: "📝", color: "var(--navy)", title: "چرا یادگیری پروژه‌محور مسیر را کوتاه‌تر می‌کند؟", text: "انجام پروژه‌های واقعی سرعت یادگیری و آمادگی بازار کار را بالا می‌برد", link: "#blog", tags: "پروژه‌محور پروژه تمرین عملی" },

  // سوالات
  { section: "سوالات", icon: "❓", color: "var(--college)", title: "آیا پیش‌نیاز لازم دارم؟", text: "خیر. بسیاری از دوره‌ها از سطح مقدماتی شروع می‌شوند", link: "#faq", tags: "پیش‌نیاز مبتدی شروع" },
  { section: "سوالات", icon: "❓", color: "var(--college)", title: "آیا برای نوجوانان مناسب است؟", text: "بله. دوره‌هایی برای نوجوانان و دانش‌آموزان موجود است", link: "#faq", tags: "نوجوان دانش‌آموز سن" },
  { section: "سوالات", icon: "❓", color: "var(--college)", title: "مدرک دریافت می‌کنم؟", text: "بله. گواهینامه داخلی کالج رکاد با کد QR قابل استعلام", link: "#faq", tags: "مدرک گواهینامه certificate فنی" },
  { section: "سوالات", icon: "❓", color: "var(--college)", title: "پروژه‌محور هستند؟", text: "بله. یادگیری با تمرین و پروژه واقعی همراه است", link: "#faq", tags: "پروژه‌محور پروژه تمرین عملی" },
  { section: "سوالات", icon: "❓", color: "var(--college)", title: "پشتیبانی آموزشی دارم؟", text: "بله. منتور اختصاصی و پاسخ‌گویی زیر ۲۴ ساعت", link: "#faq", tags: "پشتیبانی منتور استاد کمک" },
  { section: "سوالات", icon: "❓", color: "var(--college)", title: "کدام دوره برای من مناسب است؟", text: "مشاوره رایگان بگیر تا بهترین مسیر را انتخاب کنی", link: "#faq", tags: "مشاوره انتخاب دوره راهنمایی" },

  // نظرات
  { section: "نظرات هنرجوها", icon: "💬", color: "var(--ecosystem)", title: "سارا — طراحی سایت با وردپرس", text: "از پایه شروع کردم، الان سایت خودم رو زدم و فریلنسرم", link: "#comments", tags: "تجربه نظر هنرجو وردپرس فریلنسر" },
  { section: "نظرات هنرجوها", icon: "💬", color: "var(--navy)", title: "امیر — برنامه‌نویسی فرانت‌اند", text: "دقیقاً همون چیزی بود که بازار کار لازم داشتم. الان در اسنپ", link: "#comments", tags: "تجربه نظر هنرجو فرانت‌اند استخدام" },
  { section: "نظرات هنرجوها", icon: "💬", color: "var(--female)", title: "نگار — فتوشاپ و گرافیک", text: "مسیر از صفر تا حرفه‌ای عالی بود. الان فریلنسر پروژه می‌گیرم", link: "#comments", tags: "تجربه نظر هنرجو گرافیک فریلنسر" },
  { section: "نظرات هنرجوها", icon: "💬", color: "var(--teal)", title: "رضا — سئو و بهینه‌سازی", text: "با پروژه‌های واقعی فهمیدم سئو یعنی چی. الان روی سایت‌های واقعی کار می‌کنم", link: "#comments", tags: "تجربه نظر هنرجو سئو" },
  { section: "نظرات هنرجوها", icon: "💬", color: "var(--college)", title: "مریم — زبان انگلیسی", text: "محیط صمیمی و اساتید عالی. آیلسم رو ۶.۵ گرفتم", link: "#comments", tags: "تجربه نظر هنرجو زبان ielts" },

  // وعده‌ها
  { section: "چرا رکاد", icon: "🎓", color: "var(--college)", title: "اساتید متخصص و شاغل در بازار", text: "تجربهٔ سال‌ها کار واقعی را با تو به اشتراک می‌گذارند", link: "#promo", tags: "اساتید تجربه بازار کار" },
  { section: "چرا رکاد", icon: "🛠️", color: "var(--teal)", title: "یادگیری پروژه‌محور در عمل", text: "خروجی واقعی برای پورتفولیو در پایان هر دوره", link: "#promo", tags: "پروژه‌محور پروژه عملی" },
  { section: "چرا رکاد", icon: "🚀", color: "var(--navy)", title: "ورود به بازار کار با همراهی رکاد", text: "معرفی به شرکت‌های همکار و پشتیبانی تا استخدام", link: "#promo", tags: "شغل استخدام بازار کار کاریابی" },
  { section: "چرا رکاد", icon: "📜", color: "var(--college)", title: "مدرک معتبر با کد QR", text: "قابل ارائه در رزومه و مصاحبه‌های کاری", link: "#promo", tags: "مدرک گواهینامه رزومه" },

  // آمار
  { section: "آمار و ارقام", icon: "📊", color: "var(--navy)", title: "+۲.۵k هنرجوی فعال", text: "بیش از دو هزار و پانصد هنرجو در حال یادگیری", link: "#features", tags: "آمار هنرجو تعداد" },
  { section: "آمار و ارقام", icon: "📚", color: "var(--college)", title: "+۵۰ دوره فعال", text: "بیش از پنجاه دوره تخصصی در ۴ دپارتمان", link: "#features", tags: "آمار دوره تعداد" },
  { section: "آمار و ارقام", icon: "⭐", color: "var(--teal)", title: "۹۸٪ رضایت هنرجویان", text: "رضایت بالای هنرجوها از کیفیت آموزش", link: "#features", tags: "آمار رضایت" },
];

/* ─── Fuzzy match: all query words must appear ─── */
function matchItem(item, query) {
  const q = query.toLowerCase().trim();
  if (!q) return false;
  const hay = (item.title + " " + item.text + " " + item.tags + " " + item.section).toLowerCase();
  return q.split(/\s+/).every((w) => hay.includes(w));
}

/* ─── Section badge colors ─── */
const sectionColors = {
  "دوره‌ها": { bg: "var(--college-light)", fg: "var(--college-darker)", border: "var(--college)" },
  "وبلاگ": { bg: "var(--bg-lavender)", fg: "var(--navy)", border: "var(--navy)" },
  "سوالات": { bg: "var(--bg-college-tint)", fg: "var(--college-darker)", border: "var(--college)" },
  "نظرات هنرجوها": { bg: "var(--teal-light)", fg: "var(--teal-dark)", border: "var(--teal)" },
  "چرا رکاد": { bg: "var(--bg-college-tint)", fg: "var(--college-darker)", border: "var(--college)" },
  "آمار و ارقام": { bg: "var(--bg-lavender)", fg: "var(--navy)", border: "var(--navy)" },
};

/* ─── Component ─── */
export default function SearchBox() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  const openSearch = () => { setOpen(true); setQuery(""); setResults([]); };
  const closeSearch = () => { setOpen(false); setQuery(""); setResults([]); };

  useEffect(() => {
    if (open && inputRef.current) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && open) closeSearch();
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        open ? closeSearch() : openSearch();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    setResults(searchableData.filter((item) => matchItem(item, query)));
  }, [query]);

  const grouped = results.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  const handleResultClick = (link) => {
    closeSearch();
    const el = document.querySelector(link);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const resultCount = results.length;

  return (
    <>
      {/* ─── Trigger button (matches Rokad btn style) ─── */}
      <button className="sb-trigger" onClick={openSearch} aria-label="جستجو">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="16" height="16">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <span className="sb-trigger-text">جستجو</span>
        <kbd className="sb-kbd">⌘K</kbd>
      </button>

      {/* ─── Overlay ─── */}
      {open && (
        <div className="sb-overlay" onClick={closeSearch}>
          <div className="sb-modal" onClick={(e) => e.stopPropagation()}>

            {/* Input bar */}
            <div className="sb-input-row">
              <svg className="sb-input-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="20" height="20">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                className="sb-input"
                placeholder="دوره، مقاله، سوال، نظر... تایپ کنید"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                dir="rtl"
              />
              {query && (
                <button className="sb-clear" onClick={() => { setQuery(""); setResults([]); }} aria-label="پاک کردن">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="16" height="16">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
              <button className="sb-close" onClick={closeSearch} aria-label="بستن">ESC</button>
            </div>

            {/* Results count */}
            {query.trim() && (
              <div className="sb-count">
                {resultCount > 0
                  ? <>{resultCount} نتیجه پیدا شد</>
                  : <>نتیجه‌ای یافت نشد</>
                }
              </div>
            )}

            {/* Results */}
            <div className="sb-results">
              {/* Empty state */}
              {!query.trim() && (
                <div className="sb-empty">
                  <div className="sb-empty-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" width="48" height="48">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                  </div>
                  <p className="sb-empty-title">جستجو در کالج رکاد</p>
                  <p className="sb-empty-sub">دوره‌ها، مقالات، سوالات، نظرات هنرجوها...</p>
                  <div className="sb-suggestions">
                    {["وردپرس", "فرانت‌اند", "سئو", "گرافیک", "زبان"].map((tag) => (
                      <button key={tag} className="sb-suggestion" onClick={() => { setQuery(tag); }}>
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* No results */}
              {query.trim() && resultCount === 0 && (
                <div className="sb-empty">
                  <div className="sb-empty-icon sb-empty-icon--muted">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" width="48" height="48">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                      <path d="M8 11h6" />
                    </svg>
                  </div>
                  <p className="sb-empty-title">نتیجه‌ای پیدا نشد</p>
                  <p className="sb-empty-sub">با کلمه کلیدی دیگری امتحان کنید</p>
                </div>
              )}

              {/* Grouped results */}
              {Object.entries(grouped).map(([section, items]) => {
                const sc = sectionColors[section] || { bg: "var(--bg-neutral)", fg: "var(--ink)", border: "var(--ink)" };
                return (
                  <div key={section} className="sb-group">
                    <div className="sb-group-header" style={{ background: sc.bg, color: sc.fg, borderColor: sc.border }}>
                      <span className="sb-group-dot" style={{ background: sc.border }} />
                      {section}
                      <span className="sb-group-count">{items.length}</span>
                    </div>
                    {items.map((item) => (
                      <button key={item.title} className="sb-result" onClick={() => handleResultClick(item.link)}>
                        <div className="sb-result-ic" style={{ background: item.color, borderColor: "var(--ink)" }}>
                          {item.icon}
                        </div>
                        <div className="sb-result-body">
                          <div className="sb-result-title">{item.title}</div>
                          <div className="sb-result-text">{item.text}</div>
                        </div>
                        <svg className="sb-result-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="14" height="14">
                          <path d="M15 6l-6 6 6 6" />
                        </svg>
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
