import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { motion } from "framer-motion";
import CopyButton from "../common/CopyButton";

const Footer = ({
  logo,
  companyName = "TVICL",
  companyNumber = "RC 2890153",
  tagline = "Building Trust, One Home at a Time.",
  address = "Plot 42, Admiralty Way, Lekki Phase 1, Lagos, Nigeria",
  phone = "+234 810 234 5678",
  email = "support@tvicl.com",
  channelLink = "https://wa.link/TVICL",
  socials = [
    { icon: <FaFacebookF />, href: "https://facebook.com" },
    { icon: <FaLinkedinIn />, href: "https://linkedin.com" },
    { icon: <FaYoutube />, href: "https://youtube.com" },
  ],
  navLinks = [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
}) => {
  return (
    <footer className="mt-auto bg-gray-950 text-gray-300 pt-14 pb-6 px-6 rounded-t-3xl relative overflow-hidden">
      {/* decorative gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-gray-950 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 z-10">
        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-2">
            {logo && (
              <img
                src={logo}
                alt={`${companyName} logo`}
                className="h-10 w-auto object-contain"
              />
            )}
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold text-white tracking-wide">
                {companyName}
              </h3>
              <span className="text-xs">
                Tee & Vee Integrated Company Limited
              </span>
            </div>
          </div>

          <p className="text-sm mt-3 text-gray-400 leading-relaxed">
            {tagline}
          </p>
          <p className="text-xs mt-1 text-gray-500">{companyNumber}</p>

          <div className="flex space-x-4 mt-5">
            {socials.map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="social link"
                whileHover={{ scale: 1.15 }}
                className="p-2 rounded-full bg-gray-800 hover:bg-primary hover:text-black transition-all duration-200"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <h4 className="text-white font-semibold text-lg mb-3">Quick Links</h4>
          <ul className="space-y-2">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  className="hover:text-primary transition text-sm font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h4 className="text-white font-semibold text-lg mb-3">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start space-x-3">
              <FiMapPin className="mt-1 text-primary flex-shrink-0" />
              <span className="leading-snug">{address}</span>
            </li>
            <li className="flex items-center space-x-3">
              <FiPhone className="text-primary flex-shrink-0" />
              <a
                href={`tel:${phone}`}
                className="hover:text-primary transition"
              >
                {phone}
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <FiMail className="text-primary flex-shrink-0" />
              <a
                href={`mailto:${email}`}
                className="hover:text-primary transition"
              >
                {email}
              </a>
            </li>
          </ul>
          <button
            onClick={() =>
              window.open(
                "https://maps.google.com/?q=" + encodeURIComponent(address)
              )
            }
            className="mt-5 inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg border border-primary text-primary hover:bg-primary hover:text-black transition duration-200"
          >
            <FiMapPin className="mr-2" />
            View on Map
          </button>
        </motion.div>

        {/* Stay Updated */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
        >
          <h4 className="text-white font-semibold text-lg mb-3">
            Stay Updated
          </h4>
          <p className="text-sm text-gray-400 mb-3 leading-relaxed">
            Subscribe to our channel and get exclusive property offers.
          </p>

          <div className="flex items-center space-x-2">
            <div className="flex flex-1 items-center bg-gray-800 text-gray-200 rounded-md px-4 py-2 pr-12 text-sm relative overflow-hidden">
              <span className="truncate">{channelLink}</span>
              <CopyButton textToCopy={channelLink} />
            </div>
            <a
              href={channelLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-black hover:opacity-90 transition duration-200"
            >
              Visit
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-800 mt-12 pt-5 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} {companyName}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
