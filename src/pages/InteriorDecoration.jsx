import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSun, FiLayers, FiCheck } from "react-icons/fi";
import { FaBrush } from "react-icons/fa";

const decorTips = [
  {
    icon: <FiSun className="text-3xl text-emerald-400" />,
    title: "Lighting",
    description: "Choose natural and artificial lighting that enhances your rooms' ambiance.",
  },
  {
    icon: <FaBrush className="text-3xl text-pink-500" />,
    title: "Color Palette",
    description: "Select harmonious colors that reflect your personality and style.",
  },
  {
    icon: <FiLayers className="text-3xl text-blue-500" />,
    title: "Furniture Layout",
    description: "Arrange furniture to maximize space, flow, and comfort.",
  },
];

const InteriorDecoration = () => {
  const [sliderPos, setSliderPos] = useState(50); // For before/after slider

  return (
    <motion.div
      className="min-h-screen px-8 py-24 max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <motion.div
        className="flex flex-col md:flex-row items-center gap-8 mb-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">Decorate Your Home Interior</h1>
          <p className="text-gray-600 mb-6">
            Transform your living spaces with expert decoration tips, lighting, furniture layouts, and color palettes.
          </p>
        </div>
        <div className="flex-1 w-full">
          <img
            src="/images/hero-2.jpg"
            alt="Interior Decoration"
            className="w-full h-full max-h-[350px] object-cover rounded-3xl"
          />
        </div>
      </motion.div>

      {/* Tips Section */}
      <motion.div
        className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {decorTips.map((tip, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-xl flex flex-col items-start gap-4 shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.025 }}
          >
            <div className="flex items-center gap-4">
              {tip.icon}
              <h2 className="text-xl font-semibold">{tip.title}</h2>
            </div>
            <p className="text-gray-600">{tip.description}</p>
            <button className="mt-auto flex items-center gap-2 text-primary font-semibold hover:underline">
              Learn More <FiCheck />
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* Before / After Section */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}>
        <h2 className="text-3xl font-bold text-center mb-8">
          Before & After Transformation
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Before Card */}
          <motion.div
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src="https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1080&q=80"
              alt="Before"
              className="w-full h-64 object-cover"
            />


            <div className="p-4">
              <h3 className="font-semibold text-lg">Before</h3>
              <p className="text-gray-600 text-sm mt-1">
                The space before interior decoration, showing the original layout and design.
              </p>
            </div>
          </motion.div>

          {/* After Card */}
          <motion.div
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw5MTMyMXwwfDF8c2VhfHx8fHx8fHwxNjkwMzQ0NTc4&ixlib=rb-4.0.3&q=80&w=1080"
              alt="After"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">After</h3>
              <p className="text-gray-600 text-sm mt-1">
                The transformed space after interior decoration, optimized for style and comfort.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>


      {/* CTA Section */}
      <motion.div
        className="bg-primary/10 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-2xl font-bold text-primary">
          Ready to transform your home?
        </h2>
        <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition">
          Book a Consultation
        </button>
      </motion.div>
    </motion.div>
  );
};

export default InteriorDecoration;
