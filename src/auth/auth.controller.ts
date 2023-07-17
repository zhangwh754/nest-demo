import { Controller, Get, Post, Body } from '@nestjs/common'

import { AuthService } from './auth.service'
import { SignInDto } from 'src/user/dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signIn')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto)
  }

  @Get()
  async find() {
    return await this.authService.find()
  }
}
