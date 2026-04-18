# Assistance System (Registro de Ingreso y Salida)

Este proyecto es un sistema de panel interactivo (Full-Stack) construido para permitirle a las empresas llevar un control ágil y auditable sobre el ingreso y salida de sus empleados o personal autorizado, ofreciendo características robustas para verificar si el empleado ha ingresado con computadores portátiles y exportar los datos para auditoría.

## Arquitectura del Proyecto

El proyecto está dockerizado y separado en dos módulos mantenibles y escalables:

1. **Frontend**: React + TypeScript + Material UI (Vite)
2. **Backend**: Node.js + NestJS + Prisma ORM
3. **Base de Datos**: PostgreSQL 15

### Tecnologías Aplicadas
- Typescript estricto en ambos lados.
- React Router para la navegación entre procesos (`/ingreso`, `/salida`, `/admin`).
- Prisma Client para manipulación de DB y gestión de integridad relacional.
- Docker & Docker Compose para empaquetamiento y despliegue rápido.

---

## 🚀 Despliegue Inmediato (Quickstart)

Cualquier persona que obtenga acceso a este repositorio podrá ejecutar el proyecto entero utilizando **Docker Compose**.

### Prerrequisitos
- Tener instalado [Docker Desktop](https://www.docker.com/products/docker-desktop/) (o equivalente: Colima, Docker Engine).
- Tener el daemon de Docker inicializado y corriendo en las opciones de fondo.

### Pasos para levantar la aplicación

1. **Clonar este repositorio:**
    ```bash
    git clone <ruta-del-repositorio>
    cd assistance-system
    ```

2. **Levantar el ecosistema vía Docker:**
    Simplemente ejecuta el orquestador pidiéndole que recompile nativamente la configuración de paquetes.
    ```bash
    docker-compose up -d --build
    ```

3. **¡Inicia a usar!**
   El sistema está diseñado para inicializar y correr migraciones (seeds) tras 5 segundos de arrancar.
   Abre un navegador e ingresa a: **[http://localhost:5173/](http://localhost:5173/)**

---

## 🛠️ Notas sobre Puertos & Redes

Para no incurrir en conflictos (collisions) con otros repositorios que puedas estar usando a nivel máquina (como *EAMS* o similares usando el 3000), esta arquitectura define los siguientes accesos limpios que ya están configurados `out-of-the-box`:

* **Frontend UI**: `localhost:5173`
* **Backend API**: `localhost:3010` *(internamente amarrado a puerto 3000 y habilitado con CORS)*
* **PostgreSQL BD**: `localhost:5435` *(internamente resuelve al 5432)*

> Todo el tráfico API interno se resuelve gracias a la etiqueta de DNS inter-containment de Compose bajo `assistance_postgres`, evadiendo choques red-localhost.

---

## 🔬 Datos Duros para Testing Lógico

Al desplegar los contenedores, Prisma incrusta dinámicamente un repositorio falso (semilla) de empleados en la BD limpia para propósitos de Testing inmediato.

**Cédulas autorizadas e inyectadas por defecto:**
Puedes utilizar *cualquiera* de las siguientes Cédulas en la caja de búsquedas de "Ingreso" o "Salida":
- `1010123456`
- `1020987654`
- `39485721`
- `1134567890`
- `72345612`
- `1050222333`
- `43987654`
- `1070888999`
- `1090777666`
- `12345678`

**Credenciales de Panel de Administrador (`/admin`)**
Para desencriptar el botón de descarga del Excel de Auditorias, se requiere la siguiente autenticación:
- **Usuario:** `admin`
- **Contraseña:** `Admin123!`

---

## 🔧 Rutas y Códigos Importantes

* Si ocupas modificar variables de lógica empresarial en la API: Ve a `./backend/src/modules` 
* Si ocupas añadir más usuarios a las pruebas: Abre `./backend/prisma/seed.ts`
* Si ocupas editar colores o variables gráficas del UI frontal: Ve a `./frontend/src/`
