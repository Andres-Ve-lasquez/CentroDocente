export function normalize(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function formatDate(value) {
  return new Intl.DateTimeFormat("es-CL", {
    weekday: "short",
    day: "numeric",
    month: "short"
  }).format(new Date(`${value}T12:00:00`));
}

export function formatDateTime(value) {
  if (!value) return "Sin fecha";
  const date = typeof value === "number" ? new Date(value * 1000) : new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat("es-CL", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(date);
}

export function dateKeyFromCanvaTimestamp(value) {
  if (!value) return "";
  return new Date(value * 1000).toISOString().slice(0, 10);
}

export function formatMonthDay(value) {
  const date = new Date(`${value}T12:00:00`);
  return {
    day: new Intl.DateTimeFormat("es-CL", { day: "numeric" }).format(date),
    month: new Intl.DateTimeFormat("es-CL", { month: "short" }).format(date)
  };
}

export function resourceTypeFromName(name) {
  const clean = normalize(name);
  if (clean.includes("ppt") || clean.endsWith(".pptx")) return "ppt";
  if (clean.includes("simce")) return "simce";
  if (clean.includes("evaluacion") || clean.includes("ticket")) return "assessment";
  if (clean.includes("guia")) return "guide";
  return "document";
}

export function tagsFromName(name) {
  const clean = normalize(name);
  const tags = [];
  if (clean.includes("inferencia")) tags.push("inferencia");
  if (clean.includes("comprension") || clean.includes("lectora")) tags.push("comprension lectora");
  if (clean.includes("simce")) tags.push("simce");
  if (clean.includes("mito")) tags.push("mitos");
  return tags.length ? tags : ["onedrive"];
}

export function getDemoDriveResults(query) {
  const clean = normalize(query);
  return [
    {
      id: "drive-1",
      name: "Guia de inferencias 5 basico abril.docx",
      date: "2025-04-17",
      mime: "Word",
      url: "#"
    },
    {
      id: "drive-2",
      name: "SIMCE comprension lectora 4 basico alternativas.pdf",
      date: "2026-03-21",
      mime: "PDF",
      url: "#"
    },
    {
      id: "drive-3",
      name: "Clase 3 mitos y leyendas presentacion.pptx",
      date: "2025-05-11",
      mime: "PowerPoint",
      url: "#"
    }
  ].filter((item) => !clean || normalize(item.name).includes(clean) || clean.includes("guia"));
}

export function buildAssistantOutput({ course, type, topic, objective, unit }) {
  const outputs = {
    objective: `Objetivo de clase basado en ${objective.code}\nLos estudiantes trabajaran ${topic} en ${course?.level}, desarrollando ${objective.title.toLowerCase()} y evidenciando el logro mediante respuestas justificadas.\n\nReferencia oficial: ${objective.sourceUrl}`,
    activity: `Secuencia basada en ${objective.code}\nUnidad: ${unit?.title ?? "Sin unidad seleccionada"}\nInicio: activar conocimientos previos sobre ${topic} y explicitar el criterio de logro.\nDesarrollo: modelamiento docente, practica guiada y actividad colaborativa alineada a ${objective.title}.\nCierre: ticket breve donde cada estudiante demuestra el aprendizaje con evidencia.\n\nOA oficial: ${objective.description}`,
    simce: `Set tipo SIMCE vinculado a ${objective.code}\n1. Pregunta de informacion explicita.\n2. Pregunta de inferencia o interpretacion.\n3. Vocabulario contextual.\n4. Proposito o efecto del texto.\n\nHabilidad foco: ${objective.skills}.`,
    ticket: `Ticket de salida para ${objective.code}\n1. Explica una idea clave trabajada hoy.\n2. Responde una pregunta de aplicacion sobre ${topic}.\n3. Justifica tu respuesta con evidencia o criterio del OA.\n\nCriterio: ${objective.title}.`
  };

  return outputs[type] ?? outputs.objective;
}
