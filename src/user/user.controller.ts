import { Controller, Get, Query } from '@nestjs/common'

import { UserService } from './user.service'
import { PaginationDto } from 'src/common/dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async find(@Query() pagination: PaginationDto) {
    const { pageNum, pageSize = 10 } = pagination

    const results = await this.userService.find(pageNum, pageSize)

    return results
  }
}
