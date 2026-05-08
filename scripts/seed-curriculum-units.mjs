import { readFile } from "node:fs/promises";
import { prisma } from "../lib/prisma.js";

const curriculumUnits = JSON.parse(
  await readFile(new URL("../data/curriculum/units-cl-lenguaje.json", import.meta.url), "utf8")
);

async function upsertUnit(unit) {
  const existing = await prisma.curriculumUnit.findFirst({
    where: {
      workspaceId: null,
      country: unit.country,
      source: unit.source,
      level: unit.level,
      subject: unit.subject,
      code: unit.code
    }
  });

  const data = {
    workspaceId: null,
    country: unit.country,
    source: unit.source,
    version: unit.version,
    level: unit.level,
    subject: unit.subject,
    code: unit.code,
    title: unit.title,
    description: unit.description,
    orderIndex: unit.orderIndex,
    sourceUrl: unit.sourceUrl,
    isActive: true
  };

  const curriculumUnit = existing
    ? await prisma.curriculumUnit.update({ where: { id: existing.id }, data })
    : await prisma.curriculumUnit.create({ data });

  const objectives = await prisma.curriculumObjective.findMany({
    where: {
      workspaceId: null,
      country: unit.country,
      source: "MINEDUC",
      level: unit.level,
      subject: unit.subject,
      code: { in: unit.objectiveCodes }
    }
  });

  await prisma.curriculumUnitObjective.deleteMany({
    where: { curriculumUnitId: curriculumUnit.id }
  });

  if (objectives.length > 0) {
    await prisma.curriculumUnitObjective.createMany({
      data: objectives.map((objective) => ({
        curriculumUnitId: curriculumUnit.id,
        objectiveId: objective.id
      })),
      skipDuplicates: true
    });
  }

  return { curriculumUnit, linkedObjectives: objectives.length };
}

async function main() {
  let linkedObjectives = 0;
  for (const unit of curriculumUnits) {
    const result = await upsertUnit(unit);
    linkedObjectives += result.linkedObjectives;
  }
  console.log(`Unidades curriculares cargadas: ${curriculumUnits.length}.`);
  console.log(`Vinculos unidad-OA cargados: ${linkedObjectives}.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
