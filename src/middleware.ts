// import { getToken } from "next-auth/jwt";
// import { NextResponse, NextRequest } from "next/server";

// export async function middleware(request: NextRequest) {
//     const token = await getToken({
//         req: request,
//         secret: process.env.NEXTAUTH_SECRET,
//     });
   
//     console.log(token);

//     if (!token || token?.role !== "ADMIN") {
//         return NextResponse.redirect(new URL("/login", request.url));
//     }


//     return NextResponse.next();
// }

// export const config = {
//     matcher: ["/dashboard", "/dashboard/:path*","/profile","/change-password"],
// };


import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;


  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const adminPaths = ["/dashboard"];

  const userPaths = ["/profile", "/change-password"];

  // Check ADMIN routes
  if (adminPaths.some((path) => pathname.startsWith(path))) {
    if (token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Check USER routes
  if (userPaths.some((path) => pathname.startsWith(path))) {
    if (token.role !== "USER") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard", "/profile", "/change-password"],
};
