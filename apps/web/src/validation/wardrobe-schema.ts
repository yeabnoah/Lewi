import z from "zod";

export const wardrobeSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
});

export type WardrobeSchema = z.infer<typeof wardrobeSchema>;