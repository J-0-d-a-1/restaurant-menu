import { useEffect, useReducer } from "react";
import { supabase } from "../lib/supabase";
import { mapMenuFromDB, mapMenuToDB } from "../utils/menuMapper";

const initialState = {
  menus: [],
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

    case "ADD_MENU":
      return {
        ...state,
        menus: [...state.menus, action.menu],
      };

    case "UPDATE_MENU":
      return {
        ...state,
        menus: state.menus.map((menu) =>
          menu.id === action.menu.id ? action.menu : menu
        ),
      };

    case "DELETE_MENU":
      return {
        ...state,
        menus: state.menus.filter((menu) => menu.id !== action.id),
      };

    default:
      return state;
  }
}

export function useStaffMenuData() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      const [{ data: catData }, { data: menuData }] = await Promise.all([
        supabase.from("categories").select("*").order("sort_order"),
        supabase.from("menus").select("*").order("sort_order"),
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

  // filterd menu
  const filteredMenu = state.menus.filter((item) => {
    const matchCategory = item.categoryId === state.selectedCategory?.id;

    const matchSubCategory =
      state.selectedSubCategory === null ||
      item.subCategoryId === state.selectedSubCategory?.id;

    return matchCategory && matchSubCategory;
  });

  // ADD or UPDATE
  const saveMenu = async (item) => {
    const dbItem = mapMenuToDB(item);

    let query;

    if (item.id) {
      query = supabase
        .from("menus")
        .update(dbItem)
        .eq("id", item.id)
        .select()
        .single();
    } else {
      query = supabase.from("menus").insert(dbItem).select().single();
    }

    const { data, error } = await query;

    if (error) throw error;

    const mapped = mapMenuFromDB(data);

    if (item.id) {
      dispatch({ type: "UPDATE_MENU", menu: mapped });
    } else {
      dispatch({ type: "ADD_MENU", menu: mapped });
    }

    dispatch({ type: "SET_EDITING_ITEM", item: null });
  };

  // DELETE
  const deleteMenu = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmed) return;

    const { error } = await supabase.from("menus").delete().eq("id", id);

    if (error) throw error;

    dispatch({ type: "DELETE_MENU", id });
  };

  // TOGGLE HIDE
  const toggleHide = async (item) => {
    const { error } = await supabase
      .from("menus")
      .update({ hide: !item.hide })
      .eq("id", item.id);

    if (error) throw error;

    dispatch({ type: "UPDATE_MENU", menu: { ...item, hide: !item.hide } });
  };

  return { state, dispatch, filteredMenu, saveMenu, deleteMenu, toggleHide };
}
