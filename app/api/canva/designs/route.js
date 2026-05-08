import { NextResponse } from "next/server";
import { canvaRequest } from "../../../../lib/canva";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const ownership = searchParams.get("ownership") || "any";
  const sortBy = searchParams.get("sort_by") || "modified_descending";
  const limit = searchParams.get("limit") || "24";

  try {
    const params = new URLSearchParams({
      ownership,
      sort_by: sortBy,
      limit
    });
    if (query) params.set("query", query);

    const data = await canvaRequest(`/designs?${params}`);
    return NextResponse.json({ ok: true, designs: data.items ?? [], continuation: data.continuation ?? null });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "No se pudieron cargar disenos Canva."
      },
      { status: 503 }
    );
  }
}
