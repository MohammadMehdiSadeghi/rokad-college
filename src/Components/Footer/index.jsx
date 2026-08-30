import Logo from "../Logo.jsx";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" id="consult">
      <div className="container footer-grid">
        <div>
          <Logo withWord />
          <p>یادگیری کاربردی، تجربهٔ واقعی و مسیری روشن برای آیندهٔ حرفه‌ای.</p>
        </div>
        <div>
          <h3>کالج</h3>
          <a href="#promo">درباره کالج</a>
          <a href="#courses">دوره‌ها</a>
          <a href="#faq">سوالات پرتکرار</a>
        </div>
        <div>
          <h3>ارتباط</h3>
          <a href="#consult">مشاوره رایگان</a>
          <a href="#consult">تماس با ما</a>
          <div className="socials">
            <a href="#" aria-label="اینستاگرام">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" aria-label="لینکدین">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="container copyright">
        © {year} کالج رکاد — همهٔ حقوق محفوظ است.
      </div>
    </footer>
  );
}
