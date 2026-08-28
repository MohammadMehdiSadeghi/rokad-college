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
        <div
          className="relative overflow-hidden"
          style={{
            background: "var(--teal)",
            borderRadius: "var(--r-xl)",
            minHeight: 460,
            boxShadow: "0 1.25rem 3.75rem -1.25rem rgba(33,41,90,0.25)",
          }}
        >
          {/* pattern inside card */}
          <img src={pattern} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.22 }} />
          {/* character */}
          <img
            src={character}
            alt="منتور رکاد"
            className="absolute bottom-0 left-0 h-[92%] w-auto select-none pointer-events-none"
            style={{ maxWidth: "none", zIndex: 1 }}
          />

          {/* headline — word by word rotated */}
          <div className="absolute right-[4%] top-[8%] w-[62%] z-20">
            <div className="headline" style={{ justifyContent: "flex-end" }}>
              {headlineWords.map((w, i) => (
                <span key={i} className="word t-hero" style={{ color: "#fff", transform: `rotate(${w.deg}deg)`, fontWeight: 950 }}>
                  {w.text}
                </span>
              ))}
            </div>
            <p className="t-body" style={{ color: "#fff", opacity: 0.92, marginTop: 18, maxWidth: "34ch", fontWeight: 600 }}>
              {hero.text}
            </p>
          </div>

          {/* buttons */}
          <div className="absolute right-[4%] bottom-[6%] z-20 flex flex-wrap gap-4">
            <BrandButton href="#courses" variant="white" rotate="rotate-plus">
              {hero.primaryCta}
            </BrandButton>
            <BrandButton href="#consult" variant="navy" rotate="rotate-minus">
              {hero.secondaryCta}
            </BrandButton>
          </div>

          {/* trust ribbon */}
          <div className="absolute bottom-[3%] left-[3%] w-[50%] max-w-[360px] z-10">
            <div className="absolute" style={{ top: 5, left: 5, width: "100%", height: "100%", background: "var(--gold)", borderRadius: "0 0 22px 0" }} />
            <div className="relative" style={{ background: "#E9F6F4", borderRadius: "0 0 22px 0", border: "2px solid var(--ink)", padding: "12px 18px", overflow: "hidden" }}>
              <p className="t-label" style={{ color: "var(--navy)", fontWeight: 900 }}>{hero.caption}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
