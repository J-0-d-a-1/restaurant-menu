import { menu } from "../data/menuData";

import CategoryTabs from "../components/Menu/CategoryTabs";
import SubCategoryTabs from "../components/Menu/SubCategoryTabs";
import { useEffect, useState } from "react";

export default function MenuPage() {
  const fixedCategories = [
    "Drinks",
    "Salad",
    "Sashimi & Sushi",
    "Tapas",
    "Rice & Noodles",
    "Desserts",
  ];
  const [selectedCategory, setSelectedCategory] = useState(fixedCategories[0]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategpry] = useState("");

  // update subcategories when category changes
  useEffect(() => {
    const subs = [
      ...new Set(
        menu
          .filter((item) => item.category === selectedCategory)
          .map((item) => item.subcategory)
          .filter(Boolean)
      ),
    ];

    setSubCategories(subs);
    setSelectedSubCategpry(subs[0] || "");
  }, [selectedCategory]);

  return (
    <div className="p-4 sm:p-6 min-h-screen">
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
    </div>
  );
}
