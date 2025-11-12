export default function CategoryTabs({ categories, selected, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto py-2 mb-4">
      {categories.map((category) => (
        <button
          key={category}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium ${
            selected === category
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-500 hover:text-white transition`}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
