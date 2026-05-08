import { NextResponse } from "next/server";
import { canvasPaginatedRequest } from "../../../../../../lib/canvas";

export async function GET(_request, { params }) {
  try {
    const { courseId } = await params;
    const files = await canvasPaginatedRequest(`/courses/${courseId}/files?per_page=50`);

    return NextResponse.json({
      ok: true,
      files: files.map((file) => ({
        id: String(file.id),
        display_name: file.display_name,
        filename: file.filename,
        content_type: file.content_type,
        size: file.size,
        url: file.url,
        html_url: file.html_url,
        created_at: file.created_at,
        updated_at: file.updated_at
      }))
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Could not load Canvas files"
      },
      { status: 503 }
    );
  }
}
