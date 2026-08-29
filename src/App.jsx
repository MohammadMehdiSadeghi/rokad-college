import Header from "./Components/Header/index.jsx";
import Hero from "./pages/Home/sections/Hero/index.jsx";
import PromoCards from "./pages/Home/sections/PromoCards/index.jsx";
import PromoCards2 from "./pages/Home/sections/PromoCards2/index.jsx";
import PromoSection from "./pages/Home/sections/PromoSection/index.jsx";
import Features from "./pages/Home/sections/Features/index.jsx";
import Courses from "./pages/Home/sections/Courses/index.jsx";
import CourseCta from "./pages/Home/sections/CourseCta/index.jsx";
import Faq from "./pages/Home/sections/Faq/index.jsx";
import Comments from "./pages/Home/sections/Comments/index.jsx";
import Blogs from "./pages/Home/sections/Blogs/index.jsx";
import Footer from "./Components/Footer/index.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PromoCards />
        <PromoCards2 />
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