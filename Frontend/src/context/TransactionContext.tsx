import { createContext, useContext } from "react";
import { CartProduct, CreateNewTransaction } from "../types/types"; // ✅ Use CartProduct instead of Product

export interface TransactionContextType {
  transaction: CreateNewTransaction;
  setTransaction: (transaction: CreateNewTransaction) => void;
  cart: CartProduct[]; // ✅ Ensure cart uses CartProduct
  setCart: (cart: CartProduct[]) => void;
  clearTransaction: () => void;
}

export const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) throw new Error("useTransaction must be used within a TransactionProvider");
  return context;
};
