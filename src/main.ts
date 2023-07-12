import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import * as cors from 'cors'

import { AppModule } from './app.module'
import './app/database'
import { validationPipeConfig } from './app/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cors())

  app.useGlobalPipes(new ValidationPipe(validationPipeConfig))

  await app.listen(process.env.PORT)
}

bootstrap()
