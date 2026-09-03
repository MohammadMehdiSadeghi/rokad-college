import { useState, useEffect, useRef } from "react";
import Logo from "../Logo.jsx";

// Rotations for menu links (sticker feel)
const ROTS = [-1, 0.5, -0.5, 1, -1, 0.5];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY > 80;
      if (s !== scrolled) setScrolled(s);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolled]);

  // Close search on Escape or click outside
  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setSearchOpen(false); };
    const onClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setSearchOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    if (searchInputRef.current) searchInputRef.current.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [searchOpen]);

  const links = [
    { t: "صفحهٔ اصلی", href: "#top" },
    { t: "ویژگی‌ها", href: "#features" },
    { t: "دوره‌ها", href: "#courses-index" },
    { t: "اساتید", href: "#about" },
    { t: "مجله", href: "#blog-index" },
    { t: "تماس با ما", href: "#consult" },
  ];

  return (
    <>
      <header
        className={"site-header" + (scrolled ? " scrolled" : "")}
        id="top"
      >
        <div className="v1-header">
          <div className="pill">
            {/* Logo */}
            <Logo />

            {/* Desktop nav — hidden on mobile */}
            <nav className="nav-links">
              {links.map((l, i) => (
                <a
                  key={i}
                  href={l.href}
                  className={"nav-link" + (active === i ? " active" : "")}
                  onClick={() => setActive(i)}
                >
                  {l.t}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="actions">
              {/* Search — opens panel */}
              <button
                className="ibtn"
                aria-label="جستجو"
                onClick={() => setSearchOpen(true)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </button>

              {/* Desktop-only: login + CTA */}
              <a href="#consult" className="login-pill desktop-only">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
                  <path d="M10 17l5-5-5-5" />
                  <path d="M15 12H3" />
                </svg>
                ورود
              </a>
              <a href="#consult" className="cta-pill desktop-only">
                مشاورهٔ رایگان
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </a>

              {/* Mobile hamburger v1 */}
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
          </div>
        </div>
      </header>

      {/* Search panel overlay */}
      <div className={`search-panel${searchOpen ? " search-panel--open" : ""}`} ref={searchRef}>
        <div className="search-panel-inner">
          <div className="search-panel-field">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="جست‌وجوی دوره‌ها، اساتید، مقالات..."
              className="search-panel-input"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearchOpen(false);
                }
              }}
            />
          </div>
          <button
            className="search-panel-close"
            onClick={() => setSearchOpen(false)}
            aria-label="بستن"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile fullscreen amber overlay */}
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
                onClick={() => {
                  setActive(i);
                  setMobileOpen(false);
                }}
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
            مشاورهٔ رایگان
          </a>
        </div>
      </div>
    </>
  );
}