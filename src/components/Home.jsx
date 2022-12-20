import React, { useEffect } from "react";
import ScrollToTop from "./ScrollToTop.jsx";
import Hero from "./Hero.jsx";
import Navbar from "./Navbar.jsx";
import Services from "./Services.jsx";
import Recommend from "./Recommend.jsx";
import Testimonials from "./Testimonials.jsx";
import Footer from "./Footer.jsx";
import ScrollReveal from "scrollreveal";

export default function Home() {
  useEffect(() => {
    const sr = ScrollReveal({
      //Animations
      origin: "top",
      distance: "80px",
      duration: 1700,
      reset: false,
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
        interval: 800,
      }
    );
  }, []);
  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <Hero />
      <Services />
      <Recommend />
      <Testimonials />
      <Footer />
    </div>
  );
}
