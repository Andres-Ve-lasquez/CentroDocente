import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { buildCanvaAuthorizationUrl, createPkcePair } from "../../../../../lib/canva";

export async function GET() {
  try {
    const { verifier, challenge } = createPkcePair();
    const state = crypto.randomBytes(24).toString("hex");
    const response = NextResponse.redirect(buildCanvaAuthorizationUrl({ challenge, state }));

    response.cookies.set("canva_pkce_verifier", verifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 600
    });
    response.cookies.set("canva_oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 600
    });

    return response;
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
