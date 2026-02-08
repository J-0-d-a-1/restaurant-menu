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
