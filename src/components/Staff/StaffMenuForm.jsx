import { useEffect, useState } from "react";
import SubCategorySelect from "./SubCategorySelect";
import ImageUploadPreview from "./ImageUploadPreview";
import CategorySelect from "./CategorySelect";

export default function StaffMenuForm({
  categories,
  subCategories,
  item,
  onSave,
  onCancel,
}) {
  const [form, setForm] = useState({
    name: "",
    category: "Drinks",
    subCategory: "",
    description: "",
    price: "",
    images: [],
    soldOut: false,
    hide: false,
  });

  const [images, setImages] = useState([]);

  // Whenever the editing item changes, update the form
  useEffect(() => {
    if (item) {
      setForm(item); // load existing values
      setImages(item.images || []); // load existing image URLs
    } else {
      setForm(
        {
          name: "",
          category: "Drinks",
          subCategory: "",
          description: "",
          price: "",
          images: [],
          soldOut: false,
          hide: false,
        },
        [item]
      );
      setImages([]); // clear images on new item
    }
  }, [item]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const processedImages = images.map((img) => img.file);

    onSave({ ...form, images: processedImages });
  };

  return (
    <form className="space-y-4">
      <h2 className="text-xl font-bold">
        {item ? "Edit Menu" : "Add New Menu"}
      </h2>

      {/* Images */}
      <ImageUploadPreview images={images} setImages={setImages} />

      {/* Name */}
      <input
        id="name"
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => updateField("name", e.target.value)}
        className="w-full border rounded p-2"
      />

      {/* Category */}
      <CategorySelect
        categories={categories}
        value={form.category}
        onChange={(value) => updateField("category", value)}
      />

      {/* SubCategory */}
      <SubCategorySelect
        subCategories={subCategories}
        category={form.category}
        value={form.subCategory}
        onChange={(value) => updateField("subCategory", value)}
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
