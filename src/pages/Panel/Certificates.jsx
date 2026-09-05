/* ============================================================
   گواهی‌ها — Certificates
   کارت گواهی به سبک تیکت CTA (cta5) DS رکاد:
   بوردر 3px، شدو 8px 8px 0 college، رادیوس 24px، پرفوراژ.
   ============================================================ */
import PanelLayout from "./PanelLayout.jsx";
import { certificates } from "./panelData.js";

const SealGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.5 13l1.5 8-5-3-5 3 1.5-8" />
  </svg>
);

const QR = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
    <path d="M3 3h7v7H3zM5 5v3h3V5zM14 3h7v7h-7zM16 5v3h3V5zM3 14h7v7H3zM5 16v3h3v-3zM14 14h3v3h-3zM18 14h3v3h-3zM14 18h3v3h-3zM18 18h3v3h-3z" />
  </svg>
);

export default function Certificates({ onNavigate }) {
  return (
    <section id="panel">
      <PanelLayout page="certs" onNavigate={onNavigate}>
        <h1 className="pnl-h1">
          <span className="w" style={{ transform: "rotate(-1.5deg)", display: "inline-block" }}>گواهی‌های</span>{" "}
          <span className="w accent" style={{ transform: "rotate(1.5deg)", display: "inline-block" }}>من</span>
        </h1>
        <p className="pnl-sub">
          {certificates.length} گواهی معتبر داری — هر گواهی کد QR تأیید داره.
        </p>

        <div className="pnl-certs">
          {certificates.map((c, i) => (
            <article key={c.id} className={`pnl-cert${i % 2 ? " alt" : ""}`}>
              <span className="pnl-cert-stamp">
                <SealGlyph />
                معتبر
              </span>

              <div className="pnl-cert-main">
                <span className="pnl-cert-eyebrow">گواهی اتمام دوره</span>
                <h3>{c.title}</h3>
                <div className="pnl-cert-meta">
                  <span>
                    <b>{c.date}</b>
                    <small>تاریخ صدور</small>
                  </span>
                  <span>
                    <b>{c.hours}</b>
                    <small>مدت دوره</small>
                  </span>
                  <span>
                    <b>{c.grade}</b>
                    <small>نمرهٔ نهایی</small>
                  </span>
                </div>
              </div>

              {/* پرفوراژ + کد */}
              <div className="pnl-cert-perf" aria-hidden="true">
                <span className="line" />
              </div>

              <div className="pnl-cert-stub">
                <div className="qr"><QR /></div>
                <span className="serial">{c.serial}</span>
                <button className="pnl-cbtn">دانلود PDF</button>
              </div>
            </article>
          ))}
        </div>

        <div className="pnl-cert-note">
          <span className="em">💡</span>
          گواهی‌های جدید بعد از قبولی در امتحان نهایی هر دوره، خودکار همین‌جا اضافه می‌شن.
          <button className="pnl-cbtn ghost" onClick={() => onNavigate("courses")}>دوره‌های من</button>
        </div>
      </PanelLayout>
    </section>
  );
}
