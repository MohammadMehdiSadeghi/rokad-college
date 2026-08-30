import { useState } from "react";
import { BarsIcon, XMarkIcon } from "../Icons";

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#about-section", label: "درباره کالج" },
    { href: "#courses-section", label: "دوره‌ها" },
    { href: "#path-section", label: "مسیر یادگیری" },
    { href: "#testimonials-section", label: "تجربه هنرجوها" },
    { href: "#faq-section", label: "سوالات پرتکرار" },
  ];

  return (
    <header className="college-header">
      <nav className="college-navbar" aria-label="ناوبری اصلی">
        {/* Brand — right side (RTL) */}
        <a className="college-brand" href="#hero-section" aria-label="کالج رُکاد، صفحه اصلی">
          <span className="college-brand-mark" aria-hidden="true">ر</span>
          <span className="college-brand-copy">
            <b>کالج رُکاد</b>
            <small>آینده از اینجا شروع می‌شود</small>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="college-nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="college-nav-actions">
          <a className="college-nav-login" href="#consult-section">ورود هنرجو</a>
          <a className="college-nav-cta" href="#consult-section">مشاوره رایگان</a>
          <button
            className="college-nav-burger"
            onClick={() => setOpen(!open)}
            aria-label="باز کردن منو"
            aria-expanded={open}
            aria-controls="college-mobile-menu"
          >
            {open ? <XMarkIcon width="18" height="18" /> : <BarsIcon width="18" height="18" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`college-mobile-menu ${open ? "is-open" : ""}`} id="college-mobile-menu">
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
        <a href="#consult-section" onClick={() => setOpen(false)} className="college-mobile-cta">مشاوره رایگان</a>
      </div>
    </header>
  );
}
