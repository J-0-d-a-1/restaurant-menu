import SoldOutBadge from "./SoldOutBadge";

export default function MenuItemModal({
  item,
  onClose,
  currentIndex,
  setCurrentIndex,
}) {
  if (!item) return null;

  const images = item.images ?? [];
  const hasMultiple = images.length > 1;
  const imageSrc = images[currentIndex] ?? images[0];

  const prevImage = () => {
    const next = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(next);
  };

  const nextImage = () => {
    const next = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(next);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4"
      onClick={onClose}
    >
      {/* Modal content: stop click from bubbling to overlay */}
      <div
        className="bg-white rounded-xl w-full max-w-md p-6 relative overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-1 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
          onClick={onClose}
        >
          x
        </button>

        {/* Sold Out Badge */}
        {item.soldOut && <SoldOutBadge />}

        {/* Image Slider */}
        <div className="relative mb-4">
          <img
            src={imageSrc}
            alt={`${item.name}`}
            className="w-full h-64 sm:h-72 object-cover rounded-md"
          />

          {/* Prev/Next buttons */}
          {hasMultiple && (
            <>
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-op50"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-op50"
              >
                ›
              </button>
            </>
          )}

          {/* Dots navigation */}
          {hasMultiple && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {item.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx === currentIndex ? "bg-white" : "bg-gray-300"
                  }`}
                ></span>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <h2 className="text-xl font-bold mb-2">{item.name}</h2>
        {item.description && (
          <p className="text-gray-600 mb-2">{item.description}</p>
        )}
        <p className="font-bold text-lg">{item.price}</p>
      </div>
    </div>
  );
}
