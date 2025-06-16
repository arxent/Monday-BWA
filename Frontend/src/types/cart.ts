

export interface CartProduct {
    id: number;
    name: string;
    price: number;
    thumbnail: string;
    quantity: number;
    sub_total: number;
    category: string;
  }
  
  export type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    stock: number;
  };
  
  export type FullCartFormData = {
    cart: CartItem[];
  };