import { useState } from "react";
import { faqs } from "@/data/content.js";
import OffsetCard from "@/Components/OffsetCard.jsx";
import { ArrowIcon, ChevronDownIcon } from "@/Components/Icons";

const faqPattern = "/assets/Shared/Patterns/Ecosystem-Pattern.png";

// Sample-style FAQ items: 3 per group
const buildItems = () => {
  const items = [];
  for (let i = 0; i < faqs.length; i += 3) {
    const batch = faqs.slice(i, i + 3);
    items.push(
      batch.map((item, j) => ({
        ...item,
        id: `${i + j}`,
        group: Math.floor(i / 3) + 1,
        index: j,
      }))
    );
  }
  return items;
};

const faqGroups = buildItems();

const groupLabels = ["دوره‌ها", "پذیرش و شرایط", "هزینه و پرداخت"];

export default function Faq() {
  const [openId, setOpenId] = useState("0");

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section
      className="section faq-section relative overflow-hidden"
      id="faq"
    >
      {/* Pattern overlay — matches desktop sample */}
      <div className="bg-pattern" aria-hidden="true" style={{ opacity: 0.5 }}>
        <img
          src={faqPattern}
          alt=""
          draggable={false}
          className="w-full h-full object-cover"
          style={{ transform: "rotate(180deg)" }}
        />
      </div>

      <div className="container section-inner">
        <div className="faq-layout">
          {/* Left: Consultation CTA card — sample design */}
          <div className="consult-card">
            <OffsetCard
              backColor="var(--college-dark)"
              radius="cut-tl-br-lg"
              rotate="rotate-minus1"
              shadowOffset={6}
            >
              <div
                style={{
                  padding: "2.3rem 1.7rem",
                  background: "var(--college)",
                  border: "3.5px solid var(--ink)",
                }}
              >
                {/* Icon badge */}
                <div
                  style={{
                    width: 60,
                    height: 60,
                    display: "grid",
                    placeItems: "center",
                    background: "var(--navy)",
                    color: "var(--college)",
                    border: "2px solid var(--ink)",
                    borderRadius: "0 18px 0 18px",
                    fontSize: "1.4rem",
                    marginBottom: "1rem",
                    transform: "rotate(-2deg)",
                  }}
                >
                  <ArrowIcon width={28} height={28} />
                </div>

                <h2
                  style={{
                    fontSize: "29px",
                    lineHeight: "1.35",
                    fontWeight: 950,
                    color: "var(--ink)",
                    marginBottom: "1rem",
                  }}
                >
                  نمی‌دونی کدوم مسیر برای تو مناسبه؟
                </h2>
                <p
                  style={{
                    margin: "1rem 0 1.5rem",
                    color: "var(--college-darker)",
                    fontSize: "15px",
                    lineHeight: 1.7,
                  }}
                >
                  مشاورهای کالج رُکاد برای انتخاب مسیر مناسب کنارت هستند.
                  با یک تماس کوتاه، مسیر رشدت رو مشخص کن.
                </p>
                <a
                  href="#consult"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: ".5rem",
                    background: "var(--navy)",
                    color: "#fff",
                    border: "2.75px solid var(--ink)",
                    borderRadius: "0 14px 0 14px",
                    padding: ".65rem 1.2rem",
                    fontWeight: 900,
                    fontSize: "15px",
                    whiteSpace: "nowrap",
                    transition: "transform .3s",
                    transform: "rotate(1.5deg)",
                    cursor: "pointer",
                  }}
                  className="consult-btn"
                >
                  درخواست مشاوره
                  <ArrowIcon width={16} height={16} />
                </a>
              </div>
            </OffsetCard>
          </div>

          {/* Right: FAQ content */}
          <div className="faq-content">
            <header className="section-head align-start">
              <span className="eyebrow-tag">سوالات پرتکرار</span>
              <h2 className="t-section">
                <span style={{ "--r": "-1.5deg" }}>قبل</span>
                <span style={{ "--r": "2deg" }}> از</span>
                <span
                  style={{ "--r": "-3deg", color: "var(--college-dark)" }}
                >
                  شروع
                </span>
                <span style={{ "--r": "1.5deg" }}>چه باید بدانیم؟</span>
              </h2>
              <p className="section-sub">
                پاسخ سوالاتی که هنرجویان قبل از ثبت‌نام بیشتر می‌پرسند.
              </p>
            </header>

            <div className="faq-list">
              {faqGroups.map((group, gi) => (
                <div key={gi} className="faq-group">
                  <span className="faq-group-label">
                    {groupLabels[gi] ?? `گروه ${gi + 1}`}
                  </span>
                  {group.map((item) => {
                    const isOpen = openId === item.id;
                    return (
                      <OffsetCard
                        key={item.id}
                        className={`faq-item${isOpen ? " is-open" : ""}`}
                        backColor="var(--ink)"
                        radius="cut-tr-bl"
                        rotate=""
                        shadowOffset={4}
                      >
                        <div className="offset-card">
                          <button
                            className="faq-question"
                            onClick={() => toggle(item.id)}
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
                        </div>
                      </OffsetCard>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
