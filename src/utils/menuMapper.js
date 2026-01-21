// DB -> App
export const mapMenuFromDB = (row) => ({
  id: row.id,
  name: row.name,
  categoryId: row.category_id,
  subCategoryId: row.sub_category_id,
  description: row.description,
  price: row.price,
  soldOut: row.sold_out,
  hide: row.hide,
  images: row.images,
});

// App -> DB
export const mapMenuToDB = (item) => ({
  name: item.name,
  category_id: item.categoryId,
  sub_category_id: item.subCategoryId,
  description: item.description,
  price: item.price,
  sold_out: item.soldOut,
  hide: item.hide,
  images: item.images,
});
