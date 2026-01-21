export default function CategorySelect({ categories, value, onChange }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="font-medium">Category:</label>
        <select
          className="w-full border rounded p-2"
          value={value?.id ?? ""}
          onChange={(e) => {
            const selected = categories.find(
              (category) => category.id === Number(e.target.value)
            );
            onChange(selected);
          }}
        >
          <option value="" disabled>
            Select category
          </option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
