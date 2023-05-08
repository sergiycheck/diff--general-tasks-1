import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-hello-from-middleware1", "hello");

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("x-hello-from-middleware2", "hello");
  response.headers.set(
    "Set-Cookie",
    "sessionId=38afes7a8; HttpOnly; Strict; SameSite=Strict"
  );
  response.cookies.set({
    name: "another cookie",
    value: "another cookie value",
    domain: "localhost",
    httpOnly: true,
    sameSite: "strict",
  });

  response.cookies.set({
    name: "cookie for my site",
    value: "value of the cookie",
    domain: "mysite.localhost",
    httpOnly: true,
    sameSite: "strict",
  });
  return response;
}

export const config = {
  matcher: "/",
};
