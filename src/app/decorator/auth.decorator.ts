import { SetMetadata } from '@nestjs/common'
import { Role } from '../enum'

export const ROLES_KEY = 'roles'

export const Auth = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
