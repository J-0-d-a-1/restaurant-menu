import { useState } from "react";
import SoldOutBadge from "./SoldOutBadge";

export default function MenuItemModal({ item, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!item) return null;

  const hasMultiple = item.images.length > 1;

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? item.images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === item.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="fixed inset-9 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4"
      onClick={onClose}
    >
      {/* Modal content: stop click from bubbling to overlay */}
      <div
        className="bg-white rounded-xl w-full max-w-md p-6 relative overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-1 right-3 text-gray-500 hover:text-gray-800 font-bold"
          onClick={onClose}
        >
          x
        </button>

        {/* Sold Out Badge */}
        {item.soldOut && <SoldOutBadge />}

        {/* Image Slider */}
        <div className="relative mb-4">
          <img
            src={item.images[currentIndex]}
            alt={`${item.name} ${currentIndex + 1}`}
            className="w-full h-64 sm:h-72 object-cover rounded-md"
          />
        </div>

        {/* Prev/Next buttons */}
        {hasMultiple && (
          <>
            <button
              onClick={prevImage}
              className="absolute top-1/3 left-2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-op50"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/3 right-2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-op50"
            >
              ›
            </button>
          </>
        )}

        {/* Details */}
        <h2 className="text-xl font-bold mb-2">{item.name}</h2>
        {item.description && (
          <p className="text-gray-700 mb-2">{item.description}</p>
        )}
        <p className="font-bold text-lg">{item.price}</p>
      </div>
    </div>
  );
}
