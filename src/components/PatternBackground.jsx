// src/components/PatternBackground.jsx
// پترن پس‌زمینه سکشن‌ها — الگوی سایت اصلی رکاد
// با ماسک گرادیانی (بالا/پایین محو) + چرخش ۰ یا ۱۸۰ درجه
const patternBg = "/assets/Pattern/layout-pattern.png";

export default function PatternBackground({
  rotate = false,
  opacity = 60,
  className = "",
}) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full z-0 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] ${className}`}
    >
      <img
        src={patternBg}
        alt=""
        aria-hidden="true"
        draggable="false"
        className={`w-full h-full object-cover select-none ${
          rotate ? "rotate-180" : ""
        }`}
        style={{ opacity: opacity / 100 }}
      />
    </div>
  );
}
