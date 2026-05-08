import { NextResponse } from "next/server";
import { canvasPaginatedRequest } from "../../../../../../lib/canvas";

export async function GET(_request, { params }) {
  try {
    const { courseId } = await params;
    const assignments = await canvasPaginatedRequest(
      `/courses/${courseId}/assignments?include[]=all_dates&include[]=submission&per_page=50`
    );

    return NextResponse.json({
      ok: true,
      assignments: assignments.map((assignment) => ({
        id: String(assignment.id),
        name: assignment.name,
        description: assignment.description,
        due_at: assignment.due_at,
        points_possible: assignment.points_possible,
        html_url: assignment.html_url,
        workflow_state: assignment.workflow_state
      }))
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Could not load Canvas assignments"
      },
      { status: 503 }
    );
  }
}
