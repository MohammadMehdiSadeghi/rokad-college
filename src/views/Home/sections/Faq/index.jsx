import { useState } from "react";
import { faqs } from "@/data/content.js";
import { ArrowIcon, ChevronDownIcon, HeadsetIcon } from "@/Components/Icons";

export default function Faq() {
  const [openId, setOpenId] = useState("0");

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-layout">
        {/* Left: Consultation CTA card */}
        <aside className="consult-card" id="consult-section">
          <div className="consult-card-inner">
            <span className="consult-icon">
              <HeadsetIcon width={28} height={28} />
            </span>
            <h2>نمی‌دونی کدوم مسیر برای تو مناسبه؟</h2>
            <p>مشاورهای کالج رکاد برای انتخاب مسیر مناسب کنارت هستند.</p>
            <a href="#consult" className="consult-btn">
              درخواست مشاوره <ArrowIcon width={16} height={16} />
            </a>
          </div>
        </aside>

        {/* Right: FAQ content */}
        <div className="faq-content">
          <header className="section-head align-start">
            <span className="eyebrow-tag">سوالات پرتکرار</span>
            <h2 className="t-section">
              <span style={{ "--r": "-1.5deg" }}>قبل</span>
              <span style={{ "--r": "2deg" }}> از</span>
              <span style={{ "--r": "-3deg", color: "var(--college)" }}> شروع</span>
              <span style={{ "--r": "1.5deg" }}>چه باید بدانیم؟</span>
            </h2>
          </header>

          <div className="faq-list">
            {faqs.map((item, i) => {
              const id = `${i}`;
              const isOpen = openId === id;
              return (
                <article
                  key={id}
                  className={`faq-item${isOpen ? " is-open" : ""}`}
                >
                  <button
                    className="faq-question"
                    onClick={() => toggle(id)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <span className="faq-question-btn">
                      <ChevronDownIcon width={18} height={18} />
                    </span>
                  </button>
                  <div className="faq-answer">
                    <div>
                      <p>{item.a}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
