import { resolve } from 'path'

import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as cors from 'cors'

import { AppModule } from './app.module'
import './app/database'
import { validationPipeConfig } from './app/config'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.use(cors())

  app.useStaticAssets(resolve(__dirname, '../public/resource'), { prefix: '/file' })
  app.useStaticAssets(resolve(__dirname, '../public/static'), { prefix: '/demo' })

  app.useGlobalPipes(new ValidationPipe(validationPipeConfig))

  await app.listen(process.env.PORT)
}

bootstrap()
