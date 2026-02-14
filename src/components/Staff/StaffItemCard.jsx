import SoldOutBadge from "../Menu/SoldOutBadge";

export default function StaffItemCard({
  item,
  onToggleHide,
  onEdit,
  onDelete,
}) {
  return (
    <div
      className={`bg-white rounded-lg p-4 shadow-sm border relative transition
      ${item.hide ? "opacity-70" : ""}
      `}
    >
      {item.soldOut && <SoldOutBadge />}

      {/* overlay layer */}
      {item.hide && (
        <div className="absolute inset-0 bg-gray-400 bg-opacity-40 rounded-lg z-10 pointer-events-none"></div>
      )}

      {/* Toggle for hide */}
      <label className="absolute z-50 top-2 right-2 cursor-pointer">
        <input
          type="checkbox"
          checked={!item.hide}
          onChange={() => onToggleHide(item)}
          className="sr-only peer"
        />

        <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-green-600 transition-colors ease-in-out duration-200 relative"></div>
        <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform ease-in-out duration-200 peer-checked:translate-x-6"></div>

        <span className="block text-xs text-white mt-1 text-center bg-black bg-opacity-60 rounded px-2">
          {item.hide ? "Hidden" : "Visible"}
        </span>
      </label>

      <img
        src={item.images[0]}
        alt={item.name}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h2 className="font-bold text-lg">{item.name}</h2>
      <p className="text-sm text-gray-600">{item.category}</p>

      {item.subCategory && (
        <p className="text-xs text-gray-500">{item.subCategory}</p>
      )}

      <p className="mt-2 font-semibold">${item.price}</p>

      <div className="flex gap-2 mt-4">
        <button
          className="flex-1 bg-green-600 text-white py-1 rounded"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="flex-1 bg-red-600 text-white py-1 rounded"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
