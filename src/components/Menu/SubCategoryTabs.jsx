export default function SubCategoryTabs({ subCategories, selected, onSelect }) {
  if (!subCategories || subCategories.length === 0) return null;

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-5 text-center border-b justify-center">
      {subCategories.map((subCategory) => (
        <button
          key={subCategory}
          className={`flex-shrink-0 px-3 py-2 rounded-full text-sm font-medium transition ${
            selected === subCategory
              ? "text-red-600 underline"
              : "text-gray-700"
          }  hover:text-red-600 transition`}
          onClick={() => onSelect(subCategory)}
        >
          {subCategory}
        </button>
      ))}
    </div>
  );
}
