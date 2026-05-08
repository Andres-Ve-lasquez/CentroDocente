import { NextResponse } from "next/server";
import { canvasRequest, getCanvasConfig } from "../../../../lib/canvas";

export async function GET() {
  try {
    const config = getCanvasConfig();
    const { data } = await canvasRequest("/users/self/profile");
    return NextResponse.json({
      ok: true,
      baseUrl: config.baseUrl,
      accountId: config.accountId,
      user: {
        id: data.id,
        name: data.name,
        primary_email: data.primary_email
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Canvas connection failed"
      },
      { status: 503 }
    );
  }
}
