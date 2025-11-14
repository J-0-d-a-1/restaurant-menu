import { useState } from "react";

import { menu } from "../data/menuData";

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
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <img
              src={item.images[0]}
              alt={item.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h2 className="font-bold text-lg">{item.name}</h2>
            <p className="text-sm text-gray-600">{item.category}</p>

            {item.subCategory && (
              <p className="text-xs text-gray-500">{item.subCategory}</p>
            )}

            <p className="mt-2 font-semibold">${item.price}</p>

            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-green-600 text-white py-1 rounded ">
                Edit
              </button>
              <button className="flex-1 bg-red-600 text-white py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
