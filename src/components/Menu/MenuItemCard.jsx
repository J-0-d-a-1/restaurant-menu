import SoldOutBadge from "./SoldOutBadge";

export default function MenuItemCard({ item }) {
  return (
    <div key={item.name} className="bg-white shadow rounded-lg p-4 relative">
      {item.soldOut && <SoldOutBadge />}
      <img
        src={item.images[0]}
        alt={item.name}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="text-gray-400 text-sm mb-1">{item.description}</p>
      <p className="font-bold">{item.price}</p>
    </div>
  );
}
