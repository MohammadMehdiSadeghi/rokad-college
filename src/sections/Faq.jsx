import { useState } from "react";
import { faqs, faqCta } from "../data/content.js";
import BrandButton from "../components/BrandButton.jsx";
import RotatedHeading from "../components/RotatedHeading.jsx";

export default function Faq() {
  const [open, setOpen] = useState(null);

  return (
    <section className="section" id="faq" style={{ background: "var(--white)" }}>
      <div className="bg-pattern">
        <img src="/assets/Shared/Patterns/Ecosystem-Pattern.png" alt="" aria-hidden="true" />
      </div>
      <div className="container section-inner">
        <div className="text-center" style={{ marginBottom: "var(--space-12)", maxWidth: 760, marginInline: "auto" }}>
          <span className="tag tag-amber" style={{ marginBottom: "var(--space-6)" }}>سوالات متداول</span>
          <RotatedHeading words="پرسش‌هایی که قبل از شروع داری" className="t-section" color="var(--navy)" />
        </div>
        <div className="mx-auto" style={{ maxWidth: 820, display: "grid", gap: "var(--space-4)" }}>
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="relative"
                style={{
                  background: isOpen ? "var(--college)" : "#fff",
                  border: "2.75px solid var(--ink)",
                  borderRadius: "0 22px 0 22px",
                  padding: isOpen ? "var(--space-5) var(--space-6)" : "var(--space-4) var(--space-6)",
                  transition: "background 0.25s ease",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "var(--space-4)",
                    textAlign: "right",
                    padding: "var(--space-2) 0",
                    color: isOpen ? "#fff" : "var(--ink)",
                    fontSize: 16,
                    fontWeight: 900,
                  }}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span
                    aria-hidden="true"
                    style={{
                      width: 38,
                      height: 38,
                      flexShrink: 0,
                      display: "grid",
                      placeItems: "center",
                      background: isOpen ? "rgba(255,255,255,0.25)" : "var(--ink-faq)",
                      color: "#fff",
                      border: "2px solid var(--ink)",
                      borderRadius: "0 14px 0 14px",
                      fontSize: 20,
                      lineHeight: 1,
                      transition: "transform 0.25s ease, background 0.25s ease",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p
                    className="t-sm"
                    style={{
                      paddingTop: "var(--space-4)",
                      lineHeight: 1.9,
                      color: "rgba(255,255,255,0.95)",
                      borderTop: "1.5px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
          <div className="text-center" style={{ marginTop: "var(--space-8)" }}>
            <BrandButton href="#consult" variant="amber" rotate="rotate-3">
              {faqCta}
            </BrandButton>
          </div>
        </div>
      </div>
    </section>
  );
}
