import { ArrowIcon } from "@/common/Icons";
import PatternBackground from "@/components/PatternBackground";

/* ---- Timeline steps ---- */
const steps = [
  { num: "۰۱", title: "یاد بگیر", text: "سرفصل‌های ساخت‌یافته از سطح صفر تا حرفه‌ای، در ۴ دپارتمان تخصصی.", cls: "n1" },
  { num: "۰۲", title: "تجربه کن", text: "هر دوره با پروژه‌ی واقعی پایان می‌گیره — یعنی نمونه‌کار قابل ارائه.", cls: "n2" },
  { num: "۰۳", title: "مهارت بساز", text: "منتور اختصاصی، پشتیبانی زیر ۲۴ ساعت، جلسات آنلاین.", cls: "n3" },
  { num: "۰۴", title: "وارد بازار کار شو", text: "رزومه‌سازی، آماده‌سازی مصاحبه و معرفی به شرکت‌های همکار.", cls: "n4" },
];

/* ---- Shadow colors per step ---- */
const shadowColors = ["var(--college)", "var(--navy)", "var(--female)", "var(--teal)"];

/* ---- Node bg colors ---- */
const nodeBgs = [
  { bg: "var(--college)", color: "var(--ink)" },
  { bg: "var(--navy)", color: "#fff" },
  { bg: "var(--female)", color: "#fff" },
  { bg: "var(--teal)", color: "#fff" },
];

const CheckSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function AboutTimeline() {
  return (
    <section className="section a2-section" id="about" style={{ background: "var(--white)" }}>
      {/* Background pattern — الگوی سایت اصلی */}
      <PatternBackground rotate opacity={40} />

      <div className="container a2-inner">
        {/* Left side — text */}
        <div className="a2-side">
          <span className="a2-eyebrow">
            <span className="a2-eyebrow-dot" />
            مسیر رکادکالج
          </span>
          <h2 className="a2-title">
            از <span className="a2-hl">صفر</span> تا<br />ورود به بازار کار.
          </h2>
          <p className="a2-body">
            <strong>رکاد فقط دوره برگزار نمی‌کنه</strong> — یه مسیر کامل ۴ مرحله‌ای طراحی کرده. از انتخاب رشته، تا یادگیری، تجربه و آماده‌شدن برای اولین شغلت.
          </p>
          <div className="a2-foot">
            <a href="#about" className="a2-btn">
              درباره‌ی رکاد بیشتر بدون <ArrowIcon width={16} height={16} />
            </a>
          </div>
        </div>

        {/* Right side — timeline */}
        <div className="a2-timeline">
          <div className="a2-rail" />
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`a2-step ${step.cls}`}
              style={{ "--step-shadow": shadowColors[i] }}
            >
              {/* Node circle */}
              <span
                className="a2-node"
                style={{ background: nodeBgs[i].bg, color: nodeBgs[i].color }}
              >
                {step.num}
              </span>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
