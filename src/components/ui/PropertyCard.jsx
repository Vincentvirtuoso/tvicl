import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuBath, LuBed, LuCar, LuMapPin } from "react-icons/lu";
import { MdOutlineSquareFoot } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import HighlightText from "../common/HighlightText";
import CartQuantityUpdater from "../common/CartQuantityUpdater";
import { FaHeart, FaImages, FaRegHeart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastManager";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";

const PropertyCard = ({ property = {}, query = "" }) => {
  const {
    _id,
    propertyId,
    title = "Untitled Property",
    price = {},
    bedrooms = 0,
    bathrooms = 0,
    parking = {},
    floorSize = {},
    listingType = "For Sale",
    propertyType = "Apartment",
    address = {},
    media = [],
    rentalDetails = {},
    furnishingStatus,
    propertyCondition,
    amenities = [],
  } = property;

  // Extract pricing info
  const priceAmount = price?.amount || 0;
  const isNegotiable = price?.negotiable || false;

  // Extract location info
  const {
    street = "",
    area = "Address unavailable",
    city = "",
    state = "",
    landmark = "",
  } = address;

  // Get cover image (primary media)
  const coverImage = media?.find((m) => m?.isPrimary)?.url || "";

  // Get gallery images (excluding videos and documents)
  const galleryImages =
    media?.filter((m) => m?.type === "image")?.map((m) => m.url) || [];

  // Calculate total parking spaces
  const totalParkingSpaces = (parking?.covered || 0) + (parking?.open || 0);

  // Get floor size value
  const sqFeet = floorSize?.value || 0;
  const sizeUnit = floorSize?.unit || "sqft";

  // Rental specific info
  const rentFrequency = rentalDetails?.rentFrequency || "Monthly";
  const isFurnished =
    furnishingStatus === "Fully Furnished" ||
    furnishingStatus === "Semi-Furnished";
  const depositRequired = rentalDetails?.depositAmount > 0;

  const { toggleFavorite, savedForLater = [] } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [imgLoaded, setImgLoaded] = useState(false);

  const [activeGallery, setActiveGallery] = useState({
    open: false,
    images: [],
    index: 0,
  });

  const handleViewDetails = () =>
    navigate(`/property/${propertyId || _id}/details`);

  const isSavedForLater = savedForLater.find(
    (item) => item._id === _id || item.propertyId === propertyId
  );

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

  // Get status badge
  const getStatusBadge = () => {
    if (property.possessionStatus === "Ready to Move") {
      return { text: "Available", color: "bg-green-500 text-white" };
    } else if (property.possessionStatus === "Under Construction") {
      return { text: "Under Construction", color: "bg-orange-500 text-white" };
    }
    return { text: "Available", color: "bg-green-500 text-white" };
  };

  const statusBadge = getStatusBadge();

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
          src={coverImage || "/placeholder-house.jpg"}
          alt={title}
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
            {listingType}
          </motion.span>
          <motion.span
            className="bg-gray-200 border border-gray-500/30 text-gray-600 text-xs font-medium px-3 py-1 rounded-full shadow"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {propertyType}
          </motion.span>
          <motion.span
            className={`${statusBadge.color} border border-gray-500/30 text-xs font-medium px-3 py-1 rounded-full shadow`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {statusBadge.text}
          </motion.span>
        </div>
        {galleryImages.length > 0 && (
          <button
            onClick={() => openGallery([coverImage, ...galleryImages], 0)}
            className="absolute right-3 bottom-3 text-sm text-gray-500 p-3 rounded-full bg-secondary text-white underline"
          >
            <FaImages />
          </button>
        )}
      </div>

      {/* --- Content --- */}
      <div className="flex flex-col flex-1 px-5 pt-4">
        <div className="flex gap-2">
          <p className="text-lg font-semibold text-gray-800 mb-1 flex flex-1 items-center gap-1">
            &#8358;{priceAmount.toLocaleString()}
            {isNegotiable && (
              <span className="text-xs text-gray-500">(Negotiable)</span>
            )}
            {listingType === "For Rent" && (
              <>
                <span className="text-xs">/{rentFrequency.toLowerCase()}</span>
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
          {query ? <HighlightText text={title} query={query} /> : title}
        </h3>

        <p className="text-sm text-gray-500 flex items-center gap-1">
          <LuMapPin className="text-gray-400" />
          <span className="line-clamp-1">
            {area}
            {city &&
              `, ${query ? <HighlightText text={city} query={query} /> : city}`}
            {state && `, ${state}`}
          </span>
        </p>

        {/* --- Features --- */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 text-xs my-4">
          {bedrooms > 0 && (
            <div className="flex items-center gap-1">
              <LuBed className="w-4 h-4" /> {bedrooms} Beds
            </div>
          )}
          {bathrooms > 0 && (
            <div className="flex items-center gap-1">
              <LuBath className="w-4 h-4" /> {bathrooms} Baths
            </div>
          )}
          {totalParkingSpaces > 0 && (
            <div className="flex items-center gap-1">
              <LuCar className="w-4 h-4" /> {totalParkingSpaces} Parking
            </div>
          )}
          {sqFeet > 0 && (
            <div className="flex items-center gap-1">
              <MdOutlineSquareFoot className="w-4 h-4" />
              {sqFeet.toLocaleString()} {sizeUnit}
            </div>
          )}
        </div>

        {/* --- Rental/Lease Info --- */}
        {listingType === "For Rent" && rentalDetails && (
          <div className="mb-4 text-xs text-gray-600 flex flex-wrap gap-2">
            <span className="bg-gray-100 px-2 py-1 rounded-md border border-gray-300/50">
              {rentFrequency}
            </span>
            {rentalDetails.leaseDurationMonths && (
              <span className="bg-gray-100 px-2 py-1 rounded-md border border-gray-300/50">
                {rentalDetails.leaseDurationMonths} months lease
              </span>
            )}
            {isFurnished && (
              <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md border border-green-200">
                {furnishingStatus}
              </span>
            )}
            {depositRequired && (
              <span className="bg-amber-50 text-amber-700 px-2 py-1 rounded-md border border-amber-200">
                Deposit Required
              </span>
            )}
          </div>
        )}

        {/* --- Property Condition & Amenities --- */}
        {(propertyCondition || amenities.length > 0) && (
          <div className="mb-4 text-xs text-gray-600 flex flex-wrap gap-2">
            {propertyCondition && (
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-200">
                {propertyCondition}
              </span>
            )}
            {amenities.slice(0, 2).map((amenity, idx) => (
              <span
                key={idx}
                className="bg-purple-50 text-purple-700 px-2 py-1 rounded-md border border-purple-200"
              >
                {amenity}
              </span>
            ))}
            {amenities.length > 2 && (
              <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded-md border border-gray-200">
                +{amenities.length - 2} more
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
            onClick={closeGallery}
          >
            <div
              className="max-w-4xl w-full relative h-[60vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeGallery.images[activeGallery.index]}
                alt="gallery"
                className="w-full h-full object-contain rounded-lg shadow-lg"
              />

              <button
                onClick={closeGallery}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-gray-100"
              >
                <FiX />
              </button>

              {activeGallery.images.length > 1 && (
                <>
                  <button
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full cursor-pointer shadow hover:bg-gray-100"
                    onClick={prevImage}
                  >
                    <FiChevronLeft />
                  </button>

                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full cursor-pointer shadow hover:bg-gray-100"
                    onClick={nextImage}
                  >
                    <FiChevronRight />
                  </button>
                </>
              )}

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {activeGallery.index + 1} / {activeGallery.images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PropertyCard;
