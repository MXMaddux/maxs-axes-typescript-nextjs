// utils/auth.ts
"use server"; // Mark this as a server action
import { currentUser } from "@clerk/nextjs/server";

export async function getCurrentUser() {
  const user = await currentUser();
  return user?.imageUrl; // Return only the image URL
}
