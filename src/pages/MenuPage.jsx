// import { supabase } from "../lib/supabase";

// import { useEffect, useState } from "react";

// import { mapMenuFromDB } from "../utils/menuMapper";

import { useMenuData } from "../hooks/useMenuData";

import CategoryTabs from "../components/Menu/CategoryTabs";
import SubCategoryTabs from "../components/Menu/SubCategoryTabs";
import MenuGrid from "../components/Menu/MenuGrid";
import MenuItemModal from "../components/Menu/MenuItemModal";

export default function MenuPage() {
  // const [menus, setMenus] = useState([]);
  // const [categories, setCategories] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState(null);
  // const [subCategories, setSubCategories] = useState([]);
  // const [selectedSubCategory, setSelectedSubCateopry] = useState(null);
  // const [selectedItem, setSelectedItem] = useState(null);
  // const [currentIndex, setCurrentIndex] = useState(0);

  // // Read data from supabase
  // useEffect(() => {
  //   const fetchInitialData = async () => {
  //     const [
  //       { data: catData, error: catError },
  //       { data: menuData, error: menuError },
  //     ] = await Promise.all([
  //       supabase.from("categories").select("*").order("sort_order"),
  //       supabase
  //         .from("menus")
  //         .select("*")
  //         .eq("hide", false)
  //         .order("sort_order"),
  //     ]);

  //     if (catError || menuError) {
  //       console.error(catError || menuError);
  //       return;
  //     }

  //     setCategories(catData);
  //     setSelectedCategory(catData[0]);
  //     setMenus(menuData.map(mapMenuFromDB));
  //   };

  //   fetchInitialData();
  // }, []);

  // // fetching categories
  // useEffect(() => {
  //   if (categories.length && !selectedCategory) {
  //     setSelectedCategory(categories[0]);
  //   }
  // }, [categories, selectedCategory]);

  // // update subcategories when category changes
  // useEffect(() => {
  //   if (!selectedCategory) return;

  //   const fetchSubCategories = async () => {
  //     const { data, error } = await supabase
  //       .from("subcategories")
  //       .select("*")
  //       .eq("category_id", selectedCategory.id)
  //       .order("sort_order");

  //     if (error) {
  //       console.log(error);
  //       return;
  //     }

  //     setSubCategories(data);
  //     setSelectedSubCateopry(null);
  //   };

  //   fetchSubCategories();
  // }, [selectedCategory]);

  // // Filter menu items
  // const filteredMenu = menus.filter((item) => {
  //   const matchCategory = item.categoryId === selectedCategory?.id;

  //   const matchSubCategory =
  //     selectedSubCategory === null ||
  //     item.subCategoryId === selectedSubCategory?.id;

  //   return matchCategory && matchSubCategory;
  // });

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
