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
              <li><a href="#courses" className="hover-lift">فناوری اطلاعات</a></li>
              <li><a href="#courses" className="hover-lift">گرافیک</a></li>
              <li><a href="#courses" className="hover-lift">زبان</a></li>
              <li><a href="#courses" className="hover-lift">MBA</a></li>
            </ul>
          </div>
          <div>
            <h4 className="t-label" style={{ color: "#fff", marginBottom: "var(--space-4)" }}>لینک‌ها</h4>
            <ul style={{ display: "grid", gap: "var(--space-2)", fontSize: "14px" }}>
              <li><a href="#promo" className="hover-lift">چرا رکاد</a></li>
              <li><a href="#features" className="hover-lift">ویژگی‌ها</a></li>
              <li><a href="#faq" className="hover-lift">سوالات</a></li>
              <li><a href="#blog" className="hover-lift">وبلاگ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="t-label" style={{ color: "#fff", marginBottom: "var(--space-4)" }}>تماس</h4>
            <ul style={{ display: "grid", gap: "var(--space-2)", fontSize: "14px" }}>
              <li><a href="#consult" className="hover-lift">مشاوره رایگان</a></li>
              <li><a href="#consult" className="hover-lift">ارتباط با ما</a></li>
              <li><a href="#comments" className="hover-lift">نظرات هنرجویان</a></li>
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
