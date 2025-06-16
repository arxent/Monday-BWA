import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters."),
  price: z.coerce.number().min(1, "Price must be greater than zero."),
  about: z.string().min(10, "About must be at least 10 characters."),
  category_id: z.coerce.number().min(1, "Category is required."),
  is_popular: z.coerce.boolean().default(false),
  
  thumbnail: z
    .custom<File>((file) => file instanceof File, "Thumbnail is required")
    .refine((file) => ["image/png", "image/jpeg", "image/gif"].includes(file.type), {
      message: "Invalid image format. Use PNG, JPEG, or GIF.",
    })
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "Image size must be under 2MB.",
    }),
    
});

export type ProductFormData = z.infer<typeof productSchema>;
