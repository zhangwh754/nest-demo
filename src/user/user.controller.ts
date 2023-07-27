import { Controller, Get, Query, Param, Inject, Post, Body } from '@nestjs/common'

import { UserService } from './user.service'
import { PaginationDto } from 'src/app/common/dto'
import { GlobalModuleModule } from 'src/global-module/global-module.module'
import { CreateUserDto, SignInDto } from './dto'
import { Auth } from 'src/app/decorator'
import { Role } from 'src/app/enum'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('AAA') private readonly globalModuleModule: GlobalModuleModule
  ) {}

  @Post('/signIn')
  async signIn(@Body() signInDto: SignInDto) {
    return signInDto
  }

  @Get()
  async find(@Query() pagination: PaginationDto) {
    const { pageNum, pageSize = 10 } = pagination

    const results = await this.userService.find(pageNum, pageSize)

    return results
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id)
  }

  @Post()
  @Auth(Role.Admin)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Post('globalModule')
  getGlobalModule() {
    return this.globalModuleModule
  }
}
