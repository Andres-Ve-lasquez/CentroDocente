"use client";

import { useMemo, useState } from "react";
import curriculumObjectives from "../data/curriculum/lenguaje-cl.json";
import curriculumUnits from "../data/curriculum/units-cl-lenguaje.json";

const initialCourses = [
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

const initialUnits = [
  { id: "u1", courseId: "c1", title: "Unidad 1: Comprension lectora", order: 1 },
  { id: "u2", courseId: "c1", title: "Unidad 2: Textos no literarios", order: 2 },
  { id: "u3", courseId: "c2", title: "Unidad 1: Inferencias", order: 1 },
  { id: "u4", courseId: "c3", title: "Unidad 1: Mitos y leyendas", order: 1 },
  { id: "u5", courseId: "c4", title: "Unidad 1: Textos informativos", order: 1 },
  { id: "u6", courseId: "c5", title: "Unidad 1: Experiencia humana y literatura", order: 1 }
];

const initialClasses = [
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

const initialResources = [
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

const labels = {
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

const views = [
  ["dashboard", "Inicio", "⌂"],
  ["courses", "Cursos", "▦"],
  ["planner", "Planificador", "□"],
  ["library", "Biblioteca", "⌕"],
  ["assistant", "Asistente", "✦"],
  ["settings", "Configuracion", "⚙"]
];

function normalize(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function formatDate(value) {
  return new Intl.DateTimeFormat("es-CL", {
    weekday: "short",
    day: "numeric",
    month: "short"
  }).format(new Date(`${value}T12:00:00`));
}

function formatDateTime(value) {
  if (!value) return "Sin fecha";
  const date = typeof value === "number" ? new Date(value * 1000) : new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat("es-CL", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(date);
}

function dateKeyFromCanvaTimestamp(value) {
  if (!value) return "";
  return new Date(value * 1000).toISOString().slice(0, 10);
}

function formatMonthDay(value) {
  const date = new Date(`${value}T12:00:00`);
  return {
    day: new Intl.DateTimeFormat("es-CL", { day: "numeric" }).format(date),
    month: new Intl.DateTimeFormat("es-CL", { month: "short" }).format(date)
  };
}

function resourceTypeFromName(name) {
  const clean = normalize(name);
  if (clean.includes("ppt") || clean.endsWith(".pptx")) return "ppt";
  if (clean.includes("simce")) return "simce";
  if (clean.includes("evaluacion") || clean.includes("ticket")) return "assessment";
  if (clean.includes("guia")) return "guide";
  return "document";
}

function tagsFromName(name) {
  const clean = normalize(name);
  const tags = [];
  if (clean.includes("inferencia")) tags.push("inferencia");
  if (clean.includes("comprension") || clean.includes("lectora")) tags.push("comprension lectora");
  if (clean.includes("simce")) tags.push("simce");
  if (clean.includes("mito")) tags.push("mitos");
  return tags.length ? tags : ["onedrive"];
}

function objectivesForCourse(course) {
  if (!course) return curriculumObjectives;
  return curriculumObjectives.filter(
    (objective) => objective.level === course.level && objective.subject === course.subject
  );
}

function curriculumUnitsForCourse(course) {
  if (!course) return curriculumUnits;
  return curriculumUnits
    .filter((unit) => unit.level === course.level && unit.subject === course.subject)
    .sort((a, b) => a.orderIndex - b.orderIndex);
}

function curriculumUnitByCode(code) {
  return curriculumUnits.find((unit) => unit.code === code);
}

function objectivesForUnit(course, unitCode) {
  const unit = curriculumUnitByCode(unitCode);
  const courseObjectives = objectivesForCourse(course);
  if (!unit) return courseObjectives;
  const allowed = new Set(unit.objectiveCodes);
  return courseObjectives.filter((objective) => allowed.has(objective.code));
}

function objectiveByCode(code) {
  return curriculumObjectives.find((objective) => objective.code === code);
}

function getDemoDriveResults(query) {
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

export default function HomePage() {
  const [activeView, setActiveView] = useState("dashboard");
  const [activeCourseId, setActiveCourseId] = useState("c1");
  const [activeClassId, setActiveClassId] = useState("cl2");
  const [activeCourseUnitCode, setActiveCourseUnitCode] = useState("LE04 U1");
  const [courses, setCourses] = useState(initialCourses);
  const [units, setUnits] = useState(initialUnits);
  const [classes, setClasses] = useState(initialClasses);
  const [resources, setResources] = useState(initialResources);
  const [globalSearch, setGlobalSearch] = useState("");
  const [plannerCourse, setPlannerCourse] = useState("all");
  const [plannerStatus, setPlannerStatus] = useState("all");
  const [plannerUnit, setPlannerUnit] = useState("all");
  const [resourceCourse, setResourceCourse] = useState("all");
  const [resourceType, setResourceType] = useState("all");
  const [resourceSource, setResourceSource] = useState("all");
  const [resourceUsage, setResourceUsage] = useState("all");
  const [libraryDateFrom, setLibraryDateFrom] = useState("");
  const [libraryDateTo, setLibraryDateTo] = useState("");
  const [librarySort, setLibrarySort] = useState("date_desc");
  const [quickAi, setQuickAi] = useState("Selecciona una accion para preparar material guardable en una clase.");
  const [assistantOutput, setAssistantOutput] = useState(
    "Completa el formulario para crear una propuesta lista para ajustar y guardar."
  );
  const [assistantCourseId, setAssistantCourseId] = useState("c1");
  const [assistantUnitCode, setAssistantUnitCode] = useState("LE04 U1");
  const [assistantObjectiveCode, setAssistantObjectiveCode] = useState("LE04 OA 02");
  const [oneDriveQuery, setOneDriveQuery] = useState("");
  const [oneDriveResults, setOneDriveResults] = useState([]);
  const [oneDriveConfig, setOneDriveConfig] = useState({
    clientId: "",
    tenantId: "common",
    redirectUri: "",
    connected: false
  });
  const [canvasStatus, setCanvasStatus] = useState("Canvas no probado");
  const [canvasCourses, setCanvasCourses] = useState([]);
  const [selectedCanvasCourseId, setSelectedCanvasCourseId] = useState("");
  const [canvasCourseData, setCanvasCourseData] = useState({
    modules: [],
    assignments: [],
    files: []
  });
  const [canvaStatus, setCanvaStatus] = useState("Canva no conectado");
  const [canvaQuery, setCanvaQuery] = useState("");
  const [canvaOwnership, setCanvaOwnership] = useState("any");
  const [canvaSortBy, setCanvaSortBy] = useState("modified_descending");
  const [canvaDesigns, setCanvaDesigns] = useState([]);
  const [toast, setToast] = useState("");
  const [draftClass, setDraftClass] = useState({
    title: "",
    courseId: "c1",
    date: "2026-05-07",
    objective: "",
    curriculumUnitCode: "LE04 U1",
    objectiveCode: "LE04 OA 02"
  });
  const [draftCourse, setDraftCourse] = useState({
    name: "",
    level: "",
    subject: "Lenguaje",
    year: 2026
  });
  const [draftResource, setDraftResource] = useState({
    title: "",
    type: "guide",
    source: "onedrive",
    description: ""
  });

  const activeCourse = courses.find((course) => course.id === activeCourseId) ?? courses[0];
  const activeClass = classes.find((item) => item.id === activeClassId) ?? classes[0];
  const activeClassObjective = objectiveByCode(activeClass?.objectiveCode);
  const activeClassCurriculumUnit = curriculumUnitByCode(activeClass?.curriculumUnitCode);
  const activeCourseUnits = curriculumUnitsForCourse(activeCourse);
  const selectedCourseUnit = curriculumUnitByCode(activeCourseUnitCode) ?? activeCourseUnits[0];
  const selectedCourseUnitObjectives = objectivesForUnit(activeCourse, selectedCourseUnit?.code);

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }

  function courseById(id) {
    return courses.find((course) => course.id === id);
  }

  function unitById(id) {
    return units.find((unit) => unit.id === id);
  }

  function resourcesForClass(id) {
    return resources.filter((resource) => resource.classId === id);
  }

  function openClass(id) {
    setActiveClassId(id);
    setActiveView("class-detail");
  }

  function cloneClass(id) {
    const original = classes.find((item) => item.id === id);
    if (!original) return;
    const nextDate = new Date(`${original.date}T12:00:00`);
    nextDate.setDate(nextDate.getDate() + 7);
    setClasses((items) => [
      ...items,
      {
        ...original,
        id: `cl-${Date.now()}`,
        title: `${original.title} (clonada)`,
        date: nextDate.toISOString().slice(0, 10),
        status: "planned",
        reusedFrom: original.id
      }
    ]);
    showToast("Clase clonada con nueva fecha.");
  }

  function markClassDone(id) {
    setClasses((items) => items.map((item) => (item.id === id ? { ...item, status: "done" } : item)));
    showToast("Clase marcada como realizada.");
  }

  function createClass(event) {
    event.preventDefault();
    const firstUnit = units.find((unit) => unit.courseId === draftClass.courseId);
    setClasses((items) => [
      ...items,
      {
        id: `cl-${Date.now()}`,
        courseId: draftClass.courseId,
        unitId: firstUnit?.id ?? null,
        title: draftClass.title || "Nueva clase",
        date: draftClass.date,
        objective: draftClass.objective || "Objetivo pendiente de completar.",
        skills: "",
        notes: "",
        status: "planned",
        reusedFrom: null,
        curriculumUnitCode: draftClass.curriculumUnitCode,
        objectiveCode: draftClass.objectiveCode
      }
    ]);
    const nextCourse = courseById(activeCourseId);
    const nextUnit = curriculumUnitsForCourse(nextCourse)[0];
    setDraftClass({
      title: "",
      courseId: activeCourseId,
      date: "2026-05-07",
      objective: "",
      curriculumUnitCode: nextUnit?.code ?? "",
      objectiveCode: objectivesForUnit(nextCourse, nextUnit?.code)[0]?.code ?? ""
    });
    showToast("Clase creada en el planificador.");
  }

  function createCourse(event) {
    event.preventDefault();
    const palette = ["#2878e0", "#14a884", "#f0a926", "#ee5d78", "#7b61ff", "#38bdf8"];
    const id = `c-${Date.now()}`;
    setCourses((items) => [
      ...items,
      {
        id,
        name: draftCourse.name || "Nuevo curso",
        level: draftCourse.level || "Nivel pendiente",
        subject: draftCourse.subject || "Lenguaje",
        year: Number(draftCourse.year || 2026),
        color: palette[items.length % palette.length],
        canvasId: null,
        active: true
      }
    ]);
    setUnits((items) => [...items, { id: `u-${Date.now()}`, courseId: id, title: "Unidad 1: Por definir", order: 1 }]);
    setActiveCourseId(id);
    setDraftCourse({ name: "", level: "", subject: "Lenguaje", year: 2026 });
    showToast("Curso creado con unidad base.");
  }

  function createResource(event) {
    event.preventDefault();
    setResources((items) => [
      {
        id: `r-${Date.now()}`,
        title: draftResource.title || "Nuevo recurso",
        description: draftResource.description || "Recurso agregado manualmente.",
        type: draftResource.type,
        source: draftResource.source,
        courseId: activeCourseId,
        unitId: null,
        classId: null,
        level: activeCourse?.level ?? "Sin nivel",
        tags: ["custom"],
        date: new Date().toISOString().slice(0, 10),
        usedCount: 0,
        reusable: true,
        recommended: false,
        url: "#"
      },
      ...items
    ]);
    setDraftResource({ title: "", type: "guide", source: "onedrive", description: "" });
    showToast("Recurso agregado a la biblioteca.");
  }

  function searchOneDrive() {
    if (!oneDriveQuery.trim()) {
      showToast("Escribe que quieres buscar en OneDrive.");
      return;
    }
    setOneDriveResults(getDemoDriveResults(oneDriveQuery));
    showToast(oneDriveConfig.clientId ? "Busqueda preparada para Graph." : "Resultados demo cargados.");
  }

  function importDriveItem(item) {
    setResources((items) => [
      {
        id: `r-${Date.now()}`,
        title: item.name.replace(/\.[^.]+$/, ""),
        description: "Recurso importado desde OneDrive. En backend se guardara driveItemId y metadata Graph.",
        type: resourceTypeFromName(item.name),
        source: "onedrive",
        courseId: activeCourseId,
        unitId: null,
        classId: null,
        level: activeCourse?.level ?? "Sin nivel",
        tags: tagsFromName(item.name),
        date: item.date,
        usedCount: 0,
        reusable: true,
        recommended: true,
        url: item.url,
        externalId: item.id
      },
      ...items
    ]);
    showToast("Archivo importado como recurso reutilizable.");
  }

  function importCanvaDesign(design) {
    setResources((items) => [
      {
        id: `r-${Date.now()}`,
        title: design.title || "Diseno Canva sin titulo",
        description: "Diseno importado desde Canva. Se guarda como recurso reutilizable con enlace de edicion.",
        type: "document",
        source: "canva",
        courseId: activeCourseId,
        unitId: null,
        classId: null,
        level: activeCourse?.level ?? "Sin nivel",
        tags: ["canva", "diseno"],
        date: dateKeyFromCanvaTimestamp(design.updated_at) || new Date().toISOString().slice(0, 10),
        usedCount: 0,
        reusable: true,
        recommended: true,
        url: design.urls?.edit_url || design.urls?.view_url || "#",
        externalId: design.id
      },
      ...items
    ]);
    showToast("Proyecto Canva agregado a Biblioteca.");
  }

  function generateAssistant(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const course = courseById(form.get("courseId"));
    const type = form.get("type");
    const topic = form.get("topic") || "comprension lectora";
    const selectedUnitCode = form.get("curriculumUnitCode");
    const selectedCode = form.get("objectiveCode");
    const objective =
      curriculumObjectives.find((item) => item.code === selectedCode) ??
      objectivesForUnit(course, selectedUnitCode)[0] ??
      curriculumObjectives[0];
    const unit = curriculumUnitByCode(selectedUnitCode);
    const outputs = {
      objective: `Objetivo de clase basado en ${objective.code}\nLos estudiantes trabajaran ${topic} en ${course?.level}, desarrollando ${objective.title.toLowerCase()} y evidenciando el logro mediante respuestas justificadas.\n\nReferencia oficial: ${objective.sourceUrl}`,
      activity: `Secuencia basada en ${objective.code}\nUnidad: ${unit?.title ?? "Sin unidad seleccionada"}\nInicio: activar conocimientos previos sobre ${topic} y explicitar el criterio de logro.\nDesarrollo: modelamiento docente, practica guiada y actividad colaborativa alineada a ${objective.title}.\nCierre: ticket breve donde cada estudiante demuestra el aprendizaje con evidencia.\n\nOA oficial: ${objective.description}`,
      simce: `Set tipo SIMCE vinculado a ${objective.code}\n1. Pregunta de informacion explicita.\n2. Pregunta de inferencia o interpretacion.\n3. Vocabulario contextual.\n4. Proposito o efecto del texto.\n\nHabilidad foco: ${objective.skills}.`,
      ticket: `Ticket de salida para ${objective.code}\n1. Explica una idea clave trabajada hoy.\n2. Responde una pregunta de aplicacion sobre ${topic}.\n3. Justifica tu respuesta con evidencia o criterio del OA.\n\nCriterio: ${objective.title}.`
    };
    setAssistantOutput(outputs[type] ?? outputs.objective);
  }

  async function loadCanvasStatus() {
    setCanvasStatus("Probando conexion Canvas...");
    try {
      const response = await fetch("/api/canvas/status");
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.message || "Canvas no disponible");
      setCanvasStatus(`Conectado a Canvas como ${data.user?.name ?? "usuario Canvas"}`);
      showToast("Canvas conectado.");
    } catch (error) {
      setCanvasStatus(error instanceof Error ? error.message : "No se pudo conectar Canvas");
      showToast("No se pudo conectar Canvas.");
    }
  }

  async function loadCanvasCourses() {
    setCanvasStatus("Cargando cursos Canvas...");
    try {
      const response = await fetch("/api/canvas/courses");
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.message || "No se pudieron cargar cursos");
      setCanvasCourses(data.courses);
      setSelectedCanvasCourseId(data.courses[0]?.id ?? "");
      setCanvasStatus(`${data.courses.length} cursos Canvas cargados.`);
    } catch (error) {
      setCanvasStatus(error instanceof Error ? error.message : "No se pudieron cargar cursos Canvas");
    }
  }

  async function loadCanvasCourseData(courseId = selectedCanvasCourseId) {
    if (!courseId) {
      showToast("Selecciona un curso Canvas.");
      return;
    }

    setCanvasStatus("Cargando modulos, tareas y archivos...");
    try {
      const [modulesResponse, assignmentsResponse, filesResponse] = await Promise.all([
        fetch(`/api/canvas/courses/${courseId}/modules`),
        fetch(`/api/canvas/courses/${courseId}/assignments`),
        fetch(`/api/canvas/courses/${courseId}/files`)
      ]);
      const [modulesData, assignmentsData, filesData] = await Promise.all([
        modulesResponse.json(),
        assignmentsResponse.json(),
        filesResponse.json()
      ]);

      if (!modulesResponse.ok || !assignmentsResponse.ok || !filesResponse.ok) {
        throw new Error(modulesData.message || assignmentsData.message || filesData.message || "Canvas no disponible");
      }

      setCanvasCourseData({
        modules: modulesData.modules ?? [],
        assignments: assignmentsData.assignments ?? [],
        files: filesData.files ?? []
      });
      setCanvasStatus("Datos Canvas cargados.");
    } catch (error) {
      setCanvasStatus(error instanceof Error ? error.message : "No se pudieron cargar datos Canvas");
    }
  }

  async function loadCanvaStatus() {
    setCanvaStatus("Consultando Canva...");
    try {
      const response = await fetch("/api/canva/status");
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.message || "Canva no conectado");
      setCanvaStatus(data.connected ? "Canva conectado" : "Canva no conectado");
      showToast("Canva conectado.");
    } catch (error) {
      setCanvaStatus(error instanceof Error ? error.message : "No se pudo conectar Canva");
    }
  }

  async function loadCanvaDesigns() {
    setCanvaStatus("Cargando proyectos de Canva...");
    try {
      const params = new URLSearchParams({
        limit: "50",
        ownership: canvaOwnership,
        sort_by: canvaSortBy
      });
      const query = globalSearch.trim() || canvaQuery.trim();
      if (query) params.set("query", query);
      const response = await fetch(`/api/canva/designs?${params}`);
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.message || "No se pudieron cargar proyectos Canva");
      setCanvaDesigns(data.designs ?? []);
      setCanvaStatus(`${data.designs?.length ?? 0} proyectos Canva cargados.`);
    } catch (error) {
      setCanvaStatus(error instanceof Error ? error.message : "No se pudieron cargar proyectos Canva");
    }
  }

  const upcomingClasses = useMemo(
    () =>
      classes
        .filter((item) => item.date >= "2026-04-30" && item.status !== "done")
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, 4),
    [classes]
  );

  const filteredPlannerClasses = useMemo(() => {
    return classes
      .filter((item) => plannerCourse === "all" || item.courseId === plannerCourse)
      .filter((item) => plannerStatus === "all" || item.status === plannerStatus)
      .filter((item) => plannerUnit === "all" || item.unitId === plannerUnit)
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [classes, plannerCourse, plannerStatus, plannerUnit]);

  const canvaLibraryItems = useMemo(
    () =>
      canvaDesigns.map((design) => ({
        id: `canva-${design.id}`,
        title: design.title || "Diseno Canva sin titulo",
        description: "Proyecto de Canva conectado por API. Puedes abrirlo, editarlo o guardarlo como recurso.",
        type: "document",
        source: "canva",
        courseId: null,
        unitId: null,
        classId: null,
        level: "Canva",
        tags: ["canva", design.page_count ? `${design.page_count} paginas` : "proyecto"],
        date: dateKeyFromCanvaTimestamp(design.updated_at),
        createdDate: dateKeyFromCanvaTimestamp(design.created_at),
        usedCount: 0,
        reusable: true,
        recommended: true,
        url: design.urls?.edit_url || design.urls?.view_url || "#",
        externalId: design.id,
        canvaDesign: design
      })),
    [canvaDesigns]
  );

  const filteredResources = useMemo(() => {
    const query = normalize(globalSearch);
    return [...resources, ...canvaLibraryItems]
      .filter((resource) => {
        if (!query) return true;
        const text = normalize(
          [
            resource.title,
            resource.description,
            resource.level,
            labels[resource.type],
            labels[resource.source],
            resource.tags.join(" ")
          ].join(" ")
        );
        return query.split(/\s+/).every((part) => text.includes(part));
      })
      .filter(
        (resource) =>
          resourceCourse === "all" ||
          resource.courseId === resourceCourse ||
          (resource.source === "canva" && resourceSource === "canva")
      )
      .filter((resource) => resourceType === "all" || resource.type === resourceType)
      .filter((resource) => resourceSource === "all" || resource.source === resourceSource)
      .filter((resource) => !libraryDateFrom || resource.date >= libraryDateFrom)
      .filter((resource) => !libraryDateTo || resource.date <= libraryDateTo)
      .filter((resource) => {
        if (resourceUsage === "used") return resource.usedCount > 0;
        if (resourceUsage === "unused") return resource.usedCount === 0;
        if (resourceUsage === "recommended") return resource.recommended;
        return true;
      })
      .sort((a, b) => {
        if (librarySort === "title_asc") return a.title.localeCompare(b.title);
        if (librarySort === "title_desc") return b.title.localeCompare(a.title);
        if (librarySort === "date_asc") return (a.date || "").localeCompare(b.date || "");
        return (b.date || "").localeCompare(a.date || "");
      });
  }, [
    canvaLibraryItems,
    globalSearch,
    libraryDateFrom,
    libraryDateTo,
    librarySort,
    resourceCourse,
    resourceSource,
    resourceType,
    resourceUsage,
    resources
  ]);

  const allTags = [...new Set(resources.flatMap((resource) => resource.tags))];
  const resourceTypes = [...new Set([...resources, ...canvaLibraryItems].map((resource) => resource.type))];
  const resourceSources = [...new Set([...resources, ...canvaLibraryItems, { source: "canva" }].map((resource) => resource.source))];

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Navegacion principal">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            CD
          </div>
          <div>
            <strong>Centro Docente</strong>
            <span>Copiloto pedagogico</span>
          </div>
        </div>

        <nav className="main-nav">
          {views.map(([id, label, icon]) => (
            <button
              className={`nav-item ${activeView === id ? "is-active" : ""}`}
              data-view={id}
              key={id}
              onClick={() => setActiveView(id)}
            >
              <span aria-hidden="true">{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        <section className="sync-card" aria-label="Estado de integraciones">
          <span className="eyebrow">Integraciones</span>
          <div className="sync-row">
            <span>OneDrive</span>
            <strong className="status-warn">{oneDriveConfig.clientId ? "Configurable" : "Demo"}</strong>
          </div>
          <div className="sync-row">
            <span>Canva</span>
            <strong className={canvaDesigns.length ? "status-ok" : "status-warn"}>
              {canvaDesigns.length ? "Activo" : "Pendiente"}
            </strong>
          </div>
        </section>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <label className="global-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Buscar en recursos y Canva: guia, SIMCE, mito, abril..."
              value={globalSearch}
              onChange={(event) => {
                setGlobalSearch(event.target.value);
                setCanvaQuery(event.target.value);
                if (event.target.value.length > 2) setActiveView("library");
              }}
            />
          </label>
          <div className="topbar-actions">
            <button className="ghost-button" onClick={() => setActiveView("library")}>
              Nuevo recurso
            </button>
            <button className="primary-button" onClick={() => setActiveView("planner")}>
              Nueva clase
            </button>
          </div>
        </header>

        {activeView === "dashboard" && (
          <section className="view is-visible">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Hoy</span>
                <h1>Trabajo docente organizado por clase</h1>
              </div>
              <div className="date-pill">Semana del 27 de abril, 2026</div>
            </div>

            <div className="dashboard-grid">
              <section className="panel today-panel">
                <div className="panel-heading">
                  <h2>Clases de hoy</h2>
                  <button className="text-button" onClick={() => setActiveView("planner")}>
                    Ver planificador
                  </button>
                </div>
                <div className="stack-list">
                  {classes
                    .filter((item) => item.date === "2026-04-30")
                    .map((item) => (
                      <ClassCard
                        classItem={item}
                        course={courseById(item.courseId)}
                        unit={unitById(item.unitId)}
                        resourceCount={resourcesForClass(item.id).length}
                        onOpen={openClass}
                        key={item.id}
                      />
                    ))}
                </div>
              </section>

              <section className="panel ai-panel">
                <div className="panel-heading">
                  <h2>Modo inteligente</h2>
                  <span className="mini-badge">OA + IA</span>
                </div>
                <div className="quick-ai">
                  <button onClick={() => setQuickAi("Objetivo: inferir informacion implicita con evidencia textual.")}>
                    Crear objetivo
                  </button>
                  <button onClick={() => setQuickAi("Inicio, desarrollo y cierre alineados al OA seleccionado.")}>
                    Actividad inicio-desarrollo-cierre
                  </button>
                  <button onClick={() => setQuickAi("Set SIMCE: literal, inferencia, vocabulario y proposito.")}>
                    Preguntas SIMCE
                  </button>
                </div>
                <div className="assistant-preview">{quickAi}</div>
              </section>

              <section className="panel">
                <div className="panel-heading">
                  <h2>Proximas clases</h2>
                  <span className="muted">{upcomingClasses.length} pendientes</span>
                </div>
                <div className="stack-list compact">
                  {upcomingClasses.map((item) => (
                    <CompactClass
                      classItem={item}
                      course={courseById(item.courseId)}
                      onOpen={openClass}
                      key={item.id}
                    />
                  ))}
                </div>
              </section>

              <section className="panel">
                <div className="panel-heading">
                  <h2>Reutilizacion sugerida</h2>
                  <button className="text-button" onClick={() => setActiveView("library")}>
                    Explorar
                  </button>
                </div>
                <div className="stack-list compact">
                  {resources
                    .filter((resource) => resource.recommended)
                    .slice(0, 4)
                    .map((resource) => (
                      <ResourceMini resource={resource} key={resource.id} />
                    ))}
                </div>
              </section>
            </div>
          </section>
        )}

        {activeView === "courses" && (
          <section className="view is-visible">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Centro de cursos</span>
                <h1>Cursos pedagogicos</h1>
              </div>
            </div>

            <form className="panel assistant-form" onSubmit={createCourse}>
              <div className="form-row">
                <label>
                  Nombre
                  <input
                    value={draftCourse.name}
                    onChange={(event) => setDraftCourse({ ...draftCourse, name: event.target.value })}
                    placeholder="4 Basico A"
                  />
                </label>
                <label>
                  Nivel
                  <input
                    value={draftCourse.level}
                    onChange={(event) => setDraftCourse({ ...draftCourse, level: event.target.value })}
                    placeholder="4 Basico"
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Asignatura
                  <input
                    value={draftCourse.subject}
                    onChange={(event) => setDraftCourse({ ...draftCourse, subject: event.target.value })}
                  />
                </label>
                <label>
                  Ano
                  <input
                    type="number"
                    value={draftCourse.year}
                    onChange={(event) => setDraftCourse({ ...draftCourse, year: event.target.value })}
                  />
                </label>
              </div>
              <button className="primary-button" type="submit">
                Crear curso
              </button>
            </form>

            <div className="course-grid">
              {courses
                .filter((course) => course.active)
                .map((course) => (
                  <article className="course-card" style={{ "--course-color": course.color }} key={course.id}>
                    <div className="course-cover">
                      <span>
                        {course.subject} · {course.year}
                      </span>
                      <strong>{course.name}</strong>
                    </div>
                    <p className="muted">
                      {course.level} · {classes.filter((item) => item.courseId === course.id).length} clases ·{" "}
                      {resources.filter((item) => item.courseId === course.id).length} recursos
                    </p>
                    <div className="course-actions">
                      <button
                        className="ghost-button"
                        onClick={() => {
                          setActiveCourseId(course.id);
                          setActiveCourseUnitCode(curriculumUnitsForCourse(course)[0]?.code ?? "");
                          showToast("Curso seleccionado.");
                        }}
                      >
                        Ver curso
                      </button>
                      <button
                        className="ghost-button"
                        onClick={() => {
                          const id = `c-${Date.now()}`;
                          setCourses((items) => [...items, { ...course, id, name: `${course.name} copia`, canvasId: null }]);
                          setActiveCourseId(id);
                          setActiveCourseUnitCode(curriculumUnitsForCourse(course)[0]?.code ?? "");
                          showToast("Curso duplicado.");
                        }}
                      >
                        Duplicar
                      </button>
                      <button
                        className="ghost-button"
                        onClick={() => {
                          setCourses((items) =>
                            items.map((item) =>
                              item.id === course.id ? { ...item, canvasId: item.canvasId || `canvas-${Date.now()}` } : item
                            )
                          );
                          showToast("Canvas conectado en modo configuracion.");
                        }}
                      >
                        {course.canvasId ? "Canvas listo" : "Conectar Canvas"}
                      </button>
                    </div>
                  </article>
                ))}
            </div>

            <section className="panel course-detail">
              <div className="panel-heading">
                <div>
                  <span className="eyebrow">Detalle de curso</span>
                  <h2>{activeCourse?.name}</h2>
                </div>
                <button className="ghost-button" onClick={() => setActiveView("planner")}>
                  Planificar
                </button>
              </div>
              <div className="course-curriculum-layout">
                <div>
                  <div className="panel-heading">
                    <h3>Unidades del programa</h3>
                    <span className="mini-badge">{activeCourseUnits.length} unidades</span>
                  </div>
                  <div className="unit-selector-list">
                    {activeCourseUnits.map((unit) => (
                      <button
                        className={`unit-selector ${selectedCourseUnit?.code === unit.code ? "is-active" : ""}`}
                        key={unit.code}
                        onClick={() => setActiveCourseUnitCode(unit.code)}
                      >
                        <span>{unit.code}</span>
                        <strong>{unit.title}</strong>
                        <small>{unit.objectiveCodes.length} OA vinculados</small>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="panel-heading">
                    <div>
                      <h3>{selectedCourseUnit?.title ?? "Selecciona una unidad"}</h3>
                      <p className="muted">{selectedCourseUnit?.description}</p>
                    </div>
                    {selectedCourseUnit?.sourceUrl && (
                      <a className="ghost-button" href={selectedCourseUnit.sourceUrl} target="_blank" rel="noreferrer">
                        Ver programa
                      </a>
                    )}
                  </div>
                  <div className="stack-list compact">
                    {selectedCourseUnitObjectives.map((objective) => (
                      <article className="class-card" key={objective.code}>
                        <div>
                          <strong>
                            {objective.code} · {objective.title}
                          </strong>
                          <p className="muted">{objective.description}</p>
                          <div className="card-meta">
                            <span>{objective.axis}</span>
                            <span>{objective.skills || "habilidades por definir"}</span>
                          </div>
                          <a className="text-link" href={objective.sourceUrl} target="_blank" rel="noreferrer">
                            Ver fuente oficial
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </section>
        )}

        {activeView === "planner" && (
          <section className="view is-visible">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Ano → unidad → semana → clase</span>
                <h1>Planificador de clases</h1>
              </div>
            </div>

            <form className="panel assistant-form" onSubmit={createClass}>
              <div className="form-row">
                <label>
                  Titulo
                  <input
                    value={draftClass.title}
                    onChange={(event) => setDraftClass({ ...draftClass, title: event.target.value })}
                    placeholder="Clase 5 - Inferencias"
                  />
                </label>
                <label>
                  Curso
                  <select
                    value={draftClass.courseId}
                    onChange={(event) => {
                      const nextCourse = courseById(event.target.value);
                      const nextUnit = curriculumUnitsForCourse(nextCourse)[0];
                      setDraftClass({
                        ...draftClass,
                        courseId: event.target.value,
                        curriculumUnitCode: nextUnit?.code ?? "",
                        objectiveCode: objectivesForUnit(nextCourse, nextUnit?.code)[0]?.code ?? ""
                      });
                    }}
                  >
                    {courses
                      .filter((course) => course.active)
                      .map((course) => (
                        <option value={course.id} key={course.id}>
                          {course.name}
                        </option>
                      ))}
                  </select>
                </label>
                <label>
                  Unidad programa
                  <select
                    value={draftClass.curriculumUnitCode}
                    onChange={(event) =>
                      setDraftClass({
                        ...draftClass,
                        curriculumUnitCode: event.target.value,
                        objectiveCode: objectivesForUnit(courseById(draftClass.courseId), event.target.value)[0]?.code ?? ""
                      })
                    }
                  >
                    {curriculumUnitsForCourse(courseById(draftClass.courseId)).map((unit) => (
                      <option value={unit.code} key={unit.code}>
                        {unit.code} · {unit.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  OA oficial
                  <select
                    value={draftClass.objectiveCode}
                    onChange={(event) => setDraftClass({ ...draftClass, objectiveCode: event.target.value })}
                  >
                    {objectivesForUnit(courseById(draftClass.courseId), draftClass.curriculumUnitCode).map((objective) => (
                      <option value={objective.code} key={objective.code}>
                        {objective.code} · {objective.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Fecha
                  <input
                    type="date"
                    value={draftClass.date}
                    onChange={(event) => setDraftClass({ ...draftClass, date: event.target.value })}
                  />
                </label>
              </div>
              <label>
                Objetivo
                <textarea
                  rows="3"
                  value={draftClass.objective}
                  onChange={(event) => setDraftClass({ ...draftClass, objective: event.target.value })}
                  placeholder="Los estudiantes seran capaces de..."
                />
              </label>
              <button className="primary-button" type="submit">
                Guardar clase
              </button>
            </form>

            <div className="planner-layout">
              <aside className="filter-panel">
                <label>
                  Curso
                  <select value={plannerCourse} onChange={(event) => setPlannerCourse(event.target.value)}>
                    <option value="all">Todos</option>
                    {courses.map((course) => (
                      <option value={course.id} key={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Estado
                  <select value={plannerStatus} onChange={(event) => setPlannerStatus(event.target.value)}>
                    <option value="all">Todos</option>
                    <option value="planned">Planificadas</option>
                    <option value="done">Realizadas</option>
                    <option value="in_progress">En progreso</option>
                  </select>
                </label>
                <label>
                  Unidad
                  <select value={plannerUnit} onChange={(event) => setPlannerUnit(event.target.value)}>
                    <option value="all">Todas</option>
                    {units.map((unit) => (
                      <option value={unit.id} key={unit.id}>
                        {unit.title}
                      </option>
                    ))}
                  </select>
                </label>
              </aside>
              <div className="planner-list">
                {filteredPlannerClasses.map((item) => (
                  <PlanningCard
                    classItem={item}
                    course={courseById(item.courseId)}
                    unit={unitById(item.unitId)}
                    resourceCount={resourcesForClass(item.id).length}
                    onOpen={openClass}
                    onClone={cloneClass}
                    onDone={markClassDone}
                    key={item.id}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {activeView === "class-detail" && activeClass && (
          <section className="view is-visible">
            <button className="back-button" onClick={() => setActiveView("planner")}>
              ← Volver al planificador
            </button>
            <div className="class-detail-layout">
              <section className="panel">
                <span className="eyebrow">
                  {courseById(activeClass.courseId)?.name} · {formatDate(activeClass.date)} ·{" "}
                  {unitById(activeClass.unitId)?.title}
                </span>
                <h1>{activeClass.title}</h1>
                <div className="detail-section">
                  <h2>Objetivo</h2>
                  <p>{activeClass.objective}</p>
                </div>
                <div className="detail-section">
                  <h2>Unidad programa</h2>
                  {activeClassCurriculumUnit ? (
                    <>
                      <p>
                        <strong>
                          {activeClassCurriculumUnit.code} · {activeClassCurriculumUnit.title}
                        </strong>
                      </p>
                      <p>{activeClassCurriculumUnit.description}</p>
                      <a className="text-link" href={activeClassCurriculumUnit.sourceUrl} target="_blank" rel="noreferrer">
                        Ver programa oficial
                      </a>
                    </>
                  ) : (
                    <p>Sin unidad curricular asociada.</p>
                  )}
                </div>
                <div className="detail-section">
                  <h2>OA asociado</h2>
                  {activeClassObjective ? (
                    <>
                      <p>
                        <strong>
                          {activeClassObjective.code} · {activeClassObjective.title}
                        </strong>
                      </p>
                      <p>{activeClassObjective.description}</p>
                      <a className="text-link" href={activeClassObjective.sourceUrl} target="_blank" rel="noreferrer">
                        Ver fuente oficial en Curriculo Nacional
                      </a>
                    </>
                  ) : (
                    <p>Pendiente de seleccionar desde catalogo curricular.</p>
                  )}
                </div>
                <div className="detail-section">
                  <h2>Observaciones</h2>
                  <p>{activeClass.notes || "Sin observaciones."}</p>
                </div>
                <div className="course-actions">
                  <button className="primary-button" onClick={() => cloneClass(activeClass.id)}>
                    Clonar clase completa
                  </button>
                  <button
                    className="ghost-button"
                    onClick={() => {
                      setAssistantCourseId(activeClass.courseId);
                      setAssistantUnitCode(activeClass.curriculumUnitCode);
                      setAssistantObjectiveCode(activeClass.objectiveCode);
                      setActiveView("assistant");
                    }}
                  >
                    Generar actividad
                  </button>
                  <button className="ghost-button" onClick={() => markClassDone(activeClass.id)}>
                    Marcar realizada
                  </button>
                </div>
              </section>
              <aside className="panel">
                <div className="panel-heading">
                  <h2>Recursos adjuntos</h2>
                  <button className="text-button" onClick={() => setActiveView("library")}>
                    Buscar
                  </button>
                </div>
                <div className="stack-list compact">
                  {resourcesForClass(activeClass.id).map((resource) => (
                    <ResourceMini resource={resource} key={resource.id} />
                  ))}
                </div>
              </aside>
            </div>
          </section>
        )}

        {activeView === "library" && (
          <section className="view is-visible">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Biblioteca unica</span>
                <h1>Recursos reutilizables</h1>
              </div>
              <div className="connector-actions">
                <button className="ghost-button" onClick={() => window.location.assign("/api/canva/auth/start")}>
                  Conectar Canva
                </button>
                <button className="primary-button" onClick={loadCanvaDesigns}>
                  Cargar Canva
                </button>
              </div>
            </div>

            <section className="panel library-command">
              <div className="library-command-summary">
                <span className="eyebrow">Buscador unico</span>
                <strong>{globalSearch ? `Buscando "${globalSearch}"` : "Usa el buscador superior para recursos y Canva"}</strong>
                <small>La misma consulta filtra la biblioteca y se envia a Canva al presionar Buscar en Canva.</small>
              </div>
              <div className="library-search-main">
                <label>
                  Buscar por titulo o palabra clave
                  <div className="search-field">
                    <span aria-hidden="true">⌕</span>
                    <input
                      type="search"
                      value={globalSearch}
                      onChange={(event) => {
                        setGlobalSearch(event.target.value);
                        setCanvaQuery(event.target.value);
                      }}
                      placeholder="Ej: diploma, guia de inferencias, SIMCE, mitos..."
                    />
                  </div>
                </label>
              </div>
              <div className="library-date-filters">
                <label>
                  Desde
                  <input
                    type="date"
                    value={libraryDateFrom}
                    onChange={(event) => setLibraryDateFrom(event.target.value)}
                  />
                </label>
                <label>
                  Hasta
                  <input
                    type="date"
                    value={libraryDateTo}
                    onChange={(event) => setLibraryDateTo(event.target.value)}
                  />
                </label>
                <label>
                  Orden
                  <select value={librarySort} onChange={(event) => setLibrarySort(event.target.value)}>
                    <option value="date_desc">Mas recientes</option>
                    <option value="date_asc">Mas antiguos</option>
                    <option value="title_asc">Titulo A-Z</option>
                    <option value="title_desc">Titulo Z-A</option>
                  </select>
                </label>
              </div>
              <div className="canva-library-strip">
                <div>
                  <strong>Canva en Biblioteca</strong>
                  <span>{canvaStatus}</span>
                </div>
                <label>
                  Propiedad
                  <select value={canvaOwnership} onChange={(event) => setCanvaOwnership(event.target.value)}>
                    <option value="any">Propios y compartidos</option>
                    <option value="owned">Solo propios</option>
                    <option value="shared">Compartidos</option>
                  </select>
                </label>
                <label>
                  Orden Canva
                  <select value={canvaSortBy} onChange={(event) => setCanvaSortBy(event.target.value)}>
                    <option value="modified_descending">Modificados recientes</option>
                    <option value="modified_ascending">Modificados antiguos</option>
                    <option value="title_ascending">Titulo A-Z</option>
                    <option value="title_descending">Titulo Z-A</option>
                    <option value="relevance">Relevancia</option>
                  </select>
                </label>
                <button className="primary-button" onClick={loadCanvaDesigns}>
                  Buscar en Canva
                </button>
              </div>
            </section>

            <section className="panel integration-panel">
              <div>
                <span className="eyebrow">Importar</span>
                <h2>Traer archivos externos a la biblioteca</h2>
                <p className="muted">
                  OneDrive queda como busqueda demo mientras cerramos OAuth de Microsoft Graph. Canva ya usa la conexion real.
                </p>
              </div>
              <div className="onedrive-tools">
                <button
                  className="ghost-button"
                  onClick={() => {
                    setOneDriveConfig({ ...oneDriveConfig, connected: Boolean(oneDriveConfig.clientId) });
                    showToast(oneDriveConfig.clientId ? "OneDrive preparado para OAuth." : "Modo demo OneDrive activo.");
                  }}
                >
                  OneDrive
                </button>
                <label className="onedrive-search">
                  <span aria-hidden="true">⌕</span>
                  <input
                    type="search"
                    placeholder="Buscar guia, PPT, SIMCE..."
                    value={oneDriveQuery}
                    onChange={(event) => setOneDriveQuery(event.target.value)}
                  />
                </label>
                <button className="primary-button" onClick={searchOneDrive}>
                  Buscar
                </button>
              </div>
              <div className="onedrive-results">
                {oneDriveResults.map((item) => (
                  <article className="onedrive-result" key={item.id}>
                    <div>
                      <strong>{item.name}</strong>
                      <div className="card-meta">
                        <span>OneDrive</span>
                        <span>{item.mime}</span>
                        <span>{formatDate(item.date)}</span>
                      </div>
                    </div>
                    <button className="ghost-button" onClick={() => importDriveItem(item)}>
                      Importar
                    </button>
                  </article>
                ))}
              </div>
            </section>

            <form className="panel assistant-form" onSubmit={createResource}>
              <div className="form-row">
                <label>
                  Titulo
                  <input
                    value={draftResource.title}
                    onChange={(event) => setDraftResource({ ...draftResource, title: event.target.value })}
                    placeholder="Guia de comprension lectora"
                  />
                </label>
                <label>
                  Tipo
                  <select
                    value={draftResource.type}
                    onChange={(event) => setDraftResource({ ...draftResource, type: event.target.value })}
                  >
                    <option value="guide">Guia</option>
                    <option value="ppt">PPT</option>
                    <option value="assessment">Evaluacion</option>
                    <option value="simce">SIMCE</option>
                    <option value="document">Documento</option>
                  </select>
                </label>
                <label>
                  Fuente
                  <select
                    value={draftResource.source}
                    onChange={(event) => setDraftResource({ ...draftResource, source: event.target.value })}
                  >
                    <option value="onedrive">OneDrive</option>
                    <option value="canva">Canva</option>
                    <option value="canvas">Canvas</option>
                    <option value="local">Local</option>
                    <option value="generated">Generado</option>
                  </select>
                </label>
              </div>
              <label>
                Descripcion
                <textarea
                  rows="2"
                  value={draftResource.description}
                  onChange={(event) => setDraftResource({ ...draftResource, description: event.target.value })}
                />
              </label>
              <button className="primary-button" type="submit">
                Agregar recurso
              </button>
            </form>

            <div className="library-layout">
              <aside className="filter-panel">
                <div className="filter-heading">
                  <strong>Filtros</strong>
                  <button
                    className="text-button"
                    onClick={() => {
                      setResourceCourse("all");
                      setResourceType("all");
                      setResourceSource("all");
                      setResourceUsage("all");
                      setLibraryDateFrom("");
                      setLibraryDateTo("");
                      setGlobalSearch("");
                      setCanvaQuery("");
                    }}
                  >
                    Limpiar
                  </button>
                </div>
                <label>
                  Curso
                  <select value={resourceCourse} onChange={(event) => setResourceCourse(event.target.value)}>
                    <option value="all">Todos</option>
                    {courses.map((course) => (
                      <option value={course.id} key={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Tipo
                  <select value={resourceType} onChange={(event) => setResourceType(event.target.value)}>
                    <option value="all">Todos</option>
                    {resourceTypes.map((type) => (
                      <option value={type} key={type}>
                        {labels[type]}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Fuente
                  <select value={resourceSource} onChange={(event) => setResourceSource(event.target.value)}>
                    <option value="all">Todas</option>
                    {resourceSources.map((source) => (
                      <option value={source} key={source}>
                        {labels[source]}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Uso
                  <select value={resourceUsage} onChange={(event) => setResourceUsage(event.target.value)}>
                    <option value="all">Todos</option>
                    <option value="used">Ya usado</option>
                    <option value="unused">No usado</option>
                    <option value="recommended">Recomendado</option>
                  </select>
                </label>
              </aside>
              <div>
                <div className="result-summary">
                  <strong>{filteredResources.length} recursos encontrados</strong>
                  <span>
                    {canvaDesigns.length} desde Canva · {resources.length} guardados en la app
                  </span>
                </div>
                <div className="resource-list">
                  {filteredResources.map((resource) => (
                    <ResourceCard
                      resource={resource}
                      course={courseById(resource.courseId)}
                      classItem={classes.find((item) => item.id === resource.classId)}
                      onImportCanva={importCanvaDesign}
                      key={resource.id}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeView === "assistant" && (
          <section className="view is-visible">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Modo inteligente</span>
                <h1>Asistente docente</h1>
              </div>
            </div>

            <div className="assistant-layout">
              <form className="panel assistant-form" onSubmit={generateAssistant}>
                <label>
                  Curso
                  <select
                    name="courseId"
                    value={assistantCourseId}
                    onChange={(event) => {
                      const nextCourse = courseById(event.target.value);
                      const nextUnit = curriculumUnitsForCourse(nextCourse)[0];
                      setAssistantCourseId(event.target.value);
                      setAssistantUnitCode(nextUnit?.code ?? "");
                      setAssistantObjectiveCode(objectivesForUnit(nextCourse, nextUnit?.code)[0]?.code ?? "");
                    }}
                  >
                    {courses.map((course) => (
                      <option value={course.id} key={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Unidad programa
                  <select
                    name="curriculumUnitCode"
                    value={assistantUnitCode}
                    onChange={(event) => {
                      setAssistantUnitCode(event.target.value);
                      setAssistantObjectiveCode(
                        objectivesForUnit(courseById(assistantCourseId), event.target.value)[0]?.code ?? ""
                      );
                    }}
                  >
                    {curriculumUnitsForCourse(courseById(assistantCourseId)).map((unit) => (
                      <option value={unit.code} key={unit.code}>
                        {unit.code} · {unit.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  OA oficial
                  <select
                    name="objectiveCode"
                    value={assistantObjectiveCode}
                    onChange={(event) => setAssistantObjectiveCode(event.target.value)}
                  >
                    {objectivesForUnit(courseById(assistantCourseId), assistantUnitCode).map((objective) => (
                      <option value={objective.code} key={objective.code}>
                        {objective.code} · {objective.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Tipo de salida
                  <select name="type" defaultValue="objective">
                    <option value="objective">Objetivo de clase</option>
                    <option value="activity">Inicio, desarrollo y cierre</option>
                    <option value="simce">Preguntas tipo SIMCE</option>
                    <option value="ticket">Ticket de salida</option>
                  </select>
                </label>
                <label>
                  Tema o necesidad
                  <textarea name="topic" rows="5" placeholder="Ej: inferencias, mitos, comprension lectora..." />
                </label>
                <button className="primary-button" type="submit">
                  Generar propuesta
                </button>
              </form>
              <section className="panel assistant-output">
                <div className="panel-heading">
                  <h2>Resultado guardable</h2>
                  <button className="ghost-button" onClick={() => showToast("Guardado en banco inteligente demo.")}>
                    Guardar en banco
                  </button>
                </div>
                <div className="generated-output">{assistantOutput}</div>
              </section>
            </div>
          </section>
        )}

        {activeView === "settings" && (
          <section className="view is-visible">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Configuracion</span>
                <h1>Workspace e integraciones</h1>
              </div>
            </div>

            <div className="settings-grid">
              <section className="panel">
                <h2>Taxonomia minima</h2>
                <div className="tag-cloud">
                  {allTags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
              <section className="panel">
                <h2>Conectores</h2>
                <div className="connector-row">
                  <div>
                    <strong>Canva</strong>
                    <span>{canvaStatus}</span>
                  </div>
                  <div className="connector-actions">
                    <button className="ghost-button" onClick={() => window.location.assign("/api/canva/auth/start")}>
                      Conectar Canva
                    </button>
                    <button className="primary-button" onClick={loadCanvaDesigns}>
                      Cargar proyectos
                    </button>
                  </div>
                </div>
                <div className="connector-config">
                  <p className="muted">
                    Integra los proyectos de <code>canva.com/projects</code> usando Canva Connect API. Requiere
                    <code>CANVA_CLIENT_ID</code>, <code>CANVA_CLIENT_SECRET</code> y <code>CANVA_REDIRECT_URI</code>.
                  </p>
                  <label>
                    Buscar en Canva
                    <input
                      value={canvaQuery}
                      onChange={(event) => setCanvaQuery(event.target.value)}
                      placeholder="Ej: diploma, guia, lectura, presentacion..."
                    />
                  </label>
                  <button className="ghost-button" onClick={loadCanvaStatus}>
                    Probar conexion Canva
                  </button>
                  {canvaDesigns.length > 0 && (
                    <div className="canva-design-grid">
                      {canvaDesigns.map((design) => (
                        <article className="canva-design-card" key={design.id}>
                          {design.thumbnail?.url && (
                            <img src={design.thumbnail.url} alt="" className="canva-design-thumb" />
                          )}
                          <div>
                            <strong>{design.title || "Diseno sin titulo"}</strong>
                            <div className="card-meta">
                              <span>ID Canva: {design.id}</span>
                              <span>{design.page_count ? `${design.page_count} paginas` : "Canva"}</span>
                            </div>
                          </div>
                          <div className="resource-actions">
                            {design.urls?.edit_url && (
                              <a className="ghost-button" href={design.urls.edit_url} target="_blank" rel="noreferrer">
                                Editar
                              </a>
                            )}
                            {design.urls?.view_url && (
                              <a className="text-button" href={design.urls.view_url} target="_blank" rel="noreferrer">
                                Ver
                              </a>
                            )}
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
                <div className="connector-row">
                  <div>
                    <strong>Microsoft OneDrive</strong>
                    <span>Preparado para OAuth con Microsoft Graph y API routes.</span>
                  </div>
                </div>
                <div className="connector-config">
                  <label>
                    Azure Client ID
                    <input
                      value={oneDriveConfig.clientId}
                      onChange={(event) => setOneDriveConfig({ ...oneDriveConfig, clientId: event.target.value })}
                      placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    />
                  </label>
                  <label>
                    Tenant
                    <input
                      value={oneDriveConfig.tenantId}
                      onChange={(event) => setOneDriveConfig({ ...oneDriveConfig, tenantId: event.target.value })}
                    />
                  </label>
                  <label>
                    Redirect URI
                    <input
                      value={oneDriveConfig.redirectUri}
                      onChange={(event) => setOneDriveConfig({ ...oneDriveConfig, redirectUri: event.target.value })}
                      placeholder="https://tu-app.vercel.app/api/auth/callback/microsoft"
                    />
                  </label>
                </div>
                <div className="connector-row">
                  <div>
                    <strong>Canvas LMS</strong>
                    <span>{canvasStatus}</span>
                  </div>
                  <div className="connector-actions">
                    <button className="ghost-button" onClick={loadCanvasStatus}>
                      Probar API
                    </button>
                    <button className="primary-button" onClick={loadCanvasCourses}>
                      Cargar cursos
                    </button>
                  </div>
                </div>
                <div className="connector-config">
                  <p className="muted">
                    Configura en Vercel <code>CANVAS_BASE_URL</code> y <code>CANVAS_ACCESS_TOKEN</code>. Para LTI, usa
                    la URL <code>/api/canvas/lti/config</code> como base de registro.
                  </p>
                  {canvasCourses.length > 0 && (
                    <>
                      <label>
                        Curso Canvas
                        <select
                          value={selectedCanvasCourseId}
                          onChange={(event) => setSelectedCanvasCourseId(event.target.value)}
                        >
                          {canvasCourses.map((course) => (
                            <option value={course.id} key={course.id}>
                              {course.name || course.course_code}
                            </option>
                          ))}
                        </select>
                      </label>
                      <button className="ghost-button" onClick={() => loadCanvasCourseData()}>
                        Ver modulos, tareas y archivos
                      </button>
                    </>
                  )}
                  {(canvasCourseData.modules.length > 0 ||
                    canvasCourseData.assignments.length > 0 ||
                    canvasCourseData.files.length > 0) && (
                    <div className="canvas-data-grid">
                      <CanvasDataList
                        title="Modulos"
                        items={canvasCourseData.modules}
                        getLabel={(item) => item.name}
                        getMeta={(item) => `${item.items_count ?? 0} items`}
                      />
                      <CanvasDataList
                        title="Tareas"
                        items={canvasCourseData.assignments}
                        getLabel={(item) => item.name}
                        getMeta={(item) => item.due_at || "sin fecha"}
                      />
                      <CanvasDataList
                        title="Archivos"
                        items={canvasCourseData.files}
                        getLabel={(item) => item.display_name || item.filename}
                        getMeta={(item) => item.content_type || "archivo"}
                      />
                    </div>
                  )}
                </div>
              </section>
            </div>
          </section>
        )}
      </main>

      <div className={`toast ${toast ? "is-visible" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </div>
  );
}

function ClassCard({ classItem, course, unit, resourceCount, onOpen }) {
  return (
    <article className="class-card">
      <div>
        <span className="eyebrow">
          {course?.name} · {formatDate(classItem.date)}
        </span>
        <h3>{classItem.title}</h3>
        <p>{classItem.objective}</p>
        <div className="card-meta">
          <span>{unit?.title ?? "Sin unidad"}</span>
          <span>{labels[classItem.status]}</span>
          <span>{resourceCount} recursos</span>
          <span>{classItem.curriculumUnitCode}</span>
          <span>{classItem.objectiveCode}</span>
        </div>
      </div>
      <button className="ghost-button" onClick={() => onOpen(classItem.id)}>
        Ver clase
      </button>
    </article>
  );
}

function CompactClass({ classItem, course, onOpen }) {
  return (
    <article className="class-card">
      <div>
        <h3>{classItem.title}</h3>
        <div className="card-meta">
          <span>{formatDate(classItem.date)}</span>
          <span>{course?.name}</span>
          <span>{labels[classItem.status]}</span>
        </div>
      </div>
      <button className="text-button" onClick={() => onOpen(classItem.id)}>
        Abrir
      </button>
    </article>
  );
}

function PlanningCard({ classItem, course, unit, resourceCount, onOpen, onClone, onDone }) {
  const date = formatMonthDay(classItem.date);
  return (
    <article className="planning-card">
      <div className="date-box" style={{ background: course?.color }}>
        <span>{date.month}</span>
        <strong>{date.day}</strong>
      </div>
      <div>
        <span className="eyebrow">
          {course?.name} · {unit?.title ?? "Sin unidad"}
        </span>
        <h3>{classItem.title}</h3>
        <p>{classItem.objective}</p>
        <div className="card-meta">
          <span className="status-pill">{labels[classItem.status]}</span>
          <span>{resourceCount} recursos</span>
          <span>{classItem.reusedFrom ? "Reutilizada de anos anteriores" : "Clase nueva"}</span>
          <span>{classItem.curriculumUnitCode}</span>
          <span>{classItem.objectiveCode}</span>
        </div>
      </div>
      <div className="planning-actions">
        <button className="ghost-button" onClick={() => onOpen(classItem.id)}>
          Detalle
        </button>
        <button className="ghost-button" onClick={() => onClone(classItem.id)}>
          Clonar
        </button>
        <button className="text-button" onClick={() => onDone(classItem.id)}>
          Realizada
        </button>
      </div>
    </article>
  );
}

function ResourceMini({ resource }) {
  return (
    <article className="resource-card">
      <div>
        <h3>{resource.title}</h3>
        <div className="card-meta">
          <span>{labels[resource.type]}</span>
          <span>{labels[resource.source]}</span>
          <span>{resource.usedCount} usos</span>
        </div>
      </div>
    </article>
  );
}

function ResourceCard({ resource, course, classItem, onImportCanva }) {
  const sourceClass = `source-pill ${resource.source}`;
  const isCanvaLiveResult = Boolean(resource.canvaDesign);
  return (
    <article className={`resource-card ${isCanvaLiveResult ? "canva-resource-card" : ""}`}>
      {resource.canvaDesign?.thumbnail?.url && (
        <img src={resource.canvaDesign.thumbnail.url} alt="" className="resource-thumb" />
      )}
      <div>
        <div className="panel-heading">
          <h3>{resource.title}</h3>
          <span className={sourceClass}>{labels[resource.source]}</span>
        </div>
        <p>{resource.description}</p>
        <div className="card-meta">
          <span>{labels[resource.type]}</span>
          <span>{resource.level}</span>
          <span>{formatDateTime(resource.date)}</span>
          <span>{course?.name ?? "Sin curso"}</span>
          <span>{classItem ? `Usado en: ${classItem.title}` : "No usado"}</span>
          <span>{resource.recommended ? "Recomendado para reutilizar" : "Uso normal"}</span>
        </div>
        <div className="tag-cloud">
          {resource.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="resource-actions">
        {resource.url && resource.url !== "#" ? (
          <a className="ghost-button" href={resource.url} target="_blank" rel="noreferrer">
            {resource.source === "canva" ? "Abrir en Canva" : resource.source === "canvas" ? "Abrir en Canvas" : "Abrir"}
          </a>
        ) : (
          <button className="ghost-button">
            {resource.source === "canva" ? "Abrir en Canva" : resource.source === "canvas" ? "Abrir en Canvas" : "Abrir"}
          </button>
        )}
        {isCanvaLiveResult && (
          <button className="primary-button" onClick={() => onImportCanva?.(resource.canvaDesign)}>
            Guardar
          </button>
        )}
        <button className="ghost-button">Parecidos</button>
      </div>
    </article>
  );
}

function CanvasDataList({ title, items, getLabel, getMeta }) {
  return (
    <section className="canvas-data-list">
      <div className="panel-heading">
        <h3>{title}</h3>
        <span className="mini-badge">{items.length}</span>
      </div>
      <div className="stack-list compact">
        {items.slice(0, 8).map((item) => (
          <article className="class-card" key={item.id}>
            <div>
              <strong>{getLabel(item)}</strong>
              <div className="card-meta">
                <span>ID Canvas: {item.id}</span>
                <span>{getMeta(item)}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
