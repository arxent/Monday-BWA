import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/axiosConfig";
import { AxiosError } from "axios";
import { ApiErrorResponse, CreateUserPayload, User } from "../types/types";
import { useNavigate } from "react-router-dom";


// Fetch All Users
export const useFetchUsers = () => {
  return useQuery<User[], AxiosError>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await apiClient.get("/users");
      return response.data;
    },
  });
};

// Fetch Single User by ID
export const useFetchUser = (id: number) => {
  return useQuery<User, AxiosError>({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await apiClient.get(`/users/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};


export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<CreateUserPayload, AxiosError<ApiErrorResponse>, CreateUserPayload>({
    mutationFn: async (payload: CreateUserPayload) => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("phone", payload.phone);
      formData.append("email", payload.email);
      formData.append("password", payload.password);
      formData.append("password_confirmation", payload.password_confirmation);
      formData.append("photo", payload.photo);

      const response = await apiClient.post("/users", formData, {
        headers: { "Content-Type": "multipart/form-data" },

      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); // Refresh product list
      navigate("/users");

    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    User, // response type
    AxiosError<ApiErrorResponse>, // error type
    { id: number } & CreateUserPayload // payload
  >({
    mutationFn: async ({ id, ...payload }) => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("phone", payload.phone);
      formData.append("email", payload.email);
      formData.append("password", payload.password);
      formData.append("password_confirmation", payload.password_confirmation);
      formData.append("photo", payload.photo);

      formData.append("_method", "PUT"); // ✅ Laravel expects this for PUT with FormData

      if (payload.photo) {
        formData.append("photo", payload.photo);
      }

      const response = await apiClient.post(`/users/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      navigate("/users");

    },
  });
};

// Delete User
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
