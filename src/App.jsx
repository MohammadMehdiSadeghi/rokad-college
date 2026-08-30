import Header from "./Components/Header/index.jsx";
import Hero from "./views/Home/sections/Hero/index.jsx";
import PromoCards from "./views/Home/sections/PromoCards/index.jsx";
import PromoCards2 from "./views/Home/sections/PromoCards2/index.jsx";
import PromoSection from "./views/Home/sections/PromoSection/index.jsx";
import Features from "./views/Home/sections/Features/index.jsx";
import Courses from "./views/Home/sections/Courses/index.jsx";
import CourseCta from "./views/Home/sections/CourseCta/index.jsx";
import Faq from "./views/Home/sections/Faq/index.jsx";
import Comments from "./views/Home/sections/Comments/index.jsx";
import Blogs from "./views/Home/sections/Blogs/index.jsx";
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
