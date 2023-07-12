import { Controller, Get, Query, Param } from '@nestjs/common'

import { UserService } from './user.service'
import { PaginationDto } from 'src/app/common/dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async find(@Query() pagination: PaginationDto) {
    const { pageNum, pageSize = 10 } = pagination

    const results = await this.userService.find(pageNum, pageSize)

    return results
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log(typeof id === 'number') // true
    return 'This action returns a user'
  }
}
