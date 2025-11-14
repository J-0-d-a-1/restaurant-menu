import { menu } from "../data/menuData";

import { useEffect, useState } from "react";

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

  const [selectedCategory, setSelectedCategory] = useState(fixedCategories[0]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategpry] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // update subcategories when category changes
  useEffect(() => {
    const filtered = menu.filter((item) => item.category === selectedCategory);
    const subs = [
      ...new Set(filtered.map((item) => item.subCategory).filter(Boolean)),
    ];

    setSubCategories(subs);
    setSelectedSubCategpry(subs[0] || "");
  }, [selectedCategory]);

  // Filter menu items
  const filteredMenu = menu.filter((item) => {
    const matchCategory = item.category === selectedCategory;
    const matchSubCategory = item.subCategory
      ? item.subCategory === selectedSubCategory
      : true;
    return matchCategory && matchSubCategory;
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
