import { Body, Controller, Post, Get, Param, Query } from '@nestjs/common'

import { ArticleDto } from './dto/article.dto'
import { ArticleService } from './article.service'
import { PaginationDto } from 'src/app/common/dto'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() articleDto: ArticleDto) {
    return this.articleService.create(articleDto)
  }

  @Get()
  find(@Query() paginationDto: PaginationDto) {
    const { pageNum, pageSize = 10 } = paginationDto

    return this.articleService.find(pageNum, pageSize)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id)
  }
}
