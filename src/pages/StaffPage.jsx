import { useAuth } from "../hooks/useAuth";
import { useStaffMenuData } from "../hooks/useStaffMenuData";

import StaffItemCard from "../components/Staff/StaffItemCard";
import StaffMenuForm from "../components/Staff/StaffMenuForm";
import CategoryTabs from "../components/Menu/CategoryTabs";
import SubCategoryTabs from "../components/Menu/SubCategoryTabs";

export default function StaffPage() {
  const { user, loading } = useAuth();
  const { state, dispatch, filteredMenu, saveMenu, deleteMenu, toggleHide } =
    useStaffMenuData();

  // loading
  if (loading) return <p>Loading...</p>;

  // no user
  if (!user) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">Access denied</h2>
        <p>You must be logged in to access this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-2 bg-gray-100">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Menu Editor</h1>

      {/* Add new item button */}
      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
        onClick={() => dispatch({ type: "SET_EDITING_ITEM", item: {} })}
      >
        + Add New Menu
      </button>

      {/* Category tabs */}
      <CategoryTabs
        categories={state.categories}
        selected={state.selectedCategory}
        onSelect={(category) => dispatch({ type: "SET_CATEGORY", category })}
      />

      {/* SubCategory Tabs */}
      <SubCategoryTabs
        subCategories={state.subCategories}
        selected={state.selectedSubCategory}
        onSelect={(subCategory) => {
          dispatch({ type: "SET_SUBCATEGORY", subCategory });
        }}
      />

      {/* Menu Items List */}
      <div className="grid gap-4 sm:grid-cols-3">
        {filteredMenu.map((item) => (
          <StaffItemCard
            key={item.id}
            item={item}
            onEdit={() => dispatch({ type: "SET_EDITING_ITEM", item })}
            onDelete={() => deleteMenu(item.id)}
            onToggleHide={() => toggleHide(item)}
          />
        ))}
      </div>

      {/* Form modal */}
      {state.editingItem && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl p-4">
            <StaffMenuForm
              categories={state.categories}
              allSubCategories={state.subCategories}
              item={state.editingItem}
              onSave={saveMenu}
              onCancel={() =>
                dispatch({ type: "SET_EDITING_ITEM", item: null })
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
