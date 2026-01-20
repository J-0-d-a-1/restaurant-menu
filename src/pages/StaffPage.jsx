import { supabase } from "../lib/supabase";

import { useEffect, useState } from "react";

import { useAuth } from "../hooks/useAuth";
import { mapMenuFromDB, mapMenuToDB } from "../utils/menuMapper";

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

  const { user, loading } = useAuth();

  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(fixedCategories[0]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategpry] = useState("All");

  // fetching Menus from supabase
  useEffect(() => {
    const fetchMenus = async () => {
      const { data, error } = await supabase
        .from("menus")
        .select("*")
        .order("id");

      if (error) {
        console.error(error);
        return;
      }

      setItems(data.map(mapMenuFromDB));
    };

    fetchMenus();
  }, []);

  // update subcategories when category changes
  useEffect(() => {
    const filtered = items.filter((item) => item.category === selectedCategory);

    const subs = [...new Set(filtered.map((item) => item.sub_category || ""))];

    setSubCategories(subs);
    setSelectedSubCategpry("All");
  }, [selectedCategory, items]);

  // loading
  if (loading) return <p>Loading...</p>;

  // no user
  if (!user) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">Access denied</h2>
        <p>You must be logged in to access this page.</p>
      </div>
    );
  }

  // Filter menu items
  const filteredMenu = items.filter((item) => {
    const matchCategory = item.category === selectedCategory;
    const matchSubCategory =
      selectedSubCategory === "All" ||
      item.sub_category === selectedSubCategory ||
      (selectedSubCategory === "" && !item.sub_category);

    return matchCategory && matchSubCategory;
  });

  const handleSave = async (newItem) => {
    if (editingItem?.id) {
      // update existing
      const { error } = await supabase
        .from("menus")
        .update(mapMenuToDB(newItem))
        .eq("id", editingItem.id);

      if (error) {
        console.error(error);
        return;
      }

      setItems((prev) =>
        prev.map((item) => {
          return item.id === editingItem.id ? { ...item, ...newItem } : item;
        })
      );
    } else {
      // Add New
      const { data, error } = await supabase
        .from("menus")
        .insert([mapMenuToDB(newItem)])
        .select();

      if (error) {
        console.error(error);
        return;
      }

      setItems((prev) => [...prev, mapMenuFromDB(data[0])]);
    }

    // Reset form
    setEditingItem(null);
  };

  const handleDelete = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!userConfirmed) return;

    const { error } = await supabase.from("menus").delete().eq("id", id);

    if (error) {
      console.error("Delete failed:", error.message);
      alert("Failed to delete menu.");
      return;
    }

    // Update UI after deleted
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleHide = async (id, currentHide) => {
    const { error } = await supabase
      .from("menus")
      .update({ hide: !currentHide })
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, hide: !currentHide } : item
      )
    );
  };

  return (
    <div className="min-h-screen p-2 bg-gray-100">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Menu Editor</h1>

      {/* Add new item button */}
      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
        onClick={() => setEditingItem({})}
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
            onToggleHide={() => handleToggleHide(item.id, item.hide)}
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
