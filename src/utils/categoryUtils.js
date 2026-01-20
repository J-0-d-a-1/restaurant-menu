export function extractCategories(menus) {
  return [...new Set(menus.map((item) => item.category))];
}

export function extractSubCategories(menus, category) {
  return [
    ...new Set(
      menus
        .filter((item) => item.category === category)
        .map((item) => item.subCategory)
        .filter(Boolean)
    ),
  ];
}
