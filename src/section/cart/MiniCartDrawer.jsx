import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import Divider from "../../components/common/Divider";
import { useNavigate } from "react-router-dom";

const MiniCartDrawer = ({ isOpen, onClose, cart }) => {
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const onViewCart = () => {
    navigate("/cart");
  };
  useBodyScrollLock(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ stiffness: 80 }}
            className="fixed right-0 top-0 h-full w-full max-w-80 bg-white z-50 shadow-2xl flex flex-col text-secondary"
          >
            <div className="flex items-center justify-between p-4">
              <h3 className="font-semibold text-lg">Quick Cart</h3>
              <button onClick={onClose}>
                <FiX size={22} />
              </button>
            </div>
            <Divider
              align="center"
              height="h-0.5"
              width="w-full"
              margin="my-1"
            />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length ? (
                cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    className="flex items-center justify-between border-b border-gray-500/20 pb-2"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.cover}
                        alt={item.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          &#8358;{item.price.toLocaleString()} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-sm">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-500 text-center mt-10 text-sm">
                  No items added yet.
                </p>
              )}
            </div>

            <Divider
              align="center"
              height="h-0.5"
              width="w-full"
              margin="my-3"
            />

            <div className="p-4 pt-0">
              <div className="flex justify-between mb-3">
                <p className="font-medium">Subtotal</p>
                <p className="font-semibold">
                  &#8358;{subtotal.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => {
                  onViewCart();
                  onClose();
                }}
                className="w-full bg-primary hover:bg-primary/70 text-black py-2 rounded-md"
              >
                View Cart
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MiniCartDrawer;
