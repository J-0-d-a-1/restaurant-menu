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
