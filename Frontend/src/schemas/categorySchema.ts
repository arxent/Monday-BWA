import { z } from "zod"; 

export const categorySchema = z.object({
    name: z.string().min(1, "Name is required"), 
    tagline: z.string().min(1, "tagline is required"), 
    photo: z
    .custom<File>((file) => file instanceof File, "Photo is required") // ✅ Proper type check
    .refine((file) => ["image/png", "image/jpeg", "image/gif"].includes(file.type), {
      message: "Invalid image format. Use PNG, JPEG, or GIF.",
    })
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "Image size must be under 2MB.",
    }),
  });

export type CategoryFormData = z.infer<typeof categorySchema>;
