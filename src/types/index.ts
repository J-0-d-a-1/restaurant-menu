// Database row shape (what Supabase returns)
export interface MenuItemDB {
  id: string;
  name: string;
  category_id: string;
  subcategory_id: string | null;
  description: string | null;
  price: number;
  sold_out: boolean;
  hide: boolean;
  images: string[] | null;
}

// App shape (what components use)
export interface MenuItem {
  id: string;
  name: string;
  categoryId: string | null;
  subCategoryId: string | null;
  description: string | null;
  price: number;
  soldOut: boolean;
  hide: boolean;
  images: string[] | null;
}

// Category shape
export interface Category {
  id: string;
  name: string;
  sort_order: number;
}

// SubCategory shape
export interface SubCategory {
  id: string;
  name: string;
  category_id: string;
  sort_order: number;
}

// ImagePreview shape
export interface ImagePreview {
  file?: File;
  preview: string;
}
