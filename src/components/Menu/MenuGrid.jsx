import MenuItemCard from "./MenuItemCard";

export default function MenuGrid({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item) => (
        <MenuItemCard item={item} />
      ))}
    </div>
  );
}
