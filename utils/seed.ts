import { PrismaClient } from "@prisma/client";
import { guitarSchema, validateWithZodSchema } from "./schemas";

const prisma = new PrismaClient();

// Updated data to seed
const guitarsData = [
  {
    model: "S-style Partscaster",
    company: "Maddux",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor ex vel erat pretium blandit quis vel elit.",
    image: "https://i.ibb.co/QQHsj0J/IMG-4297.jpg",
    price: 8999,
    featured: true,
    clerkId: "clerkId",
  },
  {
    model: "S-style Partscaster",
    company: "Maddux",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor ex vel erat pretium blandit quis vel elit.",
    image: "https://i.ibb.co/7kWzyhT/IMG-4575.jpg",
    price: 7999,
    featured: false,
    clerkId: "clerkId",
  },
  {
    model: "S-style Partscaster",
    company: "Maddux",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor ex vel erat pretium blandit quis vel elit.",
    image: "https://i.ibb.co/8bLZT5p/IMG-4599.jpg",
    price: 6999,
    featured: true,
    clerkId: "clerkId",
  },
  {
    model: "Headless Hoarseman",
    company: "Kiesel",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor ex vel erat pretium blandit quis vel elit.",
    image: "https://i.ibb.co/yNFT73q/IMG-6018.jpg",
    price: 7999,
    featured: false,
    clerkId: "clerkId",
  },
];

async function main() {
  try {
    for (const guitar of guitarsData) {
      // Validate the data using Zod schema
      const validatedGuitar = validateWithZodSchema(guitarSchema, guitar);

      // Insert the validated data into the database
      await prisma.guitar.create({
        data: {
          ...validatedGuitar,
          createdAt: new Date(), // Auto-generated timestamp
          updatedAt: new Date(), // Auto-generated timestamp
        },
      });
    }
    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
