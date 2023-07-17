import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import type { Request } from 'express'
import { JwtService } from '@nestjs/jwt'

import { ROLES_KEY } from '../decorator'
import { Role } from '../enum'
import { JWTConstant } from 'src/app/plugin'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) return true // 没有使用装饰器，即无需权限的接口

    const request = context.switchToHttp().getRequest<Request>()

    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException() // 未携带token，返回403
    }
    try {
      const user = await this.jwtService.verifyAsync(token, {
        secret: JWTConstant.secret,
      })
      request['user'] = user
      return requiredRoles.includes(user.role)
    } catch (error) {
      throw new UnauthorizedException()
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
