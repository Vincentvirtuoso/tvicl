import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Hero from "../section/home/Hero";
import ServicesOverview from "../section/home/ServicesOverview";
import ExclusiveProperties from "../section/home/ExclusiveProperties";
import WhyChooseUs from "../section/home/WhyChooseUs";
import CTASection from "../section/home/CTASection";

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <ServicesOverview />
      <ExclusiveProperties />
      <WhyChooseUs />
      <CTASection />
    </div>
  );
};

export default Home;
