import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { exchangeCanvaCode } from "../../../../../lib/canva";

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieStore = await cookies();
  const expectedState = cookieStore.get("canva_oauth_state")?.value;
  const verifier = cookieStore.get("canva_pkce_verifier")?.value;

  try {
    if (!code || !state || !expectedState || state !== expectedState || !verifier) {
      throw new Error("Respuesta OAuth Canva invalida.");
    }

    const token = await exchangeCanvaCode({ code, verifier });
    const secure = process.env.NODE_ENV === "production";

    cookieStore.set("canva_access_token", token.access_token, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: token.expires_in
    });
    cookieStore.set("canva_refresh_token", token.refresh_token, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30
    });
    cookieStore.delete("canva_pkce_verifier");
    cookieStore.delete("canva_oauth_state");

    return NextResponse.redirect(new URL("/?canva=connected", url.origin));
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "No se pudo completar OAuth Canva."
      },
      { status: 400 }
    );
  }
}
