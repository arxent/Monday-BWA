
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/axiosConfig";
import { AxiosError } from "axios";
import { ApiErrorResponse, AssignProductPayload } from "../types/types"; 
import { useNavigate } from "react-router-dom";

export const useAssignProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    AssignProductPayload,
    AxiosError<ApiErrorResponse>,
    AssignProductPayload
  >({
    mutationFn: async ({ merchant_id, ...payload }) => {
      const response = await apiClient.post(
        `/merchants/${merchant_id}/products`,
        payload
      );
      return response.data;
    },
    onSuccess: (_, { merchant_id, product_id }) => {
      queryClient.invalidateQueries({ queryKey: ["merchant-product", merchant_id, product_id] });
      queryClient.invalidateQueries({ queryKey: ["merchant", merchant_id] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["warehouses"] });
      navigate(`/merchant-products/${merchant_id}`);
    },
  });
};

export const useUpdateMerchantProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    void, // No return data needed
    AxiosError<ApiErrorResponse>,
    AssignProductPayload
  >({
    mutationFn: async ({ merchant_id, product_id, warehouse_id, stock }) => {
      const formData = new FormData();
      formData.append("stock", stock.toString());
      formData.append("merchant_id", merchant_id.toString());
      formData.append("product_id", product_id.toString());
      formData.append("warehouse_id", warehouse_id.toString()); // ✅ This is the missing line
      formData.append("_method", "PUT");

      await apiClient.post(
        `/merchants/${merchant_id}/products/${product_id}`,
        formData
      );
    },
    onSuccess: (_, { merchant_id, product_id }) => {
      queryClient.invalidateQueries({
        queryKey: ["merchant-product", merchant_id, product_id],
      });
      queryClient.invalidateQueries({ queryKey: ["merchant", merchant_id] });

      navigate(`/merchant-products/${merchant_id}`);

    },
  });
};



