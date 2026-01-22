export default function SubCategoryTabs({ subCategories, selected, onSelect }) {
  if (!subCategories.length) return null;

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-5 text-center border-b justify-center">
      {/* All tab */}
      <button
        onClick={() => onSelect(null)}
        className={`flex-shrink-0 px-3 py-2 rounded-full text-sm font-medium transition ${
          selected === null ? "text-red-600 underline" : "text-gray-700"
        }  hover:text-red-600 transition`}
      >
        All
      </button>

      {subCategories.map((subCategory) => {
        const isActive = selected !== null && selected?.id === subCategory.id;

        return (
          <button
            key={subCategory.id}
            onClick={() => onSelect(subCategory)}
            className={`flex-shrink-0 px-3 py-2 rounded-full text-sm font-medium transition ${
              isActive ? "text-red-600 underline" : "text-gray-700"
            }  hover:text-red-600 transition`}
          >
            {subCategory.name}
          </button>
        );
      })}
    </div>
  );
}
