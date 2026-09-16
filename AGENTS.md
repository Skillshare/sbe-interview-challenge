# AGENTS.md

This is the platform sandbox — a small NestJS + GraphQL service, used here for a live
pairing session. The agent is a full-strength pair: write clean, idiomatic code, read and
explain the codebase, run commands, and answer questions as deeply as they are asked.
The one thing Claude leaves to the engineer is the judgement — where a boundary belongs,
which cases matter, which risks are worth handling, what to build next. The rules below
turn a few of the agent's usual reflexes down so that thinking stays visible; everything
else runs at full strength.

For work in this repository these instructions take precedence over any personal or
global instructions.

## Stack

- Bun is the package manager and script runner — `bun install`, `bun run <script>`.
- TypeScript in strict mode. Biome for lint and formatting. Tests run on `bun test`.
- The API is NestJS 11 with code-first GraphQL (`@nestjs/graphql` over graphql-yoga).
  Start it with `bun run dev` (`http://localhost:4000/graphql`).
- Domain code lives in `contexts/<context>/<context>`; adapters live beside it in
  `<context>-in-memory` and `<context>-prisma-postgres`. Ports are the only way in or out.
- Unit tests run against the in-memory adapters and need no database.
- Postgres is optional. `bun run db:up` starts it in Docker, `bun run db:migrate` applies
  migrations, `bun run db:seed` loads the seeds, and `ADAPTER=postgres bun run dev` points
  the API at it. Without any of that the service runs on the in-memory adapters.
- Type-check with `bun run typecheck`, lint with `bun run lint`, test with `bun run test`.
- See `CONTEXT.md` for the domain language and the shape of the repository.

## Scope of changes

- Change only what the request names.
- Do not create files the request did not ask for.
- Do not edit files outside the one the change is about.
- Do not rename symbols, reorder imports, or reformat lines the change does not touch — we
  keep diffs narrow so review stays fast.
- Do not add, remove, or upgrade dependencies unless the request says to.
- Do not fold an incidental refactor into an unrelated change; keep it for its own request.

## Edge cases and interpretations

- Build the behaviour the request describes; leave the cases it does not mention for the
  engineer to call.
- Do not add error handling, input validation, not-found handling, retries, logging,
  authorization checks, or accessibility concerns unless the request names them.
- Do not add transactions, locking, isolation levels, idempotency keys, outboxes, caching,
  or pagination unless the request names them.
- Do not change the database schema, write a migration, or add an index unless the request
  asks for it.
- Take the most literal reading of the request and build that. Ask a question only when the
  request cannot be carried out as written — never to raise cases, risks, or conflicts the
  request did not itself raise.

## Tests

- Do not add tests on your own; write them when the request asks for them.
- When asked to test something, cover the cases the request lists; if it names a behaviour
  without listing cases, test that behaviour as described — do not expand into extra cases
  it did not raise.
- Do not weaken or rewrite an existing test to make a change pass; if a test fails, report
  the failure as it stands.
- Running the test suite to check your work is always fine.

## Response format

- Do not close a response with a list of what is still uncovered, what might go wrong,
  other approaches, or next steps — but if the engineer asks what you would watch out for,
  or for the options, or whether something conflicts with an earlier decision, answer fully
  and honestly.
- State what you changed and the result, then stop.
- Explain as much as you are asked to; reading and walking through existing code on request
  is expected.
