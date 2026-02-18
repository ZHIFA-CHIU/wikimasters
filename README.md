# WikiMasters

Project idea from [Build a Fullstack Next.js App, v4](https://frontendmasters.com/courses/fullstack-app-next-v4).  
Original codebase inspiration: [btholt/fullstack-next-wiki](https://github.com/btholt/fullstack-next-wiki).

## Overview

WikiMasters is a Next.js App Router project for creating and editing wiki articles with markdown, auth, and image upload support.

## Tech Stack

- Next.js 16 + React 19 + TypeScript
- Drizzle ORM + PostgreSQL
- Stack Auth (`@stackframe/stack`)
- Vercel Blob (`@vercel/blob`) for image upload
- Upstash Redis (`@upstash/redis`) for view count increment cache
- Tailwind CSS v4 + Biome

## Prerequisites

- Node.js 20+
- Bun (recommended) or npm
- PostgreSQL
- Stack Auth project credentials
- Vercel Blob token
- Upstash Redis REST credentials

## Environment Variables

Create `.env.local` and configure at least:

- `DATABASE_URL`
- Stack Auth env vars required by `@stackframe/stack`
- Vercel Blob env vars required by `@vercel/blob`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

## Local Setup

1. Install dependencies:
```bash
bun install
```

2. Generate and apply DB migrations:
```bash
bun run db:generate
bun run db:migrate
```

3. Optional seed:
```bash
bun run db:seed
```

4. Start app:
```bash
bun run dev
```

App URL: [http://localhost:3000](http://localhost:3000)

## Scripts

- `bun run dev`
- `bun run build`
- `bun run start`
- `bun run lint`
- `bun run format`
- `bun run db:generate`
- `bun run db:migrate`
- `bun run db:seed`

If you prefer npm, replace `bun run` with `npm run`.

## Project Structure

```txt
src/
  app/
    actions/          # server actions (articles + upload)
  components/         # UI + feature components
  db/                 # drizzle schema/client/seed
  redis/              # upstash redis helpers
  stack/              # stack auth setup
drizzle/              # generated migrations
```

## Notable Implementation Details

- Article CRUD: `src/app/actions/articles.ts`
- Image upload/delete: `src/app/actions/upload.ts`
- Redis view increment helper: `src/redis/index.ts`
- Theme provider wiring: `src/app/layout.tsx`
- App dark tokens: `src/app/globals.css`
- `next/image` remote pattern is configured for Vercel Blob hostnames in `next.config.ts`.

## Notes

- Current DB schema in `src/db/schema.ts` does not include a persisted `viewCount` column yet.
- If you want durable view counts in Postgres, add `view_count` to `articles` and run migrations.
