# Research: Assistance System Architecture

## Decision: Frontend Framework
- **Decision**: React
- **Rationale**: Familiarity, extensive ecosystem, fits perfectly for the dynamic form UI requested.
- **Alternatives considered**: Vue, Angular.

## Decision: Backend Framework
- **Decision**: Node.js + NestJS
- **Rationale**: Strict TypeScript support, OOP-oriented, works well with the requested architecture and provides robust decorators for class-validator.
- **Alternatives considered**: Express (too simple for modular scaling).

## Decision: Database and ORM
- **Decision**: PostgreSQL + Prisma ORM
- **Rationale**: Postgres is reliable for rigid relational data and reporting. Prisma provides fast typing and migrations.
- **Alternatives considered**: MySQL, TypeORM.

## Decision: State Management
- **Decision**: React Query / Zustand
- **Rationale**: React Query handles backend state gracefully, minimizing frontend prop-drilling, while Zustand handles purely local UI logic cleanly.
- **Alternatives considered**: Redux (too bulky).

## Decision: Export Library
- **Decision**: ExcelJS
- **Rationale**: Reliable, pure JavaScript XLSX generator that avoids binary dependencies and supports neat formatting.
- **Alternatives considered**: SheetJS.

## Decision: Deployment
- **Decision**: Docker -> VPS/Render/Railway
- **Rationale**: Containerization provides reproducible builds. The current MVP doesn't need Kubernetes complexity yet but allows easy migration later.
- **Alternatives considered**: Serverless AWS Lambda (would require heavier architecting for Postgres connections).
