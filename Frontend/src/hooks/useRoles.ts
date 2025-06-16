import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/axiosConfig";
import { AxiosError } from "axios";
import { Role, CreateRolePayload, ApiErrorResponse } from "../types/types";
import { useNavigate } from "react-router-dom";

// Fetch All Roles
export const useFetchRoles = () => {
  return useQuery<Role[], AxiosError>({
    queryKey: ["roles"],
    queryFn: async () => {
      const response = await apiClient.get("/roles");
      return response.data;
    },
  });
};

// Fetch Single Role by ID
export const useFetchRole = (id: number) => {
  return useQuery<Role, AxiosError>({
    queryKey: ["role", id],
    queryFn: async () => {
      const response = await apiClient.get(`/roles/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<CreateRolePayload, AxiosError<ApiErrorResponse>, CreateRolePayload>({
    mutationFn: async (payload: CreateRolePayload) => {
      const formData = new FormData();
      formData.append("name", payload.name);

      const response = await apiClient.post("/roles", formData, {
        headers: { "Content-Type": "multipart/form-data" },

      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });  
      navigate("/roles");

    },
  });
};   

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    Role, // response type
    AxiosError<ApiErrorResponse>, // error type
    { id: number } & CreateRolePayload // payload
  >({
    mutationFn: async ({ id, ...payload }) => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("_method", "PUT"); // ✅ Laravel expects this for PUT with FormData
 

      const response = await apiClient.post(`/roles/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["role", id] });
      navigate("/roles");

    },
  });
};

// ✅ Delete Role
export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/roles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};
