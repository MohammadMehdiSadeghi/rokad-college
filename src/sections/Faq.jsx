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
                className="relative animate-fade-in-up"
                style={{
                  background: isOpen ? "linear-gradient(135deg, var(--college) 0%, var(--college-dark) 100%)" : "#fff",
                  border: "2.75px solid var(--ink)",
                  borderRadius: isOpen ? "0 24px 0 24px" : "0 18px 0 18px",
                  padding: isOpen ? "var(--space-5) var(--space-6)" : "var(--space-4) var(--space-6)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: isOpen ? "translateY(-3px)" : "none",
                  boxShadow: isOpen ? "0 12px 40px rgba(248, 164, 29, 0.3)" : "var(--shadow-xs)",
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
                      borderRadius: isOpen ? "0 14px 0 14px" : "0 10px 0 10px",
                      fontSize: 20,
                      lineHeight: 1,
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p
                    className="t-sm animate-slide-down"
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
            <BrandButton href="#consult" variant="amber" rotate="rotate-2">
              {faqCta}
            </BrandButton>
          </div>
        </div>
      </div>
    </section>
  );
}
