# CONTEXT.md

The domain language and the shape of this repository. Read this before changing anything —
the words here are the words the code uses.

## The product

A learning platform. Teachers write classes and publish them; learners watch them. Some
learners come as individuals, others belong to a company that pays for its people
together. This sandbox holds two small slices of that platform: publishing and teams.

## Ubiquitous language

- **Class** — a piece of teaching a teacher owns. It starts as a draft and can be
  published. A published class is visible to learners.
- **Publish** — the act of moving a class from draft to published. It is a decision the
  class itself enforces, not something a caller may simply set.
- **Member** — a person who belongs to a team. Membership says who is in the team; it says
  nothing about billing.
- **Plan** — which commercial arrangement a team is on, held as a plan code. Billing itself
  lives with an external provider, and the provider is the source of truth for it. We
  learn about changes from the provider, not the other way round.

If a change needs a word that is not here, add it here as part of the change.

## How the code is arranged

```
apps/api                   NestJS service: GraphQL schema, resolvers, composition
contexts/<context>/
  <context>                the domain: entities, value objects, ports, use cases, events
  <context>-in-memory      adapters that keep everything in memory
  <context>-prisma-postgres adapters that talk to Postgres through Prisma
packages/foundation        ports shared by every context (unit of work, event publisher)
packages/persistence       the Prisma schema, migrations, client, and Postgres unit of work
packages/seed-data         fixtures shared by the in-memory adapters and the database seed
docs/adr                   decisions we made and why
```

Two rules hold this together.

**Dependencies point inward.** A context's domain package depends on nothing but
`@platform/foundation`. It does not know Prisma, GraphQL or NestJS exist. Adapters depend
on the domain, never the reverse.

**Ports are the only way through.** A use case talks to a `...Repository` port; which
adapter is behind it is decided in `apps/api/src/composition`. Swapping the adapter there
changes nothing above it.

Resolvers stay thin. They translate GraphQL input into a call and the result back out;
decisions live in the domain.

`.claude/settings.json` keeps an agent's project instructions to this repository's own
`CLAUDE.md`, so a session behaves the same way for everyone working here.

## Running it

```bash
bun install
bun run dev          # GraphQL at http://localhost:4000/graphql
bun run typecheck
bun run lint
bun run test
```

That is the whole loop, and it needs no database — the in-memory adapters carry the seeds.

Postgres is there when you want it:

```bash
cp .env.example .env
bun run db:up        # Docker, Postgres on :5433
bun run db:migrate
bun run db:seed
ADAPTER=postgres bun run dev
```

## Testing

Unit tests run against the in-memory adapters: same ports, no database, fast enough to run
on every change. See `contexts/publishing/publishing/src/application/publish-class.test.ts`
for the shape we use.
