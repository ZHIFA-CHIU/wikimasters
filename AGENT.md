# AGENT.md

This file gives coding agents and contributors a fast, practical guide for working in this repository.

## Project Overview

- App: `wikimasters`
- Stack: Next.js (App Router), React, TypeScript, Drizzle ORM (PostgreSQL), Stack Auth, Vercel Blob
- Package manager lockfile: `bun.lock` (Bun is preferred, npm also works)

## Quick Start

1. Install dependencies:
```bash
bun install
```
2. Create or update `.env.local` with required environment variables:
- `DATABASE_URL`
- Stack Auth variables used by `@stackframe/stack` (project keys/secrets)
- Vercel Blob token (for uploads)
3. Generate and run DB migrations:
```bash
bun run db:generate
bun run db:migrate
```
4. Start dev server:
```bash
bun run dev
```

## Common Commands

- `bun run dev` - start dev server
- `bun run build` - production build
- `bun run start` - start built app
- `bun run lint` - Biome checks
- `bun run format` - Biome format
- `bun run db:generate` - generate Drizzle migration files
- `bun run db:migrate` - apply migrations
- `bun run db:seed` - seed sample data

## Key Paths

- `src/app/` - routes, layouts, server actions
- `src/app/actions/articles.ts` - article CRUD server actions
- `src/app/actions/upload.ts` - image upload/delete logic (Vercel Blob)
- `src/db/` - database client, schema, seed, user sync
- `src/components/` - UI and page components
- `src/stack/` - Stack Auth client/server setup
- `drizzle/` - SQL migrations and metadata

## Data Model

Main tables in `src/db/schema.ts`:

- `articles`: title, slug, content, image URL, publish flag, author, timestamps
- `usersSync`: synced user records keyed by Stack Auth user ID

## Coding Guidelines

- Keep TypeScript strict and avoid `any`.
- Preserve server/client boundaries.
- Use `"use server"` only for server actions.
- Use `"use client"` only where client hooks/state are required.
- Follow existing error-handling style in server actions (`neverthrow`, domain errors).
- Run `bun run lint` before finishing changes.
- Keep UI consistent with existing components under `src/components/ui/`.

## Notes for Agents

- Do not commit secrets or `.env.local`.
- Do not rewrite generated Drizzle files manually unless explicitly asked.
- Prefer targeted edits over broad refactors.
- If schema changes are made, include migration generation and note DB impact.
