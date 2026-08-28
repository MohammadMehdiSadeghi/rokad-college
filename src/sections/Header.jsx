import { useState } from "react";
import Logo from "../components/Logo.jsx";
import BrandButton from "../components/BrandButton.jsx";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header" id="top">
      <div className="container nav">
        <Logo />
        <nav className={`nav-links ${mobileOpen ? "nav-links--open" : ""}`}>
          <a href="#promo" onClick={() => setMobileOpen(false)}>چرا رکاد</a>
          <a href="#features" onClick={() => setMobileOpen(false)}>ویژگی‌ها</a>
          <a href="#courses" onClick={() => setMobileOpen(false)}>دوره‌ها</a>
          <a href="#faq" onClick={() => setMobileOpen(false)}>سوالات</a>
          <a href="#comments" onClick={() => setMobileOpen(false)}>نظرات</a>
          <a href="#blog" onClick={() => setMobileOpen(false)}>وبلاگ</a>
        </nav>
        <div className="flex items-center gap-3">
          <BrandButton href="#consult" variant="amber" size="btn-sm" rotate="rotate-minus3">
            مشاوره رایگان
          </BrandButton>
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
      </div>
      {mobileOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileOpen(false)}>
          <nav className="mobile-nav" onClick={(e) => e.stopPropagation()}>
            <a href="#promo" onClick={() => setMobileOpen(false)}>چرا رکاد</a>
            <a href="#features" onClick={() => setMobileOpen(false)}>ویژگی‌ها</a>
            <a href="#courses" onClick={() => setMobileOpen(false)}>دوره‌ها</a>
            <a href="#faq" onClick={() => setMobileOpen(false)}>سوالات</a>
            <a href="#comments" onClick={() => setMobileOpen(false)}>نظرات</a>
            <a href="#blog" onClick={() => setMobileOpen(false)}>وبلاگ</a>
            <BrandButton href="#consult" variant="amber" size="btn-sm" rotate="rotate-minus3">
              مشاوره رایگان
            </BrandButton>
          </nav>
        </div>
      )}
    </header>
  );
}
