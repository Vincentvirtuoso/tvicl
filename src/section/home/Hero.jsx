import React from "react";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import Brands from "./Brands";
import SectionTitle from "../../components/common/SectionTitle";

const Hero = () => {
  return (
    <section className="relative h-[90vh] flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('images/hero.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center px-6 max-w-3xl"
      >
        <SectionTitle
          title={
            <>
              Turning Your{" "}
              <span className="text-primary drop-shadow-md">Real Estate</span>{" "}
              Dreams into Reality
            </>
          }
          subtitle="Discover your dream home effortlessly — modern listings, seamless
          navigation, and real results."
          showLine
        />

        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex items-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg w-full md:w-[600px] mx-auto overflow-hidden"
        >
          <input
            type="text"
            placeholder="Search by location, city, or ZIP..."
            className="flex-1 px-5 py-3 text-gray-700 bg-transparent outline-none placeholder-gray-500"
          />
          <button className="bg-primary text-secondary p-3 rounded-full m-1 transition-all hover:bg-primary/80 active:scale-85">
            <FiSearch size={20} />
          </button>
        </motion.div>
      </motion.div>

      {/* Brand Section */}
      <div className="absolute bottom-0 w-full">
        <Brands />
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-22 bg-gradient-to-t from-black/60 to-transparent" />
    </section>
  );
};

export default Hero;
