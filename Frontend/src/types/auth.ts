export interface Role {
    id: number;
    name: string;
    users_web_count: number;
  }
  
  export interface CreateRolePayload {
    name: string;
  }
  
  export interface UpdateRolePayload {
    id: number;
    name: string;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    photo: string;
    phone: string;
    roles?: string[];
    token?: string;
    merchant: import("./merchant").Merchant;
  }

  export interface CreateUserPayload {
    name: string;
    phone: string;
    email: string;
    password: string;
    password_confirmation: string;
    photo: File;
  } 