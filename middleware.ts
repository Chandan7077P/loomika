// middleware.ts (Alternative if publicRoutes causes issues)
import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    // Exclude Next.js internals, static files, AND the Clerk webhook route
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)|api/webhooks/clerk).*)',
    // Always run for other API routes and tRPC routes
    '/(api|trpc)(.*)',
  ],
}
