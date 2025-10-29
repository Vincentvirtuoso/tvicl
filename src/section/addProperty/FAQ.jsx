import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

const faqs = [
  {
    category: "Selling",
    questions: [
      {
        q: "Am I eligible to sell my property?",
        a: "Yes. As long as you’re the verified owner or have legal authorization to represent the property, you can list it on our platform. Verification may include proof of ownership, property documents, or authorization letters if acting on behalf of someone else.",
      },
      {
        q: "How do I list my property?",
        a: "Simply sign in to your agent or estate dashboard, navigate to 'List Property' in the menu, fill out key details such as title, location, price, and amenities, upload clear images, and submit for verification. Once approved, your listing becomes visible to potential buyers immediately.",
      },
      {
        q: "Are there any listing fees?",
        a: "Listing your property is completely free. However, we may charge a small success commission once your property is sold. This ensures that you only pay when you get results — no upfront or hidden fees.",
      },
      {
        q: "Can I edit or remove my listing?",
        a: "Yes. You can edit, update, or unlist your property anytime from your dashboard without losing your existing data or progress. Changes are reviewed and re-approved quickly to maintain listing integrity.",
      },
      {
        q: "How long does property verification take?",
        a: "Property verification typically takes 12–24 hours, depending on the completeness of your documents and image uploads. Our team manually reviews every submission to ensure quality and authenticity.",
      },
      {
        q: "What kind of properties can I sell?",
        a: "You can list residential, commercial, and land properties — including apartments, condos, bungalows, office spaces, and plots. Each category has tailored fields to make your listing stand out to the right buyers.",
      },
    ],
  },
  {
    category: "Agents",
    questions: [
      {
        q: "How are agents verified?",
        a: "All agents undergo a multi-step verification process that includes ID verification, license validation with local authorities, and background screening. Verified agents display a 'Verified Badge' on their profiles for transparency and trust.",
      },
      {
        q: "What if I’m not satisfied with an agent?",
        a: "You can report an agent directly from your profile dashboard. Once reported, our review team investigates the case within 48 hours and takes appropriate actions — from mediation to account suspension for repeated offenses.",
      },
      {
        q: "Can I switch agents mid-process?",
        a: "Absolutely. If your current agent doesn’t meet your expectations, you can request a new agent anytime. Your property data remains intact, and the transition is seamless to avoid any disruption in your sale process.",
      },
      {
        q: "Do agents charge extra fees?",
        a: "Agent fees are transparent and displayed upfront before engagement. No hidden costs. Each agent defines their commission terms which are clearly shown before you confirm collaboration.",
      },
      {
        q: "How do I become a verified agent?",
        a: "Simply go to the 'Become Agent or Agency' page, complete your profile, upload your ID and license documents, and submit for verification. Once approved, you’ll gain access to your Agent Dashboard to list properties and manage clients.",
      },
      {
        q: "Can an agent work under multiple estates?",
        a: "No. Each agent account is tied to one verified estate at a time to maintain accountability and compliance. You can, however, request to transfer your affiliation if necessary through our support team.",
      },
    ],
  },
  {
    category: "Buying",
    questions: [
      {
        q: "How do I find the right property?",
        a: "You can use our smart search filters to narrow down results by price range, location, number of bedrooms, property type, and available amenities. Each listing includes detailed descriptions, verified agent info, and high-quality photos to help you make informed decisions.",
      },
      {
        q: "Can I schedule a property tour?",
        a: "Yes. Once logged in, you can request a property tour — either in-person or virtual. Our agents will coordinate with you to find a convenient time, ensuring a smooth and transparent viewing process.",
      },
      {
        q: "Is financing available?",
        a: "Yes. We partner with reputable mortgage providers to offer flexible financing options for eligible buyers. You can pre-check your eligibility and get connected to financing partners directly through your buyer dashboard.",
      },
      {
        q: "How do I contact the seller or agent?",
        a: "Each property page includes a secure contact form and messaging option that connects you directly to the admin before the verified agent or estate managing that property. Your contact details remain private until you choose to share them.",
      },
      {
        q: "Can I make offers directly through the platform?",
        a: "Yes. Our integrated offer system lets you submit, modify, or negotiate offers directly with verified agents. You’ll receive real-time notifications for counteroffers and updates.",
      },
      {
        q: "What protections do I have as a buyer?",
        a: "We only allow verified agents and estates on the platform, and every transaction is logged with digital timestamps. This ensures transparency and accountability throughout your property purchase journey.",
      },
    ],
  },
  {
    category: "Platform & Safety",
    questions: [
      {
        q: "How does the platform prevent fraud?",
        a: "Every user (buyers, agents, and estates) undergoes an ID verification process before being allowed to transact. Properties are manually reviewed, and our systems flag suspicious listings or unusual behavior automatically.",
      },
      {
        q: "Is my data secure?",
        a: "Yes. We use store all sensitive information securely. We never share your personal data with third parties without your explicit consent.",
      },
      {
        q: "Can I access the platform from my phone?",
        a: "Yes. Our web app is fully mobile-optimized and works smoothly across all devices. A dedicated mobile app is also in development for an even faster experience.",
      },
      {
        q: "Do you offer customer support?",
        a: "Absolutely. Our dedicated support team is available 24/7 via chat and email. You can also access the Help Center for guides, FAQs, and step-by-step tutorials.",
      },
      {
        q: "Are all property listings verified?",
        a: "Yes. Every property listed on our platform goes through a manual verification process to ensure ownership authenticity, accurate descriptions, and compliance with local regulations.",
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
