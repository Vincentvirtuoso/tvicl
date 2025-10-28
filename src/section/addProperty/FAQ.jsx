import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

const faqs = [
  {
    category: "Selling",
    questions: [
      {
        q: "Am I eligible to sell my property?",
        a: "Yes. As long as you’re the verified owner or have authorization to represent the property, you can list it for sale on our platform.",
      },
      {
        q: "How do I list my property?",
        a: "Simply sign in to your dashboard, navigate to 'List Property', fill in the details, upload images, and submit for verification.",
      },
      {
        q: "Are there any listing fees?",
        a: "Listing is free, but we may charge a small commission once your property is successfully sold.",
      },
      {
        q: "Can I edit or remove my listing?",
        a: "Yes. You can edit or unlist your property anytime from your dashboard without losing your existing data.",
      },
    ],
  },
  {
    category: "Agents",
    questions: [
      {
        q: "How are agents verified?",
        a: "All agents undergo a multi-step verification process including ID checks, license validation, and background screening.",
      },
      {
        q: "What if I’m not satisfied with an agent?",
        a: "You can report an agent through your profile dashboard. Our team will review the case and ensure proper follow-up.",
      },
      {
        q: "Can I switch agents mid-process?",
        a: "Absolutely. You can request a new agent if your current experience doesn’t meet your expectations.",
      },
      {
        q: "Do agents charge extra fees?",
        a: "All agent fees are transparent and displayed upfront before engagement — no hidden costs.",
      },
    ],
  },
  {
    category: "Buying",
    questions: [
      {
        q: "How do I find the right property?",
        a: "Use our search filters to sort by price, location, property type, and amenities to find listings that match your preferences.",
      },
      {
        q: "Can I schedule a property tour?",
        a: "Yes. Once you’re logged in, you can request an in-person or virtual tour directly through the property’s page.",
      },
      {
        q: "Is financing available?",
        a: "We partner with mortgage providers to help eligible buyers access flexible financing options.",
      },
    ],
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="max-w-6xl mx-auto space-y-10 px-4 py-8"
    >
      <h2 className="text-3xl font-bold text-gray-800 text-center">
        Frequently Asked Questions
      </h2>

      <div className="space-y-8">
        {faqs.map((group, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="text-xl font-semibold text-yellow-700">
              About {group.category}
            </h3>

            <div className="space-y-3">
              {group.questions.map((item, i) => {
                const isOpen = openIndex === `${idx}-${i}`;
                return (
                  <div
                    key={i}
                    className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white"
                  >
                    <button
                      onClick={() => toggleFAQ(`${idx}-${i}`)}
                      className="w-full flex justify-between items-center text-left p-4 focus:outline-none"
                    >
                      <span className="font-medium text-gray-800">
                        {item.q}
                      </span>
                      <LuChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-yellow-600" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-4 pb-4 text-gray-600 text-sm leading-relaxed"
                        >
                          {item.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
