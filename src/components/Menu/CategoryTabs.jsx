export default function CategoryTabs({ categories, selected, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto py-2 mb-2 text-center border-t border-b sm:justify-center">
      {categories.map((category) => {
        const isActive = selected?.id === category.id;

        return (
          <button
            key={category.id}
            className={`flex-shrink-0 px-4 py-2 text-sm font-medium ${
              isActive ? "text-red-600 underline" : "text-gray-700"
            }  hover:text-red-600 transition`}
            onClick={() => onSelect(category)}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
}
