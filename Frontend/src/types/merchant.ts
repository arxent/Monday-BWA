import { Product } from "./product";
import { User } from "./auth";

export interface Merchant {
  id: number;
  name: string;
  address: string;
  phone: string;
  photo: string;
  keeper_id: number;
  products: Product[];
  keeper: User;
}

export interface CreateMerchantPayload {
  name: string;
  address: string;
  phone: string;
  keeper_id: number;
  photo: File;
}

export interface UpdateMerchantPayload {
  id: number;
  name: string;
  address: string;
  phone: string;
  keeper_id: number;
  photo?: File;
}

export interface AssignProductPayload {
  merchant_id: number;
  warehouse_id: number;
  product_id: number;
  stock: number;
}