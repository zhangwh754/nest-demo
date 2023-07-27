import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserService } from '../user/user.service'
import { SignInDto } from '../user/dto'
import { omit } from 'utils'

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.findUserByNickName(signInDto.nickname)

    if (user?.password !== signInDto.password) {
      throw new UnauthorizedException()
    } else {
      const userInfo = omit(user, ['password'])
      return {
        userInfo: userInfo,
        jwt: await this.jwtService.signAsync(userInfo),
      }
    }
  }

  async find() {
    return 'hello world'
  }
}
