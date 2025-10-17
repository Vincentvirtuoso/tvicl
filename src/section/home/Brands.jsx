import React from "react";
import { brands } from "../../data/brands";
import { motion } from "framer-motion";

const Brands = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="bg-primary/95 backdrop-blur-sm py-6 px-4 flex flex-col items-center rounded-t-3xl shadow-md"
    >
      <p className="text-gray-900 font-semibold tracking-wide mb-4">
        Trusted by Leading Real Estate Brands
      </p>

      <ul className="flex flex-wrap justify-center items-center gap-6">
        {brands.map(({ logoUrl, name }) => (
          <motion.li
            key={name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-24 grayscale hover:grayscale-0 transition-all"
          >
            <img
              src={logoUrl}
              alt={name}
              className="w-full object-contain opacity-80 hover:opacity-100 transition"
            />
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Brands;
