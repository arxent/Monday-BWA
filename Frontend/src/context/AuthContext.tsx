import { createContext } from "react";
import { User } from "../types/types";

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// ✅ Create AuthContext separately
export const AuthContext = createContext<AuthContextType | null>(null);
