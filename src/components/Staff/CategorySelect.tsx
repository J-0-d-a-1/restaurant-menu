import type { Category } from "../../types";

interface CategorySelectProps {
  categories: Category[];
  value: Category | null;
  onChange: (category: Category | undefined) => void;
}

export default function CategorySelect({
  categories,
  value,
  onChange,
}: CategorySelectProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="font-medium">Category:</label>
        <select
          className="w-full border rounded p-2"
          value={value?.id ?? ""}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const selected = categories.find(
              (category) => category.id === e.target.value,
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
