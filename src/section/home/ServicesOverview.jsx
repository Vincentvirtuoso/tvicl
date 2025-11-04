import React from "react";
import { motion } from "framer-motion";
import { FiHome } from "react-icons/fi";
import { MdDesignServices, MdConstruction } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ServicesOverview = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <FiHome size={30} />,
      title: "Property Sales",
      description:
        "Browse premium properties curated for your lifestyle and budget.",
      color: "from-yellow-400 to-yellow-600",
      link: "/property/list",
    },
    {
      icon: <MdDesignServices size={30} />,
      title: "Interior Design",
      description:
        "Transform your space with professional design services tailored to you.",
      color: "from-blue-400 to-blue-600",
      link: "/interior-decoration",
    },
    {
      icon: <MdConstruction size={30} />,
      title: "Construction & Build",
      description:
        "Build your dream from the ground up with our expert construction team.",
      color: "from-red-400 to-red-600",
      link: "/construction",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Everything You Need Under One Roof
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From finding your property to designing and building it — we've got
            you covered.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              onClick={() => navigate(service.link)}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div
                className={`w-15 h-15 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}
              >
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <button className="text-yellow-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn More
                <span>→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
