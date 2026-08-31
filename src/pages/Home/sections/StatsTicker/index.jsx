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

/* ---- Board tiles ---- */
const tiles = [
  { num: "۰۴", label: "دپارتمان تخصصی", cls: "t1", img: "/assets/Pattern/blue.png" },
  { num: "+۸۰۰", label: "پروژه‌ی تحویل‌شده", cls: "t2", img: "/assets/Pattern/green.png" },
  { num: "+۱۰۰", label: "استاد متخصص", cls: "t3", img: "/assets/Pattern/yellow.png" },
  { num: "+۲۰", label: "شرکت همکار", cls: "t4", img: "/assets/Pattern/pink.png" },
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
          {tiles.map((tile) => (
            <div key={tile.num} className={`p5-tile ${tile.cls}`}>
              <img src={tile.img} alt="" aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35, pointerEvents: "none", zIndex: 0 }} />
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
