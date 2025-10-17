import React from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { FaBed, FaBath, FaCar, FaRegFilePdf } from "react-icons/fa";
import {
  MdOutlineSquareFoot,
  MdHouseSiding,
  MdOutlineTag,
} from "react-icons/md";
import {
  LuFile,
  LuPlus,
  LuMinus,
  LuDoorOpen,
  LuTag,
  LuMapPin,
  LuShieldCheck,
  LuCheck,
  LuTags,
  LuConstruction,
  LuLoaderPinwheel,
  LuPhone,
} from "react-icons/lu";
import Divider from "../components/common/Divider";
import { properties } from "../data/properties";
import PropertyOverview from "../section/propertyDetail/PropertyOverview";
import InfoCard from "../components/ui/InfoCard";
import CartQuantityUpdater from "../components/common/CartQuantityUpdater";
import EmptyState from "../components/common/EmptyState";

const PropertyDetail = ({ phone = "+234 810 234 5678" }) => {
  const { id } = useParams();
  const property = properties.find((p) => p.id.toString() === id);

  if (!property) {
    return <EmptyState message="Property not found" />;
  }
  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      {/* ===== HERO IMAGE ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-lg"
      >
        <img
          src={property.cover}
          alt={property.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* STATUS + TYPE BADGES */}
        <div className="absolute top-6 left-6 flex gap-2">
          <span className="bg-secondary text-white text-xs px-3 py-1 rounded-full uppercase shadow">
            {property.status}
          </span>
          <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-white/30">
            {property.type}
          </span>
        </div>

        {/* TITLE */}
        <div className="absolute bottom-6 left-6 text-white">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold"
          >
            {property.name}
          </motion.h1>
          <p className="text-gray-200 mt-1 flex items-center gap-2">
            <LuMapPin />{" "}
            {`${property.location.address}, ${property.location.city}, ${property.location.state}, ${property.location.country}`}
          </p>
        </div>
      </motion.div>

      {/* ===== MAIN GRID ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        {/* ===== LEFT SECTION ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg"
        >
          {/* PRICE + CATEGORY */}
          <div className="flex flex-wrap items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="text-2xl font-bold text-secondary flex items-center gap-1">
                <LuTag />
                &#8358;{property.price?.toLocaleString() || 0}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                &#8358;{property.pricePerSqFt?.toLocaleString() || 0} per sq.
                ft.
              </p>
            </div>
            <span className="bg-primary text-sm px-4 py-2 rounded-full font-semibold shadow-sm">
              {property.category}
            </span>
          </div>

          <Divider align="left" width="w-24" />

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-gray-700">
            <InfoCard
              icon={FaBed}
              label="Bedrooms"
              value={property.bedrooms}
              direction="column"
              bordered
              size="md"
            />
            <InfoCard
              icon={FaBath}
              label="Bathrooms"
              value={property.bathrooms}
              direction="column"
              bordered
              size="md"
            />
            <InfoCard
              icon={FaCar}
              label="Parking"
              value={property.parkingSpaces}
              direction="column"
              bordered
              size="md"
            />
            <InfoCard
              icon={MdOutlineSquareFoot}
              label="Square Feet"
              value={property.sqFeet?.toLocaleString() || 0}
              direction="column"
              bordered
              size="md"
            />
            <InfoCard
              icon={LuLoaderPinwheel}
              label="Status"
              value={property.status}
              direction="column"
              bordered
              size="md"
            />
            {property.lotSize && (
              <InfoCard
                icon={MdHouseSiding}
                label="Lot Size"
                value={property.lotSize}
                direction="column"
                bordered
                size="md"
              />
            )}
            {property.units && (
              <InfoCard
                icon={LuDoorOpen}
                label="Units"
                value={property.units}
                direction="column"
                bordered
                size="md"
              />
            )}
            {property.builtYear && (
              <InfoCard
                icon={LuConstruction}
                label="Built Year"
                value={property.builtYear}
                direction="column"
                bordered
                size="md"
              />
            )}
          </div>

          {/* DESCRIPTION */}
          <PropertyOverview overview={property.longDescription} />

          {/* DOCUMENTS */}
          {property.documents?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-secondary">
                <LuFile /> Documents
              </h2>
              <ul className="space-y-2">
                {property.documents.map((doc, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-3 border border-secondary/40 hover:border-secondary rounded-lg hover:bg-gray-300/10 transition"
                  >
                    <FaRegFilePdf className="text-red-500" />
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-gray-800"
                    >
                      {doc.name}
                    </a>
                    {doc.verified && (
                      <span className="ml-auto text-xs flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        <LuShieldCheck size={14} /> Verified
                      </span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-secondary">
              <LuMapPin /> Location
            </h3>
            <iframe
              title="Property Map"
              width="100%"
              height="250"
              loading="lazy"
              style={{ borderRadius: "12px" }}
              src={`https://www.google.com/maps?q=${property.location.coordinates[0]},${property.location.coordinates[1]}&z=15&output=embed`}
            ></iframe>
          </div>
        </motion.div>

        {/* ===== RIGHT SIDEBAR ===== */}
        <motion.aside
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-2xl shadow-lg flex flex-col"
        >
          {/* GALLERY */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Gallery</h3>
            <div className="grid grid-cols-3 gap-2">
              {property.gallery.slice(0, 6).map((img, i) => (
                <motion.img
                  key={i}
                  src={img}
                  alt={`Gallery ${i}`}
                  className="w-full h-24 object-cover rounded-lg cursor-pointer hover:scale-102 transition-transform"
                  whileHover={{ scale: 1.05 }}
                />
              ))}
            </div>
          </div>

          <Divider align="center" />

          {/* CART SECTION */}
          <CartQuantityUpdater
            property={property}
            className="justify-center"
            textSize="text-sm"
          />

          <a
            href={`tel:${phone}`}
            className="flex bg-secondary justify-center items-center py-2.5 px-4 mt-4 rounded-full text-semibold text-gray-50"
          >
            <LuPhone className="shrink-0 text-xl mr-2" /> Make Inquiries
          </a>

          {/* TAGS */}
          {property.tags?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {property.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full border border-gray-500/20 flex items-center gap-1.5"
                >
                  <LuTags />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* FEATURES */}
          {property.features?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="my-5"
            >
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-secondary">
                <LuDoorOpen /> Features
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {property.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-emerald-300/10 border border-emerald-500/30 rounded-lg px-3 py-2"
                  >
                    <LuCheck className="text-emerald-400 text-xl" />
                    <span className="text-gray-700 text-sm font-medium truncate ">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {property.lease && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-5 bg-gray-50 border border-gray-200 rounded-xl p-4"
            >
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-secondary">
                <LuTag /> Lease Information
              </h3>
              <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <li>
                  <strong>Rent Type:</strong> {property.lease.rentType}
                </li>
                <li>
                  <strong>Duration:</strong> {property.lease.duration}
                </li>
                <li>
                  <strong>Deposit Required:</strong>{" "}
                  {property.lease.depositRequired ? "Yes" : "No"}
                </li>
                <li>
                  <strong>Furnished:</strong>{" "}
                  {property.lease.furnished ? "Yes" : "No"}
                </li>
                <li>
                  <strong>Utilities Included:</strong>{" "}
                  {property.lease.utilitiesIncluded ? "Yes" : "No"}
                </li>
              </ul>
            </motion.div>
          )}

          {/* AGENT INFO */}
          <div className="mt-auto p-4 border rounded-xl bg-gray-50 border-gray-500/20">
            <h3 className="text-lg font-semibold mb-3">Property Agent</h3>
            <div className="flex items-center gap-3">
              <img
                src={`${property.agent.photo || "/images/logo.png"}`}
                alt={property.agent.name}
                className="w-12 h-12 rounded-full object-cover grayscale-80"
              />
              <div>
                <p className="font-medium text-gray-800">
                  {property.agent.name}
                </p>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
};

export default PropertyDetail;
