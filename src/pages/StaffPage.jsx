import { supabase } from "../lib/supabase";

import { useEffect, useState } from "react";

import { useAuth } from "../hooks/useAuth";
import { mapMenuFromDB, mapMenuToDB } from "../utils/menuMapper";

import StaffItemCard from "../components/Staff/StaffItemCard";
import StaffMenuForm from "../components/Staff/StaffMenuForm";
import CategoryTabs from "../components/Menu/CategoryTabs";
import SubCategoryTabs from "../components/Menu/SubCategoryTabs";
import {
  extractCategories,
  extractSubCategories,
} from "../utils/categoryUtils";

export default function StaffPage() {
  const { user, loading } = useAuth();

  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategpry] = useState("All");

  // fetching Menus from supabase
  useEffect(() => {
    const fetchInitialData = async () => {
      const [
        { data: catData, error: catError },
        { data: menuData, error: menuError },
      ] = await Promise.all([
        supabase.from("categories").select("*").order("sort_order"),
        supabase.from("menus").select("*").order("sort_order"),
      ]);

      if (catError || menuError) {
        console.error(catError || menuError);
        return;
      }

      // setting category from DB
      setCategories(catData);
      setSelectedCategory(catData[0]);

      // setting menu from DB
      setItems(menuData.map(mapMenuFromDB));
    };

    fetchInitialData();
  }, []);

  // update subcategories when category changes
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchSubCategories = async () => {
      const { data } = await supabase
        .from("subcategories")
        .select("*")
        .eq("category_id", selectedCategory.id)
        .order("sort_order");

      setSubCategories(data);
      setSelectedSubCategpry("All");
    };

    fetchSubCategories();
  }, [selectedCategory]);

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
    const matchCategory = item.categoryId === selectedCategory?.id;

    const matchSubCategory =
      selectedSubCategory === "All" ||
      item.subCategoryId === selectedSubCategory.id;

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
        categories={categories}
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
              categories={categories}
              subCategories={subCategories}
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
