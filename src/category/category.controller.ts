import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryDto } from './dto/category.dto'
import { PaginationDto } from 'src/app/common/dto'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() categoryDto: CategoryDto) {
    return this.categoryService.create(categoryDto)
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    const { pageNum, pageSize = 10 } = pagination

    return this.categoryService.findAll(pageNum, pageSize)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() categoryDto: CategoryDto) {
    return this.categoryService.update(+id, categoryDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id)
  }
}
