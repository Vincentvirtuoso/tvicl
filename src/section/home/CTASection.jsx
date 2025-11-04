import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-yellow-400 to-orange-600 text-white my-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl mb-8 text-white/90">
          Join thousands of satisfied clients who found their dream homes with
          us
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/property/list")}
            className="px-8 py-4 bg-white text-orange-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Browse Properties
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
          >
            Schedule Consultation
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
