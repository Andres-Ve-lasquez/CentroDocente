import { readFile, writeFile } from "node:fs/promises";
import { prisma } from "../lib/prisma.js";

const sources = JSON.parse(
  await readFile(new URL("../data/curriculum/sources-cl-lenguaje.json", import.meta.url), "utf8")
);

const outputUrl = new URL("../data/curriculum/lenguaje-cl.json", import.meta.url);
const headingPattern =
  /(Lectura - Comprensión|Escritura - Producción|Comunicación oral|Investigación sobre lengua y literatura|Actitudes|Objetivo de aprendizaje\s+LE\d{2}\s+OA\s+\d{2}|Objetivo de Aprendizaje de Actitud\s+LE\d{2}\s+OAA\s+[A-Z])/g;

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|li|h1|h2|h3|h4|div)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&aacute;/g, "á")
    .replace(/&eacute;/g, "é")
    .replace(/&iacute;/g, "í")
    .replace(/&oacute;/g, "ó")
    .replace(/&uacute;/g, "ú")
    .replace(/&ntilde;/g, "ñ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function slugForCode(code) {
  return code.toLowerCase().replace(/\s+/g, "-");
}

function compactDescription(value) {
  return value
    .replace(/\bVer actividades\b[\s\S]*$/i, "")
    .replace(/\bVer recursos\b[\s\S]*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function titleFromDescription(description) {
  const firstSentence = description.split(/(?<=[.?!])\s+/)[0] || description;
  return firstSentence.length > 95 ? `${firstSentence.slice(0, 92).trim()}...` : firstSentence;
}

function skillsFromText(text) {
  const clean = text.toLowerCase();
  const skills = [];
  const checks = [
    ["lectura", "lectura"],
    ["comprensión", "comprension lectora"],
    ["comprension", "comprension lectora"],
    ["infer", "inferencia"],
    ["poema", "poesia"],
    ["narracion", "narracion"],
    ["narración", "narracion"],
    ["mito", "mitos"],
    ["texto no literario", "textos no literarios"],
    ["escribir", "escritura"],
    ["oral", "comunicacion oral"],
    ["investig", "investigacion"],
    ["argument", "argumentacion"],
    ["vocabulario", "vocabulario"],
    ["ortograf", "ortografia"]
  ];
  for (const [needle, label] of checks) {
    if (clean.includes(needle) && !skills.includes(label)) skills.push(label);
  }
  return skills.join(", ");
}

function parseObjectives(text, source) {
  const matches = [...text.matchAll(headingPattern)];
  const objectives = [];
  let axis = "General";

  for (let index = 0; index < matches.length; index += 1) {
    const heading = matches[index][0];
    const start = matches[index].index + heading.length;
    const end = matches[index + 1]?.index ?? text.length;
    const rawBody = text.slice(start, end);

    if (!heading.includes("Objetivo")) {
      axis = heading === "Actitudes" ? "Actitud" : heading;
      continue;
    }

    const isAttitude = heading.includes("Actitud");
    const codeMatch = heading.match(/LE\d{2}\s+OA\s+\d{2}|LE\d{2}\s+OAA\s+[A-Z]/);
    if (!codeMatch) continue;

    const code = codeMatch[0];
    const description = compactDescription(rawBody);
    if (!description || description.length < 12) continue;

    objectives.push({
      country: "CL",
      source: "MINEDUC",
      version: "Bases Curriculares vigentes",
      level: source.level,
      subject: source.subject,
      officialSubject: source.officialSubject,
      axis: isAttitude ? "Actitud" : axis,
      code,
      title: titleFromDescription(description),
      description,
      skills: skillsFromText(`${axis} ${description}`),
      attitudes: isAttitude ? description : null,
      sourceUrl: isAttitude ? source.baseUrl : `${source.baseUrl}/${slugForCode(code)}`,
      isActive: true
    });
  }

  return objectives;
}

async function fetchSource(source) {
  const response = await fetch(source.baseUrl, {
    headers: {
      "user-agent": "CentroDocente/1.0 curriculum catalog importer"
    }
  });

  if (!response.ok) {
    throw new Error(`No se pudo leer ${source.baseUrl}: HTTP ${response.status}`);
  }

  const html = await response.text();
  return parseObjectives(stripHtml(html), source);
}

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
    attitudes: objective.attitudes,
    sourceUrl: objective.sourceUrl,
    isActive: objective.isActive
  };

  if (existing) {
    return prisma.curriculumObjective.update({ where: { id: existing.id }, data });
  }

  return prisma.curriculumObjective.create({ data });
}

async function main() {
  const allObjectives = [];

  for (const source of sources) {
    const objectives = await fetchSource(source);
    console.log(`${source.level}: ${objectives.length} OA/OAA encontrados.`);
    allObjectives.push(...objectives);
  }

  allObjectives.sort((a, b) => `${a.level}-${a.code}`.localeCompare(`${b.level}-${b.code}`));

  await writeFile(outputUrl, `${JSON.stringify(allObjectives, null, 2)}\n`, "utf8");

  for (const objective of allObjectives) {
    await upsertObjective(objective);
  }

  console.log(`Catalogo curricular actualizado: ${allObjectives.length} OA/OAA.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
