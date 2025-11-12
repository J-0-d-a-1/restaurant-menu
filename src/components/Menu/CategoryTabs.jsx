import { menu } from "../../data/menuData";

const fixedCategories = [
  "Drinks",
  "Salad",
  "Sashimi & Sushi",
  "Tapas",
  "Rice & Noodles",
  "Desserts",
];

export default function CategoryTabs(selected) {
  return (
    <div className="flex gap-2 overflow-x-auto py-2 mb-4">
      {fixedCategories.map((category) => (
        <button
          key={category}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium ${
            selected === category
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-500 hover:text-white transition`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
