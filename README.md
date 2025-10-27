Hola chicos aqui les dejo una ayuda para que comiencen:

Clonar el repositorio (no descargar)

Instalar dependencias:
npm install

Descargan POSTGRESQL:
https://www.postgresql.org/download/

Necesitan un .env , yo allí tengo PORT, JWT_SECRET, y DATABASE_URL
Ese último lo agregó prisma automaticamente, lo pongo por si lo ocupan:
"postgresql://postgres:LACLAVEDEUSTEDES@localhost:ELPUERTODEUSTEDES/DBDEUSTEDES?schema=public"
¿cómo que cuál clave? La clave que usaron cuando instalaron postgresql

Crean la bd:
createdb mochimo_db

Luego hacen las migraciones:
npx prisma migrate dev

en teoría ya podrían calar el sistema hasta el momento


ENDPOINTS:

Auth
POST /auth/login - inicia sesión y establece la cookie de autenticación

POST /auth/logout - cierra la sesión y limpia la cookie.

Users
POST /users - crea un nuevo usuario (registro).

GET /users - (protegido) obtiene todos los usuarios.

GET /users/:id - (protegido) Obtiene un usuario por ID.

