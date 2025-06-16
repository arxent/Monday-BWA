import { z } from "zod";

export const roleSchema = z.object({
  name: z.string().min(1, "Role name is required"),
});

export type RoleFormData = z.infer<typeof roleSchema>;
