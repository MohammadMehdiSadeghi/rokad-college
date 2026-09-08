/* ============================================================
   گفتگو با منتور — Mentor Chat
   حباب‌های چت به سبک FAQ chat (faq5) DS رکاد.
   ============================================================ */
import { useState } from "react";
import PanelLayout from "./PanelLayout.jsx";
import { mentorChats, mentorMessages } from "./panelData.js";

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <path d="M22 2L11 13" />
    <path d="M22 2l-7 20-4-9-9-4z" />
  </svg>
);

export default function Mentor({ onNavigate }) {
  const [activeId, setActiveId] = useState(mentorChats[0].id);
  const [inputVal, setInputVal] = useState("");
  const [chatMessages, setChatMessages] = useState(() => ({
    1: [...mentorMessages],
    2: [
      { from: "them", text: "سلام پارسا جان! سوالی در مورد جلسه طراحی فیگما داشتی؟" },
    ],
    3: [
      { from: "them", text: "سلام! تمرین ریدینگ این هفته رو بررسی کردم، پیشرفتت عالی بوده." },
    ],
  }));

  const active = mentorChats.find((m) => m.id === activeId) || mentorChats[0];
  const currentMessages = chatMessages[activeId] || [];

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputVal.trim()) return;
    const text = inputVal.trim();
    setInputVal("");
    setChatMessages((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), { from: "me", text }],
    }));

    // Demo mentor auto response
    setTimeout(() => {
      setChatMessages((prev) => ({
        ...prev,
        [activeId]: [
          ...(prev[activeId] || []),
          { from: "them", text: "پیامت رو دیدم! بررسی می‌کنم و نکاتش رو بهت می‌گم." },
        ],
      }));
    }, 1200);
  };

  return (
    <section id="panel">
      <PanelLayout page="mentor" onNavigate={onNavigate}>
        <h1 className="pnl-h1">
          <span className="w" style={{ transform: "rotate(-1.5deg)", display: "inline-block" }}>گفتگو با</span>{" "}
          <span className="w accent" style={{ transform: "rotate(1.5deg)", display: "inline-block" }}>منتور</span>
        </h1>
        <p className="pnl-sub">منتورهایت میانگین زیر ۲۴ ساعت پاسخ می‌دهند.</p>

        <div className="pnl-mentor-grid">
          {/* لیست منتورها */}
          <div className="pnl-panel">
            <h4>
              منتورهای من
              <span className="pnl-pill">{mentorChats.length} منتور</span>
            </h4>
            <div className="pnl-mentor-list">
              {mentorChats.map((m) => (
                <button
                  key={m.id}
                  className={`pnl-mentor${m.id === activeId ? " on" : ""}`}
                  onClick={() => setActiveId(m.id)}
                >
                  <span className="ava">
                    {m.initial}
                    {m.online && <i className="online" aria-label="آنلاین" />}
                  </span>
                  <span className="info">
                    <b>{m.name}</b>
                    <span className="last">{m.last}</span>
                  </span>
                  <span className="meta">
                    <small>{m.time}</small>
                    {m.unread > 0 && <i className="unread">{m.unread}</i>}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* چت */}
          <div className="pnl-panel pnl-chat-panel">
            <h4>
              {active.name}
              <span className="pnl-pill">{active.role}</span>
            </h4>

            <div className="pnl-chat">
              {currentMessages.map((msg, i) => (
                <div key={i} className={`pnl-msg ${msg.from}`}>
                  <span className="ava">{msg.from === "me" ? "پ" : active.initial}</span>
                  <span className="bubble">{msg.text}</span>
                </div>
              ))}
            </div>

            <form className="pnl-chat-input" onSubmit={handleSend}>
              <input
                type="text"
                placeholder="پیامت رو بنویس…"
                dir="rtl"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
              />
              <button type="submit" className="pnl-cbtn send" aria-label="ارسال">
                <SendIcon />
                ارسال
              </button>
            </form>
          </div>
        </div>
      </PanelLayout>
    </section>
  );
}
