import SoldOutBadge from "./SoldOutBadge";

export default function MenuItemModal({ item, onClose }) {
  if (!item) return null;

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

        {/* Image gallery */}
        <div className="flex space-x-2 overflow-x-auto mb-4">
          {item.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${item.name} ${idx + 1}`}
              className="w-50 h-50 object-cover rounded-md flex-shrink-0"
            />
          ))}
        </div>

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
