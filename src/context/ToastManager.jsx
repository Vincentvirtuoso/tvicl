import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Toast from "../components/common/Toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, variant = "info", options = {}) => {
    const {
      duration = 2000,
      position = "top-right",
      id = Date.now(),
      ...rest
    } = options;

    const newToast = {
      id,
      message,
      type: variant,
      duration,
      position,
      ...rest,
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto-remove after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration + 200);
  }, []);

  const positions = [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ];

  const getPositionClasses = (pos) => {
    const base = "fixed z-[9999] flex flex-col gap-2 pointer-events-none";
    switch (pos) {
      case "top-left":
        return `${base} top-5 left-5 items-start`;
      case "top-center":
        return `${base} top-5 left-1/2 -translate-x-1/2 items-center`;
      case "top-right":
        return `${base} top-5 right-5 items-end`;
      case "bottom-left":
        return `${base} bottom-5 left-5 items-start`;
      case "bottom-center":
        return `${base} bottom-5 left-1/2 -translate-x-1/2 items-center`;
      case "bottom-right":
        return `${base} bottom-5 right-5 items-end`;
      default:
        return `${base} top-5 right-5 items-end`;
    }
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Render toasts by position */}
      {positions.map((pos) => (
        <div key={pos} className={getPositionClasses(pos)}>
          <AnimatePresence>
            {toasts
              .filter((t) => t.position === pos)
              .map((t) => (
                <Toast
                  key={t.id}
                  message={t.message}
                  type={t.type}
                  duration={t.duration}
                  onClose={() =>
                    setToasts((prev) =>
                      prev.filter((toast) => toast.id !== t.id)
                    )
                  }
                  {...t}
                />
              ))}
          </AnimatePresence>
        </div>
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
