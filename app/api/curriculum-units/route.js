import { NextResponse } from "next/server";
import fallbackUnits from "../../../data/curriculum/units-cl-lenguaje.json";
import { prisma } from "../../../lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const level = searchParams.get("level");
  const subject = searchParams.get("subject");

  const where = {
    isActive: true,
    ...(level ? { level } : {}),
    ...(subject ? { subject } : {})
  };

  try {
    const units = await prisma.curriculumUnit.findMany({
      where,
      include: {
        objectives: {
          include: { objective: true }
        }
      },
      orderBy: [{ level: "asc" }, { subject: "asc" }, { orderIndex: "asc" }]
    });

    if (units.length > 0) {
      return NextResponse.json({ ok: true, source: "database", units });
    }
  } catch (error) {
    console.warn("Curriculum units database lookup failed, using fallback catalog.", error);
  }

  const units = fallbackUnits
    .filter((unit) => !level || unit.level === level)
    .filter((unit) => !subject || unit.subject === subject)
    .sort((a, b) => a.orderIndex - b.orderIndex);

  return NextResponse.json({ ok: true, source: "fallback", units });
}
