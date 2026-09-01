import { ArrowIcon } from "@/common/Icons";
import PatternBackground from "@/components/PatternBackground";

/* ---- Ticker items ---- */
const tickerItems = [
  { num: "+۲.۵k", label: "هنرجوی فعال" },
  { num: "+۵۰", label: "دورهٔ فعال" },
  { num: "۹۸٪", label: "رضایت" },
  { num: "+۱۰۰", label: "استاد" },
  { num: "+۸۰۰", label: "پروژه‌ی تحویل‌شده" },
  { num: "۲۴/۷", label: "پشتیبانی" },
];

/* ---- Board tiles ---- */
const tiles = [
  { num: "۰۴", label: "دپارتمان تخصصی", cls: "t1" },
  { num: "+۸۰۰", label: "پروژه‌ی تحویل‌شده", cls: "t2" },
  { num: "+۱۰۰", label: "استاد متخصص", cls: "t3" },
  { num: "+۲۰", label: "شرکت همکار", cls: "t4" },
];

export default function StatsTicker() {
  return (
    <section className="section p5-section" id="about" style={{ background: "var(--white)" }}>
      {/* Grid pattern overlay */}
      <div className="p5-grid-bg" aria-hidden="true" />
      <PatternBackground opacity={40} />

      <div className="container p5-inner">
        {/* Head */}
        <div className="p5-head">
          <span className="p5-eyebrow">
            <span className="p5-eyebrow-dot" />
            در همین لحظه در رکاد
          </span>
          <h2 className="t-section">
            <span style={{ display: "inline-block", transform: "rotate(-1.5deg)" }}>اینجا</span>{" "}
            <span style={{ display: "inline-block", transform: "rotate(1.5deg)", color: "var(--college)" }}>فقط</span>{" "}
            <span className="strike" style={{ display: "inline-block", transform: "rotate(-1deg)", position: "relative" }}>آموزش</span>{" "}
            <span style={{ display: "inline-block", transform: "rotate(2deg)", color: "var(--navy)" }}>نمی‌بینی</span>
            <br />
            <span>برای </span>
            <span className="hl" style={{ display: "inline-block", background: "var(--college)", padding: "2px 14px", borderRadius: 12, border: "2.5px solid var(--ink)", transform: "rotate(-1.5deg)", color: "var(--ink)", fontWeight: 900 }}>آینده</span>
            <span> آماده می‌شوی.</span>
          </h2>
          <p style={{ margin: "0 auto", color: "#a8abb5", fontSize: 16, lineHeight: 1.85, fontWeight: 600, maxWidth: 560 }}>
            یاد بگیر، تجربه کن، مهارت بساز و آینده‌ات را از همین امروز شروع کن.
          </p>
        </div>

        {/* Ticker */}
        <div className="p5-ticker">
          <span className="p5-tag">
            <span className="p5-tag-dot" />
            LIVE · زنده
          </span>
          <div className="p5-track">
            {/* First set */}
            {tickerItems.map((item, i) => (
              <span key={`a-${i}`}>
                <span className="p5-k">
                  <span className="p5-n">{item.num}</span>
                  <span style={{ color: "#fff" }}>{item.label}</span>
                </span>
                {i < tickerItems.length - 1 && <span className="p5-sep" />}
              </span>
            ))}
            <span className="p5-sep" />
            {/* Duplicate for seamless loop */}
            {tickerItems.map((item, i) => (
              <span key={`b-${i}`}>
                <span className="p5-k">
                  <span className="p5-n">{item.num}</span>
                  <span style={{ color: "#fff" }}>{item.label}</span>
                </span>
                {i < tickerItems.length - 1 && <span className="p5-sep" />}
              </span>
            ))}
          </div>
        </div>

        {/* Bulletin Board */}
        <div className="p5-board">
          {tiles.map((tile) => (
            <div key={tile.num} className={`p5-tile ${tile.cls}`}>
              <span className="p5-pin" />
              <div className="p5-tile-num">{tile.num}</div>
              <div className="p5-tile-lbl">{tile.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
