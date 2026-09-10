/* ============================================================
   کالج رکاد — صفحهٔ همهٔ بلاگ‌ها (Blog Index)
   ساختار: برگرفته از «Blog Page.html» (مرجع)
   دیزاین: سیستم کالج (کهربایی اصلی + سرمه‌ای/مجنتا/تیل)
   باز شدن: هش #blog-index
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { articles } from "@/data/blogArticles";

/* تبدیل اعداد لاتین به فارسی */
const FA = "۰۱۲۳۴۵۶۷۸۹";
const toFa = (n) => String(n).replace(/\d/g, (d) => FA[d]);

/* ---------- پالت (همان توکن‌های کالج) ---------- */
const TONES = {
  amber:   { solid: "var(--college)",     dark: "var(--college-dark)",  tint: "var(--college-light)", darker: "var(--college-darker)" },
  navy:    { solid: "var(--navy-alt)",    dark: "var(--navy-hover)",    tint: "var(--bg-lavender)",   darker: "var(--navy-hover)" },
  magenta: { solid: "var(--accent)",      dark: "var(--female-dark)",   tint: "var(--bg-blush)",      darker: "var(--female-dark)" },
  teal:    { solid: "var(--teal)",        dark: "var(--teal-dark)",     tint: "var(--teal-light)",    darker: "#1f413d" },
};

/* گرادیان کاور: برای کهربایی از زرد واقعی استفاده می‌شود تا تیره/قهوه‌ای نشود */
const coverBg = (tone, deg = 135) => {
  const c = TONES[tone] || TONES.amber;
  if (tone === "amber") {
    return `linear-gradient(${deg}deg, #ffd44d 0%, var(--college) 50%, var(--college-dark) 100%)`;
  }
  return `linear-gradient(${deg}deg, ${c.solid} 0%, ${c.dark} 100%)`;
};

/* ---------- آیکون‌ها ---------- */
const S = { fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" };
const I = {
  Search: (p) => <svg viewBox="0 0 24 24" {...S} {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" /></svg>,
  Arrow: (p) => <svg viewBox="0 0 24 24" {...S} {...p}><path d="M19 12H5M12 5l-7 7 7 7" /></svg>,
  ArrowLeft: (p) => <svg viewBox="0 0 24 24" {...S} {...p}><path d="M5 12h14M12 5l7 7-7 7" /></svg>,
  ArrowRight: (p) => <svg viewBox="0 0 24 24" {...S} {...p}><path d="M19 12H5M12 5l7 7-7 7" /></svg>,
  Clock: (p) => <svg viewBox="0 0 24 24" {...S} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  Eye: (p) => <svg viewBox="0 0 24 24" {...S} {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>,
  Bookmark: (p) => <svg viewBox="0 0 24 24" {...S} {...p}><path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16l7-4 7 4z" /></svg>,
  Chat: (p) => <svg viewBox="0 0 24 24" {...S} {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  Flame: (p) => <svg viewBox="0 0 24 24" {...S} {...p}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>,
  Rocket: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>,
  Book: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>,
  Sparkle: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2l1.8 6.4L20 10l-6.2 1.6L12 18l-1.8-6.4L4 10l6.2-1.6L12 2z" /></svg>,
  Check: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="20 6 9 17 4 12" /></svg>,
  X: (p) => <svg viewBox="0 0 24 24" {...S} {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>,
};

/* ============================================================
   هیرو
   ============================================================ */
/* تگ‌های جست‌وجوی پرطرفدار — حتماً حداقل در یک مقاله عنوان/تگ/نویسنده باشند */
const POPULAR_TAGS = ["استارتاپ", "مصاحبه", "داستان", "راهنما", "ابزار"];

/* هایلایت بخش مطابق با عبارت جست‌وجو داخل ساجستیشن */
function SuggestLabel({ text, q }) {
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx < 0) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <mark>{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </span>
  );
}

function Hero({ searchQuery, setSearchQuery, setActiveCategory, onGoResults }) {
  const [showSuggest, setShowSuggest] = useState(false);

  /* ساجستیشن زنده: عنوان مقاله‌ها + تگ‌ها، حداکثر ۶ مورد */
  const q = searchQuery.trim().toLowerCase();
  const suggestions = q
    ? [...new Set([
        ...POSTS.filter((p) => p.title.toLowerCase().includes(q)).map((p) => p.title),
        ...[...new Set(POSTS.map((p) => p.tag))].filter((t) => t.toLowerCase().includes(q)),
      ])].slice(0, 6)
    : [];

  /* همهٔ کلمات هیرو یک درجه‌چرخش یکسان (۱) با علامت‌های متناوب دارند */
  const line1 = [
    { text: "داستان‌ها،", rot: "-1deg" },
    { text: "ایده‌ها", rot: "1deg" },
    { text: "و", rot: "-1deg" },
    { text: "تجربه‌های", rot: "1deg" },
  ];
  const line2 = [
    { text: "یک", rot: "-1deg" },
    { text: "نسل", rot: "1deg", hl: true },
    { text: "استارتاپی", rot: "-1deg", hl: true },
  ];

  return (
    <section className="bi-hero">
      {/* اشکال تزئینی */}
      <div className="bi-hero-deco bi-hero-deco-1" style={{ background: "var(--accent)" }} />
      <div className="bi-hero-deco bi-hero-deco-2" style={{ background: "var(--teal)" }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <a className="bi-back" href="#">
          <I.ArrowLeft style={{ width: 14, height: 14 }} /> بازگشت به خانه
        </a>

        {/* پیل بردکرامب */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <div className="bi-pill">
            <I.Sparkle style={{ width: 16, height: 16, color: "var(--college)" }} />
            <span>مجلهٔ رکاد</span>
            <span style={{ color: "var(--ink-subtle)" }}>·</span>
            <span style={{ color: "var(--college-dark)", fontWeight: 900 }}>شماره ۱۴۰۵</span>
          </div>
        </div>

        {/* تیتر */}
        <h1 className="bi-title">
          <span className="bi-line">
            {line1.map((w, i) => (
              <span key={i} className="bi-w" style={{ transform: `rotate(${w.rot})` }}>{w.text}</span>
            ))}
          </span>
          <span className="bi-line">
            {line2.map((w, i) => (
              <span key={i} className={`bi-w${w.hl ? " hl" : ""}`} style={{ transform: `rotate(${w.rot})` }}>{w.text}</span>
            ))}
          </span>
        </h1>

        {/* زیرتیتر */}
        <p className="bi-sub">
          هر هفته با مقاله‌های تازه، مصاحبه‌ها و تجربه‌های واقعی از دنیای کارآفرینی نوجوان همراه شما هستیم.
        </p>

        {/* جست‌وجو */}
        <form
          className="bi-search"
          onSubmit={(e) => {
            e.preventDefault();
            setShowSuggest(false);
            onGoResults?.();
          }}
        >
          <div className="bi-search-sh" />
          <div className="bi-search-box">
            <input
              type="text"
              placeholder="دنبال چی می‌گردی؟ مثلاً «استارتاپ» یا «برنامه‌نویسی»"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggest(true);
              }}
              onFocus={() => setShowSuggest(true)}
              onBlur={() => setTimeout(() => setShowSuggest(false), 150)}
              role="combobox"
              aria-expanded={showSuggest && !!searchQuery.trim()}
              autoComplete="off"
            />
            <button type="submit">
              <I.Search style={{ width: 18, height: 18 }} />
              <span className="bi-hide-mobile">جست‌وجو</span>
            </button>
          </div>
          {/* ساجستیشن زنده */}
          {showSuggest && searchQuery.trim() && (
            <ul className="bi-suggest">
              {suggestions.length === 0 && (
                <li className="bi-suggest-empty">موردی پیدا نشد…</li>
              )}
              {suggestions.map((s, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault() /* جلوگیری از blur زودتر از کلیک */}
                    onClick={() => {
                      setSearchQuery(s);
                      setActiveCategory("all");
                      setShowSuggest(false);
                      onGoResults?.();
                    }}
                  >
                    <I.Search style={{ width: 14, height: 14, flexShrink: 0, opacity: .5 }} />
                    <SuggestLabel text={s} q={searchQuery.trim()} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </form>

        {/* تگ‌های پرطرفدار */}
        <div className="bi-poptags">
          <span>جست‌وجوهای پرطرفدار:</span>
          {POPULAR_TAGS.map((t, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setSearchQuery(t);
                setActiveCategory("all");
                onGoResults?.();
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   مقالهٔ ویژه (Featured)
   ============================================================ */
function Featured({ featured }) {
  const t = TONES.amber;
  const authorInitials = featured.author.trim().split(/\s+/).map((w) => w[0]).join(".");
  return (
    <section className="bi-featured">
      <div className="container">
        {/* هدر سکشن */}
        <div className="bi-sec-head">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="bi-dot-ring" />
            <h2 className="bi-h2">
              <span style={{ display: "inline-block", transform: "rotate(-1deg)" }}>مقاله</span>{" "}
              <span style={{ display: "inline-block", transform: "rotate(1deg)", color: "var(--accent)" }}>ویژه</span>{" "}
              <span style={{ display: "inline-block", transform: "rotate(-1deg)" }}>این هفته</span>
            </h2>
          </div>
          <a className="bi-more-link" href="#blog-index">همه مقالات ویژه <I.Arrow style={{ width: 16, height: 16 }} /></a>
        </div>

        {/* کارت ویژه */}
        <div className="bi-featured-card">
          <div className="bi-featured-sh" />
          <div className="bi-featured-grid">
            {/* سمت تصویر */}
            <div className="bi-featured-media" style={{ background: coverBg("amber") }}>
              <div className="bi-feat-shape bi-feat-shape-1" style={{ background: "var(--navy-alt)" }} />
              <div className="bi-feat-shape bi-feat-shape-2" style={{ background: "var(--accent)" }} />
              <div className="bi-feat-rocket">
                <I.Rocket style={{ color: "var(--navy)", width: 32, height: 32, transform: "rotate(-20deg)" }} />
              </div>

              <div className="bi-feat-top">
                <span className="bi-feat-hot">
                  <I.Flame style={{ width: 14, height: 14, color: "var(--college)" }} />
                  داغ‌ترین مقاله هفته
                </span>
              </div>
              <div className="bi-feat-chips">
                <span className="chip white">{featured.cat}</span>
                <span className="chip amber">مصاحبه اختصاصی</span>
              </div>
            </div>

            {/* سمت محتوا */}
            <div className="bi-featured-body">
              <div>
                <div className="bi-feat-meta">
                  <span><I.Clock style={{ width: 14, height: 14 }} /> {featured.date}</span>
                  <span className="sep" />
                  <span><I.Eye style={{ width: 14, height: 14 }} /> ۱۲.۴K بازدید</span>
                  <span className="sep bi-hide-mob-inline" />
                  <span className="bi-hide-mob-inline"><I.Chat style={{ width: 14, height: 14 }} /> ۴۸ نظر</span>
                </div>

                <h3 className="bi-feat-title">{featured.title}</h3>
                <p className="bi-feat-desc">{featured.excerpt}</p>

                <div className="bi-progress">
                  <span> {featured.readTime}</span>
                  <div className="track"><div className="fill" style={{ width: "35%" }} /></div>
                  <span>۳۵٪</span>
                </div>
              </div>

              <div className="bi-feat-foot">
                <div className="bi-author-mini">
                  <span className="avatar">{authorInitials}</span>
                  <span>
                    <strong>{featured.author}</strong>
                    <small>سردبیر مجلهٔ رکاد</small>
                  </span>
                </div>
                <a href={`#article/${featured.slug}`} className="bi-read-btn">
                  خواندن مقاله <I.Arrow style={{ width: 16, height: 16 }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   فیلتر دسته‌بندی
   ============================================================ */
const CATEGORIES = [
  { id: "all",       label: "همه",           color: "var(--ink)",      bg: "#fff",             count: 128 },
  { id: "startup",   label: "استارتاپ",      color: "var(--teal)",     bg: "var(--teal-light)", count: 42 },
  { id: "boys",      label: "مدرسه پسران",   color: "var(--navy)",     bg: "var(--bg-lavender)", count: 28 },
  { id: "girls",     label: "مدرسه دختران",  color: "var(--accent)",   bg: "var(--bg-blush)",   count: 24 },
  { id: "college",   label: "کالج و دانشگاه", color: "var(--college-dark)", bg: "var(--college-light)", count: 19 },
  { id: "interview", label: "مصاحبه",        color: "var(--navy)",     bg: "var(--bg-lavender)", count: 15 },
  { id: "tips",      label: "راهنما و ترفند", color: "var(--teal-dark)", bg: "var(--bg-mint)",    count: 22 },
];
/* چرخش یکدست: همهٔ چیپ‌ها یک درجه‌چرخش (۱) با علامت متناوب */
const ROTS = ["-1deg", "1deg", "-1deg", "1deg", "-1deg", "1deg", "-1deg"];

function Categories({ active, setActive }) {
  return (
    <section className="bi-cats">
      <div className="container">
        <div className="bi-chip-row">
          {CATEGORIES.map((c, i) => {
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                style={{
                  background: isActive ? c.color : c.bg,
                  color: isActive ? "#fff" : c.color,
                  borderColor: isActive ? "var(--ink)" : "rgba(41,40,39,.15)",
                  transform: isActive ? "rotate(0deg) scale(1.05)" : `rotate(${ROTS[i]})`,
                  boxShadow: isActive ? "3px 3px 0 var(--ink)" : "none",
                  zIndex: isActive ? 2 : 1,
                }}
              >
                {c.label}
                <span className="bi-chip-count" style={{ background: isActive ? "rgba(255,255,255,.25)" : "#fff", color: isActive ? "#fff" : c.color }}>
                  {toFa(c.count)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   گرید مقاله‌ها
   ============================================================ */
const POSTS = [
  { id: 1, title: "چطور از هیچ، یک ایده استارتاپی پیدا کنیم؟", excerpt: "روش‌شناسی یافتن ایده‌های نو از دل مسائل روزمره و دردهای واقعی مردم.", tag: "استارتاپ", tagColor: "primary", author: "مهدی رضایی", date: "۱۲ خرداد", readTime: "۶ دقیقه", reads: "۴.۲K", size: "lg" },
  { id: 2, title: "مصاحبه با فاطمه، دانش‌آموز سال چهارم دختران", excerpt: "قصه‌ی راه‌اندازی یک کسب‌وکار آنلاین در دوران دبیرستان.", tag: "دختران", tagColor: "girl", author: "نگین کریمی", date: "۱۰ خرداد", readTime: "۹ دقیقه", reads: "۳.۸K", size: "sm" },
  { id: 3, title: "راهنمای کامل پیچ کردن جلوی سرمایه‌گذار", excerpt: "۱۰ نکته طلایی که هر بنیان‌گذار جوان باید بداند.", tag: "کالج", tagColor: "third", author: "رضا احمدی", date: "۹ خرداد", readTime: "۱۲ دقیقه", reads: "۵.۱K", size: "sm" },
  { id: 4, title: "برنامه‌نویسی یاد بگیرم یا بازاریابی؟", excerpt: "مقایسه‌ی دو مسیر شغلی داغ برای نوجوانان امروز، از زبان کسی که هر دو را تجربه کرده.", tag: "راهنما", tagColor: "sec", author: "علی محمدی", date: "۸ خرداد", readTime: "۸ دقیقه", reads: "۶.۷K", size: "md" },
  { id: 5, title: "چرا شکست، اولین گام موفقیت است", excerpt: "داستان سه بنیان‌گذار جوان که قبل از موفقیت، بارها زمین خوردند.", tag: "مصاحبه", tagColor: "girl", author: "سارا اکبری", date: "۶ خرداد", readTime: "۷ دقیقه", reads: "۳.۲K", size: "md" },
  { id: 6, title: "ابزارهای رایگانی که هر استارتاپی باید بشناسد", excerpt: "لیست جامع از فیگما تا نوشن؛ کاربردی و رایگان.", tag: "استارتاپ", tagColor: "primary", author: "محمد کریمی", date: "۴ خرداد", readTime: "۵ دقیقه", reads: "۸.۳K", size: "sm" },
  { id: 7, title: "زندگی روزانه یک دانش‌آموز رکادی چطور می‌گذرد؟", excerpt: "یک روز کامل از صبح تا شب، از کلاس درس تا کارگاه ایده‌پردازی.", tag: "پسران", tagColor: "sec", author: "امیر حسینی", date: "۳ خرداد", readTime: "۴ دقیقه", reads: "۲.۹K", size: "sm" },
  { id: 8, title: "راز درست‌کردن یک تیم برنده", excerpt: "چطور هم‌بنیان‌گذارت را انتخاب کنی؟", tag: "راهنما", tagColor: "third", author: "زهرا رضایی", date: "۱ خرداد", readTime: "۶ دقیقه", reads: "۴.۵K", size: "md" },
  { id: 9, title: "از دانش‌آموز تا کارآفرین: ۵ سال بعد چه اتفاقی می‌افتد؟", excerpt: "گفت‌وگو با فارغ‌التحصیلان اولین دوره رکاد.", tag: "مصاحبه", tagColor: "primary", author: "حسین محمدی", date: "۲۹ اردیبهشت", readTime: "۱۱ دقیقه", reads: "۷.۱K", size: "lg" },
  { id: 10, title: "AI را در استارتاپت به کار بگیر", excerpt: "راهنمای عملی استفاده از هوش مصنوعی.", tag: "ابزار", tagColor: "sec", author: "فرزاد نوری", date: "۲۷ اردیبهشت", readTime: "۹ دقیقه", reads: "۹.۲K", size: "sm" },
  { id: 11, title: "داستان یک شکست: چرا استارتاپم بسته شد", excerpt: "اعتراف بی‌پرده از یک بنیان‌گذار.", tag: "داستان", tagColor: "girl", author: "مریم صادقی", date: "۲۵ اردیبهشت", readTime: "۷ دقیقه", reads: "۵.۸K", size: "sm" },
  { id: 12, title: "MVP چیست و چطور می‌سازیم؟", excerpt: "قدم‌به‌قدم ساخت اولین نسخه از محصول.", tag: "کالج", tagColor: "third", author: "ناصر پورقاسم", date: "۲۲ اردیبهشت", readTime: "۱۰ دقیقه", reads: "۶.۰K", size: "md" },
];
const TAG_COLORS = {
  primary: { ...TONES.teal },
  sec: { ...TONES.navy },
  girl: { ...TONES.magenta },
  third: { ...TONES.amber },
};
/* نگاشت tagColor کارت‌ها به تن گرادیان کاور */
const TAG_TONE = {
  primary: "teal",
  sec: "navy",
  girl: "magenta",
  third: "amber",
};
/* چرخش یکدست: همهٔ کارت‌ها یک درجه‌چرخش (۱) با علامت متناوب */
const CARD_ROTS = ["-1deg", "1deg", "-1deg", "1deg", "-1deg", "1deg", "-1deg", "1deg", "-1deg", "1deg", "-1deg", "1deg"];
/* تعداد کارت اولیه در هر صفحهٔ لود‌مور */
const PAGE_SIZE = 9;
const CAT_TAGS = {
  all: null,
  startup: ["استارتاپ", "ابزار"],
  boys: ["پسران"],
  girls: ["دختران"],
  college: ["کالج"],
  interview: ["مصاحبه", "داستان"],
  tips: ["راهنما"],
};

function BlogCard({ post, index, entering, exiting, animDelay = 0 }) {
  const c = TAG_COLORS[post.tagColor] || TAG_COLORS.primary;
  const rot = CARD_ROTS[index % CARD_ROTS.length];
  const slug = articles[(post.id - 1) % articles.length].slug;
  const [saved, setSaved] = useState(false);

  return (
    <div
      className={`bi-card bi-card-${post.size}${entering ? " bi-enter" : ""}${exiting ? " bi-exit" : ""}`}
      style={{ "--rot": rot, animationDelay: animDelay ? `${animDelay}ms` : undefined }}
    >
      <div className="bi-card-sh" />
      <a href={`#article/${slug}`} className="bi-card-body">
        {/* هدر رنگی */}
        <div className="bi-card-media" style={{ background: coverBg(TAG_TONE[post.tagColor]) }}>
          <div className="bi-card-circle" style={{ background: "rgba(255,255,255,.25)" }} />
          <div className="bi-card-square" />
          <span className="bi-card-tag" style={{ color: c.dark }}>#{post.tag}</span>

          <button
            className={`bi-card-bookmark${saved ? " saved" : ""}`}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSaved((v) => !v); }}
            style={saved ? { background: c.solid, color: "#fff" } : undefined}
            aria-label={saved ? "حذف از ذخیره‌شده‌ها" : "ذخیره"}
            aria-pressed={saved}
          >
            <I.Bookmark style={{ width: 15, height: 15, fill: saved ? "currentColor" : "none" }} />
          </button>
        </div>

        {/* محتوا */}
        <div className="bi-card-info">
          <div className="bi-card-meta">
            <span><I.Clock style={{ width: 12, height: 12 }} /> {post.readTime}</span>
            <span className="dot" />
            <span>{post.date}</span>
            <span className="dot" />
            <span style={{ color: c.dark, fontWeight: 900 }}><I.Eye style={{ width: 12, height: 12 }} /> {post.reads}</span>
          </div>
          <h3 className={`bi-card-title${post.size === "lg" ? " lg" : ""}`}>{post.title}</h3>
          <p className="bi-card-excerpt">{post.excerpt}</p>

          <div className="bi-card-foot">
            <span className="bi-card-author">
              <span className="avatar" style={{ background: coverBg(TAG_TONE[post.tagColor]) }}>{post.author.charAt(0)}</span>
              {post.author}
            </span>
            <span className="bi-card-arr" style={{ background: c.solid }}>
              <I.Arrow style={{ width: 14, height: 14 }} />
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}

function BlogGrid({ activeCategory, searchQuery }) {
  const tags = CAT_TAGS[activeCategory] || null;
  const q = searchQuery.toLowerCase().trim();

  const [sortBy, setSortBy] = useState("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);
  /* حالت انیمیشن: stagger برای کارت‌های تازه لودشده، خروج برای کارت‌های اضافه */
  const [animState, setAnimState] = useState({ phase: "idle", fromIndex: 0 });
  const ref = useRef(null);
  /* ----- ثابت‌های انیمیشن لودمور ----- */
  const ENTER_STAGGER = 60, ENTER_MS = 550, EXIT_STAGGER = 45, EXIT_MS = 420;
  const animTimers = useRef([]);

  const clearAnimTimers = () => {
    animTimers.current.forEach(clearTimeout);
    animTimers.current = [];
  };
  /* پاک‌سازی تایمرها هنگام آن‌مانت */
  useEffect(() => clearAnimTimers, []);

  /* بستن منوی مرتب‌سازی با کلیک بیرون */
  useEffect(() => {
    if (!sortOpen) return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setSortOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [sortOpen]);

  /* با هر تغییر فیلتر/سرچ، شمارندهٔ لود‌مور و فاز انیمیشن ریست شود */
  useEffect(() => {
    clearAnimTimers();
    setVisible(PAGE_SIZE);
    setAnimState({ phase: "idle", fromIndex: 0 });
  }, [activeCategory, searchQuery, sortBy]);

  const SORTS = [
    { id: "newest", label: "جدیدترین" },
    { id: "oldest", label: "قدیمی‌ترین" },
    { id: "popular", label: "پرخواننده‌ترین" },
  ];
  const sortLabel = SORTS.find((s) => s.id === sortBy)?.label;

  /* خواندن عدد K از رشتهٔ فارسی («۴.۲K» → 4.2) */
  const parseReads = (r) => parseFloat(String(r).replace(/[^\d.]/g, "")) || 0;

  const filtered = POSTS.filter((p) => {
    if (tags && !tags.some((t) => p.tag === t)) return false;
    if (q) {
      const match = (p.title + " " + p.excerpt + " " + p.tag + " " + p.author).toLowerCase();
      if (!match.includes(q)) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "popular") return parseReads(b.reads) - parseReads(a.reads);
    /* newest: id بزرگ‌تر = جدیدتر */
    if (sortBy === "oldest") return a.id - b.id;
    return b.id - a.id;
  });

  const posts = sorted.slice(0, visible);
  const hasMore = visible < sorted.length;

  /* ----- لود‌مور: کارت‌های جدید با stagger وارد می‌شوند ----- */
  const loadMore = () => {
    if (animState.phase !== "idle" || !hasMore) return;
    const from = visible;
    const count = Math.min(PAGE_SIZE, sorted.length - from);
    setVisible((v) => v + PAGE_SIZE);
    setAnimState({ phase: "enter", fromIndex: from });
    /* بعد از پایان stagger، فاز به idle برمی‌گردد تا کلاس انیمیشن برداشته شود */
    animTimers.current.push(setTimeout(() => {
      setAnimState((s) => (s.phase === "enter" ? { phase: "idle", fromIndex: 0 } : s));
    }, (count - 1) * ENTER_STAGGER + ENTER_MS + 60));
  };

  /* ----- بستن: کارت‌های اضافه با stagger خارج می‌شوند، بعد شمارنده برمی‌گردد ----- */
  const collapseAll = () => {
    if (animState.phase !== "idle" || visible <= PAGE_SIZE) return;
    setAnimState({ phase: "exit", fromIndex: PAGE_SIZE });
    const EXIT_TOTAL = EXIT_MS + (visible - PAGE_SIZE - 1) * EXIT_STAGGER + 80;
    animTimers.current.push(setTimeout(() => {
      setVisible(PAGE_SIZE);
      setAnimState({ phase: "idle", fromIndex: 0 });
    }, EXIT_TOTAL));
  };

  return (
    <section className="bi-grid-sec" id="bi-results">
      <div className="container">
        <div className="bi-sec-head">
          <h2 className="bi-h2">
            <span style={{ display: "inline-block", transform: "rotate(-1deg)" }}>همه‌ی</span>{" "}
            <span style={{ display: "inline-block", transform: "rotate(1deg)", color: "var(--college-dark)" }}>مقاله‌ها</span>
          </h2>
          <div className="bi-sort-wrap" ref={ref}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-subtle)" }}>مرتب‌سازی:</span>
            <button className="bi-sort" onClick={() => setSortOpen((v) => !v)} aria-expanded={sortOpen}>
              {sortLabel} <span style={{ fontSize: 10 }}>▼</span>
            </button>
            {sortOpen && (
              <ul className="bi-sort-menu">
                {SORTS.map((s) => (
                  <li key={s.id}>
                    <button
                      className={sortBy === s.id ? "active" : ""}
                      onClick={() => {
                        setSortBy(s.id);
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

        <div className="bi-blog-grid">
          {posts.map((p, i) => (
            <BlogCard
              key={p.id}
              post={p}
              index={i}
              entering={animState.phase === "enter" && i >= animState.fromIndex}
              exiting={animState.phase === "exit" && i >= animState.fromIndex}
              animDelay={(i - animState.fromIndex) * (animState.phase === "exit" ? EXIT_STAGGER : ENTER_STAGGER)}
            />
          ))}
        </div>

        {sorted.length === 0 && (
          <div style={{ textAlign: "center", color: "var(--ink-subtle)", fontWeight: 700, padding: "3rem 1rem" }}>
            <p style={{ fontSize: 16, margin: 0 }}>مقاله‌ای مطابق با جست‌وجوی شما پیدا نشد.</p>
            <p style={{ fontSize: 13, opacity: 0.8, marginTop: 6 }}>می‌توانید کلمهٔ دیگری را جست‌وجو کنید یا دسته‌بندی را تغییر دهید.</p>
          </div>
        )}

        {sorted.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginTop: "3.5rem" }}>
            <div className="bi-loadmore">
              <div className="bi-loadmore-sh" />
              {hasMore ? (
                <button onClick={loadMore} disabled={animState.phase !== "idle"}>
                  {animState.phase === "enter" ? (
                    <>
                      در حال بارگذاری
                      <span className="bi-loadmore-dots" aria-hidden="true"><span>.</span><span>.</span><span>.</span></span>
                    </>
                  ) : (
                    <>
                      مقاله‌های بیشتر
                      <span className="bi-loadmore-num">{toFa(sorted.length - visible)}</span>
                    </>
                  )}
                </button>
              ) : (
                <button className="bi-loadmore-close" onClick={collapseAll} disabled={animState.phase !== "idle"}>
                  {animState.phase === "exit" ? (
                    "در حال بستن…"
                  ) : (
                    <>
                      بستن مقاله‌ها <I.X style={{ width: 16, height: 16 }} />
                    </>
                  )}
                </button>
              )}
            </div>
            {!hasMore && animState.phase !== "exit" && (
              <p className="bi-loadmore-end">🎉 به آخر لیست رسیدی! مقاله جدید به‌زودی اضافه می‌شه.</p>
            )}
          </div>
        )}

        {/* دیوایدر پایان گرید */}
        <div className="bi-divider" aria-hidden="true">
          <span className="line" />
          <span className="glyph">✦</span>
          <span className="line" />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   پرخواننده‌ترین‌های ماه
   ============================================================ */
function Trending() {
  const items = [
    { rank: 1, title: "راز موفقیت استارتاپ‌های نوجوان که هیچ‌کس بهت نمی‌گه", author: "علی رضایی", reads: "۱۸.۲K", tone: "magenta", rot: "-1deg", glyph: "🚀" },
    { rank: 2, title: "۷ اشتباه رایج در پیچ‌دک که حتی حرفه‌ای‌ها می‌کنند", author: "سارا محمدی", reads: "۱۴.۷K", tone: "teal", rot: "1deg", glyph: "💡" },
    { rank: 3, title: "از صفر تا اپلیکیشن: مسیر یک دانش‌آموز رکادی", author: "محمد امینی", reads: "۱۱.۹K", tone: "amber", rot: "-1deg", glyph: "📱" },
  ];

  return (
    <section className="bi-trending">
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="bi-sec-head">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="bi-trend-ic">
              <I.Flame style={{ color: "#fff", width: 22, height: 22, transform: "rotate(4deg)" }} />
            </span>
            <h2 className="bi-h2">
              <span style={{ display: "inline-block", transform: "rotate(-1deg)" }}>پرخواننده‌ترین‌های</span>{" "}
              <span style={{ display: "inline-block", transform: "rotate(1deg)", color: "var(--accent)" }}>ماه</span>
            </h2>
          </div>
          <span className="bi-update">به‌روزرسانی هر یکشنبه</span>
        </div>

        <div className="bi-trend-grid">
          {items.map((it, i) => {
            const c = TONES[it.tone];
            return (
              <div key={i} className="bi-trend-cell" style={{ transform: `rotate(${it.rot})` }}>
                <div className="bi-trend-sh" />
                <article className="bi-trend-card">
                  {/* تصویر (هدر گرادیانی) */}
                  <div className="bi-trend-media" style={{ background: coverBg(it.tone) }}>
                    <div className="bi-card-circle" style={{ background: "rgba(255,255,255,.25)" }} />
                    <div className="bi-card-square" />
                    <span className="bi-trend-glyph">{it.glyph}</span>
                  </div>
                  <div className="bi-trend-body">
                    <span className="bi-trend-rank" style={{ color: c.solid }}>#{toFa(it.rank)}</span>
                    <div className="bi-trend-top">
                      <span className="bi-trend-badge" style={{ background: c.solid }}>رتبه {toFa(it.rank)}</span>
                    </div>
                    <h3>{it.title}</h3>
                    <div className="bi-trend-foot">
                      <span>{it.author}</span>
                      <span style={{ color: c.solid, fontWeight: 900 }}>{it.reads}</span>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   نویسنده‌ها
   ============================================================ */
function Authors() {
  const authors = [
    { name: "نگین کریمی", role: "سردبیر مجله", posts: 32, tone: "magenta", initials: "ن.ک", rot: "-1deg" },
    { name: "مهدی رضایی", role: "نویسنده استارتاپ", posts: 24, tone: "teal", initials: "م.ر", rot: "1deg" },
    { name: "سارا اکبری", role: "مصاحبه‌گر", posts: 18, tone: "amber", initials: "س.ا", rot: "-1deg" },
    { name: "علی محمدی", role: "مربی راهنما", posts: 15, tone: "navy", initials: "ع.م", rot: "1deg" },
  ];

  return (
    <section className="bi-authors">
      <div className="container">
        <div className="bi-sec-head">
          <h2 className="bi-h2">
            <span style={{ display: "inline-block", transform: "rotate(-1deg)" }}>قلم‌های</span>{" "}
            <span style={{ display: "inline-block", transform: "rotate(1deg)", color: "var(--college-dark)" }}>پشت</span>{" "}
            <span style={{ display: "inline-block", transform: "rotate(-1deg)" }}>مقاله‌ها</span>
          </h2>
          <a className="bi-more-link" href="#blog-index">همه نویسنده‌ها <I.Arrow style={{ width: 16, height: 16 }} /></a>
        </div>

        <div className="bi-author-grid">
          {authors.map((a, i) => {
            const c = TONES[a.tone];
            return (
              <div key={i} className="bi-author-cell" style={{ transform: `rotate(${a.rot})` }}>
                <div className="bi-author-sh" />
                <div className="bi-author-card">
                  <div className="bi-author-strip" style={{ background: coverBg(a.tone) }} />
                  <span className="bi-author-avatar" style={{ background: c.tint, color: c.solid }}>{a.initials}</span>
                  <h4>{a.name}</h4>
                  <p>{a.role}</p>
                  <span className="bi-author-posts" style={{ background: c.tint, color: c.solid, borderColor: c.solid }}>
                    <I.Book style={{ width: 12, height: 12 }} />
                    {toFa(a.posts)} مقاله
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   کامپوننت اصلی
   ============================================================ */
export default function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const featured = articles[0];

  /* اسکرول به بخش نتایج گرید مقاله‌ها */
  const goResults = () => {
    document.getElementById("bi-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setActiveCategory={setActiveCategory}
        onGoResults={goResults}
      />
      <Featured featured={featured} />
      <Categories active={activeCategory} setActive={setActiveCategory} />
      <BlogGrid activeCategory={activeCategory} searchQuery={searchQuery} />
      <Trending />
      <Authors />
    </>
  );
}