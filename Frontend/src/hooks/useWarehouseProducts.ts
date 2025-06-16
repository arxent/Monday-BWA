import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/axiosConfig";
import { ApiErrorResponse, AssignWarehouseProductPayload, WarehouseProduct } from "../types/types";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const useAssignWarehouseProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    AssignWarehouseProductPayload,
    AxiosError<ApiErrorResponse>,
    AssignWarehouseProductPayload
  >({
    mutationFn: async ({ warehouse_id, ...payload }) => {
      const response = await apiClient.post(
        `/warehouses/${warehouse_id}/products`,
        payload
      );
      return response.data;
    },
    onSuccess: (_, { warehouse_id, product_id }) => {
      queryClient.invalidateQueries({ queryKey: ["warehouse-product", warehouse_id, product_id] });
      queryClient.invalidateQueries({ queryKey: ["warehouse", warehouse_id] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["warehouses"] });
      navigate(`/warehouse-products/${warehouse_id}`);

    },
  });
};

export const useUpdateWarehouseProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    WarehouseProduct, // Expecting updated warehouse product response
    AxiosError<ApiErrorResponse>,
    AssignWarehouseProductPayload
  >({
    mutationFn: async ({ warehouse_id, product_id, stock }) => {

      const formData = new FormData();

      formData.append("stock", stock.toString()); // Ensure it's a string
      formData.append("warehouse_id", warehouse_id.toString()); // ✅ Explicitly add warehouse_id
      formData.append("product_id", product_id.toString()); // ✅ Explicitly add product_id
      
      formData.append("_method", "PUT"); // ✅ Laravel recognizes this as an update

      const response = await apiClient.post(
        `/warehouses/${warehouse_id}/products/${product_id}`,
        formData,
      );

      return response.data;
    },
    onSuccess: (_, { warehouse_id, product_id }) => {
      queryClient.invalidateQueries({ queryKey: ["warehouse-product", warehouse_id, product_id] }); // Refresh product details
      queryClient.invalidateQueries({ queryKey: ["warehouse", warehouse_id] }); // Refresh warehouse data
      navigate(`/warehouse-products/${warehouse_id}`);

    },
  });
};

