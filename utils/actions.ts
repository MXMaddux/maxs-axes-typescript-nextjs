import db from "@/utils/db";
import { redirect } from "next/navigation";

export const fetchFeaturedGuitars = async () => {
  const guitars = await db.guitar.findMany({
    where: {
      featured: true,
    },
  });
  return guitars;
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
  if (!guitar) redirect("/guitars");
  return guitar;
};
