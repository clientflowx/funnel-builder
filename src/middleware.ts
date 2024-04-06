import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({ publicRoutes: ["/site"] });

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
