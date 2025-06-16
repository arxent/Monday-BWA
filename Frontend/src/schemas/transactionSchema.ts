import { z } from "zod";

export const transactionSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(50, "Name is too long"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number is too long"),
});

export const cartItemSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    stock: z.number().min(1, "Stock must be at least 1"),
  });
  
  // ✅ Wrap inside an object so it matches the shape expected by `useForm`
  export const fullCartSchema = z.object({
    cart: z.array(cartItemSchema).min(1, "Cart cannot be empty"),
  });