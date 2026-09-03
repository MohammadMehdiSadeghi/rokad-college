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

export default function App() {
  /* روت‌گذاری ساده با هش:
     #article/<slug> → تک‌صفحهٔ بلاگ
     بقیهٔ هش‌ها (مثل #courses / #blog) → صفحهٔ اصلی + اسکرول به سکشن */
  const [hash, setHash] = useState(() => window.location.hash || "");

  useEffect(() => {
    const onHash = () => setHash(window.location.hash || "");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const m = hash.match(/^#article\/(.+)$/);
  const articleSlug = m ? decodeURIComponent(m[1]) : null;
  const anchor = !articleSlug && hash.startsWith("#") ? decodeURIComponent(hash.slice(1)) : null;

  /* ورود به مقاله → شروع از بالا */
  useEffect(() => {
    if (articleSlug) window.scrollTo({ top: 0, behavior: "auto" });
  }, [articleSlug]);

  /* بازگشت به صفحهٔ اصلی با anchor → بعد از mount شدن سکشن‌ها اسکرول کن */
  useEffect(() => {
    if (anchor) {
      const t = setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 140);
      return () => clearTimeout(t);
    }
  }, [anchor, articleSlug]);

  return (
    <>
      <Header />
      <main>
        {articleSlug ? (
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
  );
}