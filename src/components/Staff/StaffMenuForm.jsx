import { useState } from "react";

export default function StaffMenuForm({ categories, item, onSave, onCancel }) {
  const [form, setForm] = useState(
    item || {
      name: "",
      category: "Drinks",
      subCategory: "",
      description: "",
      price: "",
      images: [],
      soldOut: false,
    }
  );

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form className="space-y-4">
      <h2 className="text-xl font-bold">
        {item ? "Edit Menu" : "Add New Menu"}
      </h2>

      {/* Name */}
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => updateField("name", e.target.value)}
        className="w-full border rounded p-2"
      />

      {/* Category */}
      <select
        value={form.category}
        onChange={(e) => updateField("category", e.target.value)}
        className="w-full border rounded p-2"
      >
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
        value={form.description}
        onChange={(e) => updateField("description", e.target.value)}
        className="w-full border rounded p-2"
      />

      {/* Price */}
      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => updateField("price", Number(e.target.value))}
        className="w-full border rounded p-2"
      />

      {/* Sold Out */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.soldOut}
          onChange={() => updateField("soldOut", !form.soldOut)}
        />
        Sold Out
      </label>

      {/* Save or Cancel */}
      <div className="flex gap-2">
        <button
          onClick={(e) => handleSubmit(e)}
          className="flex-1 bg-blue-600 text-white py-2 rounded"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-400 hover:bg-red-600 text-white py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
