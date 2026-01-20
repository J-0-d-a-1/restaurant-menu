import { supabase } from "../lib/supabase";

import { useEffect, useState } from "react";

import { mapMenuFromDB } from "../utils/menuMapper";

import CategoryTabs from "../components/Menu/CategoryTabs";
import SubCategoryTabs from "../components/Menu/SubCategoryTabs";
import MenuGrid from "../components/Menu/MenuGrid";
import MenuItemModal from "../components/Menu/MenuItemModal";

export default function MenuPage() {
  const fixedCategories = [
    "Drinks",
    "Salad",
    "Sashimi & Sushi",
    "Tapas",
    "Rice & Noodles",
    "Dessert",
  ];

  const [menus, setMenus] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(fixedCategories[0]);
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
      setMenus(data.map(mapMenuFromDB));
    };

    fetchMenus();
  }, []);

  // update subcategories when category changes
  useEffect(() => {
    const filtered = menus.filter((item) => item.category === selectedCategory);

    const subs = [...new Set(filtered.map((item) => item.sub_category || ""))];

    setSubCategories(subs);
    setSelectedSubCategpry("All");
  }, [selectedCategory, menus]);

  // Filter menu items
  const filteredMenu = menus.filter((item) => {
    const matchCategory = item.category === selectedCategory;

    const matchSubCategory =
      selectedSubCategory === "All" ||
      item.sub_category === selectedSubCategory ||
      (selectedSubCategory === "" && !item.sub_category);

    return matchCategory && matchSubCategory && item.hide === false;
  });

  return (
    <div className="p-2 sm:p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Menu</h1>

      {/* Category tabs */}
      <CategoryTabs
        categories={fixedCategories}
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
