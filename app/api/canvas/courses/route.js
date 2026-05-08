import { NextResponse } from "next/server";
import { canvasPaginatedRequest } from "../../../../lib/canvas";

export async function GET() {
  try {
    const courses = await canvasPaginatedRequest(
      "/courses?enrollment_state=active&include[]=term&include[]=total_students&per_page=50"
    );

    return NextResponse.json({
      ok: true,
      courses: courses.map((course) => ({
        id: String(course.id),
        name: course.name,
        course_code: course.course_code,
        workflow_state: course.workflow_state,
        term: course.term,
        total_students: course.total_students,
        html_url: course.html_url
      }))
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Could not load Canvas courses"
      },
      { status: 503 }
    );
  }
}
