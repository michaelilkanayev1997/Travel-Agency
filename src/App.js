import React from "react";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Hero from "./components/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import Services from "./components/Services.jsx";
import Recommend from "./components/Recommend.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return <>
  <ScrollToTop />
  <Navbar />
  <Hero />
  <Services />
  <Recommend /><Testimonials />
  <Footer />
  </>;
}
