import { NextResponse } from "next/server";
import { getCanvaAccessToken, introspectCanvaToken } from "../../../../lib/canva";

export async function GET() {
  try {
    const token = await getCanvaAccessToken();
    if (!token) {
      return NextResponse.json({ ok: false, connected: false, message: "Canva no esta conectado." }, { status: 401 });
    }

    const status = await introspectCanvaToken(token);
    return NextResponse.json({ ok: true, connected: Boolean(status.active), status });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        connected: false,
        message: error instanceof Error ? error.message : "No se pudo consultar Canva."
      },
      { status: 503 }
    );
  }
}
