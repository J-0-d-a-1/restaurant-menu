import { supabase } from "../lib/supabase";

import { useEffect, useState } from "react";

import { mapMenuFromDB } from "../utils/menuMapper";

import CategoryTabs from "../components/Menu/CategoryTabs";
import SubCategoryTabs from "../components/Menu/SubCategoryTabs";
import MenuGrid from "../components/Menu/MenuGrid";
import MenuItemModal from "../components/Menu/MenuItemModal";

export default function MenuPage() {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCateopry] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Read data from supabase
  useEffect(() => {
    const fetchInitialData = async () => {
      const [
        { data: catData, error: catError },
        { data: menuData, error: menuError },
      ] = await Promise.all([
        supabase.from("categories").select("*").order("sort_order"),
        supabase
          .from("menus")
          .select("*")
          .eq("hide", false)
          .order("sort_order"),
      ]);

      if (catError || menuError) {
        console.error(catError || menuError);
        return;
      }

      setCategories(catData);
      setSelectedCategory(catData[0]);
      setMenus(menuData.map(mapMenuFromDB));
    };

    fetchInitialData();
  }, []);

  // fetching categories
  useEffect(() => {
    if (categories.length && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  // update subcategories when category changes
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchSubCategories = async () => {
      const { data, error } = await supabase
        .from("subcategories")
        .select("*")
        .eq("category_id", selectedCategory.id)
        .order("sort_order");

      if (error) {
        console.log(error);
        return;
      }

      setSubCategories(data);
      setSelectedSubCateopry("All");
    };

    fetchSubCategories();
  }, [selectedCategory]);

  // Filter menu items
  const filteredMenu = menus.filter((item) => {
    const matchCategory = item.categoryId === selectedCategory?.id;

    const matchSubCategory =
      selectedSubCategory === "All" ||
      item.subCategoryId === selectedSubCategory?.id;

    return matchCategory && matchSubCategory;
  });

  return (
    <div className="p-2 sm:p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Menu</h1>

      {/* Category tabs */}
      <CategoryTabs
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Subcategory tabs */}
      <SubCategoryTabs
        subCategories={subCategories}
        selected={selectedSubCategory}
        onSelect={setSelectedSubCateopry}
      />

      {/* Menu grids */}
      <MenuGrid items={filteredMenu} onItemClick={setSelectedItem} />

      {/* Menu modals */}
      <MenuItemModal
        item={selectedItem}
        onClose={() => {
          setSelectedItem(null);
          setCurrentIndex(0);
        }}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
}
