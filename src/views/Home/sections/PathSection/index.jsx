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
  { text: "آینده", deg: 2, color: "var(--college)" },
  { text: "آماده", deg: -3 },
  { text: "می‌شوی.", deg: 1.5 },
];

export default function PathSection() {
  return (
    <section className="section path-section" id="path">
      <div className="container section-inner path-wrap">
        {/* Copy column */}
        <div className="path-copy">
          {/* Eyebrow sticker (sample: white front, college-dark border, college shadow, rotated -2.5deg) */}
          <OffsetCard
            backColor="var(--college)"
            radius="cut-tr-bl"
            rotate="rotate-minus2.5"
            shadowOffset={3}
            className="path-eyebrow"
          >
            <span className="eyebrow-front">مسیر واقعی یادگیری</span>
          </OffsetCard>
          <RotatedHeading words={headingWords} className="t-section" />
          <p className="path-text">{promoSection.text}</p>
          <strong className="path-highlight">{promoSection.highlight}</strong>
          <a className="text-link" href="#courses">
            {promoSection.cta} <ArrowIcon width={16} height={16} />
          </a>
        </div>

        {/* Path board — navy sticker with amber shadow */}
        <OffsetCard
          backColor="var(--college)"
          radius="path-board-radius"
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