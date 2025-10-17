import React from "react";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastManager";
import { LuMinus, LuPlus } from "react-icons/lu";

const CartQuantityUpdater = ({ textSize, property, className = "" }) => {
  const { units = 1, id } = property;

  const { addToast: showToast } = useToast();
  const { items, addToCart, incrementQuantity, decrementQuantity } = useCart();

  const cartItem = items.find((item) => item.id === id);
  const isInCart = !!cartItem;

  const handleAddToCart = () => {
    addToCart({ ...property, maxUnits: units });
    showToast("Property added to cart 🏠", "success");
  };

  const handleIncrement = () => {
    incrementQuantity(id);
    showToast("Quantity updated ✅", "success");
  };

  const handleDecrement = () => {
    decrementQuantity(id);
    showToast("Removed one unit 🗑️", "warn");
  };

  if (!isInCart) {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        onClick={handleAddToCart}
        className={`px-4 py-2 rounded-full border border-secondary text-secondary font-semibold hover:bg-secondary hover:text-white text-sm transition flex gap-2 items-center ${className}`}
      >
        <LuPlus /> Add to cart
      </motion.button>
    );
  }
  return (
    <motion.div
      layout
      className="flex items-center justify-between px-1 py-1 border border-secondary/60 rounded-full bg-gray-50 gap-2"
    >
      <button
        onClick={handleDecrement}
        className="p-2 rounded-full bg-secondary text-white hover:bg-secondary/80 transition"
      >
        <LuMinus size={18} />
      </button>

      <motion.div
        key={cartItem?.quantity || 0}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`font-semibold text-gray-700 ${textSize || "text-xs"}`}
      >
        {cartItem?.quantity} / {units} Units
      </motion.div>

      <button
        onClick={handleIncrement}
        disabled={cartItem?.quantity >= units}
        className={`p-2 rounded-full transition ${
          cartItem?.quantity >= units
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-secondary text-white hover:bg-secondary/80"
        }`}
      >
        <LuPlus size={18} />
      </button>
    </motion.div>
  );
};

export default CartQuantityUpdater;
