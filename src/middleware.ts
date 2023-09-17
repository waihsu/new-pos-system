import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import options from "./app/api/auth/[...nextauth]/options";

// export { default } from "next-auth/middleware";

export default withAuth(
  function middleware(req, option) {
    // console.log(req.nextUrl);
    const role = req.nextauth.token?.role;
    if (role === "User") {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "Admin",
    },
  }
);

export const config = { matcher: ["/backoffice/:path*", "/api/:path*"] };
