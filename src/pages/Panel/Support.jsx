/* ============================================================
   پشتیبانی — Support
   تیکت‌ها + فرم تیکت جدید + سوالات پرتکرار (FAQ chips).
   ============================================================ */
import { useState } from "react";
import PanelLayout from "./PanelLayout.jsx";
import { supportTickets, supportFaqs } from "./panelData.js";

const STATUS = {
  open: { label: "در بررسی", cls: "open" },
  answering: { label: "در حال پاسخ‌دهی", cls: "late" },
  closed: { label: "بسته‌شده", cls: "done" },
};

const LifeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export default function Support({ onNavigate }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [tickets, setTickets] = useState(() => [...supportTickets]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [ticketSuccess, setTicketSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    const newT = {
      id: Date.now(),
      subject: subject.trim(),
      dept: "پشتیبانی عمومی",
      messages: 1,
      updated: "لحظاتی پیش",
      status: "open",
    };
    setTickets((prev) => [newT, ...prev]);
    setSubject("");
    setMessage("");
    setTicketSuccess(true);
    setTimeout(() => setTicketSuccess(false), 3500);
  };

  return (
    <section id="panel">
      <PanelLayout page="support" onNavigate={onNavigate}>
        <h1 className="pnl-h1">
          <span className="w accent" style={{ transform: "rotate(-1.5deg)", display: "inline-block" }}>پشتیبانی</span>
        </h1>
        <p className="pnl-sub">تیم پشتیبانی رکاد همه‌روزه پاسخ‌گوی توئه.</p>

        <div className="pnl-support-grid">
          {/* تیکت‌ها */}
          <div className="pnl-panel">
            <h4>
              تیکت‌های من
              <span className="pnl-pill">{tickets.length} تیکت</span>
            </h4>
            <div className="pnl-tickets">
              {tickets.map((t) => {
                const st = STATUS[t.status] || STATUS.open;
                return (
                  <div key={t.id} className="pnl-ticket">
                    <span className={`pnl-asn-ic ${st.cls}`} style={{ width: 40, height: 40 }}>
                      <LifeIcon />
                    </span>
                    <div className="body">
                      <b>{t.subject}</b>
                      <span className="m">
                        {t.dept} · {t.messages} پیام · آخرین به‌روزرسانی {t.updated}
                      </span>
                    </div>
                    <div className="side">
                      <span className={`pnl-chip ${st.cls}`}>{st.label}</span>
                      <button className="pnl-cbtn ghost">مشاهده</button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* تیکت جدید */}
            <form className="pnl-new-ticket" onSubmit={handleSubmit}>
              <b>تیکت جدید</b>
              <input
                type="text"
                placeholder="موضوع تیکت…"
                dir="rtl"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <textarea
                placeholder="توضیح مشکل یا سوالت…"
                dir="rtl"
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" className="pnl-cbtn">ارسال تیکت</button>
              {ticketSuccess && (
                <div style={{ color: "var(--teal-dark)", fontSize: "12.5px", fontWeight: 800 }}>
                  تیکت شما با موفقیت ثبت شد ✓ کارشناسان به زودی پاسخ می‌دهند.
                </div>
              )}
            </form>
          </div>

          {/* FAQ */}
          <div className="pnl-panel">
            <h4>
              سوالات پرتکرار
              <span className="pnl-pill">{supportFaqs.length} سوال</span>
            </h4>
            <div className="pnl-faqs">
              {supportFaqs.map((f, i) => (
                <div key={i} className={`pnl-faq${openFaq === i ? " open" : ""}`}>
                  <button className="pnl-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    {f.q}
                    <span className="chev" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>
                  <div className="pnl-faq-a"><span>{f.a}</span></div>
                </div>
              ))}
            </div>
            <div className="pnl-cert-note" style={{ marginTop: 16 }}>
              سوال درسی داری؟ مستقیم از منتورت بپرس.
              <button className="pnl-cbtn ghost" onClick={() => onNavigate("mentor")}>گفتگو با منتور</button>
            </div>
          </div>
        </div>
      </PanelLayout>
    </section>
  );
}
