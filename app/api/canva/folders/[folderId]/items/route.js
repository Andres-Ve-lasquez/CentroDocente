import { NextResponse } from "next/server";
import { canvaRequest } from "../../../../../../lib/canva";

export async function GET(request, { params }) {
  const { folderId } = await params;
  const { searchParams } = new URL(request.url);
  const itemTypes = searchParams.get("item_types") || "design,folder,image";
  const limit = searchParams.get("limit") || "50";

  try {
    const data = await canvaRequest(`/folders/${folderId}/items?item_types=${itemTypes}&limit=${limit}`);
    return NextResponse.json({ ok: true, items: data.items ?? [], continuation: data.continuation ?? null });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "No se pudieron cargar items de carpeta Canva."
      },
      { status: 503 }
    );
  }
}
