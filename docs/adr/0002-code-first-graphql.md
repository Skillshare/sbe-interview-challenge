# 2. The GraphQL schema is generated from code

Date: 2026-07-21

## Status

Accepted

## Context

The schema can be authored as SDL and implemented against, or generated from the TypeScript
types and decorators in the resolver layer. We publish one schema to several clients and
change it often, so the cost we care about is drift between what the schema promises and
what the resolvers return.

## Decision

The schema is code-first. Object types are TypeScript classes annotated with
`@nestjs/graphql` decorators, and `apps/api/schema.graphql` is generated from them on boot.

The generated file is committed so schema changes show up in review as a diff.

## Consequences

The schema cannot promise a field the code does not produce; the compiler is the check.
In exchange the schema is no longer a hand-written artefact that can be designed
independently of the resolvers, and a change to a model is a change to the public contract
— which is a diff worth reading carefully, not an implementation detail.
