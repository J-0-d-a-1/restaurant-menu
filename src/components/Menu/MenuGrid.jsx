import MenuItemCard from "./MenuItemCard";

export default function MenuGrid({ items, onItemClick }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item.id} onClick={() => onItemClick(item)}>
          <MenuItemCard item={item} />
        </div>
      ))}
    </div>
  );
}
