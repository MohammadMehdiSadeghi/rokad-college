import { hero } from "../data/content.js";
import BrandButton from "../components/BrandButton.jsx";

const pattern = "/assets/Hero/Hero-Pattern.png";
const character = "/assets/Hero/hero-character.png";

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
          className="relative overflow-hidden"
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

          {/* character image — positioned bottom-left on desktop (RTL), bottom-right on mobile */}
          <img
            src={character}
            alt="منتور رکاد"
            className="absolute bottom-0 left-0 w-[48%] max-w-[340px] h-[94%] select-none pointer-events-none"
            style={{ maxWidth: "none", zIndex: 1 }}
          />

          {/* headline — word by word rotated */}
          <div className="absolute right-[4%] top-[10%] w-[62%] z-20">
            <div className="headline" style={{ justifyContent: "flex-end" }}>
              {headlineWords.map((w, i) => (
                <span
                  key={i}
                  className="word t-hero"
                  style={{
                    color: "#fff",
                    transform: `rotate(${w.deg}deg)`,
                    fontWeight: 950,
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
                marginTop: 20,
                maxWidth: "38ch",
                fontWeight: 600,
              }}
            >
              {hero.text}
            </p>
          </div>

          {/* buttons */}
          <div className="absolute right-[4%] bottom-[8%] z-20 flex flex-wrap gap-4">
            <BrandButton href="#courses" variant="white" rotate="rotate-plus">
              {hero.primaryCta}
            </BrandButton>
            <BrandButton href="#consult" variant="navy" rotate="rotate-minus">
              {hero.secondaryCta}
            </BrandButton>
          </div>

          {/* trust ribbon — amber accent, positioned bottom-right */}
          <div className="absolute bottom-[4%] right-[2%] w-[48%] max-w-[340px] z-10">
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
              }}
            >
              <p
                className="t-label"
                style={{ color: "var(--college-dark)", fontWeight: 900, whiteSpace: "nowrap" }}
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
