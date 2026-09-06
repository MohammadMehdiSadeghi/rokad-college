import "./about.css";
import PatternLayer from "@/components/PatternLayer";

const steps = [
  {
    num: "۰۱",
    title: "یاد بگیر",
    text: "سرفصل‌های ساخت‌یافته از سطح صفر تا حرفه‌ای، در ۴ دپارتمان تخصصی.",
    cls: "n1",
  },
  {
    num: "۰۲",
    title: "تجربه کن",
    text: "هر دوره با پروژه‌ی واقعی پایان می‌گیره — یعنی نمونه‌کار قابل ارائه.",
    cls: "n2",
  },
  {
    num: "۰۳",
    title: "مهارت بساز",
    text: "منتور اختصاصی، پشتیبانی زیر ۲۴ ساعت، جلسات آنلاین.",
    cls: "n3",
  },
  {
    num: "۰۴",
    title: "وارد بازار کار شو",
    text: "رزومه‌سازی، آماده‌سازی مصاحبه و معرفی به شرکت‌های همکار.",
    cls: "n4",
  },
];

export default function About() {
  return (
    <section className="abt-section" id="about">
      {/* Background pattern (mask fade) */}
      <PatternLayer rotate={0} />

      <div className="abt-inner">
        {/* Left side — text (right column in RTL) */}
        <div className="abt-side">
          <h2 className="abt-title">
            از <span className="hl">صفر</span> تا
            <br />
            ورود به بازار کار.
          </h2>
          <p className="abt-body">
            <strong>رکاد فقط دوره برگزار نمی‌کنه</strong> — یه مسیر کامل ۴
            مرحله‌ای طراحی کرده. از انتخاب رشته، تا یادگیری، تجربه و
            آماده‌شدن برای اولین شغلت.
          </p>
          <div className="abt-foot">
            <button className="abt-btn">درباره‌ی رکاد بیشتر بدون ←</button>
            <div className="abt-signature">
              <svg
                viewBox="0 0 120 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 24 Q 14 8, 22 18 T 36 24 Q 42 12, 52 22 Q 60 30, 68 18 T 84 26 Q 92 16, 104 22 L 112 20" />
                <path d="M18 30 L 24 32" opacity=".7" />
              </svg>
              <span className="who">— آرون، بنیان‌گذار</span>
            </div>
          </div>
        </div>

        {/* Right side — vertical timeline (left column in RTL) */}
        <div className="abt-timeline">
          {steps.map((s) => (
            <div key={s.num} className={`abt-step ${s.cls}`}>
              {/* colored card face — sits ABOVE the dark back layer */}
              <div className="abt-card">
                <span className="node">{s.num}</span>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}