export default function SubCategoryTabs({ subCategories, selected, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto py-2 mb-4">
      {subCategories.map((subCategory) => (
        <button
          key={subCategory}
          className="flex-shrink-0 px-3 py-2 rounded-full text-sm font-medium transition"
        >
          {subCategory}
        </button>
      ))}
    </div>
  );
}
