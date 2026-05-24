export const initialCourses = [
  {
    id: "c1",
    name: "4 Basico A",
    level: "4 Basico",
    subject: "Lenguaje",
    year: 2026,
    color: "#2878e0",
    canvasId: null,
    active: true
  },
  {
    id: "c2",
    name: "5 Basico B",
    level: "5 Basico",
    subject: "Lenguaje",
    year: 2026,
    color: "#14a884",
    canvasId: "canvas-4281",
    active: true
  },
  {
    id: "c3",
    name: "7 Basico",
    level: "7 Basico",
    subject: "Lenguaje",
    year: 2026,
    color: "#f0a926",
    canvasId: null,
    active: true
  },
  {
    id: "c4",
    name: "6 Basico",
    level: "6 Basico",
    subject: "Lenguaje",
    year: 2026,
    color: "#ee5d78",
    canvasId: null,
    active: true
  },
  {
    id: "c5",
    name: "8 Basico",
    level: "8 Basico",
    subject: "Lenguaje",
    year: 2026,
    color: "#7b61ff",
    canvasId: null,
    active: true
  }
];

export const initialUnits = [
  { id: "u1", courseId: "c1", title: "Unidad 1: Comprension lectora", order: 1 },
  { id: "u2", courseId: "c1", title: "Unidad 2: Textos no literarios", order: 2 },
  { id: "u3", courseId: "c2", title: "Unidad 1: Inferencias", order: 1 },
  { id: "u4", courseId: "c3", title: "Unidad 1: Mitos y leyendas", order: 1 },
  { id: "u5", courseId: "c4", title: "Unidad 1: Textos informativos", order: 1 },
  { id: "u6", courseId: "c5", title: "Unidad 1: Experiencia humana y literatura", order: 1 }
];

export const initialClasses = [
  {
    id: "cl1",
    courseId: "c1",
    unitId: "u1",
    title: "Clase 1 - Estrategias antes de leer",
    date: "2026-04-29",
    objective:
      "Activar conocimientos previos y formular predicciones a partir de titulo, imagenes y vocabulario clave.",
    skills: "comprension lectora, prediccion, vocabulario",
    notes: "Usar texto corto y ticket de salida de 3 preguntas.",
    status: "done",
    reusedFrom: null,
    objectiveCode: "LE04 OA 02",
    curriculumUnitCode: "LE04 U1"
  },
  {
    id: "cl2",
    courseId: "c1",
    unitId: "u1",
    title: "Clase 2 - Inferir informacion implicita",
    date: "2026-04-30",
    objective:
      "Inferir informacion implicita en un texto narrativo breve, justificando respuestas con pistas del texto.",
    skills: "inferencia, evidencia textual",
    notes: "Reforzar diferencia entre dato explicito e inferencia.",
    status: "planned",
    reusedFrom: "2025-cl-18",
    objectiveCode: "LE04 OA 04",
    curriculumUnitCode: "LE04 U2"
  },
  {
    id: "cl3",
    courseId: "c2",
    unitId: "u3",
    title: "Clase 3 - Guia de inferencias",
    date: "2026-05-04",
    objective:
      "Resolver preguntas de inferencia local y global reconociendo pistas directas del texto.",
    skills: "inferencia, comprension lectora",
    notes: "Material reutilizado desde abril 2025.",
    status: "planned",
    reusedFrom: "2025-cl-33",
    objectiveCode: "LE05 OA 06",
    curriculumUnitCode: "LE05 U3"
  },
  {
    id: "cl4",
    courseId: "c3",
    unitId: "u4",
    title: "Clase 3 - Caracteristicas del mito",
    date: "2026-05-06",
    objective:
      "Identificar caracteristicas del mito y explicar su funcion cultural en relatos breves.",
    skills: "mitos, analisis literario",
    notes: "Buscar material parecido a clase de 2025.",
    status: "planned",
    reusedFrom: null,
    objectiveCode: "LE07 OA 06",
    curriculumUnitCode: "LE07 U3"
  }
];

export const initialResources = [
  {
    id: "r1",
    title: "Guia de inferencias con alternativas",
    description: "Guia imprimible con texto narrativo y 12 preguntas de alternativa multiple.",
    type: "guide",
    source: "onedrive",
    courseId: "c1",
    unitId: "u1",
    classId: "cl2",
    level: "4 Basico",
    tags: ["inferencia", "comprension lectora", "formativa"],
    date: "2026-04-20",
    usedCount: 3,
    reusable: true,
    recommended: true,
    url: "#"
  },
  {
    id: "r2",
    title: "PPT estrategias de lectura",
    description: "Presentacion base para modelar prediccion, subrayado y busqueda de pistas.",
    type: "ppt",
    source: "canvas",
    courseId: "c1",
    unitId: "u1",
    classId: "cl1",
    level: "4 Basico",
    tags: ["prediccion", "vocabulario"],
    date: "2026-04-18",
    usedCount: 1,
    reusable: true,
    recommended: false,
    url: "#"
  },
  {
    id: "r3",
    title: "SIMCE comprension lectora 4 basico",
    description: "Banco corto de preguntas con alternativa multiple, dificultad media.",
    type: "simce",
    source: "generated",
    courseId: "c1",
    unitId: "u1",
    classId: "cl2",
    level: "4 Basico",
    tags: ["simce", "comprension lectora", "alternativa multiple"],
    date: "2026-04-26",
    usedCount: 0,
    reusable: true,
    recommended: true,
    url: "#"
  },
  {
    id: "r4",
    title: "Clase mitos 2025 - guia y pauta",
    description: "Material anterior con texto de mito, preguntas de analisis y pauta.",
    type: "guide",
    source: "onedrive",
    courseId: "c3",
    unitId: "u4",
    classId: "cl4",
    level: "7 Basico",
    tags: ["mitos", "analisis literario", "reutilizable"],
    date: "2025-05-12",
    usedCount: 2,
    reusable: true,
    recommended: true,
    url: "#"
  }
];

export const labels = {
  planned: "Planificada",
  in_progress: "En progreso",
  done: "Realizada",
  archived: "Archivada",
  guide: "Guia",
  ppt: "PPT",
  worksheet: "Ficha",
  assessment: "Evaluacion",
  simce: "SIMCE",
  document: "Documento",
  link: "Link",
  video: "Video",
  onedrive: "OneDrive",
  canvas: "Canvas",
  local: "Local",
  uploaded: "Subido",
  generated: "Generado",
  canva: "Canva"
};
