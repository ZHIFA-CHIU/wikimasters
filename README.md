# WikiMasters
Project idea is from the [Build a Fullstack Next.js App, v4](https://frontendmasters.com/courses/fullstack-app-next-v4) 

Original code is from [here](https://github.com/btholt/fullstack-next-wiki)

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Drizzle ORM + PostgreSQL
- Stack Auth (`@stackframe/stack`)
- Vercel Blob (image storage)
- Biome (lint/format)

## Prerequisites

- Node.js 20+
- Bun (recommended) or npm
- A PostgreSQL database
- Stack Auth project credentials
- Vercel Blob token

## Environment Variables

Create `.env.local` in the project root and define at least:

- `DATABASE_URL` - PostgreSQL connection string
- Stack Auth env vars required by `@stackframe/stack` for Next.js
- Vercel Blob env var/token used by `@vercel/blob`

`DATABASE_URL` is required by both runtime DB access and Drizzle tooling.

## Getting Started

1. Install dependencies:
```bash
bun install
```

2. Run database migrations:
```bash
bun run db:generate
bun run db:migrate
```

3. (Optional) Seed data:
```bash
bun run db:seed
```

4. Start development server:
```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `bun run dev` - start development server
- `bun run build` - build production app
- `bun run start` - run production server
- `bun run lint` - run Biome checks
- `bun run format` - format code with Biome
- `bun run db:generate` - generate Drizzle migration files
- `bun run db:migrate` - apply Drizzle migrations
- `bun run db:seed` - seed sample data

If you prefer npm, replace `bun run` with `npm run`.

## Project Structure

```txt
src/
  app/                  # routes, layout, server actions
    actions/            # article + upload actions
  components/           # UI and feature components
  db/                   # Drizzle client, schema, seed scripts
  stack/                # Stack Auth client/server setup
drizzle/                # generated migrations + metadata
```

## Data Model

Defined in `src/db/schema.ts`:

- `articles`: title, slug, content, image URL, publish status, author, timestamps
- `usersSync`: synchronized user profile data keyed by auth user ID

## Notes

- Image upload/delete is implemented in server actions at `src/app/actions/upload.ts`.
- Article CRUD logic is in `src/app/actions/articles.ts`.
- Caching uses Next.js cache tags (e.g. `ALL_ARTICLES` and per-article tags).
