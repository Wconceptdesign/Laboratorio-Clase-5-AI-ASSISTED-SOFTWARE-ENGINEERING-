---
description: "Task list for Registro Ingreso Salida feature implementation"
---

# Tasks: Registro Ingreso Salida

**Input**: Design documents from `specs/001-registro-ingreso-salida/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize backend Node.js/NestJS project in `backend/`
- [x] T002 Initialize frontend React project in `frontend/`
- [x] T003 [P] Create `docker-compose.yml` for PostgreSQL in repo root

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Setup Prisma schema in `backend/prisma/schema.prisma` mapping to `employees` and `entries` entities
- [x] T005 [P] Setup base API routing in `backend/src/app.module.ts`
- [x] T006 [P] Configure Axios and base UI layouts in `frontend/src/App.tsx` Theming
- [x] T007 Initialize Unit Testing environment configuration in `backend/jest.config.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Ingreso de Empleado (Priority: P1) 🎯 MVP

**Goal**: Permitir a un empleado registrar su ingreso escaneando su documento.

**Independent Test**: API endpoint responde nombre y guarda registro en DB. Interfaz reacciona con hora.

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️
- [x] T008 [P] [US1] Unit test validation document exists in `backend/test/employees.service.spec.ts`

### Implementation for User Story 1
- [x] T009 [P] [US1] Create Employee model mapping in `backend/src/modules/employees/employees.service.ts`
- [x] T010 [P] [US1] Implement `GET /employees/:documentId` endpoint in `backend/src/modules/employees/employees.controller.ts`
- [x] T011 [US1] Create Employee Data UI Context in `frontend/src/contexts/EmployeeContext.tsx`
- [x] T012 [US1] Build Ingreso UI Screen in `frontend/src/pages/Ingreso.tsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Control de Equipo Portátil (Priority: P1)

**Goal**: Requerir validaciones extra para laptops introducidas a oficina.

**Independent Test**: Formulario exige campos serial y marca si el toggle/checkbox está activo.

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️
- [x] T013 [P] [US2] Contract test for POST /entries in `backend/test/entries.e2e-spec.ts`

### Implementation for User Story 2
- [x] T014 [US2] Implement `POST /entries` business logic in `backend/src/modules/entries/entries.service.ts`
- [x] T015 [US2] Link `POST /entries` to Controller in `backend/src/modules/entries/entries.controller.ts`
- [x] T016 [US2] Add conditional form logic (Marca, Serial, Autorizador) in `frontend/src/components/LaptopForm.tsx`
- [x] T017 [US2] Connect UI submit to POST entries inside `frontend/src/pages/Ingreso.tsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Salida de Personal y Retiro (Priority: P1)

**Goal**: Sellar el ticket de acceso verificando el retiro del equipo si aplicaba.

**Independent Test**: La hora de salida se guarda y pide el verificador si el entry_time incluía laptop.

### Implementation for User Story 3
- [x] T018 [US3] Add open entry verification service in `backend/src/modules/entries/entries.service.ts`
- [x] T019 [US3] Implement `PATCH /entries/:id/exit` endpoint in `backend/src/modules/entries/entries.controller.ts`
- [x] T020 [US3] Build Salida UI Form handling exit prompt in `frontend/src/pages/Salida.tsx`

**Checkpoint**: All MVP user stories should now be independently functional

---

## Phase 6: User Story 4 - Análisis e Informes Administrativos (Priority: P2)

**Goal**: Exportación de asistencias a MS Excel con campos solicitados.

**Independent Test**: Generar XLSX validando estructura de datos.

### Implementation for User Story 4
- [x] T021 [US4] Setup ExcelJS generation pipeline in `backend/src/modules/reports/reports.service.ts`
- [x] T022 [US4] Implement `GET /reports/export` endpoint in `backend/src/modules/reports/reports.controller.ts`
- [x] T023 [US4] UI Download Report Button logic in `frontend/src/pages/Admin.tsx`

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T024 [P] End-to-End Testing (Cypress) in `frontend/cypress/e2e/flow.cy.ts`
- [x] T025 Dockerize Frontend/Backend natively updating `docker-compose.yml`
- [x] T026 Add Optional Simple Auth MVP (`POST /auth/login`) in `backend/src/modules/auth/auth.controller.ts`
- [x] T027 Run quickstart.md validation to ensure setup works via README

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
- **Polish (Phase 7)**: Depends on all user stories.

### Implementation Strategy

### Incremental Delivery
1. Start with Database creation and API routes.
2. Formulate Frontend to hit endpoint `/employees/:documentId` and show name. (MVP Base)
3. Deploy Ingreso / Salida flow iteratively.
