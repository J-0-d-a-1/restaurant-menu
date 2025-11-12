import { menu } from "../data/menuData";

import CategoryTabs from "../components/Menu/CategoryTabs";
import SubCategoryTabs from "../components/Menu/SubCategoryTabs";

export default function MenuPage() {
  const fixedCategories = [
    "Drinks",
    "Salad",
    "Sashimi & Sushi",
    "Tapas",
    "Rice & Noodles",
    "Desserts",
  ];

  return (
    <div className="p-4 sm:p-6 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Menu</h1>

      {/* Category tabs */}
      <CategoryTabs />

      {/* Subcategory tabs */}
      <SubCategoryTabs />
    </div>
  );
}
