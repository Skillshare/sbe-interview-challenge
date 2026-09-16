# 1. In-memory adapters are the unit test substrate

Date: 2026-07-14

## Status

Accepted

## Context

Every context defines its ports in its domain package and ships at least two adapters: one
in memory and one on Prisma/Postgres. That leaves an open question for tests — do unit
tests run against a real database, against mocks written per test, or against the
in-memory adapter?

Running unit tests against Postgres makes them slow, needs Docker on every machine and in
CI, and makes a failing test ambiguous: the domain may be wrong, or the fixture may be.
Hand-written mocks per test are fast, but every test then encodes its own idea of what the
port does, and those ideas drift apart from each other and from the real adapter.

## Decision

Unit tests run against the in-memory adapters. They are written once per port, they are
real implementations rather than per-test stubs, and they are held to the same interface
the Postgres adapter implements.

Tests that exist to prove the Postgres adapter itself behaves — mapping, constraints,
transactional behaviour — are integration tests and are the only ones that need a database.

## Consequences

The unit suite runs with no Docker and no network, so it stays fast enough to run on every
change. Anything that can only be observed in a real database is, by construction, out of
reach of the unit suite; that has to be checked at the integration seam instead.
