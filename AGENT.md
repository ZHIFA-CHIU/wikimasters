# AGENT.md

Repository-specific guidance for coding agents and contributors.

## Project Snapshot

- App: `wikimasters`
- Framework: Next.js App Router (TypeScript)
- Data: PostgreSQL via Drizzle ORM
- Auth: Stack Auth (`@stackframe/stack`)
- Storage: Vercel Blob
- Cache/Counter: Upstash Redis
- Styling: Tailwind CSS v4 + design tokens in `src/app/globals.css`

## Setup Checklist

1. Install deps:
```bash
bun install
```
2. Configure `.env.local`:
- `DATABASE_URL`
- Stack Auth env vars
- Vercel Blob env vars
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
3. Run DB migration flow:
```bash
bun run db:generate
bun run db:migrate
```
4. Start dev server:
```bash
bun run dev
```

## Common Commands

- `bun run dev`
- `bun run build`
- `bun run start`
- `bun run lint`
- `bun run format`
- `bun run db:generate`
- `bun run db:migrate`
- `bun run db:seed`

## Important Paths

- `src/app/layout.tsx` - app-level providers (next-themes + stack)
- `src/app/globals.css` - theme tokens (light/dark)
- `src/app/actions/articles.ts` - article CRUD logic
- `src/app/actions/upload.ts` - blob upload/delete
- `src/db/schema.ts` - Drizzle schema
- `src/redis/index.ts` - Redis helpers (view counter increment)
- `next.config.ts` - `next/image` remote host config

## Working Rules

- Keep server/client boundaries correct (`"use server"` vs `"use client"`).
- Prefer small targeted edits over broad refactors.
- Keep docs and schema in sync when adding DB fields.
- For schema changes, generate migration files and mention DB impact in your summary.
- Do not commit `.env.local` or credentials.

## Current Caveats

- Redis currently increments view count in cache (`incrementViewCountBySlug`), but schema does not yet store a `viewCount` column in Postgres.
- If implementing durable counts, add DB column + migration and define sync/flush strategy.
