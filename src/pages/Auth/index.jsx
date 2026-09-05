/* ============================================================
   ورود / ثبت‌نام — Auth
   باز شدن: #auth (و #auth/register برای تب ثبت‌نام)
   UI فعلاً نمایشی است: «ورود مهمان» مستقیم به پنل می‌رود.
   ============================================================ */
import { useState } from "react";
import "./auth.css";

const FA = "۰۱۲۳۴۵۶۷۸۹";
const toFa = (n) => String(n).replace(/\d/g, (d) => FA[d]);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="3" />
    <line x1="10" y1="19" x2="14" y2="19" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

export default function Auth() {
  const [mode, setMode] = useState("login"); // login | register
  const [sent, setSent] = useState(false);

  const isLogin = mode === "login";

  return (
    <main className="auth-page" id="auth">
      {/* پترن پس‌زمینه */}
      <div className="auth-pattern" aria-hidden="true" />

      <div className="auth-card">
        {/* برند */}
        <div className="auth-brand">
          <span className="mark">
            <img src="/assets/Shared/Logos/logo-white-512.png" alt="" aria-hidden="true" />
          </span>
          <span className="txt">
            <b>رکاد کالج</b>
            <small>ROKAD COLLEGE</small>
          </span>
        </div>

        {/* تب‌ها */}
        <div className="auth-tabs" role="tablist">
          <button role="tab" aria-selected={isLogin} className={isLogin ? "on" : ""} onClick={() => { setMode("login"); setSent(false); }}>
            ورود
          </button>
          <button role="tab" aria-selected={!isLogin} className={!isLogin ? "on" : ""} onClick={() => { setMode("register"); setSent(false); }}>
            ثبت‌نام
          </button>
        </div>

        {!sent ? (
          <form
            className="auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label className="auth-field">
              <span className="lbl">
                <PhoneIcon />
                شمارهٔ موبایل
              </span>
              <input
                type="tel"
                dir="ltr"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                required
                pattern="[0-9۰-۹]{11}"
                inputMode="numeric"
              />
            </label>

            {!isLogin && (
              <label className="auth-field">
                <span className="lbl">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  نام و نام خانوادگی
                </span>
                <input type="text" placeholder="مثلاً پارسا محمدی" required />
              </label>
            )}

            <label className="auth-field">
              <span className="lbl">
                <LockIcon />
                رمز عبور
              </span>
              <input type="password" placeholder="••••••••" required minLength={6} />
            </label>

            {isLogin && (
              <button type="button" className="auth-forgot">فراموشی رمز؟</button>
            )}

            <button type="submit" className="auth-submit">
              {isLogin ? "ورود به حساب" : "ساخت حساب جدید"}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>
          </form>
        ) : (
          /* ---------- مرحلهٔ OTP (نمایشی) ---------- */
          <div className="auth-otp">
            <div className="otp-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.79.65 2.63a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.45-1.22a2 2 0 0 1 2.11-.45c.84.31 1.73.53 2.63.65A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <b>کد تایید پیامک شد</b>
            <p>
              کد {toFa(5)} رقمی ارسال‌شده به شماره‌ات رو وارد کن
              <small>(نسخهٔ نمایشی — کد: {toFa(12345)})</small>
            </p>
            <div className="otp-boxes" dir="ltr">
              {[1, 2, 3, 4, 5].map((i) => (
                <input key={i} type="text" maxLength={1} inputMode="numeric" defaultValue={i <= 5 ? String(i) : ""} readOnly aria-label={`رقم ${toFa(i)}`} />
              ))}
            </div>
            <button
              className="auth-submit"
              onClick={() => {
                window.location.hash = "panel";
              }}
            >
              تایید و ورود
            </button>
            <button className="auth-forgot" onClick={() => setSent(false)}>
              تغییر شماره
            </button>
          </div>
        )}

        {/* ---------- ورود مهمان ---------- */}
        <div className="auth-guest-wrap">
          <span className="or">یا</span>
          <a
            href="#panel"
            className="auth-guest"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <path d="M10 17l5-5-5-5" />
              <path d="M15 12H3" />
            </svg>
            ورود مهمان — برو مستقیم تو پنل
          </a>
        </div>

        <p className="auth-terms">
          با ورود، <a href="#faq">قوانین و شرایط</a> رکاد کالج رو می‌پذیری.
        </p>
      </div>
    </main>
  );
}
