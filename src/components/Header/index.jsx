import { useState, useEffect } from "react";
import Logo from "../Logo.jsx";

/* Section IDs that match nav links */
const sectionIds = ["promo", "features", "courses", "faq", "comments", "blog"];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  /* Section spy — scroll-based (reliable for all sections, including bottom ones) */
  useEffect(() => {
    const SPY_OFFSET = 110; // header height + some padding

    const handleScroll = () => {
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        // getBoundingClientRect gives position relative to viewport
        if (el.getBoundingClientRect().top <= SPY_OFFSET) {
          current = id;
        }
      }

      setActive(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMobileOpen(false);

  const navLinkClass = (id) => `nav-link${active === id ? " nav-link--active" : ""}`;

  return (
    <header className="site-header" id="top">
      <div className="container nav">
        <Logo />

        <nav className="nav-links">
          <a href="#promo" className={navLinkClass("promo")} onClick={closeMenu}>چرا رکاد</a>
          <a href="#features" className={navLinkClass("features")} onClick={closeMenu}>ویژگی‌ها</a>
          <a href="#courses" className={navLinkClass("courses")} onClick={closeMenu}>دوره‌ها</a>
          <a href="#faq" className={navLinkClass("faq")} onClick={closeMenu}>سوالات</a>
          <a href="#comments" className={navLinkClass("comments")} onClick={closeMenu}>نظرات</a>
          <a href="#blog" className={navLinkClass("blog")} onClick={closeMenu}>وبلاگ</a>
        </nav>

        <a href="#consult" className="btn btn-sm btn-ghost desktop-only">
          مشاوره رایگان
        </a>

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

      <div className={`mobile-dropdown ${mobileOpen ? "mobile-dropdown--open" : ""}`}>
        <nav className="mobile-dropdown-inner">
          <a href="#promo" className={active === "promo" ? "mobile-link--active" : ""} onClick={closeMenu}>چرا رکاد</a>
          <a href="#features" className={active === "features" ? "mobile-link--active" : ""} onClick={closeMenu}>ویژگی‌ها</a>
          <a href="#courses" className={active === "courses" ? "mobile-link--active" : ""} onClick={closeMenu}>دوره‌ها</a>
          <a href="#faq" className={active === "faq" ? "mobile-link--active" : ""} onClick={closeMenu}>سوالات</a>
          <a href="#comments" className={active === "comments" ? "mobile-link--active" : ""} onClick={closeMenu}>نظرات</a>
          <a href="#blog" className={active === "blog" ? "mobile-link--active" : ""} onClick={closeMenu}>وبلاگ</a>
          <a href="#consult" onClick={closeMenu} className="btn btn-sm btn-ghost" style={{ marginTop: "8px", width: "100%", justifyContent: "center" }}>
            مشاوره رایگان
          </a>
        </nav>
      </div>
    </header>
  );
}
