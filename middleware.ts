import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define route matchers for public and admin routes
const isPublicRoute = createRouteMatcher(["/", "/products(.*)", "/about"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  try {
    // Await the auth() function to get the ClerkMiddlewareAuthObject
    const authObject = await auth();
    const isAdminUser = authObject.userId === process.env.ADMIN_USER_ID;

    // Redirect non-admin users trying to access admin routes
    if (isAdminRoute(req) && !isAdminUser) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Protect non-public routes
    if (!isPublicRoute(req)) {
      await auth().protect(); // Use auth().protect() directly
    }
  } catch (error) {
    console.error("Middleware Error:", error);

    // Redirect to home page or show an error response
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"], // Match all routes except static files
};
