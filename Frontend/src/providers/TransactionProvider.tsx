import { useState, useEffect, ReactNode } from "react";
import { CartProduct, CreateNewTransaction } from "../types/types"; // ✅ Use CartProduct
import { TransactionContext } from "../context/TransactionContext";
import { useMyMerchantProfile } from "../hooks/useMerchants";

interface TransactionProviderProps {
  children: ReactNode;
}

const TransactionProvider = ({ children }: TransactionProviderProps) => {
  const { data: merchant } = useMyMerchantProfile({
    retry: false, // stop after 1 try if 404
  });

  const [transaction, setTransaction] = useState<CreateNewTransaction>(() => {
    const savedTransaction = localStorage.getItem("transactionData");
    return savedTransaction
      ? JSON.parse(savedTransaction)
      : { merchantId: merchant?.id || 0, name: "", phone: "", products: [] };
  });

  const [cart, setCart] = useState<CartProduct[]>(() => {
    const savedCart = localStorage.getItem("cartData");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    if (merchant?.id) {
      setTransaction((prev) => ({ ...prev, merchantId: merchant.id }));
    }
  }, [merchant]);

  useEffect(() => {
    localStorage.setItem("transactionData", JSON.stringify(transaction));
  }, [transaction]);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cart));
  }, [cart]);

  const clearTransaction = () => {
    setTransaction({ merchantId: merchant?.id || 0, name: "", phone: "", products: [] });
    setCart([]);
    localStorage.removeItem("transactionData");
    localStorage.removeItem("cartData");
  };

  return (
    <TransactionContext.Provider value={{ transaction, setTransaction, cart, setCart, clearTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
