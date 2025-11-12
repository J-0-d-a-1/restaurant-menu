export default function SubCategoryTabs({ subCategories, selected, onSelect }) {
  if (!subCategories || subCategories.length === 0) return null;

  return (
    <div className="flex gap-2 overflow-x-auto py-2 mb-4">
      {subCategories.map((subCategory) => (
        <button
          key={subCategory}
          className={`flex-shrink-0 px-3 py-2 rounded-full text-sm font-medium transition ${
            selected === subCategory
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
          }`}
          onClick={() => onSelect(subCategory)}
        >
          {subCategory}
        </button>
      ))}
    </div>
  );
}
