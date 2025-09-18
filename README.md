# ToDo App — React-Admin + Express + Prisma + PostgreSQL

## 0 Requisitos

- **Node.js** 18 o 20 (recomendado 20)  
  node -v
- **Docker** y **Docker Compose**  
  docker -v  
  docker compose version

> Puertos usados por defecto:
> - **DB**: 5432
> - **Backend**: 4000 (controlado por backend/.env)
> - **Frontend (Vite)**: 5173

---

## 1 Clonar el proyecto

git clone <URL_DE_TU_REPO> zurich-react-admin-to-do  
cd zurich-react-admin-to-do

---

## 2 Iniciar la base de datos con Docker

Desde la **raíz** del repo:

docker compose up -d

Comprobar que el contenedor está arriba:

docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

---

## 3 Backend (Express + Prisma)

> ⚠️ **IMPORTANTE**: Todos estos comandos deben ejecutarse desde la carpeta `backend/`.

### 3.1 Entrar en la carpeta Backend

cd backend

### 3.2 Instalar dependencias

npm install

### 3.3 Variables de entorno

Asegúrate de tener un archivo `.env` dentro de `backend/` con el contenido:

DATABASE_URL="postgresql://postgres:123@localhost:5432/todo?schema=public"  
PORT=4000

### 3.4 Generar Prisma Client y migrar

npx prisma generate  
npx prisma migrate dev --name init

(O usa npx prisma db push si no quieres historial de migraciones.)

### 3.5 Levantar el servidor

npm run dev

Deberías ver algo como:  
Example app listening at http://localhost:4000

### 3.6 Verificaciones rápidas

# Debe devolver [] inicialmente  
curl http://localhost:4000/todos

---

## 4 Frontend (Vite + React-Admin)

### 4.1 Instalar dependencias

Desde la **raíz** del repo (no dentro de backend/):

npm install

### 4.2 Variable de entorno

Crea `.env.local` en la **raíz** del proyecto:

VITE_API_URL=http://localhost:4000

### 4.3 Levantar la app

npm run dev

Abrir http://localhost:5173

---

## 5 Flujo diario

Cada vez que vuelvas a trabajar:

1. **Base de datos**  
   docker compose up -d

2. **Backend**  
   cd backend  
   npm run dev

3. **Frontend** (otra terminal, raíz)  
   npm run dev

---

## 6 Scripts útiles

### Backend (desde la carpeta backend/)

- npm run dev — desarrollo (nodemon + ts-node)  
- npm run build — compila a dist/  
- npm start — corre dist/index.js  
- npm run migrate:dev — migraciones en dev  
- npm run generate — regenera Prisma Client  

### Frontend (desde la raíz del proyecto)

- npm run dev — Vite dev server  
- npm run build — build de producción  
- npm run serve — previsualizar build  
- npm run deploy — desplegar a GitHub Pages (si aplica)
