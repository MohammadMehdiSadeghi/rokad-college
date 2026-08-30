import OffsetCard from "@/Components/OffsetCard.jsx";
import RotatedHeading from "@/Components/RotatedHeading.jsx";
import { QuoteIcon } from "@/Components/Icons";
import { comments } from "@/data/content.js";

const themes = [
  { theme: "var(--college)", rot: "rotate-minus2", radius: "cut-tl-br" },
  { theme: "var(--teal)",    rot: "rotate-1",      radius: "cut-tr-bl" },
  { theme: "var(--navy)",    rot: "rotate-minus1", radius: "cut-tl-br" },
];

function initial(name) { return (name || "؟").trim().charAt(0); }

const headingWords = [
  { text: "تجربهٔ", deg: -1.5 },
  { text: "کسانی که با", deg: 2 },
  { text: "رُکاد", deg: -3 },
  { text: "شروع کردند", deg: 1.5 },
];

export default function Testimonials() {
  return (
    <section className="section" id="comments" style={{ background: "var(--bg-neutral)" }}>
      <div className="container section-inner">
        <div className="section-head">
          <span className="eyebrow-tag">صدای هنرجوها</span>
          <RotatedHeading words={headingWords} className="t-section" />
          <p className="section-sub" style={{ maxWidth: 560 }}>{comments.text}</p>
        </div>

        <div className="grid-3">
          {comments.items.slice(0, 3).map((c, i) => {
            const t = themes[i % themes.length];
            return (
              <OffsetCard
                key={c.name}
                backColor={t.theme}
                borderColor={t.theme}
                radius={t.radius}
                rotate={t.rot}
                className="animate-fade-in-up"
              >
                <div className="testimonial-inner" style={{ "--theme": t.theme }}>
                  <span className="testimonial-quote"><QuoteIcon /></span>
                  <p className="testimonial-text">{c.text}</p>
                  <footer className="testimonial-footer">
                    <span className="testimonial-avatar">{initial(c.name)}</span>
                    <span><b>{c.name}</b><small>{c.role}</small></span>
                    <strong>{String(i + 1).padStart(2, "0")}</strong>
                  </footer>
                </div>
              </OffsetCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}