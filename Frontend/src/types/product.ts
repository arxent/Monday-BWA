

export interface Product {
  id: number;
  name: string;
  price: number;
  thumbnail: string;
  about: string;
  category_id: number;
  category: Category;
  is_popular: boolean;
  warehouse_stock: number;
  merchant_stock: number;
  pivot?: {
    warehouse_id: number;
    product_id: number;
    stock: number;
    created_at: string;
    updated_at: string;
  };
}

export interface Category {
  id: number;
  name: string;
  tagline: string;
  photo: string;
  products: Product[];
}

export interface CreateCategoryPayload {
  tagline: string;
  name: string;
  photo: File;
}


export interface CreateProductPayload {
  name: string;
  price: number;
  about: string;
  category_id: number;
  is_popular: boolean;
  thumbnail: File;
}