export default function CategorySelect({ categories, value, onChange }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="font-medium">Category</label>
        <select
          className="w-full border rounded p-2"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
