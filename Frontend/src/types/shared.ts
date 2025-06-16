export interface ApiErrorResponse {
    message?: string;
    errors: Record<string, string[]>;
  }
  
  export interface SuccessProps {
    customerName: string;
    totalItems: number;
    totalQuantity: number;
    subTotal: number;
    taxTotal: number;
    grandTotal: number;
    transactionId?: number;
  }
  
  export interface CustomerFormData {
    name: string;
    phone: string;
  }