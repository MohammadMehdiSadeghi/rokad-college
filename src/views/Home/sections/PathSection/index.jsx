import OffsetCard from "@/Components/OffsetCard.jsx";
import RotatedHeading from "@/Components/RotatedHeading.jsx";
import { ArrowIcon } from "@/Components/Icons";
import { promoSection } from "@/data/content.js";

const steps = [
  { num: "۰۱", title: "انتخاب مسیر", small: "شناخت علاقه و هدف" },
  { num: "۰۲", title: "یادگیری مهارت", small: "آموزش قدم‌به‌قدم" },
  { num: "۰۳", title: "ساخت پروژه", small: "تجربهٔ واقعی و نمونه‌کار" },
  { num: "۰۴", title: "ورود حرفه‌ای", small: "آماده برای بازار کار" },
];

const headingWords = [
  { text: "برای", deg: -1.5 },
  { text: "آینده", deg: 2 },
  { text: "آماده", deg: -3 },
  { text: "می‌شوی.", deg: 1.5 },
];

export default function PathSection() {
  return (
    <section className="section path-section" id="path">
      <div className="container section-inner path-wrap">
        {/* Copy column */}
        <div className="path-copy">
          <span className="eyebrow-tag">مسیر واقعی یادگیری</span>
          <RotatedHeading words={headingWords} className="t-section" />
          <p className="t-body" style={{ color: "var(--ink-subtle)", marginTop: "var(--space-6)", lineHeight: 1.8 }}>
            {promoSection.text}
          </p>
          <strong className="path-highlight">{promoSection.highlight}</strong>
          <a className="btn btn-amber" href="#courses" style={{ padding: "13px 28px", fontSize: 15 }}>
            {promoSection.cta} <ArrowIcon width={16} height={16} />
          </a>
        </div>

        {/* Path board — navy sticker */}
        <OffsetCard
          backColor="var(--college)"
          radius="cut-tr-bl"
          rotate="rotate-2"
          shadowOffset={7}
        >
          <div className="path-board-inner">
            <div className="path-line" aria-hidden="true" />
            {steps.map((s) => (
              <div className="path-step" key={s.num}>
                <b>{s.num}</b>
                <span><strong>{s.title}</strong><small>{s.small}</small></span>
              </div>
            ))}
          </div>
        </OffsetCard>
      </div>
    </section>
  );
}
