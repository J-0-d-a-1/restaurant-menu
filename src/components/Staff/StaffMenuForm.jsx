import { supabase } from "../../lib/supabase";

import { useEffect, useMemo, useState } from "react";
import SubCategorySelect from "./SubCategorySelect";
import ImageUploadPreview from "./ImageUploadPreview";
import CategorySelect from "./CategorySelect";

export default function StaffMenuForm({
  categories = [],
  allSubCategories = [],
  item,
  onSave,
  onCancel,
}) {
  const [form, setForm] = useState({
    name: "",
    category: null,
    subCategory: null,
    description: "",
    price: "",
    images: [],
    soldOut: false,
    hide: false,
  });

  const [images, setImages] = useState([]);

  // filter subcategories
  const filteredSubCategories = useMemo(() => {
    if (!form.category) return [];

    return allSubCategories.filter(
      (subcategory) => subcategory.category_id === form.category.id
    );
  }, [form.category, allSubCategories]);

  // Whenever the editing item changes, update the form
  useEffect(() => {
    if (!item) {
      setForm({
        name: "",
        category: null,
        subCategory: null,
        description: "",
        price: "",
        images: [],
        soldOut: false,
        hide: false,
      });
      setImages([]); // clear images on new item
      return;
    }

    const selectedCategory = categories.find(
      (category) => category.id === item.categoryId
    );

    const selectedSubCategory = allSubCategories?.find(
      (subCategory) => subCategory.id === item.subCategoryId
    );

    setForm({
      name: item.name ?? "",
      category: selectedCategory ?? null,
      subCategory: selectedSubCategory ?? null,
      description: item.description ?? "",
      price: item.price ?? "",
      soldOut: item.soldOut ?? false,
      hide: item.hide ?? false,
    }); // load existing values

    setImages(
      Array.isArray(item.images)
        ? item.images.map((url) => ({ preview: url })) // load existing image URLs
        : []
    );
  }, [item?.id]);

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
      const finalImages = [];

      for (const img of images) {
        // Existing image URL
        if (!img.file) {
          finalImages.push(img.preview);
        } else {
          // New image file
          const url = await uploadImage(img.file);
          finalImages.push(url);
        }
      }

      onSave({
        id: item?.id,
        name: form.name,
        categoryId: form.category?.id ?? null,
        subCategoryId: form.subCategory?.id ?? null,
        description: form.description,
        price: form.price,
        soldOut: form.soldOut,
        hide: form.hide,
        images: finalImages,
      });
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Failed to upload images");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
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
        onChange={(value) =>
          setForm((prev) => ({
            ...prev,
            category: value,
            subCategory: null,
          }))
        }
      />

      {/* SubCategory */}
      <SubCategorySelect
        subCategories={filteredSubCategories}
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
          type="submit"
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
