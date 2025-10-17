import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import remarkBreaks from "remark-breaks";
import { motion } from "framer-motion";

const PropertyOverview = ({ overview }) => {
  const cleanMarkdown = overview
    ?.trim()
    ?.replace(/\r/g, "")
    ?.replace(/\n{3,}/g, "\n\n") // collapse 3+ newlines into 2
    ?.replace(/([^\n])\n(?!\n)/g, "$1  \n") // convert single newline → markdown break
    ?.replace(/\n\s{4,}/g, "\n"); // clean unwanted indentation

  return (
    <motion.section
      className="mt-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">Overview</h2>

      <div
        className={`
          prose max-w-none
          prose-headings:text-gray-900
          prose-p:text-gray-700
          prose-li:text-gray-700
          prose-strong:text-gray-800
          prose-a:text-blue-600
          prose-ul:list-disc prose-ul:ml-6
          prose-ol:list-decimal prose-ol:ml-6
          font-sans leading-relaxed space-y-3
        `}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {cleanMarkdown}
        </ReactMarkdown>
      </div>
    </motion.section>
  );
};

export default PropertyOverview;
