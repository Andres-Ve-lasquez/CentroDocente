import { NextResponse } from "next/server";
import { canvasPaginatedRequest } from "../../../../../../lib/canvas";

export async function GET(_request, { params }) {
  try {
    const { courseId } = await params;
    const modules = await canvasPaginatedRequest(`/courses/${courseId}/modules?include[]=items&per_page=50`);

    return NextResponse.json({
      ok: true,
      modules: modules.map((module) => ({
        id: String(module.id),
        name: module.name,
        position: module.position,
        workflow_state: module.workflow_state,
        items_count: module.items_count,
        items: module.items ?? []
      }))
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Could not load Canvas modules"
      },
      { status: 503 }
    );
  }
}
