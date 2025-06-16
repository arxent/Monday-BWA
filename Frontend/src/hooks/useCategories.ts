
import { AxiosError } from "axios";
import apiClient from "../api/axiosConfig";
import { ApiErrorResponse, Category, CreateCategoryPayload } from "../types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// Fetch All Categories
export const useFetchCategories = () => {
  return useQuery<Category[], AxiosError>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await apiClient.get("/categories");
      return response.data;
    },
  });
};

// Fetch Single Category by ID
export const useFetchCategory = (id: number) => {
  return useQuery<Category, AxiosError>({
    queryKey: ["category", id],
    queryFn: async () => {
      const response = await apiClient.get(`/categories/${id}`);
      return response.data;
    },
    enabled: !!id, // Prevent fetching when id is undefined
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<CreateCategoryPayload, AxiosError<ApiErrorResponse>, CreateCategoryPayload>({
    mutationFn: async (payload: CreateCategoryPayload) => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("tagline", payload.tagline);
      formData.append("photo", payload.photo); // required

      const response = await apiClient.post("/categories", formData, {
        headers: { "Content-Type": "multipart/form-data" },

      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] }); // Refresh product list
      navigate("/categories");

    },
  });
}; 

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    Category, // response type
    AxiosError<ApiErrorResponse>, // error type
    { id: number } & CreateCategoryPayload // payload
  >({
    mutationFn: async ({ id, ...payload }) => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("tagline", payload.tagline);
      formData.append("_method", "PUT"); // ✅ Laravel expects this for PUT with FormData

      if (payload.photo) {
        formData.append("photo", payload.photo);
      }

      const response = await apiClient.post(`/categories/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", id] });
      navigate("/categories");

    },
  });
};


export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }, 
  });
};

