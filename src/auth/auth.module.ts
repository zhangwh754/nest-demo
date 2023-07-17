import { Module } from '@nestjs/common'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserModule } from 'src/user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { JWTConstant } from 'src/app/plugin'

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: JWTConstant.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
