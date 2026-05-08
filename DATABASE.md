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

## Canvas

Para probar Canvas API, agrega estas variables en `.env` y en Vercel:

```env
CANVAS_BASE_URL="https://TU-INSTITUCION.instructure.com"
CANVAS_ACCESS_TOKEN="token-personal-o-token-oauth"
CANVAS_ACCOUNT_ID="1"
```

Rutas disponibles:

```txt
/api/canvas/status
/api/canvas/courses
/api/canvas/courses/:courseId/modules
/api/canvas/courses/:courseId/assignments
/api/canvas/courses/:courseId/files
/api/canvas/lti/config
```

La ruta LTI entrega una configuracion inicial para registrar la app como herramienta externa en Canvas.

## Canva

Canva no es Canvas LMS. Para integrar `canva.com/projects`, usa Canva Connect API.

Variables:

```env
CANVA_CLIENT_ID=""
CANVA_CLIENT_SECRET=""
CANVA_REDIRECT_URI="https://TU-APP.vercel.app/api/canva/auth/callback"
```

En Canva Developers debes crear una integracion, configurar el redirect URI y solicitar scopes como:

```txt
design:meta:read
design:permission:read
folder:read
asset:read
```

Rutas disponibles:

```txt
/api/canva/auth/start
/api/canva/auth/callback
/api/canva/status
/api/canva/designs
/api/canva/folders/:folderId/items
```

Luego desde Configuracion puedes conectar Canva y cargar proyectos recientes.
