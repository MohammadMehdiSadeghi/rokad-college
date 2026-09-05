/* ============================================================
   تکالیف هنرجو — Assignments page
   از آرت‌بورد داشبورد بازطراحی‌شده با DS رکاد:
   بوردر 2px ink، شدو آفست، چرخش‌های ظریف، توکن‌های کالج.
   ============================================================ */
import PanelLayout from "./PanelLayout.jsx";
import { assignments } from "./panelData.js";

const FA = "۰۱۲۳۴۵۶۷۸۹";
const toFa = (n) => String(n).replace(/\d/g, (d) => FA[d]);

/* ---------- Status chip styles ---------- */
const STATUS = {
  open: { label: "باز", cls: "open" },
  late: { label: "در حال گذشتن مهلت", cls: "late" },
  done: { label: "تحویل‌شده", cls: "done" },
  graded: { label: "نمره‌داده‌شده", cls: "graded" },
};

export default function Assignments({ onNavigate }) {
  const open = assignments.filter((a) => a.status === "open" || a.status === "late");
  const closed = assignments.filter((a) => a.status === "done" || a.status === "graded");

  const Row = ({ a }) => {
    const st = STATUS[a.status];
    return (
      <div className={`pnl-asn${a.status === "late" ? " urgent" : ""}`}>
        <div className={`pnl-asn-ic ${st.cls}`}>
          {a.status === "graded" ? (
            <span className="grade">{a.grade}</span>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              {a.status === "done" ? (
                <polyline points="20 6 9 17 4 12" />
              ) : (
                <>
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
                </>
              )}
            </svg>
          )}
        </div>
        <div className="body">
          <b>{a.title}</b>
          <div className="m">
            {a.course} · {a.due} · تمرین {toFa(a.no)}
          </div>
          {a.status === "graded" && <div className="graded-note">بازخورد منتور ثبت شد ✓</div>}
        </div>
        <div className="side">
          <span className={`pnl-chip ${st.cls}`}>{st.label}</span>
          {a.status === "open" && <button className="pnl-cbtn">شروع تکلیف</button>}
          {a.status === "late" && <button className="pnl-cbtn">فوری تحویل بده</button>}
          {(a.status === "done" || a.status === "graded") && (
            <button className="pnl-cbtn ghost">مشاهدهٔ پاسخ</button>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="panel">
      <PanelLayout page="assignments" onNavigate={onNavigate}>
        <h1 className="pnl-h1">
          <span className="w" style={{ transform: "rotate(-1.5deg)", display: "inline-block" }}>تکالیف</span>{" "}
          <span className="w accent" style={{ transform: "rotate(1.5deg)", display: "inline-block" }}>من</span>
        </h1>
        <p className="pnl-sub">
          {open.length > 0
            ? `${toFa(open.length)} تکلیف باز داری — از مهلت‌دارها شروع کن.`
            : "فعلاً تکلیف بازی نداری — عالیه!"}
        </p>

        {/* ---------- باز ---------- */}
        <div className="pnl-panel">
          <h4>
            باز و در انتظار
            <span className="pnl-pill">{toFa(open.length)} تکلیف</span>
          </h4>
          {open.map((a) => (
            <Row key={a.id} a={a} />
          ))}
        </div>

        {/* ---------- تحویل‌شده ---------- */}
        <div className="pnl-panel" style={{ marginTop: 22 }}>
          <h4>
            تحویل‌شده
            <span className="pnl-pill">{toFa(closed.length)} تکلیف</span>
          </h4>
          {closed.map((a) => (
            <Row key={a.id} a={a} />
          ))}
        </div>
      </PanelLayout>
    </section>
  );
}
