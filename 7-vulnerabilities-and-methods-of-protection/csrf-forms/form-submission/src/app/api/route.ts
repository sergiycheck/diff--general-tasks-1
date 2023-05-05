import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const data = body as {
    email: string;
    password: string;
    remember: string;
  };

  if (!data || !data?.email || !data?.password) {
    return NextResponse.json({ data: "Email or password are not found" });
  }

  return NextResponse.json({
    data: `${data.email} ${data.password} ${data.remember}`,
  });
}
