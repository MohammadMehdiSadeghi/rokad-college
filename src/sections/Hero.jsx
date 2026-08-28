import { hero } from "../data/content.js";
import BrandButton from "../components/BrandButton.jsx";

const pattern = "/assets/Hero/Hero-Pattern.png";

// word-by-word gentle alternating rotation for the long headline
const headlineWords = hero.title.split(" ").map((t, i) => ({
  text: t,
  deg: i % 2 === 0 ? (i % 4 === 0 ? 2 : -2) : i % 3 === 0 ? 3 : -1,
}));

export default function Hero() {
  return (
    <section className="section" id="hero" style={{ paddingTop: "var(--space-8)" }}>
      <div className="bg-pattern">
        <img src={pattern} alt="" aria-hidden="true" />
      </div>
      <div className="container section-inner">
        {/* Hero card — college amber primary */}
        <div
          className="relative overflow-hidden animate-fade-in-up"
          style={{
            background: "linear-gradient(135deg, var(--college) 0%, var(--college-dark) 100%)",
            borderRadius: "var(--r-2xl)",
            minHeight: 480,
            boxShadow: "0 1.25rem 3.75rem -1.25rem rgba(186,123,22,0.35)",
          }}
        >
          {/* pattern overlay inside card */}
          <img
            src={pattern}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.18 }}
          />

          {/* decorative shapes */}
          <div
            className="absolute animate-float"
            style={{
              top: "15%",
              left: "8%",
              width: 80,
              height: 80,
              borderRadius: "20px 0 20px 0",
              background: "rgba(255,255,255,0.1)",
              transform: "rotate(15deg)",
            }}
          />
          <div
            className="absolute animate-float delay-2"
            style={{
              bottom: "20%",
              left: "15%",
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
            }}
          />

          {/* headline — word by word rotated, right-aligned for RTL */}
          <div className="absolute right-[4%] top-[10%] w-[62%] z-20">
            <div className="headline" style={{ justifyContent: "flex-end", marginBottom: 24 }}>
              {headlineWords.map((w, i) => (
                <span
                  key={i}
                  className="word t-hero"
                  style={{
                    color: "#fff",
                    transform: `rotate(${w.deg}deg)`,
                    fontWeight: 950,
                    display: "inline-block",
                  }}
                >
                  {w.text}
                </span>
              ))}
            </div>
            <p
              className="t-body"
              style={{
                color: "rgba(255,255,255,0.93)",
                marginTop: 0,
                maxWidth: "38ch",
                fontWeight: 600,
                lineHeight: 1.75,
              }}
            >
              {hero.text}
            </p>
          </div>

          {/* buttons */}
          <div className="absolute right-[4%] bottom-[12%] z-20 flex flex-wrap gap-4">
            <BrandButton href="#courses" variant="white" rotate="rotate-plus">
              {hero.primaryCta}
            </BrandButton>
            <BrandButton href="#consult" variant="navy" rotate="rotate-minus">
              {hero.secondaryCta}
            </BrandButton>
          </div>

          {/* trust ribbon — amber accent, positioned bottom-right */}
          <div className="absolute bottom-[4%] right-[2%] z-10 animate-scale-in delay-3">
            {/* back layer */}
            <div
              className="absolute"
              style={{
                top: 5,
                left: 5,
                width: "100%",
                height: "100%",
                background: "var(--college-dark)",
                borderRadius: "0 0 24px 0",
              }}
            />
            {/* front layer */}
            <div
              className="relative"
              style={{
                background: "var(--college-light)",
                borderRadius: "0 0 24px 0",
                border: "2px solid var(--ink)",
                padding: "10px 16px",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              <p
                className="t-label"
                style={{ color: "var(--college-dark)", fontWeight: 900 }}
              >
                {hero.caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
