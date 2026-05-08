import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { exchangeCanvaCode } from "../../../../../lib/canva";

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const oauthError = url.searchParams.get("error");
  const oauthErrorDescription = url.searchParams.get("error_description");
  const cookieStore = await cookies();
  const expectedState = cookieStore.get("canva_oauth_state")?.value;
  const verifier = cookieStore.get("canva_pkce_verifier")?.value;

  try {
    if (oauthError) {
      throw new Error(oauthErrorDescription || `Canva rechazo la autorizacion: ${oauthError}.`);
    }
    if (!code) {
      throw new Error("Canva no devolvio codigo OAuth. Revisa que el redirect URI y los permisos esten configurados en Canva Developers.");
    }
    if (!state) {
      throw new Error("Canva no devolvio state OAuth. Inicia la conexion desde el boton Conectar Canva.");
    }
    if (!expectedState || !verifier) {
      throw new Error("No se encontro la sesion OAuth local. Inicia la conexion desde el boton Conectar Canva en el mismo dominio de la app.");
    }
    if (state !== expectedState) {
      throw new Error("El state OAuth de Canva no coincide. Inicia nuevamente la conexion desde la app.");
    }

    const token = await exchangeCanvaCode({ code, verifier });
    const secure = process.env.NODE_ENV === "production";
    const response = NextResponse.redirect(new URL("/?canva=connected", url.origin));

    response.cookies.set("canva_access_token", token.access_token, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: token.expires_in
    });
    response.cookies.set("canva_refresh_token", token.refresh_token, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30
    });
    response.cookies.delete("canva_pkce_verifier");
    response.cookies.delete("canva_oauth_state");

    return response;
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
