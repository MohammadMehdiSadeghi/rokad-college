import { useEffect, useState } from "react";
import Header from "./Components/Header/index.jsx";
import Hero from "./pages/Home/sections/Hero/index.jsx";
import PromoBenefits from "./pages/Home/sections/PromoBenefits/index.jsx";
import StatsTicker from "./pages/Home/sections/StatsTicker/index.jsx";
import About from "./pages/Home/sections/About/index.jsx";
import Courses from "./pages/Home/sections/Courses/index.jsx";
import CourseCta from "./pages/Home/sections/CourseCta/index.jsx";
import Faq from "./pages/Home/sections/Faq/index.jsx";
import Comments from "./pages/Home/sections/Comments/index.jsx";
import Blogs from "./pages/Home/sections/Blogs/index.jsx";
import Footer from "./Components/Footer/index.jsx";
import Dashboard from "./pages/Panel/Dashboard.jsx";
import Profile from "./pages/Panel/Profile.jsx";

/* ---- Tiny hash router: #panel | #panel/profile ---- */
function usePanelRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  if (hash.startsWith("#panel/profile")) return "profile";
  if (hash.startsWith("#panel")) return "dashboard";
  return null;
}

function Landing() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PromoBenefits />
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

export default function App() {
  const panel = usePanelRoute();

  if (panel === "dashboard") {
    return <Dashboard onNavigate={(p) => (window.location.hash = p === "profile" ? "panel/profile" : "panel")} />;
  }
  if (panel === "profile") {
    return <Profile onNavigate={(p) => (window.location.hash = p === "profile" ? "panel/profile" : "panel")} />;
  }
  return <Landing />;
}
