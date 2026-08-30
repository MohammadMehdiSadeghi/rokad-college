import OffsetCard from "@/Components/OffsetCard.jsx";
import RotatedHeading from "@/Components/RotatedHeading.jsx";
import { FlaskIcon, CheckCircleIcon } from "@/Components/Icons";

const labPoints = [
  { b: "تمرین هدفمند", small: "هر تمرین بخشی از پروژهٔ نهایی توست." },
  { b: "بازخورد متخصص", small: "اشتباه‌ها را می‌بینی و راه بهتر را یاد می‌گیری." },
  { b: "نمونه‌کار قابل ارائه", small: "مسیرت با یک خروجی واقعی تمام می‌شود." },
];

const headingWords = [
  { text: "هر", deg: -1.5 },
  { text: "مهارت", deg: 2, cls: "text-college" },
  { text: "با یک", deg: -3 },
  { text: "خروجی واقعی", deg: 1.5 },
];

export default function LabSection() {
  return (
    <section className="section lab-section" id="lab">
      <div className="container lab-layout">
        {/* Visual — teal sticker with code window (sample: rot -2deg, amber shadow, 2.5rem radius) */}
        <OffsetCard
          className="lab-visual"
          backColor="var(--college)"
          radius="lab-visual-radius"
          rotate="rotate-minus2"
          shadowOffset={8}
        >
          <div className="lab-visual-inner">
            <div className="lab-header">
              <span><FlaskIcon width={20} height={20} /> لَب مهارت رُکاد</span>
              <small>PROJECT 01</small>
            </div>
            <div className="lab-canvas">
              <div className="canvas-window"><span /><span /><span /></div>
              <div className="canvas-code"><i /><i /><i /><i /></div>
              <div className="canvas-result">
                <span className="canvas-result-icon"><CheckCircleIcon width={18} height={18} /></span>
                <strong>پروژه آمادهٔ ارائه است!</strong>
              </div>
            </div>
            <div className="lab-tags"><span>#تمرین</span><span>#بازخورد</span><span>#نمونه‌کار</span></div>
          </div>
        </OffsetCard>

        {/* Copy column */}
        <div className="lab-copy">
          {/* Eyebrow sticker (sample: amber front, navy text, amber shadow, rot -2.5deg) */}
          <OffsetCard
            backColor="var(--college)"
            radius="cut-tr-bl"
            rotate="rotate-minus2.5"
            shadowOffset={3}
            className="lab-eyebrow"
          >
            <span className="eyebrow-front">فراتر از کلاس</span>
          </OffsetCard>
          <RotatedHeading words={headingWords} className="lab-title" color="#fff" />
          <p className="lab-p">
            در «لَب مهارت» آموخته‌هایت را به خروجی واقعی تبدیل می‌کنی. پروژه تعریف می‌شود،
            منتور بازخورد می‌دهد، نسخهٔ بهتر را می‌سازی و در پایان چیزی داری که می‌توانی
            با افتخار نشانش بدهی.
          </p>
          <ul className="lab-list">
            {labPoints.map((p, i) => (
              <li key={i}>
                <CheckCircleIcon />
                <span><b>{p.b}</b><small>{p.small}</small></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
