import { resolve } from 'path'

import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common'

import { AuthService } from './auth.service'
import { SignInDto } from 'src/user/dto'
import { fileInput } from 'utils'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signIn')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto)
  }

  // 存储入参
  @Post()
  async test(@Body() body) {
    const filePath = resolve(process.cwd(), `public/resource/input.json`)

    const result = await fileInput(filePath, JSON.stringify(body, null, 2)).catch(err => {
      throw new HttpException(err, HttpStatus.BAD_REQUEST)
    })

    return result
  }

  @Get()
  async find() {
    return await this.authService.find()
  }
}
