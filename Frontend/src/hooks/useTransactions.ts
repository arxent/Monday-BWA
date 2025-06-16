import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import apiClient from "../api/axiosConfig";
import { AxiosError } from "axios";
import { ApiErrorResponse, CreateTransactionPayload, CreateTransactionResponse, Transaction } from "../types/types";
import { useTransaction } from "../context/TransactionContext"; 
import { useNavigate } from "react-router-dom"; 


// for keeper store
export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const { transaction, cart, clearTransaction } = useTransaction();
  const navigate = useNavigate();  

  return useMutation<CreateTransactionResponse, AxiosError<ApiErrorResponse>, CreateTransactionPayload>({
    mutationFn: async (payload) => {
      // const response = await apiClient.post("/transactions", payload);
      const response = await apiClient.post<CreateTransactionResponse>("/transactions", payload);
      return response.data;
    },
    onSuccess: ({data}) => {
      queryClient.invalidateQueries({ queryKey: ["merchant-transactions"] }); // Refresh transaction list

      // 🧠 Calculate all values before clearing
      const subTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const taxTotal = subTotal * 0.1;
      const grandTotal = subTotal + taxTotal;
      const totalItems = cart.length;
      const totalQuantity = cart.reduce((sum, p) => sum + p.quantity, 0);

      clearTransaction();  

      // 🚀 Navigate with transaction state
      navigate("/transactions/success", {
        state: {
          customerName: transaction.name,
          totalItems,
          totalQuantity,
          subTotal,
          taxTotal,
          grandTotal,
          transactionId: data.id,
        },
      });
    },
    onError: (error) => {
      console.error("Transaction Error:", error);
      alert(error.response?.data?.message || "Error saving transaction!");
    },
  });
}; 

export const useFetchMerchantTransactions = (
  options?: Partial<UseQueryOptions<Transaction[], AxiosError>>
) => {
  return useQuery<Transaction[], AxiosError>({
    queryKey: ["my-merchant/transactions"],
    queryFn: async () => {
      const response = await apiClient.get("/my-merchant/transactions");
      return response.data.data;
    },
    retry: false, 
    ...options,
  });
};  

// for manager
  export const useFetchTransaction = (id: number) => {
    return useQuery<Transaction, AxiosError>({
      queryKey: ["transaction", id],
      queryFn: async () => {
        const response = await apiClient.get(`/transactions/${id}`);
        return response.data;
      },
      enabled: !!id, // Only fetch if ID is available
    });
  }; 

  export const useFetchAllTransactions = () => {
    return useQuery<Transaction[], AxiosError>({
      queryKey: ["all-transactions"],
      queryFn: async () => {
        const response = await apiClient.get("/transactions");
        return response.data;
      },
    });
  };