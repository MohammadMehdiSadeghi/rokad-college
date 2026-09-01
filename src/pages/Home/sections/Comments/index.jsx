import { useEffect, useRef, useState } from "react";
import "./comments.css";
import PatternBackground from "@/components/PatternBackground";

/* ---------- Testimonials (from the V3 design HTML) ---------- */
const testimonials = [
  {
    name: "سارا رحیمی",
    role: "طراح فریلنسر — تهران",
    course: "طراحی سایت با وردپرس",
    date: "۳ ماه پیش",
    status: "در حال کار در بازار آزاد",
    quote: (
      <>
        من اصلاً پیش‌زمینهٔ فنی نداشتم و می‌ترسیدم شروع کنم. دورهٔ وردپرس رکاد
        پروژه‌محور بود و <span className="hl">هر هفته یک سایت واقعی</span>{" "}
        می‌ساختم. دو ماه بعد از فارغ‌التحصیلی، اولین سفارش را از یک آرایشگاه
        محلی گرفتم و الان هر ماه ۳ تا ۴ پروژه دارم.
      </>
    ),
  },
  {
    name: "امیرحسین کریمی",
    role: "فرانت‌اند دولوپر — اسنپ",
    course: "برنامه‌نویسی فرانت‌اند",
    date: "۵ ماه پیش",
    status: "استخدام شرکتی",
    quote: (
      <>
        بزرگ‌ترین تفاوت رکاد با دوره‌های آنلاین دیگر،{" "}
        <span className="hl">پشتیبانی زنده و رفع اشکال روزانه</span> بود.
        مدرس‌مان همیشه در دسترس بود و پروژه‌های واقعی می‌ساختیم. الان
        به‌عنوان جونیور در تیم فرانت‌اند اسنپ کار می‌کنم.
      </>
    ),
  },
  {
    name: "مریم صادقی",
    role: "کارشناس سئو — دیجی‌کالا",
    course: "سئو و بهینه‌سازی سایت",
    date: "۸ ماه پیش",
    status: "شاغل تمام‌وقت",
    quote: (
      <>
        فکر می‌کردم سئو یعنی چندتا کلیدواژه گذاشتن. ولی در دورهٔ رکاد فهمیدم{" "}
        <span className="hl">سئو یک تخصص کامل با ابزارهای حرفه‌ای</span> است.
        الان به‌عنوان کارشناس سئو در یک تیم بزرگ کار می‌کنم و مسیر شغلی‌ام
        کاملاً تغییر کرده.
      </>
    ),
  },
  {
    name: "نگار موسوی",
    role: "طراح گرافیک آزاد — شیراز",
    course: "فتوشاپ و طراحی گرافیک",
    date: "۲ ماه پیش",
    status: "درآمدزایی از هفتهٔ چهارم",
    quote: (
      <>
        بر خلاف تصور من، لازم نبود ماه‌ها صبر کنم. مدرس دوره ما را{" "}
        <span className="hl">از همان جلسات ابتدایی به تمرین روی سفارش‌های واقعی</span>{" "}
        تشویق کرد. الان یک استودیوی کوچک خانگی راه انداختم و برای مغازه‌های
        محلی طراحی می‌کنم.
      </>
    ),
  },
  {
    name: "کیارش زمانی",
    role: "موشن‌گرافر — ورزش سه",
    course: "تدوین و موشن گرافیک",
    date: "۱ سال پیش",
    status: "استخدام رسانه‌ای",
    quote: (
      <>
        دورهٔ موشن رکاد فقط آموزش نرم‌افزار نبود —{" "}
        <span className="hl">اصول انیمیشن و ریتم بصری</span> را هم یاد
        گرفتم. ماه پنجم نمونه‌کارم را برای ورزش سه فرستادم و یک ماه بعد
        قرارداد کار تمام‌وقت گرفتم.
      </>
    ),
  },
  {
    name: "فاطمه نوروزی",
    role: "دانشجوی ارشد MBA",
    course: "مسیر حرفه‌ای زبان و مدیریت",
    date: "۴ ماه پیش",
    status: "پذیرش دانشگاه معتبر",
    quote: (
      <>
        من می‌خواستم برای MBA در دانشگاه‌های معتبر اپلای کنم ولی سطح انگلیسی
        و دانش مدیریتی‌ام کافی نبود. رکاد{" "}
        <span className="hl">هر دو را با هم به من داد</span> — امسال با معدل
        زبان قابل قبول در یک دانشگاه رتبه‌بندی‌شدهٔ ایران پذیرفته شدم.
      </>
    ),
  },
];

const total = testimonials.length;
const visible = 2;
const gap = 24;
const maxIndex = Math.max(0, total - visible);
const dotCount = total - visible + 1;

/* Persian digits helper */
const FA = "۰۱۲۳۴۵۶۷۸۹";
const toFa = (n) => String(n).replace(/\d/g, (d) => FA[d]);
const pad2Fa = (n) => toFa(String(n).padStart(2, "0"));

/* Star SVG */
function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

/* Chevron SVG (+ in RTL, prev = right-chevron, next = left-chevron) */
function Chevron({ right = false }) {
  const d = right ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6";
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/* ---------- Component ---------- */
export default function Comments() {
  const [idx, setIdx] = useState(0);
  const [cardW, setCardW] = useState(0);
  const carRef = useRef(null);
  const timerRef = useRef(null);

  /* Measure card width */
  useEffect(() => {
    const measure = () => {
      if (carRef.current) {
        const cs = window.getComputedStyle(carRef.current);
        const padX = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
        const avail = carRef.current.clientWidth - padX;
        const w = (avail - (visible - 1) * gap) / visible;
        setCardW(Math.max(w, 100));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* Autoplay 3500ms */
  useEffect(() => {
    const start = () => {
      timerRef.current = setInterval(() => {
        setIdx((i) => (i >= maxIndex ? 0 : i + 1));
      }, 3500);
    };
    start();
    const el = carRef.current;
    el?.addEventListener("mouseenter", () => clearInterval(timerRef.current));
    el?.addEventListener("mouseleave", start);
    return () => {
      clearInterval(timerRef.current);
      el?.removeEventListener("mouseenter", () => clearInterval(timerRef.current));
      el?.removeEventListener("mouseleave", start);
    };
  }, [maxIndex]);

  const shift = idx * (cardW + gap);

  const goTo = (i) => setIdx(Math.max(0, Math.min(i, maxIndex)));
  const prev = () => goTo(idx - 1);
  const next = () => goTo(idx + 1);

  return (
    <section className="section cmt3-section" id="comments">
      <PatternBackground opacity={40} />

      <div className="container section-inner">
        {/* Section heading */}
        <div className="sec-head" style={{ marginBottom: 44, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 760 }}>
            <span className="cmt3-eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--white)", border: "2px solid var(--ink)", padding: "5px 14px", borderRadius: 10, fontWeight: 900, fontSize: 12, color: "var(--college-darker)", boxShadow: "3px 3px 0 var(--college)", transform: "rotate(-2deg)", marginBottom: 16 }}>
              <span style={{ color: "var(--college)", fontSize: 14, marginLeft: 8 }}>✦</span>
              قصهٔ هنرجوها
            </span>
            <h2 style={{ margin: "0 0 10px", fontSize: 44, fontWeight: 900, lineHeight: 1.2, color: "var(--ink)", letterSpacing: "-.5px" }}>
              <span style={{ display: "inline-block", marginLeft: 6, transform: "rotate(-1.5deg)" }}>از صفر</span>
              <span style={{ display: "inline-block", marginLeft: 6, transform: "rotate(1.5deg)", color: "var(--college)" }}>تا</span>
              <span style={{ display: "inline-block", marginLeft: 6, transform: "rotate(-1deg)" }}>اولین قرارداد</span>
            </h2>
            <p style={{ margin: 0, color: "var(--ink-subtle)", fontWeight: 600, lineHeight: 1.9, fontSize: 16 }}>
              هر کارت یک روایت واقعی است — از هنرجویی که سه سال پیش هیچ
              پیش‌زمینه‌ای نداشت تا هنرجویی که امروز مدرس شده.
            </p>
          </div>
          <div className="cmt3-counter">
            <span className="cur">{pad2Fa(idx + 1)}</span>
            <span>از</span>
            <span>{pad2Fa(total)}</span>
          </div>
        </div>

        {/* Carousel */}
        <div className="cmt3-carousel" ref={carRef}>
          <div
            className="cmt3-track"
            style={{ transform: `translateX(${shift}px)` }}
          >
            {testimonials.map((t, i) => (
              <article className="cmt3-card" key={t.name}>
                <div className="shadow" />
                <div className="body">
                  <div className="avatar-side">
                    <div className="avatar-big">{t.name.charAt(0)}</div>
                    <p className="name-white">{t.name}</p>
                    <p className="role-white">{t.role}</p>
                    <div className="cmt3-stars">
                      {Array.from({ length: 5 }, (_, s) => (
                        <StarIcon key={s} />
                      ))}
                    </div>
                  </div>
                  <div className="content-side">
                    <div className="head-row">
                      <span className="course-chip">{t.course}</span>
                      <span className="date">{t.date}</span>
                    </div>
                    <p className="quote-text">{t.quote}</p>
                    <div className="foot-row">
                      <span className="status">
                        <span className="pulse" />
                        {t.status}
                      </span>
                      <span>هنرجوی رکاد</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Nav row */}
        <div className="cmt3-nav">
          <div className="cmt3-dots">
            {Array.from({ length: dotCount }, (_, i) => (
              <button
                key={i}
                className={`cmt3-dot${i === idx ? " active" : ""}`}
                aria-label={`اسلاید ${i + 1}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <div className="cmt3-nav-arrows">
            <button className="cmt3-icon-btn" onClick={prev} aria-label="قبلی">
              <Chevron right />
            </button>
            <button className="cmt3-icon-btn college" onClick={next} aria-label="بعدی">
              <Chevron />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}