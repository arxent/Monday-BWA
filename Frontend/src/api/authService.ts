import apiClient from "./axiosConfig";
import { User } from "../types/types";
import { AxiosError } from "axios";
// import Cookies from "js-cookie"; // ✅ Import js-cookie

export const authService = {
  fetchUser: async (): Promise<User | null> => {
    try {
      const { data } = await apiClient.get("/user");
      return { ...data, roles: data.roles ?? [] }; // ✅ Ensure roles exist
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || "Error fetching user.");
      }
      throw new Error("Unexpected error. Please try again.");
    }
  },

  login: async (email: string, password: string): Promise<User> => {
    try { 
      const { data } = await apiClient.post(
        "/login",
        { email, password },
      ); 
      return { ...data.user, token: data.token, roles: data.user.roles ?? [] };
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || "Invalid credentials.");
      }
      throw new Error("Unexpected error. Please try again.");
    }
  }, 

    logout: async (): Promise<void> => {
      try {
        await apiClient.post("/logout");
        
        window.location.href = "/login";
      } catch (error) {
        console.error("Logout failed", error);
      }
    },
};
