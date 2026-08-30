import OffsetCard from "@/components/OffsetCard.jsx";
import RotatedHeading from "@/components/RotatedHeading.jsx";
import { ArrowIcon } from "@/common/Icons";
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
        <div className="path-copy">
          <RotatedHeading words={headingWords} className="t-section" />
          <p className="path-text">{promoSection.text}</p>
          <strong className="path-highlight">{promoSection.highlight}</strong>
          <a className="text-link" href="#courses">
            {promoSection.cta} <ArrowIcon width={16} height={16} />
          </a>
        </div>

        <OffsetCard
          backColor="var(--navy)"
          borderColor="var(--navy)"
          radius="cut-tr-bl"
          rotate="rotate-2"
          shadowOffset={5}
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