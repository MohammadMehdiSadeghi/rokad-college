import Header from "./sections/Header.jsx";
import Hero from "./sections/Hero.jsx";
import PromoCards from "./sections/PromoCards.jsx";
import PromoSection from "./sections/PromoSection.jsx";
import Features from "./sections/Features.jsx";
import Courses from "./sections/Courses.jsx";
import CourseCta from "./sections/CourseCta.jsx";
import Faq from "./sections/Faq.jsx";
import Comments from "./sections/Comments.jsx";
import Blogs from "./sections/Blogs.jsx";
import Footer from "./sections/Footer.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PromoCards />
        <PromoSection />
        <Features />
        <Courses />
        <CourseCta />
        <Faq />
        <Comments />
        <Blogs />
      </main>
      <Footer />
    </>
  );
}
