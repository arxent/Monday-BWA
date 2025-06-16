import { z } from "zod";

export const userSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters."),
    phone: z.string().min(10, "Phone number must be at least 10 digits.").max(15, "Phone number is too long."),
    email: z.string().email("Invalid email format."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    password_confirmation: z.string().min(6, "Password must be at least 6 characters."),
    photo: z
      .custom<File>((file) => file instanceof File, "Photo is required")
      .refine((file) => ["image/png", "image/jpeg", "image/gif"].includes(file.type), {
        message: "Invalid image format. Use PNG, JPEG, or GIF.",
      })
      .refine((file) => file.size <= 2 * 1024 * 1024, {
        message: "Image size must be under 2MB.",
      }),
  })
  .refine((data) => !data.password || data.password === data.password_confirmation, {
    message: "Passwords must match.",
    path: ["password_confirmation"],
  });
 

export type UserFormData = z.infer<typeof userSchema>;
