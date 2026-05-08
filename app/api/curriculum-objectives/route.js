import { NextResponse } from "next/server";
import fallbackObjectives from "../../../data/curriculum/lenguaje-cl.json";
import { prisma } from "../../../lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const level = searchParams.get("level");
  const subject = searchParams.get("subject");
  const axis = searchParams.get("axis");

  const where = {
    isActive: true,
    ...(level ? { level } : {}),
    ...(subject ? { subject } : {}),
    ...(axis ? { axis } : {})
  };

  try {
    const objectives = await prisma.curriculumObjective.findMany({
      where,
      orderBy: [{ level: "asc" }, { subject: "asc" }, { code: "asc" }]
    });

    if (objectives.length > 0) {
      return NextResponse.json({ ok: true, source: "database", objectives });
    }
  } catch (error) {
    console.warn("Curriculum database lookup failed, using fallback catalog.", error);
  }

  const objectives = fallbackObjectives
    .filter((objective) => !level || objective.level === level)
    .filter((objective) => !subject || objective.subject === subject)
    .filter((objective) => !axis || objective.axis === axis)
    .sort((a, b) => a.code.localeCompare(b.code));

  return NextResponse.json({ ok: true, source: "fallback", objectives });
}
