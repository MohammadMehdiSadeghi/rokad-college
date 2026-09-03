/* ============================================================
   رکاد کالج — تک‌صفحهٔ بلاگ (Blog Single)
   ساختار و محتوا: برگرفته از تک‌صفحهٔ بلاگ رکاد وب
   دیزاین: سیستم طراحی کالج (کهربایی/سرمه‌ای/ink + پترن‌ها)
   باز شدن: از طریق هش #article/<slug>
   ============================================================ */
import {
  articles,
  titleHighlight,
  blocks,
  authorInfo,
  commentsData,
  articleTags,
} from "@/data/blogArticles";
import PatternLayer from "@/components/PatternLayer";

/* ---------- تن‌ها (پالت کالج) ---------- */
const TONES = {
  amber: {
    solid: "var(--college)",
    deep: "var(--college-dark)",
    tint: "var(--college-light)",
    dark: "var(--college-darker)",
    pattern: "/assets/StatCard/yellow.png",
  },
  navy: {
    solid: "var(--navy-alt)",
    deep: "var(--navy)",
    tint: "var(--bg-lavender)",
    dark: "var(--navy-hover)",
    pattern: "/assets/StatCard/blue.png",
  },
  magenta: {
    solid: "var(--accent)",
    deep: "var(--accent-text)",
    tint: "var(--bg-blush)",
    dark: "var(--female-dark)",
    pattern: "/assets/StatCard/pink.png",
  },
  teal: {
    solid: "var(--teal)",
    deep: "var(--teal-dark)",
    tint: "var(--teal-light)",
    dark: "#255e56",
    pattern: "/assets/StatCard/green.png",
  },
};
const toTone = (t) => (t === "orange" ? "amber" : t || "amber");

/* ---------- ابزارها ---------- */
const FA = "۰۱۲۳۴۵۶۷۸۹";
const toFa = (n) => String(n).replace(/\d/g, (d) => FA[d]);
const pad2 = (n) => toFa(String(n).padStart(2, "0"));

/* تبدیل متن با تگ <strong>/<em> به نودهای React */
const rich = (text) => {
  const parts = [];
  const re = /<strong>(.*?)<\/strong>|<em>(.*?)<\/em>/g;
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push({ t: "s", v: text.slice(last, m.index) });
    parts.push(
      m[1] !== undefined
        ? { t: "b", v: m[1] }
        : { t: "i", v: m[2] }
    );
    last = re.lastIndex;
  }
  if (last < text.length) parts.push({ t: "s", v: text.slice(last) });
  return parts.map((p, i) =>
    p.t === "b" ? (
      <strong key={i} className="bs-strong">{p.v}</strong>
    ) : p.t === "i" ? (
      <em key={i} className="bs-em">{p.v}</em>
    ) : (
      p.v
    )
  );
};

/* ---------- آیکون‌های کوچک (SVG) ---------- */
const S = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

function MetaIcon({ name, size = 16 }) {
  const w = size, h = size;
  switch (name) {
    case "clock":
      return <svg viewBox="0 0 24 24" width={w} height={h} {...S}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>;
    case "calendar":
      return <svg viewBox="0 0 24 24" width={w} height={h} {...S}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>;
    case "user":
      return <svg viewBox="0 0 24 24" width={w} height={h} {...S}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
    default:
      return <svg viewBox="0 0 24 24" width={w} height={h} {...S}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
  }
}

function GalleryIcon({ name, className = "" }) {
  const c = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "team":
      return (<svg viewBox="0 0 24 24" className={className} {...c}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>);
    case "pencil":
      return (<svg viewBox="0 0 24 24" className={className} {...c}><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>);
    case "wrench":
      return (<svg viewBox="0 0 24 24" className={className} {...c}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>);
    case "screen":
      return (<svg viewBox="0 0 24 24" className={className} {...c}><rect x="2" y="3" width="20" height="14" rx="2" /><path d="m8 21 4-4 4 4M12 17v4" /></svg>);
    case "trophy":
      return (<svg viewBox="0 0 24 24" className={className} {...c}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2z" /></svg>);
    default:
      return (<svg viewBox="0 0 24 24" className={className} {...c}><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="8.5" cy="10.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>);
  }
}

/* فلش ساده */
function Arrow({ className = "", flip = false }) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

/* ============================================================
   بلاک‌های محتوا
   ============================================================ */
function Block({ b }) {
  switch (b.type) {
    case "lead":
      return (
        <div className="bs-lead">
          <p>{rich(b.text)}</p>
          <div className="bs-lead-stats">
            {b.stats.map((s, i) => (
              <div key={i} className="bs-lead-stat">
                <span className="val">{s.value}</span>
                <span className="lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case "h2":
      return (
        <h2 className="bs-h2" id={b.id}>
          {b.words.map((w, i) => (
            <span key={i} className={`w ${w.color === "amber" ? "hl" : ""}`} style={{ transform: `rotate(${w.rotate})` }}>
              {w.text}
            </span>
          ))}
        </h2>
      );
    case "h3":
      return (
        <h3 className="bs-h3">
          <span className="bar" />
          <span>{b.text}</span>
        </h3>
      );
    case "p":
      return <p className="bs-p">{rich(b.text)}</p>;
    case "pullquote": {
      const t = TONES[toTone(b.accent)] || TONES.amber;
      return (
        <figure className="bs-quote" style={{ background: t.tint, borderColor: t.solid }}>
          <span className="mark" style={{ color: t.solid }}>”</span>
          <blockquote>{b.text}</blockquote>
          <figcaption style={{ color: t.deep }}>{b.attr}</figcaption>
        </figure>
      );
    }
    case "infobox": {
      const t = TONES[toTone(b.tone)] || TONES.amber;
      return (
        <div className="bs-info">
          <div className="bs-info-tint" style={{ backgroundColor: t.solid }} />
          <div className="bs-info-in">
            <span className="bs-info-label" style={{ backgroundColor: t.solid }}>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
              {b.label}
            </span>
            <ul className="bs-info-list">
              {b.items.map(([k, v], i) => (
                <li key={i}>
                  <span className="dot" style={{ backgroundColor: t.solid }} />
                  <span><strong>{k}</strong> {v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    case "people":
      return (
        <div className="bs-people">
          <div className="bs-people-grid">
            {b.items.map((p, i) => <PersonCard key={i} p={p} tone="teal" />)}
          </div>
          {b.accentItems?.length > 0 && (
            <div className="bs-people-grid accent">
              {b.accentItems.map((p, i) => <PersonCard key={i} p={p} tone="magenta" />)}
            </div>
          )}
        </div>
      );
    case "gallery":
      return (
        <div className="bs-gallery">
          {b.items.map((g, i) => {
            const t = TONES[toTone(g.tone)] || TONES.amber;
            return (
              <div key={i} className="bs-tile">
                <div className="bs-tile-sh" />
                <div className="bs-tile-card" style={{ background: t.solid }}>
                  <img src={t.pattern} alt="" aria-hidden="true" className="bs-tile-pattern" />
                  <span className="num">{g.num}</span>
                  <GalleryIcon name={g.icon} className="bs-tile-icon" />
                  <span className="lbl">{g.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      );
    case "podium": {
      const medal = { gold: "var(--college)", silver: "#9aa0ad", bronze: "#a56216" };
      return (
        <div className="bs-podium">
          {b.items.map((p, i) => (
            <div key={i} className={`bs-podium-col${i === 1 ? " winner" : ""}`}>
              <div className="bs-podium-sh" />
              <div className="bs-podium-card">
                <span className="medal">{p.medal}</span>
                <span className="rank" style={{ backgroundColor: medal[p.tone] || "var(--college)" }}>{p.rank}</span>
                <span className="team">{p.team}</span>
                <span className="proj">{p.project}</span>
                <span className="members">{p.members}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }
    case "timeline":
      return (
        <div className="bs-tl">
          {b.items.map((t, i) => (
            <div key={i} className="bs-tl-item">
              <span className="node" />
              <div className="bs-tl-card">
                <span className="date">{t.date}</span>
                <strong>{t.title}</strong>
                <p>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      );
    case "lesson":
      return (
        <div className="bs-lesson">
          <span className="num">{toFa(b.num)}</span>
          <div className="body">
            <h4>{b.title}</h4>
            <p>{rich(b.text)}</p>
          </div>
        </div>
      );
    default:
      return null;
  }
}

function PersonCard({ p, tone }) {
  const t = TONES[toTone(tone)] || TONES.amber;
  return (
    <div className="bs-person">
      <span className="avatar" style={{ backgroundColor: t.solid }}>{p.initials}</span>
      <span className="name">{p.name}</span>
      <span className="role">{p.role}</span>
      {p.badge && <span className="badge" style={{ backgroundColor: t.solid }}>{p.badge}</span>}
    </div>
  );
}

/* ============================================================
   هیروی مقاله
   ============================================================ */
function ArticleHero({ article, highlight, meta }) {
  const t = TONES[article.tone] || TONES.amber;
  const words = article.title.split(" ");
  const rots = [-1.5, 1.5, -2, 2, -1, 1, -1.5, 2];

  return (
    <section className="bs-hero">
      <PatternLayer rotate={180} />
      <div className="container bs-hero-in">
        <a className="bs-back" href="#blog">
          <Arrow flip /> بازگشت به مجله
        </a>

        <div className="bs-hero-grid">
          <div className="bs-hero-copy">
            <span className="bs-eyebrow">
              <i style={{ backgroundColor: t.solid }} />
              {article.cat} · مجلهٔ کالج رکاد
            </span>
            <h1 className="bs-title">
              {words.map((w, i) => {
                const isHl = highlight.some((h) => w.includes(h));
                return (
                  <span
                    key={i}
                    className={`w${isHl ? " hl" : ""}`}
                    style={{ transform: `rotate(${rots[i % rots.length]}deg)` }}
                  >
                    {w}
                  </span>
                );
              })}
            </h1>
            <p className="bs-sub">{article.excerpt}</p>
            <div className="bs-meta">
              <span className="bs-meta-item"><i className="ic" style={{ color: t.deep }}><MetaIcon name="clock" /></i>{meta[0].k}<strong>{meta[0].v}</strong></span>
              <span className="bs-meta-item"><i className="ic" style={{ color: "var(--navy)" }}><MetaIcon name="calendar" /></i>{meta[1].k}<strong>{meta[1].v}</strong></span>
              <span className="bs-meta-item"><i className="ic" style={{ color: "var(--accent-text)" }}><MetaIcon name="user" /></i>{meta[2].k}<strong>{meta[2].v}</strong></span>
              <span className="bs-meta-item"><i className="ic" style={{ color: "var(--teal-dark)" }}><MetaIcon name="comment" /></i>{meta[3].v}</span>
            </div>
          </div>

          {/* کاور */}
          <div className="bs-cover">
            <span className="bs-cover-sh" style={{ background: "var(--navy-alt)" }} />
            <div className="bs-cover-card" style={{ background: `linear-gradient(150deg, ${t.solid}, ${t.dark})` }}>
              <img src={t.pattern} alt="" aria-hidden="true" className="bs-cover-pattern" />
              <span className="bs-cover-num">{article.num}</span>
              <span className="bs-cover-glyph">{article.glyph}</span>
              <span className="bs-cover-label">کاور مجله · {article.cat}</span>
              <span className="bs-cover-cap">تصویر کاور · مجلهٔ کالج رکاد</span>
            </div>
            <span className="bs-sticker" style={{ backgroundColor: "var(--college)" }}>
              <span className="dot" /> {article.readTime}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   سایدبار
   ============================================================ */
function Sidebar({ toc, related, onToc }) {
  return (
    <aside className="bs-side">
      {/* فهرست مطالب */}
      <div className="bs-card-stack sh-amber">
        <div className="bs-card">
          <div className="bs-card-head">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
            فهرست مطالب
          </div>
          <ul className="bs-toc">
            {toc.map((t) => (
              <li key={t.id}>
                <a
                  href={`#${t.id}`}
                  onClick={(e) => { e.preventDefault(); onToc(t.id); }}
                >
                  <span className="num">{t.num}</span>
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA کوچک سایدبار */}
      <div className="bs-card-stack sh-ink">
        <div className="bs-card bs-mini-cta">
          <div className="title">آماده‌ای شروع کنی؟</div>
          <p>پیش‌ثبت‌نام هنرستان رکاد باز شده؛ مسیرت رو از همین امروز بساز.</p>
          <a href="#consult" className="bs-mini-btn">
            پیش‌ثبت‌نام <Arrow />
          </a>
        </div>
      </div>

      {/* مطالب مرتبط */}
      <div className="bs-card-stack sh-navy">
        <div className="bs-card">
          <div className="bs-card-head">مطالب مرتبط</div>
          <ul className="bs-rel">
            {related.map((r) => (
              <li key={r.slug}>
                <a href={`#article/${r.slug}`}>
                  <span className="glyph">{r.glyph}</span>
                  {r.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

/* ============================================================
   نویسنده
   ============================================================ */
function AuthorCard() {
  return (
    <div className="bs-author">
      <div className="bs-author-sh" />
      <div className="bs-author-card">
        <span className="avatar">{authorInfo.name.charAt(0)}</span>
        <div className="bio">
          <span className="lbl">{authorInfo.label}</span>
          <strong>{authorInfo.name}</strong>
          <p>{authorInfo.bio}</p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   نظرات (نسخهٔ مقاله)
   ============================================================ */
function ArticleComments() {
  return (
    <section className="bs-comments">
      <PatternLayer rotate={0} />
      <div className="container section-inner">
        <div className="bs-comments-head">
          <h2>
            <span className="w" style={{ transform: "rotate(-1deg)" }}>نظرت</span>
            <span className="w hl" style={{ transform: "rotate(2deg)" }}>چیه؟</span>
          </h2>
          <span className="count">{commentsData.count}</span>
        </div>

        <form
          className="bs-cform"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="row">
            <input type="text" placeholder="نام تو" required />
            <input type="email" placeholder="ایمیل (نمایش داده نمی‌شه)" required />
          </div>
          <textarea rows={4} placeholder="نظرت رو بنویس..." required />
          <button type="submit" className="bs-send">
            ارسال نظر
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" /></svg>
          </button>
        </form>

        <div className="bs-clist">
          {commentsData.list.map((c, i) => (
            <div key={i} className="bs-citem">
              <span className={`avatar av${i % 4}`}>{c.initials}</span>
              <div className="body">
                <div className="head">
                  <strong>{c.name}</strong>
                  <span>{c.date}</span>
                </div>
                <p>{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   مقالات مرتبط
   ============================================================ */
function Related({ related }) {
  return (
    <section className="bs-related">
      <div className="container section-inner">
        <h2 className="bs-rel-title">
          <span className="w" style={{ transform: "rotate(-1.5deg)" }}>این‌ها</span>
          <span className="w" style={{ transform: "rotate(1deg)" }}>رو</span>
          <span className="w" style={{ transform: "rotate(-1deg)" }}>هم</span>
          <span className="w hl" style={{ transform: "rotate(2deg)" }}>بخون</span>
        </h2>

        <div className="bs-rp-grid">
          {related.map((p) => {
            const t = TONES[p.tone] || TONES.amber;
            return (
              <a key={p.slug} href={`#article/${p.slug}`} className="bs-rp">
                <div className="bs-rp-sh" />
                <div className="bs-rp-card">
                  <div className="cover" style={{ background: `linear-gradient(150deg, ${t.solid}, ${t.dark})` }}>
                    <img src={t.pattern} alt="" aria-hidden="true" className="pat" />
                    <span className="num">{p.num}</span>
                    <span className="glyph">{p.glyph}</span>
                    <span className="cat">{p.cat}</span>
                  </div>
                  <div className="body">
                    <h3>{p.title}</h3>
                    <p>{p.excerpt}</p>
                    <div className="foot">
                      <span className="date">{p.date} · {p.readTime}</span>
                      <span className="go">مطالعه <Arrow /></span>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CTA پایانی
   ============================================================ */
function FinalCta() {
  return (
    <section className="bs-final">
      <div className="container section-inner">
        <div className="bs-cta">
          <h2 className="bs-cta-title">
            <span className="w" style={{ transform: "rotate(-1.5deg)" }}>آماده‌ای</span>
            <span className="w" style={{ transform: "rotate(1.5deg)" }}>تا</span>
            <span className="w hl" style={{ transform: "rotate(-2deg)" }}>آینده‌ت</span>
            <span className="w" style={{ transform: "rotate(1deg)" }}>رو</span>
            <span className="w" style={{ transform: "rotate(-1deg)" }}>همین‌جا</span>
            <span className="w" style={{ transform: "rotate(1.5deg)" }}>بسازی؟</span>
          </h2>
          <p className="bs-cta-desc">
            این‌ها فقط نمونه‌هایی از مسیرهایی بود که هنرجوها توی کالج رکاد طی می‌کنن.
            پروژه‌های واقعی، اساتید شاغل و منتورهایی که کنارتن — همین تجربه‌ای که خوندی، اینجا در انتظارته.
          </p>
          <div className="bs-cta-actions">
            <a href="#courses" className="bs-btn bs-btn-solid">
              مشاهدهٔ دوره‌ها <Arrow />
            </a>
            <a href="#blog" className="bs-btn bs-btn-ghost">
              بازگشت به مجله
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   کامپوننت اصلی
   ============================================================ */
export default function BlogArticle({ slug }) {
  const article = articles.find((a) => a.slug === slug) || articles[0];
  const hl = titleHighlight[article.slug] || [];
  const related = articles.filter((a) => a.slug !== article.slug);

  /* فهرست مطالب از h2 ها */
  const toc = blocks
    .filter((b) => b.type === "h2")
    .map((b, i) => ({
      id: b.id,
      num: pad2(i + 1),
      label: b.words.map((w) => w.text).join(" "),
    }));

  const meta = [
    { k: "زمان مطالعه:", v: article.readTime },
    { k: "تاریخ انتشار:", v: article.date },
    { k: "نویسنده:", v: article.author },
    { k: "نظر:", v: commentsData.count },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* هیرو */}
      <ArticleHero article={article} highlight={hl} meta={meta} />

      {/* مقاله + سایدبار */}
      <section className="bs-body">
        <div className="container bs-layout">
          <article className="bs-article">
            {blocks.map((b, i) => <Block key={i} b={b} />)}

            {/* تگ‌ها */}
            <div className="bs-tags">
              {articleTags.map((t, i) => {
                const tn = TONES[t.tone] || TONES.amber;
                return (
                  <span key={i} className="bs-tag" style={{ background: tn.tint, color: tn.deep, borderColor: tn.solid }}>
                    {t.text}
                  </span>
                );
              })}
            </div>

            {/* اشتراک */}
            <div className="bs-share">
              <span>این مقاله رو با دوستات به اشتراک بذار:</span>
              <div className="btns">
                <button aria-label="تلگرام" className="tg"><svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" /></svg></button>
                <button aria-label="توییتر/X" className="x"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></button>
                <button aria-label="لینکدین" className="in"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg></button>
                <button aria-label="کپی لینک" className="cp"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg></button>
              </div>
            </div>

            <AuthorCard />
          </article>

          <Sidebar toc={toc} related={related} onToc={scrollTo} />
        </div>
      </section>

      <ArticleComments />
      <Related related={related} />
      <FinalCta />
    </>
  );
}
