import OffsetCard from "@/Components/OffsetCard.jsx";

const numberCards = [
  { small: "مسیرهای متنوع", big: "۰۴", word: null, h3: "دپارتمان تخصصی", p: "فناوری، گرافیک، زبان و مدیریت", theme: "var(--college)" },
  { small: "شروع بدون نگرانی", big: null, word: "صفر ← حرفه‌ای", h3: "یادگیری قدم‌به‌قدم", p: "مسیر روشن برای هر سطح مهارتی", theme: "var(--teal)" },
  { small: "آموزش کاربردی", big: null, word: "یادگیری + تجربه", h3: "پروژه و تجربهٔ واقعی", p: "نمونه‌کار قابل‌ارائه در پایان مسیر", theme: "var(--navy)" },
  { small: "پشتیبانی آموزشی", big: null, word: "کنار توییم", h3: "همراهی در مسیر", p: "منتور و بازخورد در تمام دوره", theme: "var(--accent)" },
];

const rotations = [
  { rotate: "rotate-1", radius: "cut-tl-br" },
  { rotate: "rotate-minus2", radius: "cut-tr-bl" },
  { rotate: "rotate-2", radius: "cut-tl-br" },
  { rotate: "rotate-minus1", radius: "cut-tr-bl" },
];

export default function NumbersSection() {
  return (
    <section className="section" id="numbers" style={{ background: "var(--white)" }}>
      <div className="bg-pattern">
        <img src="/assets/Pattern/layout-pattern.png" alt="" aria-hidden="true" />
      </div>
      <div className="container section-inner">
        <div className="grid-4">
          {numberCards.map((c, i) => {
            const rot = rotations[i % rotations.length];
            return (
              <OffsetCard
                key={c.h3}
                backColor={c.theme}
                borderColor={c.theme}
                radius={rot.radius}
                rotate={rot.rotate}
                className="animate-fade-in-up"
              >
                <div className="number-card-inner" style={{ "--theme": c.theme }}>
                  <span className="number-card-badge">{c.small}</span>
                  {c.big
                    ? <b className="number-card-big">{c.big}</b>
                    : <b className="number-card-word">{c.word}</b>}
                  <h3 className="number-card-title">{c.h3}</h3>
                  <p className="number-card-text">{c.p}</p>
                </div>
              </OffsetCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
