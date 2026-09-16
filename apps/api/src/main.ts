import 'reflect-metadata'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const port = Number(process.env.PORT ?? 4000)

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  await app.listen(port)
  new Logger('Bootstrap').log(`GraphQL ready on http://localhost:${port}/graphql`)
}

void bootstrap()
