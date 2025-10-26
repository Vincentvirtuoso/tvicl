import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import PropertyCard from "../components/ui/PropertyCard";
import { properties } from "../data/properties";

const PropertyList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [filterType, setFilterType] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");

  const navigate = useNavigate()

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    // Search by name, city, or tag
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.location.city.toLowerCase().includes(term) ||
          p.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    // Filter by type or category
    if (filterType !== "All")
      result = result.filter((p) => p.type === filterType);
    if (filterCategory !== "All")
      result = result.filter((p) => p.category === filterCategory);

    // Sort options
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "recent") result.sort((a, b) => b.builtYear - a.builtYear);

    return result;
  }, [searchTerm, sortBy, filterType, filterCategory]);

  return (
    <section className="min-h-screen pt-4 text-gray-800">
      {/* Header + Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-1">
          Discover Premium Properties
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search name, city, or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-60 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none transition"
            />
          </div>

          {/* Filters */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="pl-3 pr-6 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="All">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Duplex">Duplex</option>
            <option value="Condo">Condo</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="pl-3 pr-6 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="pl-3 pr-6 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="recent">Most Recent</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
          </select>
        </div>

        <button onClick={()=>navigate('/property/add')}>
          Add property
        </button>
      </div>

      {/* Grid of Properties */}
      <AnimatePresence mode="popLayout">
        {filteredProperties.length ? (
          <motion.div
            layout
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <PropertyCard property={property} query={searchTerm} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center text-center py-20"
          >
            <img
              src="/images/empty-state.svg"
              alt="No listings"
              className="w-56 mb-6 opacity-80"
            />
            <p className="text-gray-500 text-lg">
              No properties match your filters or search.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PropertyList;
