# Platform sandbox

A small NestJS + GraphQL service over two slices of a learning platform: publishing classes
and teams of people.

## Getting started

```bash
bun install
bun run dev
```

The API is then at http://localhost:4000/graphql. It runs on in-memory adapters with seed
data, so nothing else needs to be installed.

```graphql
query {
  team(id: "team-northwind") {
    name
    planCode
    members { name email }
  }
  class(id: "class-watercolour") {
    title
    status
  }
}
```

## Checks

```bash
bun run typecheck    # tsc --noEmit
bun run lint         # biome check .
bun run test         # bun test
```

## Postgres (optional)

The service runs entirely in memory by default. To point it at a real database:

```bash
cp .env.example .env
bun run db:up        # Postgres 16 in Docker, on :5433
bun run db:migrate
bun run db:seed
ADAPTER=postgres bun run dev
```

`bun run db:down` stops it again.

## Where things live

`CONTEXT.md` describes the domain language and how the repository is arranged.
`docs/adr` holds the decisions behind it.
