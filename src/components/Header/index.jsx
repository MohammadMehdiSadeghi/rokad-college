import { useState } from "react";
import Logo from "../Logo.jsx";

// Rotations for menu links (sticker feel)
const ROTS = [-1, 0.5, -0.5, 1, -1, 0.5];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState(0);

  const links = [
    { t: "صفحهٔ اصلی", href: "#top" },
    { t: "ویژگی‌ها", href: "#features" },
    { t: "دوره‌ها", href: "#courses" },
    { t: "اساتید", href: "#about" },
    { t: "مجله", href: "#blog" },
    { t: "تماس با ما", href: "#consult" },
  ];

  return (
    <>
      <header className="site-header" id="top">
        <div className="v1-header">
          <div className="pill">
            {/* Logo — right side (RTL) */}
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

            {/* Actions — search + login + CTA */}
            <div className="actions">
              <button className="ibtn" aria-label="جستجو">
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
              <a href="#consult" className="cta-pill">
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
          </div>
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
