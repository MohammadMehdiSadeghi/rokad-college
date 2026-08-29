import { useState, useRef, useEffect } from "react";
import { faqs, faqCta } from "@/data/content.js";
import RotatedHeading from "@/components/RotatedHeading.jsx";

function FaqItem({ item, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className="faq-item"
      style={{
        background: isOpen ? "var(--college)" : "var(--white)",
        border: "2.75px solid var(--ink)",
        borderRadius: "0 20px 0 20px",
        overflow: "hidden",
        transition: "background 0.3s ease, box-shadow 0.3s ease",
        boxShadow: isOpen
          ? "0 8px 32px rgba(248, 164, 29, 0.25)"
          : "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* Question button */}
      <button
        onClick={onToggle}
        className="faq-question"
        aria-expanded={isOpen}
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-4)",
          textAlign: "right",
          padding: "var(--space-5) var(--space-6)",
          color: isOpen ? "#fff" : "var(--ink)",
          fontSize: 16,
          fontWeight: 800,
          lineHeight: 1.5,
          cursor: "pointer",
          background: "none",
          border: "none",
          fontFamily: "inherit",
        }}
      >
        <span style={{ flex: 1 }}>{item.q}</span>
        {/* Plus/Minus icon */}
        <span
          className="faq-icon"
          aria-hidden="true"
          style={{
            width: 36,
            height: 36,
            flexShrink: 0,
            display: "grid",
            placeItems: "center",
            background: isOpen ? "rgba(255,255,255,0.2)" : "var(--college-light)",
            color: isOpen ? "#fff" : "var(--college-dark)",
            border: `2px solid ${isOpen ? "rgba(255,255,255,0.3)" : "var(--college)"}`,
            borderRadius: "0 12px 0 12px",
            fontSize: 20,
            fontWeight: 700,
            lineHeight: 1,
            transition: "all 0.3s ease",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>

      {/* Answer content — smooth height animation */}
      <div
        ref={contentRef}
        className="faq-content"
        style={{
          height: height,
          transition: "height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "0 var(--space-6) var(--space-5)",
            color: isOpen ? "rgba(255,255,255,0.95)" : "var(--ink-subtle)",
            fontSize: 15,
            lineHeight: 1.9,
            fontWeight: 500,
            borderTop: isOpen ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(0,0,0,0.06)",
            paddingTop: "var(--space-4)",
          }}
        >
          {item.a}
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(null);

  return (
    <section className="section" id="faq" style={{ background: "var(--white)" }}>
      <div className="container section-inner">
        {/* Section header */}
        <div
          className="text-center"
          style={{ marginBottom: "var(--space-12)", maxWidth: 760, marginInline: "auto" }}
        >
          <span className="tag tag-amber" style={{ marginBottom: "var(--space-4)", display: "inline-block" }}>
            سوالات متداول
          </span>
          <RotatedHeading
            words="پرسش‌هایی که قبل از شروع داری"
            className="t-section"
            color="var(--navy)"
          />
        </div>

        {/* FAQ items */}
        <div
          className="mx-auto"
          style={{ maxWidth: 820, display: "flex", flexDirection: "column", gap: "var(--space-3)" }}
        >
          {faqs.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center" style={{ marginTop: "var(--space-10)" }}>
          <a href="#consult" className="btn btn-amber" style={{ padding: "14px 32px", fontSize: 16 }}>
            {faqCta}
          </a>
        </div>
      </div>
    </section>
  );
}
