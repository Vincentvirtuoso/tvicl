import React from "react";
import { motion } from "framer-motion";
import {
  LuUsers as Users,
  LuAward as Award,
  LuTarget as Target,
  LuHeartHandshake as HeartHandshake,
  LuBuilding2 as Building2,
  LuLightbulb as Lightbulb,
  LuClock as Clock,
  LuShield as Shield,
  LuPhone as Phone,
  LuMapPin as MapPin,
  LuBriefcase as Briefcase,
  LuCircleCheck as CheckCircle,
} from "react-icons/lu";
import logo from "/images/logo.png";

const companyInfo = {
  name: "Your Company Name",
  tagline: "Innovation. Integrity. Impact.",
  overview:
    "A leading Real Estate, Construction, and Interior Design firm registered with the Corporate Affairs Commission (CAC), committed to transforming Nigeria's built environment through excellence and innovation.",
  mission:
    "To deliver adaptive, quality-driven solutions that meet Nigeria's evolving real estate and construction needs while exceeding client expectations.",
  vision:
    "To become Africa's premier integrated property development and construction company, recognized for sustainable practices and transformative impact.",
};

const locations = [
  {
    city: "Abuja",
    description:
      "Federal Capital Territory headquarters and major residential developments",
  },
  {
    city: "Lagos",
    description: "Commercial properties and luxury residential projects",
  },
  {
    city: "Ondo",
    description: "Regional expansion with mixed-use developments",
  },
  {
    city: "Imo",
    description: "Infrastructure and residential construction projects",
  },
  {
    city: "Anambra",
    description: "Strategic partnerships and commercial ventures",
  },
  {
    city: "Delta",
    description: "Industrial facilities and property management",
  },
];

const team = [
  {
    name: "Chief Executive Officer",
    role: "Visionary Leader",
    quote:
      "Excellence is not just our standard—it's our foundation for every project we undertake.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Chief Operations Officer",
    role: "Operations Director",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Lead Architect",
    role: "Design Innovation",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Construction Manager",
    role: "Project Excellence",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
  },
];

const partners = [
  "International Construction Partners",
  "Global Real Estate Alliance",
  "Sustainable Building Coalition",
  "African Property Developers Network",
];

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <motion.img
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
          alt="About Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-4 text-yellow-400 font-semibold text-lg tracking-wider flex items-center flex-col gap-3 "
          >
            <img src={logo} alt="TVICL" className="w-20 h-20 rounded-full" />
            <div className="">
              <div className="font-bold text-xl leading-none">TVICL</div>
              <div className="text-xs text-gray-300 mt-2">
                Tee & Vee Integrated Company Limited
              </div>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            {companyInfo.tagline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl max-w-3xl text-gray-200 leading-relaxed"
          >
            Building Africa's Future Through Excellence in Real Estate,
            Construction & Interior Design
          </motion.p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInLeft}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {companyInfo.overview}
              </p>
              <div className="space-y-6 mt-8">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex gap-4"
                >
                  <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg h-fit">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Our Mission
                    </h3>
                    <p className="text-gray-600">{companyInfo.mission}</p>
                  </div>
                </motion.div>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex gap-4"
                >
                  <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg h-fit">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Our Vision
                    </h3>
                    <p className="text-gray-600">{companyInfo.vision}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInRight}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                  alt="Modern Architecture"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/50 to-transparent" />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-500 text-white p-4 rounded-lg">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">10+</div>
                    <div className="text-gray-600">Years of Excellence</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Geographic Reach */}
      <section className="py-24 bg-gradient-to-br from-yellow-50 to-yellow-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Geographic Reach
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Strategically positioned across Nigeria's key economic zones
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {locations.map((location, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/30 backdrop-blur-sm p-6 rounded-xl border border-white/40 hover:bg-white/40 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-500 text-white p-3 rounded-lg">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                      {location.city}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {location.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experienced professionals driving excellence and innovation
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="group bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="relative h-64 w-full rounded-xl overflow-hidden mb-6">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-yellow-600 font-medium mb-3">
                  {member.role}
                </p>
                {member.quote && (
                  <p className="text-sm text-gray-600 italic leading-relaxed">
                    "{member.quote}"
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Careers CTA */}
      <section className="py-24 bg-gradient-to-br from-yellow-50 to-yellow-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInLeft}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Join Our Team
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We're seeking talented professionals to join our growing
                organization. If you're passionate about excellence and
                innovation in real estate and construction, we want to hear from
                you.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-yellow-600" />
                  <span className="text-gray-700">
                    Competitive compensation packages
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-yellow-600" />
                  <span className="text-gray-700">
                    Professional development opportunities
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-yellow-600" />
                  <span className="text-gray-700">
                    Collaborative work environment
                  </span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition flex items-center gap-2"
              >
                <Briefcase className="w-5 h-5" />
                View Open Positions
              </motion.button>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInRight}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-xl"
            >
              <div className="border-l-4 border-yellow-600 pl-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Current Opening: Sales Executive
                </h3>
                <p className="text-gray-700 mb-4">
                  We are looking for dynamic sales professionals to drive our
                  business growth and maintain our reputation for excellence.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>Location:</strong> Multiple cities
                  </p>
                  <p>
                    <strong>Experience:</strong> 2+ years in real estate sales
                  </p>
                  <p>
                    <strong>Type:</strong> Full-time
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners & Affiliates */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Partners & Affiliates
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Collaborating with leading organizations worldwide
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {partners.map((partner, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all flex items-center justify-center text-center border border-gray-100"
              >
                <div>
                  <div className="bg-yellow-100 text-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HeartHandshake className="w-8 h-8" />
                  </div>
                  <p className="text-gray-700 font-semibold">{partner}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 overflow-hidden mb-5">
        <motion.img
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80"
          alt="Contact CTA"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/95 to-yellow-700/95" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white max-w-3xl mx-auto px-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Your Future?
          </h2>
          <p className="text-lg mb-8 text-yellow-100 leading-relaxed">
            Partner with us for exceptional real estate, construction, and
            interior design solutions that exceed expectations.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-yellow-700 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg shadow-xl transition flex items-center justify-center gap-2 mx-auto"
          >
            <Phone className="w-5 h-5" />
            Get in Touch
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
