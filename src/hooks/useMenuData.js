import { useEffect, useReducer } from "react";

import { supabase } from "../lib/supabase";

import { mapMenuFromDB } from "../utils/menuMapper";

const initialState = {
  menus: [],
  categories: [],
  subCategories: [],
  selectedCategory: null,
  selectedSubCategory: null,
  selectedItem: null,
  currentIndex: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_INITIAL_DATA":
      return {
        ...state,
        categories: action.categories,
        menus: action.menus,
        selectedCategory: action.categories[0] ?? null,
      };

    case "SET_CATEGORY":
      return {
        ...state,
        selectedCategory: action.category,
        selectedSubCategory: null,
      };

    case "SET_SUBCATEGORIES":
      return { ...state, subCategories: action.subCategories };

    case "SET_SUBCATEGORY":
      return { ...state, selectedSubCategory: action.selectedSubCategory };

    case "SET_SELECTED_ITEM":
      return { ...state, selectedItem: action.selectedItem };

    case "SET_INDEX":
      return { ...state, currentIndex: action.currentIndex };

    default:
      return state;
  }
}

export function useMenuData() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch initial categories + menus
  useEffect(() => {
    const fetchInitialData = async () => {
      const [{ data: catData }, { data: menuData }] = await Promise.all([
        supabase.from("categories").select("*").order("sort_order"),
        supabase
          .from("menus")
          .select("*")
          .eq("hide", false)
          .order("sort_order"),
      ]);

      dispatch({
        type: "SET_INITIAL_DATA",
        categories: catData || [],
        menus: (menuData || []).map(mapMenuFromDB),
      });
    };

    fetchInitialData();
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

      dispatch({ type: "SET_SUBCATEGORIES", subCategories: data || [] });
    };

    fetchSub();
  }, [state.selectedCategory]);

  // Filtered menu
  const filteredMenu = state.menus.filter((item) => {
    const matchCategory = item.categoryId === state.selectedCategory?.id;
    const matchSub =
      !state.selectedSubCategory ||
      item.subCategoryId === state.selectedSubCategory.id;
    return matchCategory && matchSub;
  });

  return { state, dispatch, filteredMenu };
}
