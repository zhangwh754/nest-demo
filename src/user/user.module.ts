import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'

import { UserController } from './user.controller'
import { UserService } from './user.service'
import { LoggerMiddleware } from 'src/app/middleware'

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: 'user', method: RequestMethod.POST })
  }
}
