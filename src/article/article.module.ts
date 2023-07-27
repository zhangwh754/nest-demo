import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ArticleService } from './article.service'
import { ArticleController } from './article.controller'
import { Article } from './entities/article.entity'
import { Category } from '../category/entities/category.entity'
import { Tag } from '../tag/entities/tag.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Article, Category, Tag])],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
