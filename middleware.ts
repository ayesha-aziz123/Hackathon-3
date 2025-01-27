import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/shopleft",
  "/error",
  "/success",
  "/checkout",
  "/",
  "/products",
  "/products/(.*)",
  "/about",
  "/shop",
  "/contact",
  "/blog",
  "/category/(.*)",
  "/api/(.*)",
  "/shopList",
  "/demo",
  "/faq",
  "/myaccount",
]);

export default clerkMiddleware(async (auth, request) => {
  const url = new URL(request.url);

  // Check if the route is public
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  if (url.pathname === "/shoppingCart") {
    // Check if the user is authenticated
    const userId = auth;

    if (!userId) {
      // Redirect to login page if not authenticated
      return Response.redirect(new URL("/shoppingCart", request.url));
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
