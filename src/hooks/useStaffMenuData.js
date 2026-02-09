import { useEffect, useReducer } from "react";
import { supabase } from "../lib/supabase";
import { mapMenuFromDB } from "../utils/menuMapper";

const initialState = {
  items: [],
  categories: [],
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
        items: action.items,
        selectedCategory: action.categories[0] ?? null,
      };

    case "SET_CATEGORY":
      return {
        ...state,
        selectedCategory: action.category,
        selectedSubCategory: null,
        subCategories: [],
      };

    case "SET_SUBCATEGORIES":
      return {
        ...state,
        subCategories: action.subCategories,
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

  // Fetch initial data
  useEffect(() => {
    const fetchInitial = async () => {
      const [{ data: categories }, { data: menus }] = await Promise.all([
        supabase.from("categories").select("*").order("sort_order"),
        supabase.from("menus").select("*").order("sort_order"),
      ]);

      dispatch({
        type: "SET_INITIAL_DATA",
        categories: categories ?? [],
        items: (menus ?? []).map(mapMenuFromDB),
      });
    };

    fetchInitial();
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (!state.selectedCategory) return;

    const fetchSub = async () => {
      const { data } = await supabase
        .from("subcategories")
        .select("*")
        .eq("category_id", state.selectedCategory.id)
        .order("sort_order");

      dispatch({ type: "SET_SUBCATEGORIES", subCategories: data ?? [] });
    };

    fetchSub();
  }, [state.selectedCategory]);

  // filterd menu
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
