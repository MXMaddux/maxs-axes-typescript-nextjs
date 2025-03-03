"use server";

import db from "@/utils/db";
import { MongoClient, GridFSBucket, ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { guitarSchema, validateWithZodSchema, imageSchema } from "./schemas";

// MongoDB connection setup using environment variables
const MONGODB_URI = process.env.MONGODB_URI!;
const DATABASE_NAME = "axes"; // Replace with your database name if different

// Fetch featured guitars
export const fetchFeaturedGuitars = async () => {
  const guitars = await db.guitar.findMany({
    where: {
      featured: true,
    },
  });
  return guitars;
};

// Get authenticated user
const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  return user;
};

// Render error message
const renderError = (error: unknown): string => {
  console.log(error);
  return error instanceof Error ? error.message : "There was an error";
};

// Fetch all guitars with search functionality
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

// Fetch a single guitar by ID
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

// Upload image to MongoDB GridFS
async function uploadImage(file: File): Promise<string> {
  const IMGBB_API_KEY = process.env.IMGBB_API_KEY!;

  // Convert the file to a base64-encoded string
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64Image = buffer.toString("base64");

  // Upload the image to imgBB
  const formData = new FormData();
  formData.append("image", base64Image);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?expiration=600&key=${IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload image to imgBB");
  }

  const data = await response.json();
  return data.data.url; // Return the image URL
}

// Get image from MongoDB GridFS
async function getImage(fileId: string): Promise<Buffer> {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const bucket = new GridFSBucket(db, { bucketName: "images" });

    const downloadStream = bucket.openDownloadStream(new ObjectId(fileId));
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
      downloadStream.on("data", (chunk) => chunks.push(chunk));
      downloadStream.on("error", reject);
      downloadStream.on("end", () => resolve(Buffer.concat(chunks)));
    });
  } finally {
    await client.close();
  }
}

// Delete image from MongoDB GridFS
async function deleteImage(fileId: string): Promise<void> {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const bucket = new GridFSBucket(db, { bucketName: "images" });

    await bucket.delete(new ObjectId(fileId));
  } finally {
    await client.close();
  }
}

/**
 * Authenticates the user and ensures they are logged in.
 */
async function authenticateUser() {
  const user = await currentUser();
  if (!user) {
    throw new Error("User is not authenticated.");
  }
  return user;
}

/**
 * Extracts raw form data into an object.
 */
function extractFormData(formData: FormData): Record<string, any> {
  const rawData: Record<string, any> = {};
  formData.forEach((value, key) => {
    rawData[key] = value;
  });
  return rawData;
}

/**
 * Validates and processes the image file from the form data.
 */
async function validateAndProcessImage(formData: FormData) {
  const file = formData.get("image") as File;
  if (!file || !(file instanceof File)) {
    throw new Error("Image file is required.");
  }

  // Validate the file using the schema
  const validatedFile = validateWithZodSchema(imageSchema, { image: file });
  return validatedFile;
}

// Define the GuitarCreateInput type
type GuitarCreateInput = {
  model: string;
  company: string;
  description: string;
  featured: boolean;
  image: string;
  price: number; // Integer in Prisma, but TypeScript uses `number`
  clerkId: string;
};

/**
 * Validates the full form data, including the image URL and user ID.
 */
function validateFullFormData(
  rawData: Record<string, any>,
  imageUrl: string,
  userId: string
): GuitarCreateInput {
  const validatedFields = validateWithZodSchema(guitarSchema, {
    ...rawData,
    image: imageUrl,
    clerkId: userId,
    featured: rawData.featured === "true", // Ensure boolean conversion
    price: parseInt(rawData.price, 10), // Ensure integer conversion
  });
  return validatedFields as GuitarCreateInput; // Explicitly cast to GuitarCreateInput
}

/**
 * Saves the validated guitar data to the database.
 */
async function saveGuitarToDatabase(validatedFields: GuitarCreateInput) {
  await db.guitar.create({
    data: {
      ...validatedFields,
    },
  });
}

export const createGuitarAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    // Step 1: Authenticate the user
    const user = await authenticateUser();
    if (!user) throw new Error("User is not authenticated.");

    // Step 2: Extract raw form data
    const rawData = extractFormData(formData);

    // Step 3: Validate and process the image file
    const imageFile = await validateAndProcessImage(formData);

    // Step 4: Upload the image and get the URL
    const imageUrl = await uploadImage(imageFile.image);

    // Step 5: Validate the full form data
    const validatedFields = validateFullFormData(rawData, imageUrl, user.id);

    // Step 6: Save the guitar data to the database
    await saveGuitarToDatabase(validatedFields);

    // Step 7: Redirect to the admin guitars page
    redirect("/admin/guitars");
  } catch (error) {
    console.error("Error creating guitar:", error);
    return { message: renderError(error) };
  }
};
