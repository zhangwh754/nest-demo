import { Controller, Get, Query, Param, Inject, Post } from '@nestjs/common'

import { UserService } from './user.service'
import { PaginationDto } from 'src/app/common/dto'
import { GlobalModuleModule } from 'src/global-module/global-module.module'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('AAA') private readonly globalModuleModule: GlobalModuleModule
  ) {}

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

  @Post('globalModule')
  getGlobalModule() {
    return this.globalModuleModule
  }
}
