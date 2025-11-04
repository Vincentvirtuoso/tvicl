import { motion } from "framer-motion";
import { FiAward, FiShield, FiUsers, FiCheckCircle } from "react-icons/fi";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <FiAward size={32} />,
      title: "Award-Winning Service",
      description: "Recognized for excellence in real estate and construction",
    },
    {
      icon: <FiShield size={32} />,
      title: "100% Secure Transactions",
      description: "Your investment is protected with our verified processes",
    },
    {
      icon: <FiUsers size={32} />,
      title: "Expert Team",
      description: "Decades of combined experience in property and design",
    },
    {
      icon: <FiCheckCircle size={32} />,
      title: "Proven Track Record",
      description: "98% client satisfaction rate across all services",
    },
  ];

  return (
    <section className="py-20 px-6 bg-secondary text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose TVICL?
          </h2>
          <p className="text-xl text-gray-300">
            We're not just another real estate platform — we're your complete
            home solution
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-yellow-400">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
              <p className="text-gray-300">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
