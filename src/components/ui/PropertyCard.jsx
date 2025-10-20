import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuBath, LuBed, LuCar, LuFiles, LuMapPin } from "react-icons/lu";
import { MdOutlineSquareFoot } from "react-icons/md";
import Divider from "../common/Divider";
import { useNavigate } from "react-router-dom";
import HighlightText from "../common/HighlightText";
import CartQuantityUpdater from "../common/CartQuantityUpdater";
import { FaHeart, FaImages, FaRegHeart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastManager";
import { FiChevronLeft, FiChevronRight, FiImage, FiX } from "react-icons/fi";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";

const PropertyCard = ({ property = {}, query = "" }) => {
  const {
    id,
    name = "Untitled Property",
    price = 0,
    bedrooms = 0,
    bathrooms = 0,
    lease,
    status,
    parkingSpaces = 0,
    sqFeet = 0,
    category = "For Sale",
    cover = "",
    location = {},
    type = "Apartment",
    gallery,
  } = property;

  const { address = "Address unavailable", city } = location;

  const { toggleFavorite, savedForLater = [] } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [imgLoaded, setImgLoaded] = useState(false);

  const [activeGallery, setActiveGallery] = useState({
    open: false,
    images: [],
    index: 0,
  });

  const handleViewDetails = () => navigate(`/property/${id}/details`);

  const isSavedForLater = savedForLater.find((item) => item.id === id);

  const handleSaveForLater = () => {
    toggleFavorite(property);
    addToast(
      isSavedForLater ? "Removed from Favorites" : "Added to Favorites",
      isSavedForLater ? "info" : "success"
    );
  };

  // Open lightbox/gallery
  const openGallery = (images, idx = 0) =>
    setActiveGallery({ open: true, images, index: idx });
  const closeGallery = () =>
    setActiveGallery({ open: false, images: [], index: 0 });
  const nextImage = () =>
    setActiveGallery((g) => ({ ...g, index: (g.index + 1) % g.images.length }));
  const prevImage = () =>
    setActiveGallery((g) => ({
      ...g,
      index: (g.index - 1 + g.images.length) % g.images.length,
    }));

  useBodyScrollLock(activeGallery.open);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full cursor-pointer hover:shadow-2xl transition-all"
    >
      {/* --- Image Section --- */}
      <div className="relative overflow-hidden h-56 bg-gray-100">
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}
        <motion.img
          src={`${cover || "/placeholder-house.jpg"}`}
          alt={name}
          className="w-full h-full object-cover"
          onLoad={() => setImgLoaded(true)}
          initial={{ scale: 1.1 }}
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <div className="absolute top-3 left-3 flex space-x-2 items-center flex-wrap space-y-1">
          <motion.span
            className="border border-secondary bg-secondary text-white text-xs font-medium px-3 py-1 rounded-full shadow"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {category}
          </motion.span>
          <motion.span
            className=" bg-gray-200 border border-gray-500/30 text-gray-600 text-xs font-medium px-3 py-1 rounded-full shadow"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {type}
          </motion.span>
          <motion.span
            className={`${
              property.status === "Available"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-300"
            } border border-gray-500/30 text-gray-600 text-xs font-medium px-3 py-1 rounded-full shadow`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {status}
          </motion.span>
        </div>
        <button
          onClick={() => openGallery([cover, ...gallery], 0)}
          className="absolute right-3 bottom-3 text-sm text-gray-500 p-3 rounded-full bg-secondary text-white underline"
        >
          <FaImages />
        </button>
      </div>

      {/* --- Content --- */}
      <div className="flex flex-col flex-1 px-5 pt-4">
        <div className="flex gap-2">
          <p className="text-lg font-semibold text-gray-800 mb-1 flex flex-1 items-center">
            &#8358;{price.toLocaleString()}
            {category === "For Rent" && (
              <>
                /
                <span className="text-xs">
                  {lease.rentType?.replace(/ly$/, "")?.toLowerCase()}
                </span>
              </>
            )}
          </p>
          <button
            onClick={handleSaveForLater}
            className="p-2 rounded-full bg-white/90 cursor-pointer text-lg"
          >
            {isSavedForLater ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart />
            )}
          </button>
        </div>
        <h3 className="text-lg font-bold text-gray-900 hover:text-secondary transition-colors line-clamp-1">
          {query ? <HighlightText text={name} query={query} /> : name}
        </h3>

        <p className="text-sm text-gray-500 flex items-center gap-1">
          <LuMapPin className="text-gray-400" /> {address},{" "}
          {query ? <HighlightText text={city} query={query} /> : city},{" "}
          {location.state}
        </p>

        {/* --- Features --- */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 text-xs my-4">
          <div className="flex items-center gap-1">
            <LuBed className="w-4 h-4" /> {bedrooms} Beds
          </div>
          <div className="flex items-center gap-1">
            <LuBath className="w-4 h-4" /> {bathrooms} Baths
          </div>
          <div className="flex items-center gap-1">
            <LuCar className="w-4 h-4" /> {parkingSpaces} Parking
          </div>
          <div className="flex items-center gap-1">
            <MdOutlineSquareFoot className="w-4 h-4" />{" "}
            {sqFeet.toLocaleString()} sq. ft.
          </div>
        </div>
        {/* --- Lease Info --- */}
        {lease && (
          <div className="mb-4 text-xs text-gray-600 flex flex-wrap gap-2">
            <span className="bg-gray-100 px-2 py-1 rounded-md border border-gray-300/50">
              {lease.rentType}
            </span>
            <span className="bg-gray-100 px-2 py-1 rounded-md border border-gray-300/50">
              {lease.duration}
            </span>
            {lease.furnished && (
              <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md border border-green-200">
                Furnished
              </span>
            )}
            {lease.depositRequired && (
              <span className="bg-amber-50 text-amber-700 px-2 py-1 rounded-md border border-amber-200">
                Deposit Required
              </span>
            )}
          </div>
        )}
      </div>

      {/* --- Footer --- */}
      <footer className="p-5 pt-0 mt-auto backdrop-blur-md bg-white/70 border-t border-gray-100">
        <motion.div
          className="flex items-center justify-between mt-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CartQuantityUpdater property={property} />

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleViewDetails}
            className="bg-secondary text-white px-4 py-2 rounded-full text-sm font-medium shadow hover:shadow-lg border border-secondary transition"
          >
            Details
          </motion.button>
        </motion.div>
      </footer>

      {/* Gallery lightbox */}
      <AnimatePresence>
        {activeGallery.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          >
            <div className="max-w-4xl w-full relative h-[60vh]">
              <img
                src={activeGallery.images[activeGallery.index]}
                alt="gallery"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />

              <button
                onClick={closeGallery}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow"
              >
                <FiX />
              </button>

              <div
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full cursor-pointer"
                onClick={prevImage}
              >
                <FiChevronLeft />
              </div>

              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full cursor-pointer"
                onClick={nextImage}
              >
                <FiChevronRight />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PropertyCard;
