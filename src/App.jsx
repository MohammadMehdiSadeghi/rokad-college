import { useEffect } from "react";
import Header from "./Components/Header/index.jsx";
import Hero from "./pages/Home/sections/Hero/index.jsx";
import PromoBenefits from "./pages/Home/sections/PromoBenefits/index.jsx";
import About from "./pages/Home/sections/About/index.jsx";
import StatsTicker from "./pages/Home/sections/StatsTicker/index.jsx";
import Courses from "./pages/Home/sections/Courses/index.jsx";
import CourseCta from "./pages/Home/sections/CourseCta/index.jsx";
import Faq from "./pages/Home/sections/Faq/index.jsx";
import Comments from "./pages/Home/sections/Comments/index.jsx";
import Blogs from "./pages/Home/sections/Blogs/index.jsx";
import RokadHierarchy from "./pages/Home/sections/RokadHierarchy/index.jsx";
import Footer from "./Components/Footer/index.jsx";

export default function App() {
  // Scroll-reveal: IntersectionObserver adds .visible when section enters viewport
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return; // skip animation for a11y

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="reveal"><PromoBenefits /></div>
        <div className="reveal"><StatsTicker /></div>
        <div className="reveal"><About /></div>
        <div className="reveal"><RokadHierarchy /></div>
        <div className="reveal"><Courses /></div>
        <div className="reveal"><CourseCta /></div>
        <div className="reveal"><Faq /></div>
        <div className="reveal"><Comments /></div>
        <div className="reveal"><Blogs /></div>
      </main>
      <Footer />
    </>
  );
}