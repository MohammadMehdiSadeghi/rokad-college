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
  { text: "مهارت", deg: 2 },
  { text: "با یک", deg: -3 },
  { text: "خروجی واقعی", deg: 1.5 },
];

export default function LabSection() {
  return (
    <section className="section lab-section" id="lab">
      <div className="container section-inner lab-wrap">
        {/* Visual — teal sticker with code window */}
        <OffsetCard
          className="lab-visual"
          backColor="var(--college)"
          radius="cut-tr-bl-lg"
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
                <CheckCircleIcon />
                <strong>پروژه آمادهٔ ارائه است!</strong>
              </div>
            </div>
            <div className="lab-tags"><span>#تمرین</span><span>#بازخورد</span><span>#نمونه‌کار</span></div>
          </div>
        </OffsetCard>

        {/* Copy column */}
        <div className="lab-copy">
          <span className="eyebrow-tag eyebrow-tag--college">فراتر از کلاس</span>
          <RotatedHeading words={headingWords} className="t-section" color="#fff" />
          <p className="t-body" style={{ color: "rgba(255,255,255,.72)", marginTop: "var(--space-6)", lineHeight: 1.85 }}>
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
