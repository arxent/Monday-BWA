import { Product } from "./product";

export interface Warehouse {
  id: number;
  name: string;
  address: string;
  phone: string;
  photo: string;
  products: Product[];
}

export interface WarehouseProduct {
  id: number;
  warehouse_id: number;
  product_id: number;
  stock: number;
  warehouse: Warehouse;
  product: Product;
}

export interface CreateWarehousePayload {
  name: string;
  address: string;
  phone: string;
  photo: File;
}

export interface AssignWarehouseProductPayload {
  product_id: number;
  stock: number;
  warehouse_id: number;
}