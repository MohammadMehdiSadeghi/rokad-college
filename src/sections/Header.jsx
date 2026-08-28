import Logo from "../components/Logo.jsx";
import BrandButton from "../components/BrandButton.jsx";

export default function Header() {
  return (
    <header className="site-header" id="top">
      <div className="container nav">
        <Logo />
        <nav className="nav-links">
          <a href="#promo">چرا رکاد</a>
          <a href="#features">ویژگی‌ها</a>
          <a href="#courses">دوره‌ها</a>
          <a href="#faq">سوالات</a>
          <a href="#comments">نظرات</a>
          <a href="#blog">وبلاگ</a>
        </nav>
        <BrandButton href="#consult" variant="teal" size="btn-sm" rotate="rotate-minus3">
          مشاوره رایگان
        </BrandButton>
      </div>
    </header>
  );
}
