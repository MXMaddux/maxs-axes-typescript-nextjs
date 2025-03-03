import { z, ZodSchema } from "zod";

export const guitarSchema = z.object({
  model: z.string().min(2, "Model must be at least 2 characters."),
  company: z.string().min(2, "Company name must be at least 2 characters."),
  description: z.string().refine(
    (description) => {
      const wordCount = description.trim().split(/\s+/).length; // Handle multiple spaces/punctuation
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "Description must be between 10 and 1000 words.",
    }
  ),
  featured: z.coerce.boolean(),
  price: z.number().int().min(0, "Price must be a positive integer."),
  image: z.string().url("Image URL must be valid."),
  clerkId: z.string().min(1, "User ID is required."),
});

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(", "));
  }
  return result.data;
}

export const imageSchema = z.object({
  image: validateImageFile(),
});

function validateImageFile() {
  const maxUploadSize = 5120 * 5120;
  const acceptedFileTypes = ["image/"];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, `File size must be less than 5 MB`)
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, "File must be an image");
}
