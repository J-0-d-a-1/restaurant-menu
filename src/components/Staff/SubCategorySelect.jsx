export default function SubCategorySelect({
  subCategories,
  value,
  category,
  onChange,
}) {
  const list = subCategories[category] || [];

  if (list.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="font-medium">Subcategory</label>
        <select
          className="w-full border rounded p-2"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {list.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown */}
      {/* <select className="border p-2 rounded" value={}></select> */}
    </div>
  );
}
