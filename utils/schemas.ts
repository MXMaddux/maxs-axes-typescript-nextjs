import { z, ZodSchema } from "zod";

export const guitarSchema = z.object({
  model: z
    .string()
    .min(2, {
      message: "model must be at least 2 characters.",
    })
    .max(100, {
      message: "model must be less than 100 characters.",
    }),
  company: z.string(),
  featured: z.coerce.boolean(),
  price: z.coerce.number().int().min(0, {
    message: "price must be a positive number.",
  }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "description must be between 10 and 1000 words.",
    }
  ),
});
