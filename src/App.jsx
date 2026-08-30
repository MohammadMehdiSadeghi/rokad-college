import Header from "./Components/Header/index.jsx";
import Hero from "./views/Home/sections/Hero/index.jsx";
import PromoCards from "./views/Home/sections/PromoCards/index.jsx";
import PathSection from "./views/Home/sections/PathSection/index.jsx";
import NumbersSection from "./views/Home/sections/NumbersSection/index.jsx";
import Courses from "./views/Home/sections/Courses/index.jsx";
import LabSection from "./views/Home/sections/LabSection/index.jsx";
import Testimonials from "./views/Home/sections/Testimonials/index.jsx";
import BlogSection from "./views/Home/sections/BlogSection/index.jsx";
import Faq from "./views/Home/sections/Faq/index.jsx";
import FinalCta from "./views/Home/sections/FinalCta/index.jsx";
import Footer from "./Components/Footer/index.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PromoCards />
        <PathSection />
        <NumbersSection />
        <Courses />
        <LabSection />
        <Testimonials />
        <BlogSection />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
