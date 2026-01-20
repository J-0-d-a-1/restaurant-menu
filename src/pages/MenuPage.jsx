import { supabase } from "../lib/supabase";

import { useEffect, useState } from "react";

import { mapMenuFromDB } from "../utils/menuMapper";

import CategoryTabs from "../components/Menu/CategoryTabs";
import SubCategoryTabs from "../components/Menu/SubCategoryTabs";
import MenuGrid from "../components/Menu/MenuGrid";
import MenuItemModal from "../components/Menu/MenuItemModal";
import {
  extractCategories,
  extractSubCategories,
} from "../utils/categoryUtils";

export default function MenuPage() {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategpry] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Read data from supabase
  useEffect(() => {
    const fetchMenus = async () => {
      const { data, error } = await supabase
        .from("menus")
        .select("*")
        .eq("hide", false)
        .order("id");

      if (error) {
        console.error(error);
        return;
      }

      const mapped = data.map(mapMenuFromDB);
      setMenus(mapped);

      const cats = extractCategories(mapped);
      setCategories(cats);
      setSelectedCategory(cats[0]);
    };

    fetchMenus();
  }, []);

  // setting category
  useEffect(() => {
    if (categories.length && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  // update subcategories when category changes
  useEffect(() => {
    setSubCategories(extractSubCategories(menus, selectedCategory));
    setSelectedSubCategpry("All");
  }, [menus, selectedCategory]);

  // Filter menu items
  const filteredMenu = menus.filter((item) => {
    const matchCategory = item.category === selectedCategory;

    const matchSubCategory =
      selectedSubCategory === "All" ||
      item.subCategory === selectedSubCategory ||
      (selectedSubCategory === "" && !item.subCategory);

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
        onSelect={setSelectedSubCategpry}
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
