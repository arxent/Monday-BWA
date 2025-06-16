import { z } from "zod";

export const assignWarehouseProductSchema = z.object({
  product_id: z.string().min(1, "Product is required"),
  stock: z
  .number()
    .min(1, "Stock is required")

    .refine((val) => Number(val) > 0, "Stock must be greater than zero"),
});

export type AssignWarehouseProductFormData = z.infer<typeof assignWarehouseProductSchema>;

 