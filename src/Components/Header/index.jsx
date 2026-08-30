import { useState } from "react";
import Logo from "../Logo.jsx";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header" id="top">
      <div className="container nav">
        {/* Logo — right side (RTL) */}
        <Logo />

        {/* Desktop nav — hidden on mobile */}
        <nav className="nav-links">
          <a href="#promo" onClick={() => setMobileOpen(false)}>چرا رکاد</a>
          <a href="#features" onClick={() => setMobileOpen(false)}>ویژگی‌ها</a>
          <a href="#courses" onClick={() => setMobileOpen(false)}>دوره‌ها</a>
          <a href="#faq" onClick={() => setMobileOpen(false)}>سوالات</a>
          <a href="#comments" onClick={() => setMobileOpen(false)}>نظرات</a>
          <a href="#blog" onClick={() => setMobileOpen(false)}>وبلاگ</a>
        </nav>

        {/* Desktop CTA — hidden on mobile */}
        <a href="#consult" className="btn btn-sm btn-ghost desktop-only">
          مشاوره رایگان
        </a>

        {/* Mobile hamburger — hidden on desktop */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="منو"
          aria-expanded={mobileOpen}
        >
          <span className={`hamburger ${mobileOpen ? "hamburger--open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div className={`mobile-dropdown ${mobileOpen ? "mobile-dropdown--open" : ""}`}>
        <nav className="mobile-dropdown-inner">
          <a href="#promo" onClick={() => setMobileOpen(false)}>چرا رکاد</a>
          <a href="#features" onClick={() => setMobileOpen(false)}>ویژگی‌ها</a>
          <a href="#courses" onClick={() => setMobileOpen(false)}>دوره‌ها</a>
          <a href="#faq" onClick={() => setMobileOpen(false)}>سوالات</a>
          <a href="#comments" onClick={() => setMobileOpen(false)}>نظرات</a>
          <a href="#blog" onClick={() => setMobileOpen(false)}>وبلاگ</a>
          <a href="#consult" onClick={() => setMobileOpen(false)} className="btn btn-sm btn-ghost" style={{ marginTop: "8px", width: "100%", justifyContent: "center" }}>
            مشاوره رایگان
          </a>
        </nav>
      </div>
    </header>
  );
}
