import { z } from "zod";

export const assignProductSchema = z.object({
  warehouse_id: z.string().min(1, "Warehouse is required"),
  product_id: z.string().min(1, "Product is required"),
  stock: z
    .string()
    .min(1, "Stock is required")
    .regex(/^\d+$/, "Stock must be a number")
    .refine((val) => Number(val) > 0, "Stock must be greater than zero"),
});

export type AssignProductFormData = z.infer<typeof assignProductSchema>;