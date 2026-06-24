import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password !== process.env.CRM_PASSWORD) {
    return NextResponse.json(
      { error: "Contraseña incorrecta" },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();

  cookieStore.set("crm_session", "ok", {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 12,
    path: "/",
  });

  return NextResponse.json({
    success: true,
  });
}