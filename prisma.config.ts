import { defineConfig } from 'prisma/config'

const localDatabase = 'postgresql://platform:platform@localhost:5433/platform?schema=public'

export default defineConfig({
  schema: 'packages/persistence/prisma/schema.prisma',
  migrations: { path: 'packages/persistence/prisma/migrations' },
  datasource: { url: process.env.DATABASE_URL ?? localDatabase },
})
