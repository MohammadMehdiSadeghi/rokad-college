import { useState } from "react";

/* ---------- Data (from the V5 design) ---------- */
const departments = [
  { label: "فناوری اطلاعات", href: "#courses" },
  { label: "گرافیک", href: "#courses" },
  { label: "زبان و MBA", href: "#courses" },
  { label: "دیجیتال مارکتینگ", href: "#courses" },
];

const quickLinks = [
  { label: "دربارهٔ ما", href: "#about" },
  { label: "اساتید", href: "#features" },
  { label: "وبلاگ", href: "#blog" },
  { label: "پرسش‌های متداول", href: "#faq" },
];

const contacts = [
  { label: "۰۲۱-۹۱۰۰۰۰۰۰", href: "tel:02191000000" },
  { label: "info@rokad.college", href: "mailto:info@rokad.college" },
  { label: "تهران، ولیعصر", href: "#" },
];

/* ---------- Social icons (inline SVG, from design) ---------- */
const socialIcons = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.9 4.2 18.6 20c-.3 1.1-.9 1.4-1.9.9l-5.1-3.8-2.5 2.4c-.3.3-.5.5-1 .5l.4-5.2 9.5-8.6c.4-.4-.1-.6-.6-.2L5.6 12.4 1.2 11c-1-.3-1-1 .2-1.5L20.5 2.6c.8-.3 1.6.2 1.4 1.6z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.4 3H3.6C3.3 3 3 3.3 3 3.6v16.8c0 .3.3.6.6.6h16.8c.3 0 .6-.3.6-.6V3.6c0-.3-.3-.6-.6-.6zM8.3 18.3H5.6V9.7h2.7v8.6zM7 8.5A1.6 1.6 0 1 1 7 5.3a1.6 1.6 0 0 1 0 3.2zm11.3 9.8h-2.6v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1-1.6 2.2v4.3H10V9.7h2.6v1.2c.4-.7 1.3-1.4 2.6-1.4 2.8 0 3.3 1.8 3.3 4.2v4.6z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23 7.5s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C16.6 4 12 4 12 4s-4.6 0-7.8.2c-.5.1-1.5.1-2.3 1-.7.7-.9 2.3-.9 2.3S.8 9.4.8 11.3v1.9c0 1.9.2 3.7.2 3.7s.2 1.6.9 2.3c.9.9 2.1.9 2.6 1 1.9.2 8 .2 8 .2s4.6 0 7.8-.2c.5-.1 1.5-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.7v-1.9c0-1.9-.2-3.8-.2-3.8zM9.8 15.4V8.2l5.9 3.6-5.9 3.6z" />
    </svg>
  ),
};

const socials = [
  { name: "instagram", label: "اینستاگرام", href: "#" },
  { name: "telegram", label: "تلگرام", href: "#" },
  { name: "linkedin", label: "لینکدین", href: "#" },
  { name: "youtube", label: "یوتیوب", href: "#" },
];

/* ---------- Persian (Jalali) year + digits ---------- */
function getJalaliYear() {
  const now = new Date();
  const gYear = now.getFullYear();
  const gMonth = now.getMonth() + 1; // 1–12
  const jYear = gYear - (gMonth > 2 ? 621 : 622);
  return jYear;
}

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
function toFa(num) {
  return String(num).replace(/\d/g, (d) => FA_DIGITS[d]);
}

/* ---------- Component ---------- */
export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const year = getJalaliYear();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="footer-v5" id="consult">
      {/* ---------- Newsletter ---------- */}
      <div className="f5-newsletter">
        <div className="f5-eyebrow">نزدیک‌تر بمون</div>
        <h3>
          <span className="word">آینده</span>
          <span className="word hi">از اینجا</span>
          <span className="word">شروع می‌شه.</span>
        </h3>
        <p className="f5-desc">
          عضو خبرنامهٔ رکاد‌کالج شو تا از دوره‌های جدید، تخفیف‌های ویژه و
          رویدادهای هنرجویی زودتر از همه با خبر بشی.
        </p>
        <form className="f5-form" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="ایمیلت رو وارد کن..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">عضویت رایگان</button>
        </form>
        {submitted ? (
          <div className="f5-foot-note success">عضویتت ثبت شد! به‌زودی خبرهای رکاد‌کالج رو می‌فرستیم. 🎉</div>
        ) : (
          <div className="f5-foot-note">هیچ اسپمی نمی‌فرستیم. هر زمان بخوای می‌تونی لغو کنی.</div>
        )}
      </div>

      {/* ---------- Columns ---------- */}
      <div className="f5-grid">
        {/* Brand */}
        <div className="f5-col f5-brand">
          <div className="f5-logo">
            <span className="f5-logo-mark">
              <img
                src="/assets/Shared/Logos/logo-white-512.png"
                alt=""
                aria-hidden="true"
              />
            </span>
            رکاد <span className="f5-badge">کالج</span>
          </div>
          <p>اولین هنرستان استارتاپی ایران. یاد بگیر، تجربه کن، مهارت بساز.</p>
        </div>

        {/* Departments */}
        <div className="f5-col">
          <h5>دپارتمان‌ها</h5>
          <ul>
            {departments.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick access */}
        <div className="f5-col">
          <h5>دسترسی سریع</h5>
          <ul>
            {quickLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="f5-col">
          <h5>تماس</h5>
          <ul>
            {contacts.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---------- Bottom bar ---------- */}
      <div className="f5-bottom">
        <div className="f5-copy">
          © {toFa(year)} <strong>رکاد‌کالج</strong> — طراحی شده با عشق.
        </div>
        <div className="f5-socs">
          {socials.map((s) => (
            <a key={s.name} className="f5-soc" href={s.href} aria-label={s.label}>
              {socialIcons[s.name]}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
