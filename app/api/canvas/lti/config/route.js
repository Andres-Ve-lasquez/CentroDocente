import { NextResponse } from "next/server";

export async function GET(request) {
  const origin = new URL(request.url).origin;

  return NextResponse.json({
    title: "Centro Docente",
    description: "Copiloto docente para planificacion, recursos y reutilizacion pedagogica.",
    oidc_initiation_url: `${origin}/api/canvas/lti/login`,
    target_link_uri: `${origin}/canvas`,
    jwks_uri: `${origin}/api/canvas/lti/jwks`,
    public_jwk_url: `${origin}/api/canvas/lti/jwks`,
    placements: [
      {
        placement: "course_navigation",
        message_type: "LtiResourceLinkRequest",
        target_link_uri: `${origin}/canvas`,
        text: "Centro Docente",
        enabled: true
      }
    ],
    custom_fields: {
      canvas_course_id: "$Canvas.course.id",
      canvas_user_id: "$Canvas.user.id"
    }
  });
}
