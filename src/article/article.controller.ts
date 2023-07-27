import { Body, Controller, Post } from '@nestjs/common'

import { ArticleDto } from './dto/article.dto'
import { ArticleService } from './article.service'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() articleDto: ArticleDto) {
    return this.articleService.create(articleDto)
  }
}
