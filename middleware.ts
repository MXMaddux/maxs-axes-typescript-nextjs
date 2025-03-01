// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define route matchers
const isPublicRoute = createRouteMatcher(["/", "/products(.*)", "/about"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  console.log("Middleware executed for:", req.url);

  // Call auth() once and reuse the result
  const authObject = await auth();

  // Check if the user is accessing an admin route
  if (isAdminRoute(req)) {
    const isAdminUser = authObject.userId === process.env.ADMIN_USER_ID;
    if (!isAdminUser) {
      // Redirect unauthorized users to the home page
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Protect non-public routes
  if (!isPublicRoute(req)) {
    auth.protect();
  }
});

// Configure middleware matcher
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
