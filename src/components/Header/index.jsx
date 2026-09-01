import { useState } from "react";
import Logo from "../Logo.jsx";

// Rotations for menu links (sticker feel)
const ROTS = [-1, 0.5, -0.5, 1, -1, 0.5];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { t: "چرا رکاد", href: "#promo" },
    { t: "ویژگی‌ها", href: "#features" },
    { t: "دوره‌ها", href: "#courses" },
    { t: "سوالات", href: "#faq" },
    { t: "نظرات", href: "#comments" },
    { t: "وبلاگ", href: "#blog" },
  ];

  return (
    <>
      <header className="site-header" id="top">
        <div className="container nav">
          {/* Logo — right side (RTL) */}
          <Logo />

          {/* Desktop nav — hidden on mobile */}
          <nav className="nav-links">
            <a href="#promo">چرا رکاد</a>
            <a href="#features">ویژگی‌ها</a>
            <a href="#courses">دوره‌ها</a>
            <a href="#faq">سوالات</a>
            <a href="#comments">نظرات</a>
            <a href="#blog">وبلاگ</a>
          </nav>

          {/* Desktop CTA — hidden on mobile */}
          <a href="#consult" className="btn btn-sm btn-ghost desktop-only">
            مشاوره رایگان
          </a>

          {/* Mobile hamburger v1 — classic 3 lines → X */}
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
      </header>

      {/* Mobile fullscreen amber overlay — hamburger v1 (PanelFull) */}
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
                onClick={() => setMobileOpen(false)}
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
            مشاوره رایگان
          </a>
        </div>
      </div>
    </>
  );
}
