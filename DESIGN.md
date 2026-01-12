# Documento de Diseño

## Supuestos

Asumí que este es un sistema CRUD simple para gestionar personas (probablemente postulantes o registros) sin necesidad de autenticación multi-usuario. Pensé en una escala baja-media sin requisitos de alta concurrencia, por lo que una API Key estática me pareció suficiente para proteger los endpoints en este contexto. Decidí usar PostgreSQL gestionado (NeonDB/Supabase) para evitar complejidad de deployment.

## Modelo de Datos

**Tabla: personas**

| Campo | Tipo | Restricciones |
|-------|------|--------------|
| id | SERIAL | PK |
| nombre | VARCHAR(50) | NOT NULL |
| apellido | VARCHAR(50) | NOT NULL |
| email | VARCHAR(254) | UNIQUE, NOT NULL |
| telefono | VARCHAR(20) | NOT NULL |
| direccion | VARCHAR(200) | NOT NULL |
| estado | VARCHAR(20) | NOT NULL, DEFAULT 'PENDIENTE' |
| tiene_deuda | BOOLEAN | NOT NULL, DEFAULT false |

Estados posibles: `PENDIENTE`, `EN_PROCESO`, `OBSERVADO`, `APROBADO`, `RECHAZADO`

## Contratos API

**Autenticación**: Header `X-API-Key` en todos los endpoints.

| Método | Endpoint | Body | Response | Errores |
|--------|----------|------|----------|---------|
| GET | `/personas` | - | Array de personas | 401 |
| GET | `/personas/{id}` | - | Objeto persona | 401, 404 |
| POST | `/personas` | Persona (sin id) | Persona creada | 401, 422 |
| PUT | `/personas/{id}` | Campos parciales | Persona actualizada | 401, 404, 422 |
| DELETE | `/personas/{id}` | - | `{success: true, message: "..."}` | 401, 404 |

## Decisiones Técnicas

**Backend: FastAPI**

Elegí FastAPI porque ofrece documentación automática (Swagger) sin configuración extra, validación de datos con Pydantic integrada y performance asíncrona nativa. Aunque no es mi área más fuerte, me parece más directo que Django REST Framework para APIs puras, con menos boilerplate.

**Frontend: Next.js 16 + React 19**

Opté por Next.js con el App Router moderno porque me permite usar Server Actions, que son perfectos para desencadenar acciones de UI sin crear API routes adicionales. Esto simplifica bastante el código.

**TanStack Query**

Esta fue una decisión clave. Elegí TanStack Query porque me permite cachear las peticiones de forma inteligente, reduciendo llamadas innecesarias al backend. Lo más importante es la invalidación automática de queries: cuando creo, edito o elimino una persona, puedo invalidar la query y la lista se actualiza sola. Además, me da acceso a estados como `isLoading` y `error`, que uso para mostrar skeletons de carga o mensajes de error, mejorando la experiencia de usuario sin tener que manejar estados manualmente.

**Zod (frontend) + Pydantic (backend)**

Implementé validación en ambos lados. En el frontend uso Zod para prevenir errores antes del submit, y además me da inferencia automática de tipos en TypeScript. En el backend, Pydantic garantiza la integridad de los datos. Esta doble validación me da tranquilidad.

**TanStack Table**

Para la tabla de personas elegí TanStack Table porque me da paginación, sorting y filtering del lado del cliente sin sobrecargar el backend con queries complejas. Es headless, así que tengo control total del markup y se integra perfectamente con Tailwind.

**API Key estática**

Para la autenticación elegí una API Key simple porque es apropiada para esta prueba técnica. Entiendo que en producción usaría JWT con roles y permisos, pero aquí prioricé simplicidad.

## Trade-offs

**Lo que dejé afuera conscientemente**:

Decidí no implementar autenticación multi-usuario con JWT y roles porque para el alcance de esta prueba me pareció excesivo. Tampoco agregué paginación server-side (actualmente cargo toda la data en el cliente), rate limiting, logging robusto ni testing automatizado. También omití soft deletes y auditoría con timestamps. Pienso que estas decisiones son apropiadas para demostrar mis capacidades sin sobre-ingeniería.

**Lo que agregaría en producción**:

Si esto fuera un proyecto real, implementaría JWT con refresh tokens y RBAC para autenticación robusta. Agregaría paginación server-side con cursors para manejar datasets grandes. Usaría rate limiting (slowapi), migrations con Alembic, logging estructurado (structlog) y monitoreo con Sentry. También implementaría optimistic updates en TanStack Query para que la UI se actualice instantáneamente, health checks, métricas y tests E2E con Playwright. Docker Compose y CI/CD con GitHub Actions serían parte del workflow.

**Por qué este enfoque**:

Prioricé velocidad de desarrollo y claridad de código para demostrar cómo pienso y organizo un proyecto. La arquitectura que elegí es extensible, por lo que agregar estas features de producción no requeriría refactorización mayor, solo evolución del código existente.

