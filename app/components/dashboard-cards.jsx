"use client";

import { ArrowRight, Check, Circle } from "lucide-react";
import { labels } from "../../lib/demo-data";
import { formatDate, formatDateTime, formatMonthDay } from "../../lib/display";

export function WorkflowGuide({ steps, completed, progress, nextStep, onStepSelect }) {
  return (
    <section className="workflow-guide" aria-label="Flujo de trabajo">
      <div className="workflow-hero">
        <div>
          <span className="eyebrow">Flujo guiado</span>
          <h2>De curso a clase cerrada</h2>
          <p>
            {completed} de {steps.length} pasos listos. Siguiente: <strong>{nextStep.title}</strong>.
          </p>
        </div>
        <button className="primary-button" type="button" onClick={() => onStepSelect(nextStep.id)}>
          {nextStep.action}
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>

      <div className="workflow-progress" aria-label={`${progress}% completado`}>
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="workflow-steps">
        {steps.map(({ id, title, detail, action, done, tone, Icon }) => (
          <article className={`workflow-step tone-${tone} ${done ? "is-done" : ""}`} key={id}>
            <div className="workflow-step-icon" aria-hidden="true">
              <Icon size={18} />
            </div>
            <div>
              <div className="workflow-step-title">
                {done ? <Check size={16} aria-hidden="true" /> : <Circle size={15} aria-hidden="true" />}
                <strong>{title}</strong>
              </div>
              <span>{detail}</span>
            </div>
            <button className="text-button" type="button" onClick={() => onStepSelect(id)}>
              {action}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ClassCard({ classItem, course, unit, resourceCount, onOpen }) {
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

export function CompactClass({ classItem, course, onOpen }) {
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

export function PlanningCard({ classItem, course, unit, resourceCount, onOpen, onClone, onDone, onDelete }) {
  const date = formatMonthDay(classItem.date);
  const isDone = classItem.status === "done";
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
        {isDone ? (
          <button className="ghost-button danger-button" onClick={() => onDelete?.(classItem.id)}>
            Eliminar
          </button>
        ) : (
          <button className="text-button" onClick={() => onDone(classItem.id)}>
            Realizada
          </button>
        )}
      </div>
    </article>
  );
}

export function ResourceMini({ resource }) {
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

export function ResourceCard({ resource, course, classItem, onImportCanva, onMissingLink, onFindSimilar }) {
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
          <button className="ghost-button" onClick={() => onMissingLink?.(resource)}>
            {resource.source === "canva" ? "Abrir en Canva" : resource.source === "canvas" ? "Abrir en Canvas" : "Abrir"}
          </button>
        )}
        {isCanvaLiveResult && (
          <button className="primary-button" onClick={() => onImportCanva?.(resource.canvaDesign)}>
            Guardar
          </button>
        )}
        <button className="ghost-button" onClick={() => onFindSimilar?.(resource)}>
          Parecidos
        </button>
      </div>
    </article>
  );
}

export function CanvasDataList({ title, items, getLabel, getMeta }) {
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
