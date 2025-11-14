import { useState } from "react";

import { menu } from "../data/menuData";
import StaffItemCard from "../components/Staff/StaffItemCard";

export default function StaffPage() {
  const [items, setItems] = useState(menu);

  return (
    <div className="min-h-screen p-2 bg-gray-100">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Menu Editor</h1>

      {/* Add new item button */}
      <button className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
        + Add New Menu
      </button>

      {/* Form modal */}
      {/* <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-xl p-4">
          Staff Menu Form
        </div>
      </div> */}

      {/* Menu Items List */}
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <StaffItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
