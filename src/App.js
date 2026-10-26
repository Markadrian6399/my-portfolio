import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Portfolio from "./components/Portfolio";
import ProfileCard from "./components/ProfileCard";
import Services from "./components/Services";
import SideNav from "./components/SideNav";
import Skills from "./components/Skills";
import Work from "./components/Work";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="noise-overlay" />
      <ProfileCard />
      <main className="px-4 pb-28 sm:px-6 lg:ml-[424px] lg:pb-16 lg:pl-16 lg:pr-28 xl:ml-[480px]">
        <div className="mx-auto max-w-[720px]">
          <section id="home">
            <Home />
          </section>
          <section id="about" className="pt-28 lg:pt-36">
            <About />
          </section>
          <section id="work" className="pt-28 lg:pt-36">
            <Work />
          </section>
          <section id="portfolio" className="pt-28 lg:pt-36">
            <Portfolio />
          </section>
          <section id="services" className="pt-28 lg:pt-36">
            <Services />
          </section>
          <section id="skills" className="pt-28 lg:pt-36">
            <Skills />
          </section>
          <section id="contact" className="pt-28 lg:pt-36">
            <Contact />
          </section>
        </div>
      </main>
      <SideNav />
      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;
