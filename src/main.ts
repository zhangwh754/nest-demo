import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'
import './app/database'
import { validationPipeConfig } from './app/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe(validationPipeConfig))

  await app.listen(process.env.PORT)
}

bootstrap()
