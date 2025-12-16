import SoldOutBadge from "../Menu/SoldOutBadge";

export default function StaffItemCard({
  item,
  onToggleHide,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border relative">
      {item.soldOut && <SoldOutBadge />}

      {/* Toggle for hide */}
      <label className="absolute z-50 top-2 right-2">
        <input
          type="checkbox"
          checked={!item.hide}
          onChange={() => onToggleHide(item.id)}
        />
        <span className="text-xs ml-1">{item.hide ? "Hidden" : "Visible"}</span>
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
