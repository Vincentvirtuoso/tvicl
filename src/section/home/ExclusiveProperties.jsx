import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "../../components/common/SectionTitle";
import { properties } from "../../data/properties";
import PropertyCard from "../../components/ui/PropertyCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const ExclusiveProperties = () => {
  const exclusiveProperties = properties.filter((p) =>
    p.tags?.includes("Exclusive")
  );

  return (
    <section className="px-6 md:px-12 lg:px-20 mt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <SectionTitle
          title="Exclusive Properties by HomeQuest"
          color="black"
          size="md"
          align="center"
          subtitle="Carefully selected listings you won’t find anywhere else."
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 my-8"
      >
        {exclusiveProperties.map((property) => (
          <motion.div
            key={property.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <PropertyCard property={property} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ExclusiveProperties;
