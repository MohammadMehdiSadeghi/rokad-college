import { Fragment } from "react";
import { ArrowIcon } from "@/common/Icons";
import PatternLayer from "@/components/PatternLayer";

/* ---- Ticker items ---- */
const tickerItems = [
  { num: "+۲.۵k", label: "هنرجوی فعال" },
  { num: "+۵۰", label: "دورهٔ فعال" },
  { num: "۹۸٪", label: "رضایت" },
  { num: "+۱۰۰", label: "استاد" },
  { num: "+۸۰۰", label: "پروژه‌ی تحویل‌شده" },
  { num: "۲۴/۷", label: "پشتیبانی" },
];

/* ---- Board tiles (rokad-web style) ---- */
const tileThemes = [
  { cls: "t1", bg: "#E9EAEF", border: "var(--navy)", numColor: "var(--navy)", img: "/assets/Pattern/blue.png", opacity: 0.5 },
  { cls: "t2", bg: "#E4F4F2", border: "var(--teal)", numColor: "var(--teal-dark)", img: "/assets/Pattern/green.png", opacity: 0.5 },
  { cls: "t3", bg: "#FEF7EC", border: "var(--college)", numColor: "var(--college-dark)", img: "/assets/Pattern/yellow.png", opacity: 0.8 },
  { cls: "t4", bg: "#FEFAFB", border: "var(--female)", numColor: "var(--female)", img: "/assets/Pattern/pink.png", opacity: 1 },
];
const tileData = [
  { num: "۰۴", label: "دپارتمان تخصصی" },
  { num: "+۸۰۰", label: "پروژه‌ی تحویل‌شده" },
  { num: "+۱۰۰", label: "استاد متخصص" },
  { num: "+۲۰", label: "شرکت همکار" },
];

export default function StatsTicker() {
  return (
    <section
      className="section p5-section"
      id="about"
      style={{ background: "var(--white)" }}
    >
      {/* Background pattern (mask fade) */}
      <PatternLayer rotate={0} />

      <div className="container p5-inner">
        {/* Head */}
        <div className="p5-head">
          <span className="p5-eyebrow">
            <span className="p5-eyebrow-dot" />
            در همین لحظه در رکاد
          </span>
          <h2 className="t-section">
            <span>برای </span>
            <span
              className="hl"
              style={{
                display: "inline-block",
                background: "var(--college)",
                padding: "2px 14px",
                borderRadius: 12,
                border: "2.5px solid var(--ink)",
                transform: "rotate(-1.5deg)",
                color: "var(--ink)",
                fontWeight: 900,
              }}
            >
              آینده
            </span>
            <span> آماده می‌شوی.</span>
          </h2>
          <p
            style={{
              margin: "0 auto",
              color: "#a8abb5",
              fontSize: 16,
              lineHeight: 1.85,
              fontWeight: 600,
              maxWidth: 560,
            }}
          >
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
            {/* 4 identical copies — guaranteed to fill the box at every instant */}
            {[0, 1, 2, 3].map((copy) => (
              <div className="p5-set" key={copy} aria-hidden={copy !== 0}>
                {tickerItems.map((item, i) => (
                  <Fragment key={`${copy}-${i}`}>
                    <span className="p5-k">
                      <span className="p5-n">{item.num}</span>
                      <span style={{ color: "#fff" }}>{item.label}</span>
                    </span>
                    <span className="p5-sep" />
                  </Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bulletin Board */}
        <div className="p5-board">
          {tileData.map((tile, i) => {
            const t = tileThemes[i];
            return (
              <div key={tile.num} className="p5-tile-wrap" style={{ transform: i % 2 === 0 ? "rotate(-1.5deg)" : "rotate(1.5deg)" }}>
                <div className="p5-tile-back" style={{ background: t.border }} />
                <div className="p5-tile-card" style={{ backgroundColor: t.bg, borderColor: t.border }}>
                  <div className="p5-tile-bg" style={{ backgroundImage: `url(${t.img})` }} />
                  <span className="p5-tile-num" style={{ color: t.numColor }}>{tile.num}</span>
                  <span className="p5-tile-lbl" style={{ color: t.numColor }}>{tile.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
