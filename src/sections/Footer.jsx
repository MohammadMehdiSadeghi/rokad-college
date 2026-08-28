import Logo from "../components/Logo.jsx";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" id="consult">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: "var(--space-8)" }}>
          <div>
            <Logo withWord />
            <p className="t-sm" style={{ color: "var(--bg-lavender)", marginTop: "var(--space-4)", maxWidth: "34ch" }}>
              آینده از اینجا شروع می‌شود. در کالج رکاد از پایه تا حرفه‌ای، با پروژه و همراهی اساتید، برای بازار کار آماده شو.
            </p>
          </div>
          <div>
            <h4 className="t-label" style={{ color: "var(--college)", marginBottom: "var(--space-4)" }}>دوره‌ها</h4>
            <ul style={{ display: "grid", gap: "var(--space-2)", fontSize: "14px" }}>
              <li><a href="#courses">فناوری اطلاعات</a></li>
              <li><a href="#courses">گرافیک</a></li>
              <li><a href="#courses">زبان</a></li>
              <li><a href="#courses">MBA</a></li>
            </ul>
          </div>
          <div>
            <h4 className="t-label" style={{ color: "#fff", marginBottom: "var(--space-4)" }}>لینک‌ها</h4>
            <ul style={{ display: "grid", gap: "var(--space-2)", fontSize: "14px" }}>
              <li><a href="#promo">چرا رکاد</a></li>
              <li><a href="#features">ویژگی‌ها</a></li>
              <li><a href="#faq">سوالات</a></li>
              <li><a href="#blog">وبلاگ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="t-label" style={{ color: "#fff", marginBottom: "var(--space-4)" }}>تماس</h4>
            <ul style={{ display: "grid", gap: "var(--space-2)", fontSize: "14px" }}>
              <li><a href="#consult">مشاوره رایگان</a></li>
              <li><a href="#consult">ارتباط با ما</a></li>
              <li><a href="#comments">نظرات هنرجویان</a></li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", marginTop: "var(--space-8)", paddingTop: "var(--space-6)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--space-2)", fontSize: "13px", color: "var(--bg-lavender)" }}>
          <span>© {year} کالج رکاد (ROKAD College). تمامی حقوق محفوظ است.</span>
          <span>ساخته‌شده با عشق برای یادگیری بهتر</span>
        </div>
      </div>
    </footer>
  );
}
