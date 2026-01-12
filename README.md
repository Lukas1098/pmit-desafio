# Gestión de Personas

Sistema completo de gestión de personas con backend FastAPI y frontend Next.js.

## Tecnologías

### Backend
- FastAPI 0.128.0
- SQLAlchemy 2.0.45
- PostgreSQL (compatible con NeonDB, Supabase, local, etc.)
- Pydantic 2.12.5
- Python 3.12

### Frontend
- Next.js 16.1.1
- React 19.2.3
- TypeScript 5
- TanStack Query 5.90.16
- TanStack Table 8.21.3
- Tailwind CSS 4
- Zod 4.3.5

## Requisitos Previos

- Python 3.12 o superior
- Node.js 20 o superior
- pnpm (gestor de paquetes)
- PostgreSQL (NeonDB, Supabase, local o cualquier servicio compatible)

## Configuración de Base de Datos

### Crear tabla en PostgreSQL

Ejecutar el siguiente SQL en tu servicio de PostgreSQL (NeonDB, Supabase, local, etc.):

```sql
CREATE TABLE personas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE',
    tiene_deuda BOOLEAN NOT NULL DEFAULT false
);

CREATE INDEX personas_email_key ON personas USING BTREE (email);
```

## Instalación

### Backend

1. Navegar al directorio del backend:
```bash
cd backend
```

2. Crear entorno virtual:
```bash
python -m venv venv
```

3. Activar entorno virtual:
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

4. Instalar dependencias:
```bash
pip install -r requirements.txt
```

5. Configurar variables de entorno:
```bash
cp .env.template .env
```

Editar `.env` con los valores reales:
- `DATABASE_URL`: Connection string de PostgreSQL (de NeonDB, Supabase, local, etc.)
- `API_KEY`: Generar en [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)

6. Iniciar servidor:
```bash
uvicorn app.main:app --reload
```

El servidor estará disponible en `http://localhost:8000`

Documentación API: `http://localhost:8000/docs`

### Frontend

1. Navegar al directorio del frontend:
```bash
cd frontend
```

2. Instalar pnpm (si no está instalado):
```bash
npm install -g pnpm
```

3. Instalar dependencias:
```bash
pnpm install
```

4. Configurar variables de entorno:
```bash
cp .env.template .env.local
```

Editar `.env.local` con los valores reales:
- `API_URL`: URL del backend (desarrollo: `http://localhost:8000`)
- `BACKEND_SECRET`: Mismo valor que `API_KEY` del backend

5. Iniciar servidor de desarrollo:
```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```
pmit-desafio/
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   │   └── personas.py
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── crud.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   ├── requirements.txt
│   └── .env.template
│
└── frontend/
    ├── app/
    │   ├── (personas)/
    │   ├── actions/
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    ├── hooks/
    ├── lib/
    ├── package.json
    └── .env.template
```

## Comandos Útiles

### Backend
```bash
# Activar entorno virtual
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Instalar dependencias
pip install -r requirements.txt

# Iniciar servidor
uvicorn app.main:app --reload

# Ejecutar tests
pytest
```

### Frontend
```bash
# Instalar dependencias
pnpm install

# Desarrollo
pnpm dev

# Build producción
pnpm build

# Iniciar producción
pnpm start
```

## API Endpoints

Todos los endpoints requieren header `X-API-Key` con el valor configurado.

- `GET /personas` - Listar todas las personas
- `GET /personas/{id}` - Obtener persona por ID
- `POST /personas` - Crear nueva persona
- `PUT /personas/{id}` - Actualizar persona
- `DELETE /personas/{id}` - Eliminar persona

Documentación interactiva: `http://localhost:8000/docs`

## Seguridad

El proyecto implementa autenticación mediante API Key. Todas las peticiones al backend requieren el header `X-API-Key`.

Para generar claves seguras, usar: [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)

## Estados de Persona

- `PENDIENTE`: Estado inicial
- `EN_PROCESO`: En revisión
- `OBSERVADO`: Requiere atención
- `APROBADO`: Aprobado
- `RECHAZADO`: Rechazado

## Licencia

Este proyecto es una prueba técnica.