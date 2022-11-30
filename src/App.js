import React, { useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Hero from "./components/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import Services from "./components/Services.jsx";
import Recommend from "./components/Recommend.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Footer from "./components/Footer.jsx";
import ScrollReveal from "scrollreveal";

export default function App() {
  useEffect(() => {
    const sr = ScrollReveal({
      //Animations
      origin: "top",
      distance: "80px",
      duration: 2000,
      reset: true,
    });
    sr.reveal(
      `
      nav,
      #hero,
      #services,
      #recommend,
      #testimonials,
      footer`,
      {
        opacity: 0,
        interval: 300,
      }
    );
  }, []);
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Hero />
      <Services />
      <Recommend />
      <Testimonials />
      <Footer />
    </>
  );
}
