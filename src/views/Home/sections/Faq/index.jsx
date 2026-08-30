import { useState } from "react";
import { faqs, faqCta } from "@/data/content.js";
import { PlusIcon, ChevronDownIcon } from "@/Components/Icons";

const faqPattern = "/assets/Shared/Patterns/Ecosystem-Pattern.png";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section
      className="section relative overflow-hidden"
      style={{ background: "var(--teal-light)", paddingBlock: "var(--space-16)" }}
      id="faq"
    >
      {/* Pattern overlay */}
      <div
        className="bg-pattern absolute inset-0 pointer-events-none z-0"
        style={{ opacity: 0.5 }}
      >
        <img
          src={faqPattern}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover scale-125 select-none"
          style={{ transform: "rotate(180deg)" }}
        />
      </div>

      <div className="container relative z-10" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "var(--space-8)" }}>
        {/* Title — centered on mobile, left on desktop */}
        <div
          className="text-center"
          style={{
            maxWidth: 640,
            marginInline: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span
            className="tag tag-teal"
            style={{ marginBottom: "var(--space-4)", display: "inline-block" }}
          >
            سوالات متداول
          </span>
          <h2
            className="t-section"
            style={{
              fontWeight: 950,
              fontSize: "clamp(28px, 5vw, 48px)",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              color: "var(--ink)",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "baseline",
              gap: "0.25rem 0.5rem",
            }}
          >
            <span className="headline" style={{ color: "var(--ink)", transform: "rotate(3deg)" }}>
              <span className="word">پرسش‌هایی</span>
            </span>
            <span className="headline" style={{ color: "var(--navy)", transform: "rotate(-3deg)" }}>
              <span className="word">که</span>
            </span>
            <span className="headline" style={{ color: "var(--ink)", transform: "rotate(3deg)" }}>
              <span className="word">قبل</span>
            </span>
            <span className="headline" style={{ color: "var(--accent)", transform: "rotate(-2deg)" }}>
              <span className="word">از</span>
            </span>
            <span className="headline" style={{ color: "var(--ink)", transform: "rotate(3deg)" }}>
              <span className="word">شروع</span>
            </span>
            <span className="headline" style={{ color: "var(--ink)", transform: "rotate(-3deg)" }}>
              <span className="word">دارید</span>
            </span>
            <span className="headline" style={{ color: "var(--ink)", transform: "rotate(3deg)" }}>
              <span className="word">؟</span>
            </span>
          </h2>
          <p
            className="t-body"
            style={{
              color: "var(--ink-subtle)",
              marginTop: "var(--space-4)",
              maxWidth: 560,
              lineHeight: 1.8,
              fontSize: 15,
            }}
          >
            انتخاب کالج یعنی انتخاب آینده. صادقانه و بدون تعارف به سوالات شما
            درباره‌ی دوره‌ها، مدرک و مسیر حرفه‌ای پاسخ می‌دیم.
          </p>
        </div>

        {/* FAQ items */}
        <div
          className="mx-auto"
          style={{
            maxWidth: 680,
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-3)",
          }}
        >
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="transition-transform duration-300"
                style={{ position: "relative" }}
              >
                {/* Ink shadow back layer */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: "5px",
                    left: "5px",
                    width: "100%",
                    height: "100%",
                    borderRadius: "0 var(--r-xl) 0 var(--r-xl)",
                    background: "var(--ink)",
                    pointerEvents: "none",
                  }}
                />
                {/* Main card */}
                <div
                  className={`transition-colors duration-300 ${isOpen ? "bg-teal" : "bg-white"}`}
                  style={{
                    position: "relative",
                    zIndex: 1,
                    borderRadius: "0 var(--r-xl) 0 var(--r-xl)",
                    border: "2.75px solid var(--ink)",
                    overflow: "hidden",
                    boxShadow: isOpen ? "var(--shadow-teal)" : "none",
                  }}
                >
                  {/* Question button */}
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "var(--space-4)",
                      padding: "var(--space-4) var(--space-6)",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "right",
                      fontFamily: "inherit",
                    }}
                  >
                    <span
                      className="font-extrabold"
                      style={{
                        flex: 1,
                        fontSize: "clamp(14px, 2.5vw, 18px)",
                        lineHeight: 1.6,
                        color: isOpen ? "var(--ink)" : "var(--ink)",
                      }}
                    >
                      {item.q}
                    </span>

                    {/* Icon button */}
                    <div style={{ position: "relative", flexShrink: 0, width: 36, height: 36 }}>
                      {/* Icon back layer */}
                      <div
                        aria-hidden
                        style={{
                          position: "absolute",
                          top: "2px",
                          left: "2px",
                          width: "100%",
                          height: "100%",
                          borderRadius: "0 16px 0 16px",
                          background: "var(--ink)",
                        }}
                      />
                      {/* Icon main */}
                      <div
                        className={`flex items-center justify-center transition-all duration-300 ${isOpen ? "rotate-180" : ""}`}
                        style={{
                          position: "relative",
                          zIndex: 1,
                          width: 36,
                          height: 36,
                          borderRadius: "0 16px 0 16px",
                          background: isOpen ? "var(--teal)" : "var(--ink-faq)",
                          border: `2px solid ${isOpen ? "var(--teal)" : "var(--ink)"}`,
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        {isOpen ? (
                          <ChevronDownIcon className="w-4 h-4" />
                        ) : (
                          <PlusIcon className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Answer — CSS grid animation */}
                  <div
                    className={`grid transition-all duration-500 ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                    style={{ perspective: 600 }}
                  >
                    <div className="overflow-hidden">
                      <p
                        className="font-medium"
                        style={{
                          padding: "0 var(--space-6) var(--space-5)",
                          fontSize: 14,
                          lineHeight: 1.9,
                          color: "var(--ink)",
                        }}
                      >
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className="text-center"
          style={{ marginTop: "var(--space-8)" }}
        >
          <a
            href="#consult"
            className="btn btn-amber"
            style={{
              padding: "14px 32px",
              fontSize: 16,
              fontWeight: 800,
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-2)",
            }}
          >
            {faqCta}
          </a>
        </div>
      </div>
    </section>
  );
}
