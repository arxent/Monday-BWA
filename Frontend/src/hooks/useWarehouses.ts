import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/axiosConfig";
import { AxiosError } from "axios";
import { Warehouse, ApiErrorResponse, CreateWarehousePayload } from "../types/types";
import { useNavigate } from "react-router-dom";

// Fetch All Warehouses
export const useFetchWarehouses = () => {
  return useQuery<Warehouse[], AxiosError>({
    queryKey: ["warehouses"],
    queryFn: async () => {
      const response = await apiClient.get("/warehouses");
      return response.data;
    },
  });
};

// Fetch Single Warehouse by ID
export const useFetchWarehouse = (id: number) => {
  return useQuery<Warehouse, AxiosError>({
    queryKey: ["warehouse", id],
    queryFn: async () => {
      const response = await apiClient.get(`/warehouses/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateWarehouse = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<CreateWarehousePayload, AxiosError<ApiErrorResponse>, CreateWarehousePayload>({
    mutationFn: async (payload: CreateWarehousePayload) => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("address", payload.address);
      formData.append("phone", payload.phone);
      formData.append("photo", payload.photo); // ✅ Required now

      const response = await apiClient.post("/warehouses", formData, {
        headers: { "Content-Type": "multipart/form-data" },

      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["warehouses"] }); // Refresh product list
      navigate("/warehouses");

    },
  });
};  

export const useUpdateWarehouse = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    Warehouse, // response type
    AxiosError<ApiErrorResponse>, // error type
    { id: number } & CreateWarehousePayload // payload
  >({
    mutationFn: async ({ id, ...payload }) => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("address", payload.address);
      formData.append("phone", payload.phone);

      formData.append("_method", "PUT"); // ✅ Laravel expects this for PUT with FormData

      if (payload.photo) {
        formData.append("photo", payload.photo);
      }

      const response = await apiClient.post(`/warehouses/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["warehouses"] });
      queryClient.invalidateQueries({ queryKey: ["warehouse", id] });
      navigate("/warehouses");

    },
  });
};

export const useDeleteWarehouse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/warehouses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["warehouses"] });
    }, 
  });
}; 