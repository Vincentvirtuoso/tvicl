import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../../components/common/SectionTitle";
import PropertyCard from "../../components/ui/PropertyCard";
import { Loader } from "../../components/common/Loader";
import { usePropertyAPI } from "../../hooks/useProperty";

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
  const { data, fetchAnalytics, isLoading } = usePropertyAPI();

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const exclusiveProperties = useMemo(
    () =>
      data.trending?.filter((p) => p.highlights?.includes("Exclusive")) || [],
    [data.trending]
  );

  const recommendedProperties = data.recommended || [];

  const displayProperties =
    exclusiveProperties.length > 0
      ? {
          title: "Exclusive Properties by TVICL",
          subtitle: "Carefully selected listings you won’t find anywhere else.",
          list: exclusiveProperties,
        }
      : {
          title: "Recommended Properties for You",
          subtitle:
            "Handpicked options tailored to your preferences and recent searches.",
          list: recommendedProperties,
        };

  // Loading state
  if (isLoading("trending") || isLoading("recommended")) {
    return (
      <div className="min-h-screen flex justify-center">
        <Loader label="Fetching premium listings..." />
      </div>
    );
  }

  // Empty state
  if (!displayProperties.list?.length) {
    return (
      <section className="px-6 md:px-12 lg:px-20 mt-10 text-center py-10">
        <SectionTitle
          title="Exclusive & Recommended Properties"
          color="black"
          size="md"
          align="center"
          subtitle="New listings coming soon — stay tuned!"
        />
        <p className="text-gray-500 mt-4 italic">
          There are no properties available right now.
        </p>
      </section>
    );
  }

  // Render property cards
  return (
    <section className="px-6 md:px-12 lg:px-20 mt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <SectionTitle
          title={displayProperties.title}
          color="black"
          size="md"
          align="center"
          subtitle={displayProperties.subtitle}
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 my-8"
      >
        {displayProperties.list.map((property) => (
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
