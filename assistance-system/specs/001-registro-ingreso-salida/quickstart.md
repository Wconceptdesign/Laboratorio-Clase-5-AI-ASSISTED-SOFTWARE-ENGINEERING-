# Quickstart: Assistance System Architecture
    
## Local Development

1. Run `docker-compose up -d` (requires Docker) to stand up PostgreSQL.
2. Under `/backend`, run `npm i` and configure `.env` (DB URL).
3. Under `/backend`, run Prisma migrations `npx prisma migrate dev`.
4. Run `npm run start:dev` for the NestJS API.
5. Under `/frontend`, run `npm i` and create `.env` (API URL).
6. Run `npm run dev` to start React/Vite.

## Checks
- Use `npm run lint` and `npm test` as standard checkpoints.
