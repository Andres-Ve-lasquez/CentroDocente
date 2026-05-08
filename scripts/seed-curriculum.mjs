import { readFile } from "node:fs/promises";
import { prisma } from "../lib/prisma.js";

const curriculumObjectives = JSON.parse(
  await readFile(new URL("../data/curriculum/lenguaje-cl.json", import.meta.url), "utf8")
);

async function upsertObjective(objective) {
  const existing = await prisma.curriculumObjective.findFirst({
    where: {
      workspaceId: null,
      country: objective.country,
      source: objective.source,
      level: objective.level,
      subject: objective.subject,
      code: objective.code
    }
  });

  const data = {
    workspaceId: null,
    country: objective.country,
    source: objective.source,
    version: objective.version,
    level: objective.level,
    subject: objective.subject,
    axis: objective.axis,
    code: objective.code,
    title: objective.title,
    description: objective.description,
    skills: objective.skills,
    attitudes: objective.attitudes ?? null,
    sourceUrl: objective.sourceUrl,
    isActive: true
  };

  if (existing) {
    return prisma.curriculumObjective.update({
      where: { id: existing.id },
      data
    });
  }

  return prisma.curriculumObjective.create({ data });
}

async function main() {
  let count = 0;
  for (const objective of curriculumObjectives) {
    await upsertObjective(objective);
    count += 1;
  }
  console.log(`Catalogo curricular cargado: ${count} OA.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
