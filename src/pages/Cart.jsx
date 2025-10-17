import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart, FiHome, FiMapPin, FiTrash2, FiX } from "react-icons/fi";
import SectionTitle from "../components/common/SectionTitle";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastManager";
import { FaHeart } from "react-icons/fa";

const CartPage = () => {
  const {
    items: cart,
    favorites,
    savedForLater,
    subtotal,
    total,
    discount,
    coupon,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    toggleFavorite,
    applyCoupon,
    clearCoupon,
  } = useCart();

  const { addToast: showToast } = useToast();
  const [couponCode, setCouponCode] = useState("");

  const updateQty = (id, delta, item) => {
    if (delta > 0) {
      if (item.quantity >= item.maxUnits) {
        showToast("Max quantity reached", "error");
      } else {
        incrementQuantity(id);
        showToast("Increased quantity", "success");
      }
    } else {
      decrementQuantity(id);
      showToast("Decreased quantity", "info");
    }
  };

  const removeItem = (id) => {
    const item = cart.find((i) => i.id === id);
    removeFromCart(id);
    showToast(`Removed ${item?.name}`, "error");
  };

  const handleToggleFavorite = (item) => {
    const isFav = savedForLater.some((f) => f.id === item.id);
    toggleFavorite(item);
    showToast(
      isFav ? "Removed from Favorites" : "Added to Favorites",
      isFav ? "info" : "success"
    );
  };

  const handleApplyCoupon = () => {
    applyCoupon(couponCode);
    if (couponCode.trim() === "") {
      showToast("Enter a coupon code", "error");
      return;
    }
    if (couponCode.toUpperCase() === coupon) {
      showToast("Coupon Applied 🎉", "success");
    } else {
      showToast("Invalid Coupon Code", "error");
    }
    setCouponCode("");
  };

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center justify-center bg-secondary/90 text-white overflow-hidden">
        <motion.img
          src="/images/hero.jpeg"
          alt="Cart Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <SectionTitle
          title="Your Cart"
          subtitle="Review your selections"
          className="z-10"
        />
      </section>

      {/* Cart Section */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold mb-8"
        >
          Your Cart
        </motion.h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* CART LIST */}
          <motion.div
            layout
            className="md:col-span-2 bg-white shadow rounded-xl p-4 space-y-4"
          >
            <AnimatePresence>
              {cart.length ? (
                cart.map((item) => {
                  const isFav = savedForLater.some((f) => f.id === item.id);
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center justify-between border-b border-gray-500/20 pb-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.cover}
                          alt={item.name}
                          className="w-20 h-20 rounded-md object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-gray-500">
                            &#8358;{item.price.toLocaleString()}
                          </p>
                          <div className="flex items-center mt-2 space-x-3">
                            <button
                              onClick={() => updateQty(item.id, -1, item)}
                              className="px-2 py-1 border rounded hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span>
                              {item.quantity} / {item.maxUnits || 1}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, 1, item)}
                              className="px-2 py-1 border rounded hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <p className="font-semibold">
                          &#8358;{(item.price * item.quantity).toLocaleString()}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleToggleFavorite(item)}
                            className={`${
                              isFav
                                ? "text-red-500 hover:text-red-600"
                                : "text-gray-400 hover:text-secondary"
                            } transition-colors`}
                          >
                            {isFav ? (
                              <FaHeart size={18} />
                            ) : (
                              <FiHeart size={18} />
                            )}
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <p className="text-center text-gray-500 py-10">
                  Your cart is empty 🛒
                </p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* SUMMARY */}
          <div className="bg-white shadow rounded-xl p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <p>Subtotal</p>
              <p>&#8358;{subtotal.toLocaleString()}</p>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600 mb-2">
                <p>Discount</p>
                <p>-{discount}%</p>
              </div>
            )}
            <div className="flex justify-between font-semibold text-lg border-t border-gray-500/20 pt-3">
              <p>Total</p>
              <p>&#8358;{total.toLocaleString()}</p>
            </div>

            <div className="mt-4">
              <input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="w-full border px-3 py-2 rounded mb-3 focus:outline-none focus:ring focus:ring-blue-100"
              />
              <button
                onClick={handleApplyCoupon}
                className="w-full bg-primary hover:bg-primary/80 py-2 rounded-lg font-medium"
              >
                Apply Coupon
              </button>
              {coupon && (
                <button
                  onClick={clearCoupon}
                  className="w-full mt-2 text-sm text-gray-500 hover:text-red-500"
                >
                  Remove Coupon ({coupon})
                </button>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                showToast(
                  "Order received, you will receive an email soon.",
                  "success"
                )
              }
              className="w-full mt-6 border-2 border-secondary bg-secondary hover:bg-transparent hover:text-secondary text-white py-3 rounded-lg font-semibold shadow-md transition"
            >
              Proceed to Checkout
            </motion.button>
          </div>
        </div>

        {/* FAVORITES SECTION */}
        {savedForLater.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white shadow rounded-xl p-6 mt-10"
          >
            <h2 className="text-xl font-semibold mb-4">
              Your saved properties
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {savedForLater.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="flex bg-white rounded-xl border border-gray-500/40 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden"
                >
                  {/* Image */}
                  <div className="shrink-0 h-full w-25">
                    <img
                      src={item.cover}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-2.5 sm:p-4 flex-1">
                    <h3 className="text-base font-semibold text-gray-800 w-full line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center text-gray-500 text-sm mt-1 line-clamp-1">
                      <FiMapPin className="mr-1 text-red-500 shrink-0" />
                      <span>{item.location.address || "Lagos, Nigeria"}</span>
                    </div>

                    <div className="flex sm:flex-row gap-1 flex-col mt-2">
                      <span className="text-lg font-bold text-gray-900">
                        ₦{item.price?.toLocaleString() || "N/A"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {item.bedrooms || 2} Beds • {item.bathrooms || 2} Baths
                        • {item.parkings || 2} Park
                      </span>
                    </div>
                    <button
                      onClick={() => handleToggleFavorite(item)}
                      className="flex gap-2 bg-red-300/20 text-red-400 px-4 py-1.5 justify-center mt-2 rounded-full items-center text-sm shadow hover:bg-red-500 hover:text-white transition"
                    >
                      <FiX />
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
