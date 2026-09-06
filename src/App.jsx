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
import CourseSingle from "./pages/CourseSingle/index.jsx";
import Auth from "./pages/Auth/index.jsx";
import Dashboard from "./pages/Panel/Dashboard.jsx";
import Profile from "./pages/Panel/Profile.jsx";
import Assignments from "./pages/Panel/Assignments.jsx";
import PanelCourses from "./pages/Panel/Courses.jsx";
import Certificates from "./pages/Panel/Certificates.jsx";
import Mentor from "./pages/Panel/Mentor.jsx";
import StudyGroup from "./pages/Panel/StudyGroup.jsx";
import Events from "./pages/Panel/Events.jsx";
import Support from "./pages/Panel/Support.jsx";

/* صفحات پنل — key: صفحه، value: کامپوننت */
const PANEL_PAGES = {
  dashboard: Dashboard,
  profile: Profile,
  assignments: Assignments,
  courses: PanelCourses,
  certs: Certificates,
  mentor: Mentor,
  group: StudyGroup,
  events: Events,
  support: Support,
};
const PANEL_HASH = { dashboard: "panel", profile: "panel/profile", assignments: "panel/assignments", courses: "panel/courses", certs: "panel/certs", mentor: "panel/mentor", group: "panel/group", events: "panel/events", support: "panel/support" };

export default function App() {
  /* روت‌گذاری ساده با هش:
     #panel/<page> → پنل هنرجو
     #article/<slug> → تک‌صفحهٔ بلاگ
     #blog-index / #courses-index → صفحات مستقل
     بقیهٔ هش‌ها (مثل #courses / #blog) → صفحهٔ اصلی + اسکرول به سکشن */
  const [hash, setHash] = useState(() => window.location.hash || "");

  useEffect(() => {
    const onHash = () => setHash(window.location.hash || "");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  /* پنل هنرجو: #panel → dashboard، #panel/<page> → صفحهٔ مربوطه */
  let panelPage = null;
  if (hash === "#panel" || hash.startsWith("#panel/")) {
    const sub = hash.replace(/^#panel\/?/, "");
    panelPage = PANEL_PAGES[sub] ? sub : "dashboard";
  }
  const PanelComp = panelPage ? PANEL_PAGES[panelPage] : null;

  const m = panelPage ? null : hash.match(/^#article\/(.+)$/);
  const articleSlug = m ? decodeURIComponent(m[1]) : null;
  const mc = panelPage ? null : hash.match(/^#course\/(.+)$/);
  const courseSlug = mc ? decodeURIComponent(mc[1]) : null;
  const authPage = !panelPage && !articleSlug && !courseSlug && (hash === "#auth" || hash === "#auth/register");
  const blogIndex = !panelPage && !articleSlug && !courseSlug && !authPage && hash === "#blog-index";
  const coursesPage = !panelPage && !articleSlug && !courseSlug && !authPage && !blogIndex && hash === "#courses-index";
  const anchor = !panelPage && !articleSlug && !courseSlug && !authPage && !blogIndex && !coursesPage && hash.startsWith("#") ? decodeURIComponent(hash.slice(1)) : null;

  /* ورود به مقاله / تک‌دوره / auth / صفحهٔ بلاگ / دوره‌ها / پنل → شروع از بالا */
  const pageMode = blogIndex || coursesPage || !!articleSlug || !!courseSlug || !!panelPage || authPage;
  useEffect(() => {
    if (pageMode) window.scrollTo({ top: 0, behavior: "auto" });
  }, [pageMode, articleSlug, courseSlug, panelPage]);

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
    window.location.hash = PANEL_HASH[p] || "panel";
  };

  return (
    <>
      {panelPage ? (
        <PanelComp key={panelPage} onNavigate={goPanel} />
      ) : authPage ? (
        <Auth />
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
            ) : courseSlug ? (
              <CourseSingle key={courseSlug} slug={courseSlug} />
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
