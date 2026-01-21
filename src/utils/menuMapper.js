// DB -> App
export const mapMenuFromDB = (row) => ({
  id: row.id,
  name: row.name,
  categoryId: row.category_id,
  subCategoryId: row.sub_category_id,
  description: row.description,
  price: row.price,
  images: row.images,
  soldOut: row.sold_out,
  hide: row.hide,
});

// App -> DB
export const mapMenuToDB = (item) => ({
  name: item.name,
  category: item.category,
  sub_category: item.subCategory || null,
  description: item.description,
  price: item.price,
  images: item.images,
  sold_out: item.soldOut,
  hide: item.hide ?? false,
});
