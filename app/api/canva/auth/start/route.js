import crypto from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { buildCanvaAuthorizationUrl, createPkcePair } from "../../../../../lib/canva";

export async function GET() {
  try {
    const { verifier, challenge } = createPkcePair();
    const state = crypto.randomBytes(24).toString("hex");
    const cookieStore = await cookies();

    cookieStore.set("canva_pkce_verifier", verifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 600
    });
    cookieStore.set("canva_oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 600
    });

    return NextResponse.redirect(buildCanvaAuthorizationUrl({ challenge, state }));
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "No se pudo iniciar OAuth Canva."
      },
      { status: 500 }
    );
  }
}
