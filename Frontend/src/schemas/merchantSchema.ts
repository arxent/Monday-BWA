import { z } from "zod";

export const merchantSchema = z.object({
  name: z.string().min(3, "Merchant name must be at least 3 characters."),
  address: z.string().min(5, "Address must be at least 5 characters."),
  phone: z.string().min(10, "Phone number must be at least 10 characters.").max(15, "Phone number is too long."),
  keeper_id: z.coerce.number().min(1, "Keeper is required."),
  photo: z
  .custom<File>((file) => file instanceof File, "Thumbnail is required")
  .refine((file) => ["image/png", "image/jpeg", "image/gif"].includes(file.type), {
    message: "Invalid image format. Use PNG, JPEG, or GIF.",
  })
  .refine((file) => file.size <= 2 * 1024 * 1024, {
    message: "Image size must be under 2MB.",
  }),
});

export type MerchantFormData = z.infer<typeof merchantSchema>;
