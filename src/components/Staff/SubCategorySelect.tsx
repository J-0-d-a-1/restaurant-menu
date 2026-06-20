import type { SubCategory } from "../../types";

interface SubCategorySelectProps {
  subCategories: SubCategory[];
  value: SubCategory | null;
  onChange: (subCategory: SubCategory | null) => void;
}

export default function SubCategorySelect({
  subCategories,
  value,
  onChange,
}: SubCategorySelectProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="font-medium">Subcategory:</label>
        <select
          className="w-full border rounded p-2"
          value={value?.id ?? ""}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const selected = subCategories.find(
              (subCategory) => subCategory.id === e.target.value,
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
    </div>
  );
}
