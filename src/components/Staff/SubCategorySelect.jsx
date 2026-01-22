export default function SubCategorySelect({ subCategories, value, onChange }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="font-medium">Subcategory:</label>
        <select
          className="w-full border rounded p-2"
          value={value?.id ?? ""}
          onChange={(e) => {
            const selected = subCategories.find(
              (subCategory) => subCategory.id === e.target.value
            );
            onChange(selected ?? null);
          }}
        >
          <option>All</option>

          {subCategories.map((subCategory) => (
            <option key={subCategory.id} value={subCategory.id}>
              {subCategory.name}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown */}
      {/* <select className="border p-2 rounded" value={}></select> */}
    </div>
  );
}
