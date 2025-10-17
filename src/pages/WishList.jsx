import React from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import PropertyCard from "../components/ui/PropertyCard";

export default function WishList() {
  const { savedForLater: saved } = useCart();

  return (
    <div className="min-h-[80vh] p-4 lg:p-8 bg-gray-50">
      <div className="">
        {/* Layout: list + right panel */}
        <div className="flex flex-col gap-6">
          {/* Main list */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {saved.length === 0 && (
              <div className="p-8 bg-white rounded-xl shadow text-center text-gray-600">
                You have no saved properties. Browse listings and tap the heart
                to save favorites.
              </div>
            )}
            {saved.map((p) => (
              <PropertyCard property={p} />
            ))}
          </div>

          {/* Right panel */}
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Mini map / location preview */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h4 className="text-sm text-gray-500">Saved Locations</h4>
              <div className="mt-3">
                {saved.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-start gap-3 p-2 border rounded mb-2"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-sm">
                      {s.city || s.location.city}
                    </div>
                    <div className="flex-1 text-sm">
                      <div className="font-medium">{s.name}</div>
                      <div className="text-xs text-gray-500">
                        {s.location.address}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="font-semibold">Saved Summary</h3>
              <div className="mt-3 text-sm text-gray-600">
                You have{" "}
                <span className="font-medium text-gray-800">
                  {saved.length}
                </span>{" "}
                saved property(ies). Use the actions to add listings to your
                cart to proceed with enquiries or bookings.
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button className="p-2 rounded-lg border">Clear saved</button>
                <button className="p-2 rounded-lg bg-primary">
                  Contact agent
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
