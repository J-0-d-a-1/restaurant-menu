import { useMenuData } from "../hooks/useMenuData";

import CategoryTabs from "../components/Menu/CategoryTabs";
import SubCategoryTabs from "../components/Menu/SubCategoryTabs";
import MenuGrid from "../components/Menu/MenuGrid";
import MenuItemModal from "../components/Menu/MenuItemModal";

export default function MenuPage() {
  const { state, dispatch, filteredMenu } = useMenuData();

  return (
    <div className="p-2 sm:p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Menu</h1>

      {/* Category tabs */}
      <CategoryTabs
        categories={state.categories}
        selected={state.selectedCategory}
        onSelect={(category) => dispatch({ type: "SET_CATEGORY", category })}
      />

      {/* Subcategory tabs */}
      <SubCategoryTabs
        subCategories={state.subCategories}
        selected={state.selectedSubCategory}
        onSelect={(subCategory) =>
          dispatch({
            type: "SET_SUBCATEGORY",
            selectedSubCategory: subCategory,
          })
        }
      />

      {/* Menu grids */}
      <MenuGrid
        items={filteredMenu}
        onItemClick={(item) =>
          dispatch({ type: "SET_SELECTED_ITEM", selectedItem: item })
        }
      />

      {/* Menu modals */}
      <MenuItemModal
        item={state.selectedItem}
        onClose={() =>
          dispatch({ type: "SET_SELECTED_ITEM", selectedItem: null })
        }
        currentIndex={state.currentIndex}
        setCurrentIndex={(index) =>
          dispatch({ type: "SET_INDEX", currentIndex: index })
        }
      />
    </div>
  );
}
