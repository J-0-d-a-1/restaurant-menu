import { useEffect, useReducer } from "react";
import { supabase } from "../lib/supabase";
import { mapMenuFromDB } from "../utils/menuMapper";
import { Category, MenuItem, SubCategory } from "../types";

// Type the state
interface MenuState {
  menus: MenuItem[];
  categories: Category[];
  subCategories: SubCategory[];
  selectedCategory: Category | null;
  selectedSubCategory: SubCategory | null;
  selectedItem: MenuItem | null;
  currentIndex: number;
}

// Type each action
type MenuAction =
  | { type: "SET_INITIAL_DATA"; categories: Category[]; menus: MenuItem[] }
  | { type: "SET_CATEGORY"; category: Category }
  | { type: "SET_SUBCATEGORIES"; subCategories: SubCategory[] }
  | { type: "SET_SUBCATEGORY"; selectedSubCategory: SubCategory | null }
  | { type: "SET_SELECTED_ITEM"; selectedItem: MenuItem | null }
  | { type: "SET_INDEX"; currentIndex: number };

// Type the initial state
const initialState: MenuState = {
  menus: [],
  categories: [],
  subCategories: [],
  selectedCategory: null,
  selectedSubCategory: null,
  selectedItem: null,
  currentIndex: 0,
};

// Type the reducer
function reducer(state: MenuState, action: MenuAction): MenuState {
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
        subCategories: [],
      };

    case "SET_SUBCATEGORIES":
      return { ...state, subCategories: action.subCategories };

    case "SET_SUBCATEGORY":
      return { ...state, selectedSubCategory: action.selectedSubCategory };

    case "SET_SELECTED_ITEM":
      return { ...state, selectedItem: action.selectedItem, currentIndex: 0 };

    case "SET_INDEX":
      return { ...state, currentIndex: action.currentIndex };

    default:
      return state;
  }
}

// Type the hook return
interface UseMenuDataReturn {
  state: MenuState;
  dispatch: React.Dispatch<MenuAction>;
  filteredMenu: MenuItem[];
}

export function useMenuData(): UseMenuDataReturn {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch initial categories + menus
  useEffect(() => {
    const fetchInitialData = async (): Promise<void> => {
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
        categories: (catData as Category[]) || [],
        menus: ((menuData || []) as any[]).map(mapMenuFromDB),
      });
    };

    fetchInitialData();
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (!state.selectedCategory) return;

    const fetchSub = async (): Promise<void> => {
      const { data } = await supabase
        .from("subcategories")
        .select("*")
        .eq("category_id", state.selectedCategory!.id)
        .order("sort_order");

      dispatch({
        type: "SET_SUBCATEGORIES",
        subCategories: (data as SubCategory[]) || [],
      });
    };

    fetchSub();
  }, [state.selectedCategory]);

  // Filtered menu
  const filteredMenu: MenuItem[] = state.menus.filter((item: MenuItem) => {
    const matchCategory = item.categoryId === state.selectedCategory?.id;

    const matchSubCategory =
      state.selectedSubCategory === null ||
      item.subCategoryId === state.selectedSubCategory?.id;

    return matchCategory && matchSubCategory;
  });

  return { state, dispatch, filteredMenu };
}
