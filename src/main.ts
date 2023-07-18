import { resolve } from 'path'

import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as cors from 'cors'

import { AppModule } from './app.module'
import './app/database'
import { validationPipeConfig } from './app/config'
import { ResponseInterceptor } from './app/interceptor'
import { ExceptionInterceptor } from './app/filter'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.use(cors())

  app.useStaticAssets(resolve(process.cwd(), 'public/resource'), { prefix: '/file' })
  app.useStaticAssets(resolve(process.cwd(), 'public/static'), { prefix: '/demo' })

  app.useGlobalPipes(new ValidationPipe(validationPipeConfig))

  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalFilters(new ExceptionInterceptor())

  await app.listen(process.env.PORT)
}

bootstrap()
