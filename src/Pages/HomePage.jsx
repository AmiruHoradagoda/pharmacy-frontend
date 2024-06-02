import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Service from "../components/Service";
import AboutUs from "../components/AboutUs";
import HeroSection from "../components/HeroSection";
import { scroller } from "react-scroll";

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTo = params.get("scroll");

    if (scrollTo) {
      scroller.scrollTo(scrollTo, {
        smooth: true,
        duration: 500,
        offset: -70,
      });
    }
  }, [location]);

  return (
    <div>
      <HeroSection />
      <section id="services">
        <Service />
      </section>
      <section id="about">
        <AboutUs />
      </section>
    </div>
  );
};

export default HomePage;
