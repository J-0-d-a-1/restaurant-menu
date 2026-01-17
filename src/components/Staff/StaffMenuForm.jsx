import { supabase } from "../../lib/supabase";

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

  // Uploading images
  const uploadImage = async (file) => {
    const fileName = `${crypto.randomUUID()}-${file.name}`;

    const { error } = await supabase.storage
      .from("menu-images")
      .upload(fileName, file);

    if (error) throw error;

    return supabase.storage.from("menu-images").getPublicUrl(fileName).data
      .publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const uploadedImages = [];

      for (const img of images) {
        // Existing image URL
        if (typeof img === "string") {
          uploadedImages.push(img);
        } else if (img.file) {
          // New image file
          const url = await uploadImage(img.file);
          uploadedImages.push(url);
        }
      }

      onSave({ ...form, images: uploadedImages });
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Failed to upload images");
    }
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
