import { useEffect, useState } from "react";

import { menu } from "../data/menuData";
import StaffItemCard from "../components/Staff/StaffItemCard";
import StaffMenuForm from "../components/Staff/StaffMenuForm";
import CategoryTabs from "../components/Menu/CategoryTabs";
import SubCategoryTabs from "../components/Menu/SubCategoryTabs";

export default function StaffPage() {
  const fixedCategories = [
    "Drinks",
    "Salad",
    "Sashimi & Sushi",
    "Tapas",
    "Rice & Noodles",
    "Dessert",
  ];

  const fixedSubCategories = {
    Drinks: ["Cocktails", "Tap Beer"],
    Salad: ["Large", "Small"],
    "Sashimi & Sushi": ["Sashimi", "Sushi"],
    Tapas: ["Hot", "Cold"],
    "Rice & Noodles": [],
    Desserts: [],
  };

  const [items, setItems] = useState(menu);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(fixedCategories[0]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategpry] = useState("All");

  // update subcategories when category changes
  useEffect(() => {
    const filtered = menu.filter((item) => item.category === selectedCategory);

    const subs = [...new Set(filtered.map((item) => item.subCategory || ""))];

    setSubCategories(subs);
    setSelectedSubCategpry("All");
  }, [selectedCategory]);

  // Filter menu items
  const filteredMenu = menu.filter((item) => {
    const matchCategory = item.category === selectedCategory;
    const matchSubCategory =
      selectedSubCategory === "All" ||
      item.subCategory === selectedSubCategory ||
      (selectedSubCategory === "" && !item.subCategory);

    return matchCategory && matchSubCategory;
  });

  const handleSave = (newItem) => {
    if (editingItem) {
      // update existing
      setItems((prev) =>
        prev.map((item) => {
          return item.id === editingItem.id ? { ...item, ...newItem } : item;
        })
      );
    } else {
      // Add New
      setItems((prev) => [
        ...prev,
        { ...newItem, id: Date.now() }, // Temporary ID
      ]);
    }

    // Reset form
    setEditingItem(null);
  };

  const handleDelete = (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (userConfirmed)
      setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleHide = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, hide: !item.hide } : item
      )
    );
  };

  return (
    <div className="min-h-screen p-2 bg-gray-100">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Menu Editor</h1>

      {/* Add new item button */}
      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
        onClick={() => setEditingItem()}
      >
        + Add New Menu
      </button>

      {/* Category tabs */}
      <CategoryTabs
        categories={fixedCategories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* SubCategory Tabs */}
      <SubCategoryTabs
        subCategories={subCategories}
        selected={selectedSubCategory}
        onSelect={setSelectedSubCategpry}
      />

      {/* Menu Items List */}
      <div className="grid gap-4 sm:grid-cols-3">
        {filteredMenu.map((item) => (
          <StaffItemCard
            key={item.id}
            item={item}
            onToggleHide={handleToggleHide}
            onEdit={() => setEditingItem(item)}
            onDelete={() => handleDelete(item.id)}
          />
        ))}
      </div>

      {/* Form modal */}
      {editingItem !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl p-4">
            <StaffMenuForm
              categories={fixedCategories}
              subCategories={fixedSubCategories}
              item={editingItem}
              onSave={handleSave}
              onCancel={() => setEditingItem(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
