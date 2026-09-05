import { useEffect, useState } from "react";
import Header from "./Components/Header/index.jsx";
import Hero from "./pages/Home/sections/Hero/index.jsx";
import PromoBenefits from "./pages/Home/sections/PromoBenefits/index.jsx";
import Departments from "./pages/Home/sections/Departments/index.jsx";
import About from "./pages/Home/sections/About/index.jsx";
import StatsTicker from "./pages/Home/sections/StatsTicker/index.jsx";
import Courses from "./pages/Home/sections/Courses/index.jsx";
import CourseCta from "./pages/Home/sections/CourseCta/index.jsx";
import Faq from "./pages/Home/sections/Faq/index.jsx";
import Comments from "./pages/Home/sections/Comments/index.jsx";
import Blogs from "./pages/Home/sections/Blogs/index.jsx";
import Footer from "./Components/Footer/index.jsx";
import BlogArticle from "./pages/BlogArticle/index.jsx";
import BlogIndex from "./pages/BlogIndex/index.jsx";
import CoursesPage from "./pages/CoursesPage/index.jsx";
import Dashboard from "./pages/Panel/Dashboard.jsx";
import Profile from "./pages/Panel/Profile.jsx";
import Assignments from "./pages/Panel/Assignments.jsx";

export default function App() {
  /* روت‌گذاری ساده با هش:
     #panel | #panel/profile | #panel/assignments → پنل هنرجو
     #article/<slug> → تک‌صفحهٔ بلاگ
     #blog-index / #courses-index → صفحات مستقل
     بقیهٔ هش‌ها (مثل #courses / #blog) → صفحهٔ اصلی + اسکرول به سکشن */
  const [hash, setHash] = useState(() => window.location.hash || "");

  useEffect(() => {
    const onHash = () => setHash(window.location.hash || "");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  /* پنل هنرجو */
  const panelPage = hash.startsWith("#panel")
    ? hash.startsWith("#panel/profile")
      ? "profile"
      : hash.startsWith("#panel/assignments")
        ? "assignments"
        : "dashboard"
    : null;

  const m = panelPage ? null : hash.match(/^#article\/(.+)$/);
  const articleSlug = m ? decodeURIComponent(m[1]) : null;
  const blogIndex = !panelPage && !articleSlug && hash === "#blog-index";
  const coursesPage = !panelPage && !articleSlug && !blogIndex && hash === "#courses-index";
  const anchor = !panelPage && !articleSlug && !blogIndex && !coursesPage && hash.startsWith("#") ? decodeURIComponent(hash.slice(1)) : null;

  /* ورود به مقاله / صفحهٔ بلاگ / دوره‌ها / پنل → شروع از بالا */
  const pageMode = blogIndex || coursesPage || !!articleSlug || !!panelPage;
  useEffect(() => {
    if (pageMode) window.scrollTo({ top: 0, behavior: "auto" });
  }, [pageMode, articleSlug, panelPage]);

  /* بازگشت به صفحهٔ اصلی با anchor → بعد از mount شدن سکشن‌ها اسکرول کن */
  useEffect(() => {
    if (anchor) {
      const t = setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 140);
      return () => clearTimeout(t);
    }
  }, [anchor, articleSlug]);

  /* ناوبری داخل پنل */
  const goPanel = (p) => {
    window.location.hash = { profile: "panel/profile", assignments: "panel/assignments", dashboard: "panel" }[p] || "panel";
  };

  return (
    <>
      {panelPage === "profile" ? (
        <Profile onNavigate={goPanel} />
      ) : panelPage === "assignments" ? (
        <Assignments onNavigate={goPanel} />
      ) : panelPage === "dashboard" ? (
        <Dashboard onNavigate={goPanel} />
      ) : (
        <>
          <Header />
          <main>
            {coursesPage ? (
              <CoursesPage />
            ) : blogIndex ? (
              <BlogIndex />
            ) : articleSlug ? (
              <BlogArticle key={articleSlug} slug={articleSlug} />
            ) : (
              <>
                <Hero />
                <PromoBenefits />
                <Departments layout="row3" />
                <StatsTicker />
                <About />
                <Courses />
                <CourseCta />
                <Faq />
                <Comments />
                <Blogs />
              </>
            )}
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
