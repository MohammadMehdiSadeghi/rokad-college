import { hero } from "@/data/content.js";

const pattern = "/assets/Hero/Hero-Pattern.png";

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      <div className="container">
        <div className="hero-grid">
          {/* Right column — Text content (RTL) */}
          <div className="hero-content">
            {/* Pre-title badge */}
            <span className="hero-badge animate-fade-in-up">
              {hero.preTitle}
            </span>

            {/* Main headline */}
            <h1 className="hero-title animate-fade-in-up delay-1">
              {hero.title}
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle animate-fade-in-up delay-2">
              {hero.subtitle}
            </p>

            {/* Description */}
            <p className="hero-text animate-fade-in-up delay-3">
              {hero.text}
            </p>

            {/* CTA buttons */}
            <div className="hero-buttons animate-fade-in-up delay-4">
              <a href="#courses" className="btn btn-primary btn-hero">
                {hero.primaryCta}
              </a>
              <a href="#consult" className="btn btn-ghost btn-hero">
                {hero.secondaryCta} hjkjfhsdfhjksfhk
              </a>
            </div>

            {/* Stats row */}
            <div className="hero-stats animate-fade-in-up delay-5">
              {hero.stats.map((s, i) => (
                <div key={i} className="hero-stat">
                  <span className="hero-stat-num">{s.num}</span>
                  <span className="hero-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Left column — Visual (RTL: appears on left) */}
          <div className="hero-visual animate-fade-in-up delay-2">
            {/* Main card with pattern */}
            <div className="hero-card">
              <img
                src={pattern}
                alt=""
                aria-hidden="true"
                className="hero-card-pattern"
              />
              {/* Floating shapes */}
              <div className="hero-shape hero-shape-1" />
              <div className="hero-shape hero-shape-2" />
              <div className="hero-shape hero-shape-3" />
              {/* Badge */}
              <div className="hero-card-badge">
                <span className="hero-card-badge-icon">🎓</span>
                <span className="hero-card-badge-text">یادگیری مهارت‌محور</span>
              </div>
            </div>

            {/* Floating mini cards */}
            <div className="hero-mini-card hero-mini-1 animate-float">
              <span>🛠️</span>
              <span>پروژه واقعی</span>
            </div>
            <div className="hero-mini-card hero-mini-2 animate-float delay-3">
              <span>🚀</span>
              <span>ورود به بازار کار</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
