// import { supabase } from "../lib/supabase";

// import { useEffect, useState } from "react";

// import { mapMenuFromDB, mapMenuToDB } from "../utils/menuMapper";

import { useAuth } from "../hooks/useAuth";
import { useStaffMenuData } from "../hooks/useStaffMenuData";

import StaffItemCard from "../components/Staff/StaffItemCard";
import StaffMenuForm from "../components/Staff/StaffMenuForm";
import CategoryTabs from "../components/Menu/CategoryTabs";
import SubCategoryTabs from "../components/Menu/SubCategoryTabs";

export default function StaffPage() {
  const { user, loading } = useAuth();
  const { state, dispatch, filteredMenu } = useStaffMenuData();

  // const [items, setItems] = useState([]);
  // const [editingItem, setEditingItem] = useState(null);
  // const [categories, setCategories] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState(null);
  // const [allSubCategories, setAllSubCategories] = useState([]);
  // const [subCategories, setSubCategories] = useState([]);
  // const [selectedSubCategory, setSelectedSubCategpry] = useState(null);

  // // fetching Menus from supabase
  // useEffect(() => {
  //   const fetchInitialData = async () => {
  //     const [
  //       { data: catData, error: catError },
  //       { data: subData, error: subError },
  //       { data: menuData, error: menuError },
  //     ] = await Promise.all([
  //       supabase.from("categories").select("*").order("sort_order"),
  //       supabase.from("subcategories").select("*").order("sort_order"),
  //       supabase.from("menus").select("*").order("sort_order"),
  //     ]);

  //     if (catError || subError || menuError) {
  //       console.error(catError || subError || menuError);
  //       return;
  //     }

  //     // setting category from DB
  //     setCategories(catData);
  //     // setting all subcategory from DB
  //     setAllSubCategories(subData);
  //     // setting menu from DB
  //     setItems(menuData.map(mapMenuFromDB));

  //     if (catData.length > 0) {
  //       setSelectedCategory(catData[0]);
  //     }
  //   };

  //   fetchInitialData();
  // }, []);

  // // update subcategories when category changes
  // useEffect(() => {
  //   if (!selectedCategory) return;

  //   const filtered = allSubCategories.filter(
  //     (sub) => sub.category_id === selectedCategory.id
  //   );

  //   setSubCategories(filtered);
  //   setSelectedSubCategpry(null);
  // }, [selectedCategory, allSubCategories]);

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

  // const filteredMenu = items.filter((item) => {
  //   // category filter
  //   if (selectedCategory && item.categoryId !== selectedCategory.id) {
  //     return false;
  //   }

  //   // subcategory filter
  //   if (selectedSubCategory && item.subCategoryId !== selectedSubCategory.id) {
  //     return false;
  //   }

  //   return true;
  // });

  // const handleSave = async (newItem) => {
  //   if (editingItem?.id) {
  //     // update existing
  //     const { error } = await supabase
  //       .from("menus")
  //       .update(mapMenuToDB(newItem))
  //       .eq("id", editingItem.id);

  //     if (error) {
  //       console.error(error);
  //       return;
  //     }

  //     setItems((prev) =>
  //       prev.map((item) => {
  //         return item.id === editingItem.id ? { ...item, ...newItem } : item;
  //       })
  //     );
  //   } else {
  //     // Add New
  //     const { data, error } = await supabase
  //       .from("menus")
  //       .insert([mapMenuToDB(newItem)])
  //       .select();

  //     if (error) {
  //       console.error(error);
  //       return;
  //     }

  //     setItems((prev) => [...prev, mapMenuFromDB(data[0])]);
  //   }

  //   // Reset form
  //   setEditingItem(null);
  // };

  // const handleDelete = async (id) => {
  //   const userConfirmed = window.confirm(
  //     "Are you sure you want to delete this item?"
  //   );

  //   if (!userConfirmed) return;

  //   const { error } = await supabase.from("menus").delete().eq("id", id);

  //   if (error) {
  //     console.error("Delete failed:", error.message);
  //     alert("Failed to delete menu.");
  //     return;
  //   }

  //   // Update UI after deleted
  //   setItems((prev) => prev.filter((item) => item.id !== id));
  // };

  // const handleToggleHide = async (id, currentHide) => {
  //   const { error } = await supabase
  //     .from("menus")
  //     .update({ hide: !currentHide })
  //     .eq("id", id);

  //   if (error) {
  //     console.error(error);
  //     return;
  //   }

  //   setItems((prev) =>
  //     prev.map((item) =>
  //       item.id === id ? { ...item, hide: !currentHide } : item
  //     )
  //   );
  // };

  return (
    <div className="min-h-screen p-2 bg-gray-100">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Menu Editor</h1>

      {/* Add new item button */}
      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
        onClick={() => dispatch({ type: "SET_EDITING_ITEM", item: {} })}
      >
        + Add New Menu
      </button>

      {/* Category tabs */}
      <CategoryTabs
        categories={state.categories}
        selected={state.selectedCategory}
        onSelect={(category) => dispatch({ type: "SET_CATEGORY", category })}
      />

      {/* SubCategory Tabs */}
      <SubCategoryTabs
        subCategories={state.subCategories}
        selected={state.selectedSubCategory}
        onSelect={(subCategory) => {
          dispatch({ type: "SET_SUBCATEGORY", subCategory });
        }}
      />

      {/* Menu Items List */}
      <div className="grid gap-4 sm:grid-cols-3">
        {filteredMenu.map((item) => (
          <StaffItemCard
            key={item.id}
            item={item}
            onEdit={() => dispatch({ type: "SET_EDITING_ITEM", item })}
            // onToggleHide={() => handleToggleHide(item.id, item.hide)}
            // onDelete={() => handleDelete(item.id)}
          />
        ))}
      </div>

      {/* Form modal */}
      {state.editingItem && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl p-4">
            <StaffMenuForm
              categories={state.categories}
              allSubCategories={state.allSubCategories}
              item={state.editingItem}
              onCancel={() =>
                dispatch({ type: "SET_EDITING_ITEM", item: null })
              }
              // onSave={handleSave}
            />
          </div>
        </div>
      )}
    </div>
  );
}
