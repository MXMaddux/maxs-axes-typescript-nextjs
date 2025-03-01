"use server";

import db from "@/utils/db";
import { redirect } from "next/navigation";
import { Guitar } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import { guitarSchema } from "./schemas";

export const fetchFeaturedGuitars = async () => {
  const guitars = await db.guitar.findMany({
    where: {
      featured: true,
    },
  });
  return guitars;
};

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  return user;
};

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "There was an error",
  };
};

export const fetchAllGuitars = async ({ search = "" }: { search: string }) => {
  return db.guitar.findMany({
    where: {
      OR: [
        { model: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const fetchSingleGuitar = async (guitarId: string) => {
  const guitar = await db.guitar.findUnique({
    where: {
      id: guitarId,
    },
  });
  if (!guitar) {
    redirect("/guitars");
  }
  return guitar;
};

interface ValidationError {
  message: string;
}

export const createGuitarAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = guitarSchema.safeParse(rawData);

    if (!validatedFields.success) {
      const errors = validatedFields.error.errors.map(
        (error: ValidationError) => error.message
      );
      throw new Error(errors.join(","));
    }

    await db.guitar.create({
      data: {
        ...validatedFields.data,
        image: "/images/product-1.jpg",
        clerkId: user.id,
      },
    });
    return { message: "product created" };
  } catch (error) {
    console.log(error);
    return renderError(error);
  }
};
