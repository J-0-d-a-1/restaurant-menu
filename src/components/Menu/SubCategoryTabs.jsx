export default function SubCategoryTabs({
  subCategories = [],
  selected,
  onSelect,
}) {
  const tabs = ["All", ...subCategories];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-5 text-center border-b justify-center">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onSelect(tab)}
          className={`flex-shrink-0 px-3 py-2 rounded-full text-sm font-medium transition ${
            selected === tab ? "text-red-600 underline" : "text-gray-700"
          }  hover:text-red-600 transition`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
