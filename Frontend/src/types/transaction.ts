import { Merchant } from "./merchant";
import { Product } from "./product";

export interface Transaction {
  id: number;
  name: string;
  phone: string;
  sub_total: number;
  tax_total: number;
  grand_total: number;
  merchant_id: number;
  created_at: string;
  updated_at: string;
  merchant: Merchant;
  transaction_products: TransactionProduct[];
}

export interface TransactionProduct {
  id: number;
  transaction_id: number;
  product_id: number;
  quantity: number;
  price: number;
  sub_total: number;
  created_at: string;
  updated_at: string;
  product: Product;
}

export interface CreateTransactionPayload {
  name: string;
  phone: string;
  merchant_id: number;
  products: { product_id: number; quantity: number }[];
}

export interface CreateNewTransaction {
  merchantId: number;
  name: string;
  phone: string;
  products: import("./cart").CartProduct[];
}

export interface CreateTransactionResponse {
  message: string;
  data: Transaction;
};