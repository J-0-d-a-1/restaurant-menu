import { useState } from "react";

import { menu } from "../data/menuData";
import StaffItemCard from "../components/Staff/StaffItemCard";
import CategoryTabs from "../components/Menu/CategoryTabs";

export default function StaffPage() {
  const fixedCategories = [
    "Drinks",
    "Salad",
    "Sashimi & Sushi",
    "Tapas",
    "Rice & Noodles",
    "Dessert",
  ];

  const [items, setItems] = useState(menu);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(fixedCategories[0]);

  // Filter menu items
  const filteredMenu = items.filter((item) => {
    const matchCategory = item.category === selectedCategory;
    return matchCategory;
  });

  const handleSave = (newItem) => {
    if (editingItem) {
      // update existing
      setItems((prev) =>
        prev.map((item) => {
          item.id === editingItem.id ? { ...newItem, id: item.id } : item;
        })
      );
    }

    setEditingItem(null);
  };

  const handleDelete = (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (userConfirmed)
      setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen p-2 bg-gray-100">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Menu Editor</h1>

      {/* Add new item button */}
      <button className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
        + Add New Menu
      </button>

      {/* Category tabs */}
      <CategoryTabs
        categories={fixedCategories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Form modal */}
      {/* <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-xl p-4">
          Staff Menu Form
        </div>
      </div> */}

      {/* Menu Items List */}
      <div className="grid gap-4 sm:grid-cols-3">
        {filteredMenu.map((item) => (
          <StaffItemCard
            key={item.id}
            item={item}
            onEdit={() => handleSave(item)}
            onDelete={() => handleDelete(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
