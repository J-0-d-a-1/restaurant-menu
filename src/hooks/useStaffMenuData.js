import { useEffect, useReducer } from "react";
import { supabase } from "../lib/supabase";
import { mapMenuFromDB } from "../utils/menuMapper";

const initialState = {
  items: [],
  categories: [],
  allSubCategories: [],
  subCategories: [],
  selectedCategory: null,
  selectedSubCategory: null,
  editingItem: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_INITIAL_DATA":
      return {
        ...state,
        categories: action.categories,
        allSubCategories: action.allSubCategories,
        items: action.items,
        selectedCategory: action.categories[0] ?? null,
      };

    case "SET_CATEGORY":
      return {
        ...state,
        selectedCategory: action.category,
        selectedSubCategory: null,
        subCategories: state.allSubCategories.filter(
          (sub) => sub.category_id === action.category.id
        ),
      };

    case "SET_SUBCATEGORY":
      return {
        ...state,
        selectedSubCategory: action.subCategory,
      };

    case "SET_EDITING_ITEM":
      return {
        ...state,
        editingItem: action.item,
      };

    case "UPSERT_ITEM":
      return {
        ...state,
        items: state.items.some((item) => item.id === action.item.id)
          ? state.items.map((item) =>
              item.id === action.item.id ? action.item : item
            )
          : [...state.items, action.item],
      };

    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };

    default:
      return state;
  }
}

export function useStaffMenuData() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch everything
  useEffect(() => {
    const fetchData = async () => {
      const [{ data: categories }, { data: subCategories }, { data: menus }] =
        await Promise.all([
          supabase.from("categories").select("*").order("sort_order"),
          supabase.from("subcategories").select("*").order("sort_order"),
          supabase.from("menus").select("*").order("sort_order"),
        ]);

      dispatch({
        type: "SET_INITIAL_DATA",
        categories: categories ?? [],
        subCategories: subCategories ?? [],
        items: (menus ?? []).map(mapMenuFromDB),
      });
    };

    fetchData();
  }, []);

  const filteredMenu = state.items.filter((item) => {
    if (state.selectedCategory && item.categoryId !== state.selectedCategory.id)
      return false;

    if (
      state.selectedSubCategory &&
      item.subCategoryId !== state.selectedSubCategory.id
    )
      return false;

    return true;
  });

  return { state, dispatch, filteredMenu };
}
