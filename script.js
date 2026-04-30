const state = {
  activeView: "dashboard",
  activeCourseId: "c1",
  activeClassId: "cl2",
  plannerView: "week",
  generatedItems: [],
  integrations: {
    oneDrive: {
      clientId: "",
      tenantId: "common",
      redirectUri: "",
      accessToken: "",
      accountName: "",
      connected: false,
      lastResults: [],
      demoMode: true,
    },
  },
  courses: [
    {
      id: "c1",
      name: "4° Basico A",
      level: "4° Basico",
      subject: "Lenguaje",
      year: 2026,
      color: "#2878e0",
      canvasId: null,
      active: true,
    },
    {
      id: "c2",
      name: "5° Basico B",
      level: "5° Basico",
      subject: "Lenguaje",
      year: 2026,
      color: "#14a884",
      canvasId: "canvas-4281",
      active: true,
    },
    {
      id: "c3",
      name: "7° Basico",
      level: "7° Basico",
      subject: "Lenguaje",
      year: 2026,
      color: "#f0a926",
      canvasId: null,
      active: true,
    },
  ],
  units: [
    { id: "u1", courseId: "c1", title: "Unidad 1: Comprension lectora", order: 1 },
    { id: "u2", courseId: "c1", title: "Unidad 2: Textos no literarios", order: 2 },
    { id: "u3", courseId: "c2", title: "Unidad 1: Inferencias", order: 1 },
    { id: "u4", courseId: "c3", title: "Unidad 1: Mitos y leyendas", order: 1 },
  ],
  classes: [
    {
      id: "cl1",
      courseId: "c1",
      unitId: "u1",
      title: "Clase 1 - Estrategias antes de leer",
      date: "2026-04-29",
      start: "08:15",
      end: "09:45",
      objective:
        "Activar conocimientos previos y formular predicciones a partir de titulo, imagenes y vocabulario clave.",
      skills: "comprension lectora, prediccion, vocabulario",
      notes: "Usar texto corto y ticket de salida de 3 preguntas.",
      status: "done",
      reusedFrom: null,
    },
    {
      id: "cl2",
      courseId: "c1",
      unitId: "u1",
      title: "Clase 2 - Inferir informacion implicita",
      date: "2026-04-30",
      start: "10:00",
      end: "11:30",
      objective:
        "Inferir informacion implicita en un texto narrativo breve, justificando respuestas con pistas del texto.",
      skills: "inferencia, evidencia textual",
      notes: "Reforzar diferencia entre dato explicito e inferencia.",
      status: "planned",
      reusedFrom: "2025-cl-18",
    },
    {
      id: "cl3",
      courseId: "c2",
      unitId: "u3",
      title: "Clase 3 - Guia de inferencias",
      date: "2026-05-04",
      start: "08:15",
      end: "09:45",
      objective:
        "Resolver preguntas de inferencia local y global reconociendo pistas directas del texto.",
      skills: "inferencia, comprension lectora",
      notes: "Material reutilizado desde abril 2025.",
      status: "planned",
      reusedFrom: "2025-cl-33",
    },
    {
      id: "cl4",
      courseId: "c3",
      unitId: "u4",
      title: "Clase 3 - Caracteristicas del mito",
      date: "2026-05-06",
      start: "12:00",
      end: "13:30",
      objective:
        "Identificar caracteristicas del mito y explicar su funcion cultural en relatos breves.",
      skills: "mitos, analisis literario",
      notes: "Buscar material parecido a clase de 2025.",
      status: "planned",
      reusedFrom: null,
    },
  ],
  resources: [
    {
      id: "r1",
      title: "Guia de inferencias con alternativas",
      description: "Guia imprimible con texto narrativo y 12 preguntas de alternativa multiple.",
      type: "guide",
      source: "onedrive",
      courseId: "c1",
      unitId: "u1",
      classId: "cl2",
      level: "4° Basico",
      tags: ["inferencia", "comprension lectora", "formativa"],
      date: "2026-04-20",
      usedCount: 3,
      reusable: true,
      recommended: true,
      url: "#",
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
      level: "4° Basico",
      tags: ["prediccion", "vocabulario"],
      date: "2026-04-18",
      usedCount: 1,
      reusable: true,
      recommended: false,
      url: "#",
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
      level: "4° Basico",
      tags: ["simce", "comprension lectora", "alternativa multiple"],
      date: "2026-04-26",
      usedCount: 0,
      reusable: true,
      recommended: true,
      url: "#",
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
      level: "7° Basico",
      tags: ["mitos", "analisis literario", "reutilizable"],
      date: "2025-05-12",
      usedCount: 2,
      reusable: true,
      recommended: true,
      url: "#",
    },
    {
      id: "r5",
      title: "Ticket salida vocabulario contextual",
      description: "Ticket rapido para cierre de clase y retroalimentacion inmediata.",
      type: "assessment",
      source: "local",
      courseId: "c2",
      unitId: "u3",
      classId: "cl3",
      level: "5° Basico",
      tags: ["vocabulario", "formativa"],
      date: "2026-03-28",
      usedCount: 1,
      reusable: true,
      recommended: false,
      url: "#",
    },
  ],
};

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
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function courseById(id) {
  return state.courses.find((course) => course.id === id);
}

function unitById(id) {
  return state.units.find((unit) => unit.id === id);
}

function classById(id) {
  return state.classes.find((item) => item.id === id);
}

function resourcesForClass(classId) {
  return state.resources.filter((resource) => resource.classId === classId);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("es-CL", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(`${value}T12:00:00`));
}

function formatMonthDay(value) {
  const date = new Date(`${value}T12:00:00`);
  return {
    day: new Intl.DateTimeFormat("es-CL", { day: "numeric" }).format(date),
    month: new Intl.DateTimeFormat("es-CL", { month: "short" }).format(date),
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalize(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getDefaultRedirectUri() {
  return window.location.href.split("#")[0].split("?")[0];
}

function loadOneDriveConfig() {
  const saved = localStorage.getItem("centroDocente.oneDrive");
  const parsed = saved ? JSON.parse(saved) : {};
  state.integrations.oneDrive = {
    ...state.integrations.oneDrive,
    ...parsed,
    redirectUri: parsed.redirectUri || getDefaultRedirectUri(),
    accessToken: "",
    connected: false,
    demoMode: !parsed.clientId,
  };
}

function saveOneDriveConfig() {
  const config = {
    clientId: $("#oneDriveClientId").value.trim(),
    tenantId: $("#oneDriveTenantId").value.trim() || "common",
    redirectUri: $("#oneDriveRedirectUri").value.trim() || getDefaultRedirectUri(),
  };
  state.integrations.oneDrive = {
    ...state.integrations.oneDrive,
    ...config,
    demoMode: !config.clientId,
  };
  localStorage.setItem("centroDocente.oneDrive", JSON.stringify(config));
  refreshOneDriveStatus();
  showToast(config.clientId ? "Configuracion OneDrive guardada." : "Sin Client ID: OneDrive queda en modo demo.");
}

function refreshOneDriveStatus() {
  const config = state.integrations.oneDrive;
  const status = config.connected
    ? `Conectado como ${config.accountName || "cuenta Microsoft"}.`
    : config.clientId
      ? "Configurado. Puedes conectar OneDrive."
      : "Modo demo activo. Agrega Azure Client ID para usar Microsoft Graph real.";

  $("#oneDriveStatusText").textContent = status;
  $("#oneDriveSettingsStatus").textContent = status;
  $("#oneDriveClientId").value = config.clientId;
  $("#oneDriveTenantId").value = config.tenantId;
  $("#oneDriveRedirectUri").value = config.redirectUri || getDefaultRedirectUri();
  $("#oneDriveConnectBtn").textContent = config.connected ? "Reconectar OneDrive" : "Conectar OneDrive";
}

function resourceTypeFromFileName(name, mimeType = "") {
  const clean = normalize(name);
  if (clean.endsWith(".ppt") || clean.endsWith(".pptx")) return "ppt";
  if (clean.includes("simce")) return "simce";
  if (clean.includes("evaluacion") || clean.includes("ticket") || clean.includes("pauta")) return "assessment";
  if (clean.includes("guia") || clean.includes("guía")) return "guide";
  if (mimeType.includes("presentation")) return "ppt";
  if (mimeType.includes("pdf") || mimeType.includes("word")) return "document";
  return "document";
}

function tagsFromFileName(name) {
  const clean = normalize(name);
  const tags = [];
  if (clean.includes("inferencia")) tags.push("inferencia");
  if (clean.includes("comprension") || clean.includes("lectora")) tags.push("comprension lectora");
  if (clean.includes("simce")) tags.push("simce");
  if (clean.includes("mito")) tags.push("mitos");
  if (clean.includes("vocabulario")) tags.push("vocabulario");
  return tags.length ? tags : ["onedrive"];
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function setView(viewId) {
  state.activeView = viewId;
  $$(".view").forEach((view) => view.classList.toggle("is-visible", view.id === viewId));
  $$(".nav-item").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.view === viewId);
  });
  $(".sidebar").classList.remove("is-open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderDashboard() {
  const today = "2026-04-30";
  const todayClasses = state.classes.filter((item) => item.date === today);
  $("#todayClasses").innerHTML = todayClasses.map(renderClassCard).join("");

  const upcoming = state.classes
    .filter((item) => item.date >= today && item.status !== "done")
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4);
  $("#upcomingCount").textContent = `${upcoming.length} pendientes`;
  $("#upcomingClasses").innerHTML = upcoming.map(renderCompactClass).join("");

  const suggestions = state.resources.filter((resource) => resource.recommended).slice(0, 4);
  $("#reuseSuggestions").innerHTML = suggestions
    .map(
      (resource) => `
        <article class="resource-card">
          <div>
            <h3>${escapeHtml(resource.title)}</h3>
            <p class="muted">${escapeHtml(resource.description)}</p>
            <div class="card-meta">
              <span>${labels[resource.type]}</span>
              <span>${resource.usedCount} usos</span>
              <span>${escapeHtml(resource.level)}</span>
            </div>
          </div>
          <button class="ghost-button" data-resource-open="${resource.id}">Abrir</button>
        </article>
      `,
    )
    .join("");
}

function renderClassCard(item) {
  const course = courseById(item.courseId);
  const unit = unitById(item.unitId);
  return `
    <article class="class-card">
      <div>
        <span class="eyebrow">${escapeHtml(course.name)} · ${formatDate(item.date)}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.objective)}</p>
        <div class="card-meta">
          <span>${escapeHtml(unit?.title ?? "Sin unidad")}</span>
          <span>${labels[item.status]}</span>
          <span>${resourcesForClass(item.id).length} recursos</span>
        </div>
      </div>
      <button class="ghost-button" data-class-open="${item.id}">Ver clase</button>
    </article>
  `;
}

function renderCompactClass(item) {
  const course = courseById(item.courseId);
  return `
    <article class="class-card">
      <div>
        <h3>${escapeHtml(item.title)}</h3>
        <div class="card-meta">
          <span>${formatDate(item.date)}</span>
          <span>${escapeHtml(course.name)}</span>
          <span>${labels[item.status]}</span>
        </div>
      </div>
      <button class="text-button" data-class-open="${item.id}">Abrir</button>
    </article>
  `;
}

function renderCourses() {
  $("#courseGrid").innerHTML = state.courses
    .filter((course) => course.active)
    .map((course) => {
      const classes = state.classes.filter((item) => item.courseId === course.id);
      const resources = state.resources.filter((resource) => resource.courseId === course.id);
      const nextClass = classes
        .filter((item) => item.status !== "done")
        .sort((a, b) => a.date.localeCompare(b.date))[0];
      return `
        <article class="course-card" style="--course-color: ${course.color}">
          <div class="course-cover">
            <span>${escapeHtml(course.subject)} · ${course.year}</span>
            <strong>${escapeHtml(course.name)}</strong>
          </div>
          <p class="muted">${escapeHtml(course.level)} · ${classes.length} clases · ${resources.length} recursos</p>
          <div class="card-meta">
            <span>${nextClass ? `Proxima: ${formatDate(nextClass.date)}` : "Sin clases pendientes"}</span>
            <span>${course.canvasId ? "Canvas conectado" : "Canvas pendiente"}</span>
          </div>
          <div class="course-actions">
            <button class="ghost-button" data-course-select="${course.id}">Ver curso</button>
            <button class="ghost-button" data-course-duplicate="${course.id}">Duplicar</button>
            <button class="ghost-button" data-course-canvas="${course.id}">${course.canvasId ? "Canvas listo" : "Conectar Canvas"}</button>
            <button class="text-button" data-course-archive="${course.id}">Archivar</button>
          </div>
        </article>
      `;
    })
    .join("");
  renderCourseDetail();
}

function renderCourseDetail() {
  const course = courseById(state.activeCourseId) ?? state.courses[0];
  const units = state.units.filter((unit) => unit.courseId === course.id);
  const classes = state.classes.filter((item) => item.courseId === course.id);
  const resources = state.resources.filter((resource) => resource.courseId === course.id);
  $("#courseDetail").innerHTML = `
    <div class="panel-heading">
      <div>
        <span class="eyebrow">Detalle de curso</span>
        <h2>${escapeHtml(course.name)}</h2>
      </div>
      <button class="ghost-button" data-view-target="planner">Planificar</button>
    </div>
    <div class="dashboard-grid">
      <div>
        <h3>Unidades</h3>
        <div class="stack-list compact">
          ${units
            .map(
              (unit) => `
                <article class="class-card">
                  <div>
                    <strong>${escapeHtml(unit.title)}</strong>
                    <div class="card-meta">
                      <span>${classes.filter((item) => item.unitId === unit.id).length} clases</span>
                      <span>${resources.filter((item) => item.unitId === unit.id).length} recursos</span>
                    </div>
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>
      </div>
      <div>
        <h3>Ultimas clases</h3>
        <div class="stack-list compact">
          ${classes.slice(0, 4).map(renderCompactClass).join("")}
        </div>
      </div>
    </div>
  `;
}

function populateSelects() {
  const activeCourses = state.courses.filter((course) => course.active);
  const courseOptions = [
    '<option value="all">Todos</option>',
    ...activeCourses.map((course) => `<option value="${course.id}">${escapeHtml(course.name)}</option>`),
  ].join("");
  $("#plannerCourseFilter").innerHTML = courseOptions;
  $("#resourceCourseFilter").innerHTML = courseOptions;

  const classCourseOptions = activeCourses
    .map((course) => `<option value="${course.id}">${escapeHtml(course.name)}</option>`)
    .join("");
  $("#classCourseInput").innerHTML = classCourseOptions;
  $("#assistantCourse").innerHTML = classCourseOptions;

  const unitOptions = [
    '<option value="all">Todas</option>',
    ...state.units.map((unit) => `<option value="${unit.id}">${escapeHtml(unit.title)}</option>`),
  ].join("");
  $("#plannerUnitFilter").innerHTML = unitOptions;

  const resourceTypes = [...new Set(state.resources.map((resource) => resource.type))];
  $("#resourceTypeFilter").innerHTML = [
    '<option value="all">Todos</option>',
    ...resourceTypes.map((type) => `<option value="${type}">${labels[type]}</option>`),
  ].join("");

  const resourceSources = [...new Set(state.resources.map((resource) => resource.source))];
  $("#resourceSourceFilter").innerHTML = [
    '<option value="all">Todas</option>',
    ...resourceSources.map((source) => `<option value="${source}">${labels[source]}</option>`),
  ].join("");
}

function renderPlanner() {
  const courseFilter = $("#plannerCourseFilter").value ?? "all";
  const statusFilter = $("#plannerStatusFilter").value ?? "all";
  const unitFilter = $("#plannerUnitFilter").value ?? "all";

  let items = [...state.classes];
  if (courseFilter !== "all") items = items.filter((item) => item.courseId === courseFilter);
  if (statusFilter !== "all") items = items.filter((item) => item.status === statusFilter);
  if (unitFilter !== "all") items = items.filter((item) => item.unitId === unitFilter);

  if (state.plannerView === "year") {
    items = items.sort((a, b) => a.date.localeCompare(b.date));
  }

  $("#plannerList").innerHTML = items.length
    ? items.map(renderPlanningCard).join("")
    : `<section class="panel"><h2>Sin clases con esos filtros</h2><p class="muted">Cambia el filtro o crea una nueva clase.</p></section>`;
}

function renderPlanningCard(item) {
  const course = courseById(item.courseId);
  const unit = unitById(item.unitId);
  const date = formatMonthDay(item.date);
  return `
    <article class="planning-card">
      <div class="date-box" style="background:${course.color}">
        <span>${escapeHtml(date.month)}</span>
        <strong>${escapeHtml(date.day)}</strong>
      </div>
      <div>
        <span class="eyebrow">${escapeHtml(course.name)} · ${escapeHtml(unit?.title ?? "Sin unidad")}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.objective)}</p>
        <div class="card-meta">
          <span class="status-pill">${labels[item.status]}</span>
          <span>${resourcesForClass(item.id).length} recursos</span>
          <span>${item.reusedFrom ? "Reutilizada de años anteriores" : "Clase nueva"}</span>
        </div>
      </div>
      <div class="planning-actions">
        <button class="ghost-button" data-class-open="${item.id}">Detalle</button>
        <button class="ghost-button" data-class-clone="${item.id}">Clonar</button>
        <button class="text-button" data-class-done="${item.id}">Realizada</button>
      </div>
    </article>
  `;
}

function renderClassDetail() {
  const item = classById(state.activeClassId);
  if (!item) return;
  const course = courseById(item.courseId);
  const unit = unitById(item.unitId);
  const resources = resourcesForClass(item.id);
  $("#classDetailContent").innerHTML = `
    <div class="class-detail-layout">
      <section class="panel">
        <span class="eyebrow">${escapeHtml(course.name)} · ${formatDate(item.date)} · ${escapeHtml(unit?.title ?? "Sin unidad")}</span>
        <h1 id="class-title">${escapeHtml(item.title)}</h1>
        <div class="detail-section">
          <h2>Objetivo</h2>
          <p>${escapeHtml(item.objective)}</p>
        </div>
        <div class="detail-section">
          <h2>Habilidades</h2>
          <p>${escapeHtml(item.skills || "Sin habilidades registradas")}</p>
        </div>
        <div class="detail-section">
          <h2>Observaciones</h2>
          <p>${escapeHtml(item.notes || "Sin observaciones")}</p>
        </div>
        <div class="detail-section">
          <h2>Historial y reutilizacion</h2>
          <p>${item.reusedFrom ? `Version reutilizada desde ${escapeHtml(item.reusedFrom)}. Puedes clonar y ajustar fecha, objetivo o nivel sin perder la version anterior.` : "Esta clase aun no registra origen reutilizado."}</p>
        </div>
        <div class="course-actions">
          <button class="primary-button" data-class-clone="${item.id}">Clonar clase completa</button>
          <button class="ghost-button" data-ai-for-class="${item.id}">Generar actividad</button>
          <button class="ghost-button" data-class-done="${item.id}">Marcar realizada</button>
        </div>
      </section>
      <aside class="panel">
        <div class="panel-heading">
          <h2>Recursos adjuntos</h2>
          <button class="text-button" data-view-target="library">Buscar</button>
        </div>
        <div class="stack-list compact">
          ${resources.map(renderResourceMini).join("") || `<p class="muted">Sin recursos adjuntos.</p>`}
        </div>
      </aside>
    </div>
  `;
}

function renderResourceMini(resource) {
  return `
    <article class="resource-card">
      <div>
        <h3>${escapeHtml(resource.title)}</h3>
        <div class="card-meta">
          <span>${labels[resource.type]}</span>
          <span>${labels[resource.source]}</span>
          <span>${resource.usedCount} usos</span>
        </div>
      </div>
      <button class="text-button" data-resource-open="${resource.id}">Abrir</button>
    </article>
  `;
}

function renderLibrary() {
  const query = normalize($("#globalSearch").value);
  const courseFilter = $("#resourceCourseFilter").value ?? "all";
  const typeFilter = $("#resourceTypeFilter").value ?? "all";
  const sourceFilter = $("#resourceSourceFilter").value ?? "all";
  const usageFilter = $("#resourceUsageFilter").value ?? "all";

  let items = [...state.resources];
  if (query) {
    items = items.filter((resource) => {
      const text = normalize(
        [resource.title, resource.description, resource.level, resource.tags.join(" "), labels[resource.type]].join(" "),
      );
      return query.split(/\s+/).every((part) => text.includes(part));
    });
  }
  if (courseFilter !== "all") items = items.filter((item) => item.courseId === courseFilter);
  if (typeFilter !== "all") items = items.filter((item) => item.type === typeFilter);
  if (sourceFilter !== "all") items = items.filter((item) => item.source === sourceFilter);
  if (usageFilter === "used") items = items.filter((item) => item.usedCount > 0);
  if (usageFilter === "unused") items = items.filter((item) => item.usedCount === 0);
  if (usageFilter === "recommended") items = items.filter((item) => item.recommended);

  $("#resourceSummary").textContent = `${items.length} recursos encontrados`;
  $("#resourceList").innerHTML = items.length
    ? items.map(renderResourceCard).join("")
    : `<section class="panel"><h2>Sin recursos</h2><p class="muted">Prueba otra busqueda o agrega un recurso manual.</p></section>`;
}

function renderResourceCard(resource) {
  const course = courseById(resource.courseId);
  const classItem = classById(resource.classId);
  const openLabel =
    resource.source === "canvas"
      ? "Abrir en Canvas"
      : resource.source === "onedrive"
        ? "Abrir en OneDrive"
        : resource.source === "local"
          ? "Abrir archivo"
          : "Ver recurso";
  return `
    <article class="resource-card">
      <div>
        <div class="panel-heading">
          <h3>${escapeHtml(resource.title)}</h3>
          <span class="source-pill ${resource.source}">${labels[resource.source]}</span>
        </div>
        <p>${escapeHtml(resource.description)}</p>
        <div class="card-meta">
          <span>${labels[resource.type]}</span>
          <span>${escapeHtml(resource.level)}</span>
          <span>${course ? escapeHtml(course.name) : "Sin curso"}</span>
          <span>${classItem ? `Usado en: ${escapeHtml(classItem.title)}` : "No usado"}</span>
          <span>${resource.recommended ? "Recomendado para reutilizar" : "Uso normal"}</span>
        </div>
        <div class="tag-cloud">
          ${resource.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
      </div>
      <div class="resource-actions">
        <button class="ghost-button" data-resource-open="${resource.id}">${openLabel}</button>
        <button class="ghost-button" data-resource-similar="${resource.id}">Parecidos</button>
      </div>
    </article>
  `;
}

function renderAssistantOutput(type, topic, course, duration, difficulty) {
  const cleanTopic = topic || "comprension lectora";
  const templates = {
    objective: `Objetivo sugerido\nLos estudiantes seran capaces de trabajar ${cleanTopic} en ${course.level}, aplicando una estrategia explicita y justificando sus respuestas con evidencia del texto.\n\nCriterio de logro\nIdentifica pistas relevantes, formula una respuesta y explica por que esa respuesta se sostiene en el texto.`,
    activity: `Secuencia ${duration}\nInicio: activar conocimientos previos con una pregunta breve sobre ${cleanTopic}.\nDesarrollo: modelar una estrategia, practicar en parejas y revisar respuestas con evidencia.\nCierre: ticket de salida con una pregunta de transferencia y una autoevaluacion breve.`,
    simce: `Banco tipo SIMCE\nTexto breve asociado a ${cleanTopic}.\n1. Pregunta literal con 4 alternativas.\n2. Pregunta de inferencia local con distractores plausibles.\n3. Pregunta de vocabulario contextual.\n4. Pregunta de proposito del texto.\n\nDificultad: ${difficulty}. Incluye pauta y habilidad evaluada.`,
    ticket: `Ticket de salida\n1. Escribe una idea importante aprendida sobre ${cleanTopic}.\n2. Responde una pregunta de aplicacion.\n3. Marca tu nivel de seguridad: bajo, medio o alto.\n\nUso sugerido: cierre de clase y registro rapido en observaciones.`,
    rubric: `Rubrica breve\nLogrado: responde con evidencia textual clara y explica su razonamiento.\nEn proceso: responde correctamente, pero usa evidencia incompleta.\nPor reforzar: responde sin justificar o confunde informacion explicita con inferencia.`,
  };
  return templates[type];
}

function renderSettings() {
  const tags = [...new Set(state.resources.flatMap((resource) => resource.tags))];
  $("#tagCloud").innerHTML = tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
  refreshOneDriveStatus();
}

function cloneClass(id) {
  const original = classById(id);
  if (!original) return;
  const nextDate = new Date(`${original.date}T12:00:00`);
  nextDate.setDate(nextDate.getDate() + 7);
  const clone = {
    ...original,
    id: `cl${Date.now()}`,
    title: `${original.title} (clonada)`,
    date: nextDate.toISOString().slice(0, 10),
    status: "planned",
    reusedFrom: original.id,
  };
  state.classes.push(clone);
  showToast("Clase clonada con nueva fecha. Puedes ajustar objetivo o nivel.");
  rerender();
}

function markDone(id) {
  const item = classById(id);
  if (!item) return;
  item.status = "done";
  showToast("Clase marcada como realizada.");
  rerender();
}

function openResource(id) {
  const resource = state.resources.find((item) => item.id === id);
  if (!resource) return;
  if (resource.url && resource.url !== "#") {
    window.open(resource.url, "_blank", "noopener,noreferrer");
    return;
  }
  showToast(`${labels[resource.source]}: ${resource.title}`);
}

function showSimilarResources(id) {
  const resource = state.resources.find((item) => item.id === id);
  if (!resource) return;
  const similar = state.resources.filter(
    (item) =>
      item.id !== id &&
      (item.type === resource.type || item.tags.some((tag) => resource.tags.includes(tag))),
  );
  showToast(
    similar.length
      ? `Encontrados ${similar.length} recursos parecidos por tipo o etiqueta.`
      : "No hay parecidos claros todavia.",
  );
}

async function loadMsal() {
  if (window.msal) return;
  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://alcdn.msauth.net/browser/2.38.4/js/msal-browser.min.js";
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error("No se pudo cargar MSAL desde Microsoft."));
    document.head.appendChild(script);
  });
}

function getMsalClient() {
  const config = state.integrations.oneDrive;
  return new window.msal.PublicClientApplication({
    auth: {
      clientId: config.clientId,
      authority: `https://login.microsoftonline.com/${config.tenantId || "common"}`,
      redirectUri: config.redirectUri || getDefaultRedirectUri(),
    },
    cache: {
      cacheLocation: "localStorage",
    },
  });
}

async function connectOneDrive() {
  const config = state.integrations.oneDrive;
  if (!config.clientId) {
    config.demoMode = true;
    config.connected = false;
    refreshOneDriveStatus();
    showToast("OneDrive esta en modo demo. Guarda un Azure Client ID para conectar Microsoft Graph.");
    return;
  }

  try {
    await loadMsal();
    const client = getMsalClient();
    const login = await client.loginPopup({
      scopes: ["User.Read", "Files.Read.All"],
      prompt: "select_account",
    });
    config.accessToken = login.accessToken;
    config.accountName = login.account?.username || login.account?.name || "";
    config.connected = true;
    config.demoMode = false;
    refreshOneDriveStatus();
    showToast("OneDrive conectado correctamente.");
  } catch (error) {
    console.error(error);
    showToast("No se pudo conectar OneDrive. Revisa Client ID y Redirect URI.");
  }
}

function getDemoOneDriveResults(query) {
  const clean = normalize(query);
  const demoItems = [
    {
      id: "demo-drive-1",
      name: "Guia de inferencias 5 basico abril.docx",
      webUrl: "#",
      size: 84521,
      lastModifiedDateTime: "2025-04-17T12:00:00Z",
      file: { mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
    },
    {
      id: "demo-drive-2",
      name: "SIMCE comprension lectora 4 basico alternativas.pdf",
      webUrl: "#",
      size: 120144,
      lastModifiedDateTime: "2026-03-21T10:00:00Z",
      file: { mimeType: "application/pdf" },
    },
    {
      id: "demo-drive-3",
      name: "Clase 3 mitos y leyendas presentacion.pptx",
      webUrl: "#",
      size: 3220144,
      lastModifiedDateTime: "2025-05-11T14:30:00Z",
      file: { mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation" },
    },
  ];
  return demoItems.filter((item) => !clean || normalize(item.name).includes(clean) || clean.includes("guia"));
}

async function searchOneDrive() {
  const config = state.integrations.oneDrive;
  const query = $("#oneDriveSearchInput").value.trim();
  if (!query) {
    showToast("Escribe que quieres buscar en OneDrive.");
    return;
  }

  $("#oneDriveResults").innerHTML = `<div class="muted">Buscando en OneDrive...</div>`;

  if (!config.accessToken) {
    config.lastResults = getDemoOneDriveResults(query);
    renderOneDriveResults();
    showToast("Resultados demo cargados. Conecta Graph para usar archivos reales.");
    return;
  }

  try {
    const params = new URLSearchParams({
      $select: "id,name,webUrl,size,lastModifiedDateTime,file,folder,parentReference",
    });
    const response = await fetch(`https://graph.microsoft.com/v1.0/me/drive/root/search(q='${encodeURIComponent(query)}')?${params}`, {
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
      },
    });
    if (!response.ok) throw new Error(`Graph respondio ${response.status}`);
    const data = await response.json();
    config.lastResults = (data.value || []).filter((item) => item.file);
    renderOneDriveResults();
  } catch (error) {
    console.error(error);
    $("#oneDriveResults").innerHTML = "";
    showToast("No se pudo buscar en Graph. Revisa permisos Files.Read.All.");
  }
}

function renderOneDriveResults() {
  const results = state.integrations.oneDrive.lastResults;
  $("#oneDriveResults").innerHTML = results.length
    ? results
        .map(
          (item) => `
            <article class="onedrive-result">
              <div>
                <strong>${escapeHtml(item.name)}</strong>
                <div class="card-meta">
                  <span>OneDrive</span>
                  <span>${escapeHtml(item.file?.mimeType || "archivo")}</span>
                  <span>${item.lastModifiedDateTime ? formatDate(item.lastModifiedDateTime.slice(0, 10)) : "sin fecha"}</span>
                </div>
              </div>
              <button class="ghost-button" data-onedrive-import="${escapeHtml(item.id)}">Importar</button>
            </article>
          `,
        )
        .join("")
    : `<div class="muted">No encontramos archivos para esa busqueda.</div>`;
}

function importOneDriveItem(id) {
  const item = state.integrations.oneDrive.lastResults.find((result) => result.id === id);
  if (!item) return;
  const activeCourse = courseById(state.activeCourseId) ?? state.courses.find((course) => course.active);
  const resource = {
    id: `r${Date.now()}`,
    title: item.name.replace(/\.[^.]+$/, ""),
    description: "Recurso importado desde OneDrive mediante Microsoft Graph.",
    type: resourceTypeFromFileName(item.name, item.file?.mimeType),
    source: "onedrive",
    courseId: activeCourse?.id ?? null,
    unitId: null,
    classId: null,
    level: activeCourse?.level ?? "Sin nivel",
    tags: tagsFromFileName(item.name),
    date: item.lastModifiedDateTime ? item.lastModifiedDateTime.slice(0, 10) : new Date().toISOString().slice(0, 10),
    usedCount: 0,
    reusable: true,
    recommended: true,
    url: item.webUrl || "#",
    externalId: item.id,
    providerMetadata: item,
  };
  state.resources.unshift(resource);
  showToast("Archivo importado como recurso reutilizable.");
  rerender();
  setView("library");
}

function createClass(event) {
  event.preventDefault();
  const courseId = $("#classCourseInput").value;
  const firstUnit = state.units.find((unit) => unit.courseId === courseId);
  state.classes.push({
    id: `cl${Date.now()}`,
    courseId,
    unitId: firstUnit?.id ?? null,
    title: $("#classTitleInput").value,
    date: $("#classDateInput").value,
    start: "",
    end: "",
    objective: $("#classObjectiveInput").value || "Objetivo pendiente de completar.",
    skills: "",
    notes: "",
    status: "planned",
    reusedFrom: null,
  });
  $("#classModal").close();
  event.target.reset();
  showToast("Clase creada en el planificador.");
  rerender();
}

function createResource(event) {
  event.preventDefault();
  state.resources.push({
    id: `r${Date.now()}`,
    title: $("#resourceTitleInput").value,
    description: $("#resourceDescriptionInput").value || "Recurso agregado manualmente.",
    type: $("#resourceTypeInput").value,
    source: $("#resourceSourceInput").value,
    courseId: state.activeCourseId,
    unitId: null,
    classId: null,
    level: courseById(state.activeCourseId)?.level ?? "Sin nivel",
    tags: ["custom"],
    date: new Date().toISOString().slice(0, 10),
    usedCount: 0,
    reusable: true,
    recommended: false,
    url: "#",
  });
  $("#resourceModal").close();
  event.target.reset();
  showToast("Recurso agregado a la biblioteca.");
  rerender();
}

function createCourse(event) {
  event.preventDefault();
  const palette = ["#2878e0", "#14a884", "#f0a926", "#ee5d78", "#7b61ff", "#38bdf8"];
  const course = {
    id: `c${Date.now()}`,
    name: $("#courseNameInput").value,
    level: $("#courseLevelInput").value,
    subject: $("#courseSubjectInput").value,
    year: Number($("#courseYearInput").value),
    color: palette[state.courses.length % palette.length],
    canvasId: null,
    active: true,
  };
  state.courses.push(course);
  state.units.push({
    id: `u${Date.now()}`,
    courseId: course.id,
    title: "Unidad 1: Por definir",
    order: 1,
  });
  state.activeCourseId = course.id;
  $("#courseModal").close();
  event.target.reset();
  $("#courseYearInput").value = "2026";
  $("#courseSubjectInput").value = "Lenguaje";
  showToast("Curso creado con su primera unidad base.");
  rerender();
}

function duplicateCourse(id) {
  const original = courseById(id);
  if (!original) return;
  const newId = `c${Date.now()}`;
  const duplicate = {
    ...original,
    id: newId,
    name: `${original.name} copia`,
    canvasId: null,
    active: true,
  };
  state.courses.push(duplicate);
  state.units
    .filter((unit) => unit.courseId === id)
    .forEach((unit, index) => {
      state.units.push({
        ...unit,
        id: `u${Date.now()}-${index}`,
        courseId: newId,
      });
    });
  state.activeCourseId = newId;
  showToast("Curso duplicado sin enlazar Canvas.");
  rerender();
}

function archiveCourse(id) {
  const course = courseById(id);
  if (!course) return;
  course.active = false;
  if (state.activeCourseId === id) {
    state.activeCourseId = state.courses.find((item) => item.active)?.id ?? state.courses[0]?.id;
  }
  showToast("Curso archivado. Sus recursos siguen en la biblioteca.");
  rerender();
}

function connectCanvas(id) {
  const course = courseById(id);
  if (!course) return;
  course.canvasId = course.canvasId || `canvas-${Date.now()}`;
  showToast("Canvas conectado en modo demo.");
  rerender();
}

function quickAi(kind) {
  const course = courseById("c1");
  const text = {
    objetivo:
      "Objetivo: inferir informacion implicita en un texto breve, justificando con pistas textuales.",
    actividad:
      "Inicio: pregunta detonante. Desarrollo: lectura guiada y trabajo en parejas. Cierre: ticket de salida.",
    simce:
      "Set SIMCE: 4 preguntas de alternativa multiple sobre idea principal, inferencia, vocabulario y proposito.",
  }[kind];
  $("#quickAiOutput").textContent = `${course.name}\n${text}`;
}

function addEventListeners() {
  $$(".nav-item").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  document.body.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (!target) return;

    if (target.dataset.viewTarget) setView(target.dataset.viewTarget);
    if (target.dataset.classOpen) {
      state.activeClassId = target.dataset.classOpen;
      renderClassDetail();
      setView("class-detail");
    }
    if (target.dataset.courseSelect) {
      state.activeCourseId = target.dataset.courseSelect;
      renderCourseDetail();
      showToast("Curso seleccionado.");
    }
    if (target.dataset.courseDuplicate) duplicateCourse(target.dataset.courseDuplicate);
    if (target.dataset.courseArchive) archiveCourse(target.dataset.courseArchive);
    if (target.dataset.courseCanvas) connectCanvas(target.dataset.courseCanvas);
    if (target.dataset.classClone) cloneClass(target.dataset.classClone);
    if (target.dataset.classDone) markDone(target.dataset.classDone);
    if (target.dataset.resourceOpen) openResource(target.dataset.resourceOpen);
    if (target.dataset.resourceSimilar) showSimilarResources(target.dataset.resourceSimilar);
    if (target.dataset.onedriveImport) importOneDriveItem(target.dataset.onedriveImport);
    if (target.dataset.aiForClass) {
      setView("assistant");
      $("#assistantTopic").value = classById(target.dataset.aiForClass)?.title ?? "";
    }
    if (target.dataset.prompt) quickAi(target.dataset.prompt);
  });

  $("#menuToggle").addEventListener("click", () => $(".sidebar").classList.toggle("is-open"));
  $("#newClassBtn").addEventListener("click", () => $("#classModal").showModal());
  $("#newResourceBtn").addEventListener("click", () => $("#resourceModal").showModal());
  $("#addCourseBtn").addEventListener("click", () => $("#courseModal").showModal());
  $("#addResourceBtn").addEventListener("click", () => $("#resourceModal").showModal());
  $("#saveOneDriveConfigBtn").addEventListener("click", saveOneDriveConfig);
  $("#oneDriveConnectBtn").addEventListener("click", connectOneDrive);
  $("#oneDriveSearchBtn").addEventListener("click", searchOneDrive);
  $("#oneDriveSearchInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") searchOneDrive();
  });

  $("#classForm").addEventListener("submit", createClass);
  $("#courseForm").addEventListener("submit", createCourse);
  $("#resourceForm").addEventListener("submit", createResource);

  ["plannerCourseFilter", "plannerStatusFilter", "plannerUnitFilter"].forEach((id) => {
    $(`#${id}`).addEventListener("change", renderPlanner);
  });

  ["resourceCourseFilter", "resourceTypeFilter", "resourceSourceFilter", "resourceUsageFilter"].forEach((id) => {
    $(`#${id}`).addEventListener("change", renderLibrary);
  });

  $("#globalSearch").addEventListener("input", () => {
    renderLibrary();
    if (state.activeView !== "library" && $("#globalSearch").value.length > 2) {
      setView("library");
    }
  });

  $$(".segmented button").forEach((button) => {
    button.addEventListener("click", () => {
      state.plannerView = button.dataset.plannerView;
      $$(".segmented button").forEach((item) => item.classList.toggle("is-active", item === button));
      renderPlanner();
    });
  });

  $("#assistantForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const course = courseById($("#assistantCourse").value);
    const result = renderAssistantOutput(
      $("#assistantType").value,
      $("#assistantTopic").value.trim(),
      course,
      $("#assistantDuration").value,
      $("#assistantDifficulty").value,
    );
    $("#assistantOutput").textContent = result;
  });

  $("#saveGeneratedBtn").addEventListener("click", () => {
    state.generatedItems.push({
      id: `g${Date.now()}`,
      content: $("#assistantOutput").textContent,
      createdAt: new Date().toISOString(),
    });
    showToast("Resultado guardado en el banco inteligente.");
  });
}

function rerender() {
  populateSelects();
  renderDashboard();
  renderCourses();
  renderPlanner();
  renderClassDetail();
  renderLibrary();
  renderSettings();
}

function init() {
  loadOneDriveConfig();
  populateSelects();
  addEventListeners();
  rerender();
}

init();
