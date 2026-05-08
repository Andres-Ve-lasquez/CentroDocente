# Base de Datos

La app usa PostgreSQL con Prisma.

## Variables

Copia `.env.example` a `.env` y reemplaza `DATABASE_URL` por la URL real de tu proveedor:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"
```

`.env` no se sube a Git porque esta en `.gitignore`.

En Vercel, agrega la misma variable en:

`Project Settings -> Environment Variables`

## Comandos

Validar el esquema:

```bash
npm run prisma:validate
```

Generar el cliente Prisma:

```bash
npm run prisma:generate
```

Crear/actualizar tablas en PostgreSQL:

```bash
npm run db:push
```

Abrir Prisma Studio:

```bash
npm run db:studio
```

## Health Check

Cuando `DATABASE_URL` este configurada, prueba:

```txt
http://localhost:3000/api/health/db
```

Si responde `{ "ok": true }`, la app ya esta conectada a PostgreSQL.
