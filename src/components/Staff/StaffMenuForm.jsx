export default function StaffMenuForm({ categories }) {
  return (
    <form className="space-y-4">
      <h2 className="text-xl font-bold">Edit Menu</h2>

      {/* Name */}
      <input type="text" placeholder="Name" />

      {/* Category */}
      <select className="w-full border rounded p-2">
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* SubCategory */}
      <input
        type="text"
        placeholder="SubCategory"
        className="w-full border rounded p-2"
      />

      {/* Description */}
      <textarea
        placeholder="Description"
        className="w-full border rounded p-2"
      />

      {/* Price */}
      <input
        type="number"
        placeholder="Price"
        className="w-full border rounded p-2"
      />

      {/* Sold Out */}
      <label className="flex items-center gap-2">
        <input type="checkbox" />
        Sold Out
      </label>

      {/* Save or Cancel */}
      <div className="flex gap-2">
        <button className="flex-1 bg-blue-600 text-white py-2 rounded">
          Save
        </button>
        <button
          type="button"
          className="flex-1 bg-gray-400 hover:bg-red-600 text-white py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
