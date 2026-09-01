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

export default function App() {
  return (
    <>
      <Header />
      <main>
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
      </main>
      <Footer />
    </>
  );
}