import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiPlus,
  FiFilter,
  FiX,
  FiChevronDown,
  FiHome,
  FiMapPin,
  FiDollarSign,
  FiGrid,
  FiList,
  FiSliders,
} from "react-icons/fi";
import PropertyCard from "../components/ui/PropertyCard";
import { usePropertyAPI } from "../hooks/useProperty";
import { properties as dummyProperties } from "../data/properties";
import { nigerianStates } from "../assets/propertyListingForm";

const PropertyList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState("grid");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Basic Filters
  const [filterType, setFilterType] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [selectedState, setSelectedState] = useState("All");

  // Advanced Filters
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [bedrooms, setBedrooms] = useState("All");
  const [bathrooms, setBathrooms] = useState("All");
  const [furnishingStatus, setFurnishingStatus] = useState("All");
  const [propertyCondition, setPropertyCondition] = useState("All");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const navigate = useNavigate();
  const { data, loading, error, searchProperties, fetchAnalytics } =
    usePropertyAPI();

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  useEffect(() => {
    searchProperties(searchTerm);
  }, [searchTerm, searchProperties]);

  const properties = data?.properties || [];

  const popularAmenities = [
    "Generator",
    "Security",
    "Swimming Pool",
    "Gym",
    "Garden",
    "CCTV",
    "Gated Community",
    "Lift",
    "Borehole",
    "Parking",
  ];

  // Apply all filters
  const filteredProperties = React.useMemo(() => {
    let result = [...properties];

    // Filter by type
    if (filterType !== "All") {
      result = result.filter(
        (p) => p.propertyType === filterType || p.type === filterType
      );
    }

    // Filter by listing category
    if (filterCategory !== "All") {
      result = result.filter(
        (p) => p.listingType === filterCategory || p.category === filterCategory
      );
    }

    // Filter by state
    if (selectedState !== "All") {
      result = result.filter(
        (p) =>
          p.address?.state === selectedState ||
          p.location?.state === selectedState
      );
    }

    // Price range filter
    if (priceRange.min) {
      const min = parseFloat(priceRange.min);
      result = result.filter((p) => {
        const price = p.price?.amount || p.price || 0;
        return price >= min;
      });
    }
    if (priceRange.max) {
      const max = parseFloat(priceRange.max);
      result = result.filter((p) => {
        const price = p.price?.amount || p.price || 0;
        return price <= max;
      });
    }

    // Bedrooms filter
    if (bedrooms !== "All") {
      const bedroomNum = parseInt(bedrooms);
      result = result.filter((p) => p.bedrooms === bedroomNum);
    }

    // Bathrooms filter
    if (bathrooms !== "All") {
      const bathroomNum = parseInt(bathrooms);
      result = result.filter((p) => p.bathrooms === bathroomNum);
    }

    // Furnishing status
    if (furnishingStatus !== "All") {
      result = result.filter((p) => p.furnishingStatus === furnishingStatus);
    }

    // Property condition
    if (propertyCondition !== "All") {
      result = result.filter((p) => p.propertyCondition === propertyCondition);
    }

    // Amenities filter
    if (selectedAmenities.length > 0) {
      result = result.filter((p) =>
        selectedAmenities.every(
          (amenity) =>
            p.amenities?.includes(amenity) || p.tags?.includes(amenity)
        )
      );
    }

    // Sort options
    if (sortBy === "price-low")
      result.sort(
        (a, b) =>
          (a.price?.amount || a.price || 0) - (b.price?.amount || b.price || 0)
      );
    if (sortBy === "price-high")
      result.sort(
        (a, b) =>
          (b.price?.amount || b.price || 0) - (a.price?.amount || a.price || 0)
      );
    if (sortBy === "recent")
      result.sort(
        (a, b) =>
          (b.builtYear || b.yearBuilt || 0) - (a.builtYear || a.yearBuilt || 0)
      );
    if (sortBy === "popular")
      result.sort((a, b) => (b.views || 0) - (a.views || 0));

    return result;
  }, [
    properties,
    filterType,
    filterCategory,
    selectedState,
    priceRange,
    bedrooms,
    bathrooms,
    furnishingStatus,
    propertyCondition,
    selectedAmenities,
    sortBy,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setFilterType("All");
    setFilterCategory("All");
    setSelectedState("All");
    setPriceRange({ min: "", max: "" });
    setBedrooms("All");
    setBathrooms("All");
    setFurnishingStatus("All");
    setPropertyCondition("All");
    setSelectedAmenities([]);
    setSortBy("recent");
  };

  const hasActiveFilters =
    searchTerm ||
    filterType !== "All" ||
    filterCategory !== "All" ||
    selectedState !== "All" ||
    priceRange.min ||
    priceRange.max ||
    bedrooms !== "All" ||
    bathrooms !== "All" ||
    furnishingStatus !== "All" ||
    propertyCondition !== "All" ||
    selectedAmenities.length > 0 ||
    sortBy !== "recent";

  const activeFilterCount = [
    filterType !== "All",
    filterCategory !== "All",
    selectedState !== "All",
    priceRange.min || priceRange.max,
    bedrooms !== "All",
    bathrooms !== "All",
    furnishingStatus !== "All",
    propertyCondition !== "All",
    selectedAmenities.length > 0,
  ].filter(Boolean).length;

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="bg- py-16 px-6 rounded-3xl">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-600">
              Find Your Dream Property
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover {filteredProperties.length}+ premium properties across
              Nigeria
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl" />
              <input
                type="text"
                placeholder="Search by name, location, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl border-0 shadow-2xl text-gray-800 text-lg focus:ring-4 focus:ring-white/30 focus:outline-none transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition p-2 hover:bg-gray-100 rounded-full"
                >
                  <FiX className="text-xl" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Quick Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mt-8 bg-secondary py-4 px-3 rounded-2xl"
          >
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white cursor-pointer hover:bg-white/20 transition-all"
            >
              <option value="All" className="text-gray-800">
                All Categories
              </option>
              <option value="For Sale" className="text-gray-800">
                For Sale
              </option>
              <option value="For Rent" className="text-gray-800">
                For Rent
              </option>
              <option value="Short Let" className="text-gray-800">
                Short Let
              </option>
            </select>

            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white cursor-pointer hover:bg-white/20 transition-all"
            >
              {nigerianStates.map((state) => (
                <option key={state} value={state} className="text-gray-800">
                  {state}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <FiSliders />
              <span>Advanced Filters</span>
              {activeFilterCount > 0 && (
                <span className="px-2 py-0.5 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full">
                  {activeFilterCount}
                </span>
              )}
              <FiChevronDown
                className={`transition-transform ${
                  showAdvancedFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {showAdvancedFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border-b-2 border-gray-600/30 shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Property Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FiHome className="inline mr-2" />
                    Property Type
                  </label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 focus:outline-none transition-all"
                  >
                    <option value="All">All Types</option>
                    <option value="Flat/Apartment">Flat/Apartment</option>
                    <option value="Detached Duplex">Detached Duplex</option>
                    <option value="Semi-Detached Duplex">
                      Semi-Detached Duplex
                    </option>
                    <option value="Bungalow">Bungalow</option>
                    <option value="Mansion">Mansion</option>
                    <option value="Serviced Apartment">
                      Serviced Apartment
                    </option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FiDollarSign className="inline mr-2" />
                    Price Range (₦)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          min: e.target.value,
                        }))
                      }
                      className="w-1/2 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 focus:outline-none transition-all"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          max: e.target.value,
                        }))
                      }
                      className="w-1/2 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bedrooms
                  </label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 focus:outline-none transition-all"
                  >
                    <option value="All">Any</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5+</option>
                  </select>
                </div>

                {/* Bathrooms */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bathrooms
                  </label>
                  <select
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 focus:outline-none transition-all"
                  >
                    <option value="All">Any</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                  </select>
                </div>

                {/* Furnishing */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Furnishing Status
                  </label>
                  <select
                    value={furnishingStatus}
                    onChange={(e) => setFurnishingStatus(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 focus:outline-none transition-all"
                  >
                    <option value="All">Any</option>
                    <option value="Unfurnished">Unfurnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Fully Furnished">Fully Furnished</option>
                  </select>
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Property Condition
                  </label>
                  <select
                    value={propertyCondition}
                    onChange={(e) => setPropertyCondition(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 focus:outline-none transition-all"
                  >
                    <option value="All">Any</option>
                    <option value="New">New</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Needs Renovation">Needs Renovation</option>
                  </select>
                </div>
              </div>

              {/* Amenities */}
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Amenities
                </label>
                <div className="flex flex-wrap gap-2">
                  {popularAmenities.map((amenity) => (
                    <button
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedAmenities.includes(amenity)
                          ? "bg-yellow-400 text-white shadow-lg scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors flex items-center gap-2 font-semibold"
                  >
                    <FiX />
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {loading
                ? "Loading properties..."
                : `${filteredProperties.length} Properties Found`}
            </h2>
            {hasActiveFilters && (
              <p className="text-gray-600 mt-1">Based on your filters</p>
            )}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 focus:outline-none transition-all cursor-pointer"
            >
              <option value="recent">Most Recent</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="popular">Most Popular</option>
            </select>

            {/* View Mode */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === "grid" ? "bg-white shadow-md" : "text-gray-600"
                }`}
              >
                <FiGrid />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === "list" ? "bg-white shadow-md" : "text-gray-600"
                }`}
              >
                <FiList />
              </button>
            </div>

            {/* Add Property Button */}
            <button
              onClick={() => navigate("/property/add")}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 font-semibold"
            >
              <FiPlus className="text-xl" />
              <span>Add Property</span>
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-6 bg-red-50 border-2 border-red-200 rounded-2xl text-red-700"
          >
            <p className="font-semibold text-lg">Error loading properties</p>
            <p className="text-sm mt-2">{error}</p>
          </motion.div>
        )}

        {/* Loading Skeleton */}
        {loading && !properties.length && (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-72 rounded-3xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded-xl w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {/* Properties Grid/List */}
        <AnimatePresence mode="popLayout">
          {!loading && filteredProperties.length > 0 ? (
            <motion.div
              layout
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id || property._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
                  <PropertyCard
                    property={property}
                    query={searchTerm}
                    viewMode={viewMode}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center text-center py-20"
              >
                <div className="w-64 h-64 mb-8 bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 rounded-full flex items-center justify-center">
                  <FiSearch className="text-9xl text-gray-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-3">
                  No properties found
                </h3>
                <p className="text-gray-600 text-lg mb-8 max-w-md">
                  We couldn't find any properties matching your criteria. Try
                  adjusting your filters or search terms.
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1 font-semibold"
                  >
                    Clear All Filters
                  </button>
                )}
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PropertyList;
