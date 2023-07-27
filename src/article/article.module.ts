import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ArticleService } from './article.service'
import { ArticleController } from './article.controller'
import { Article } from './entities/article.entity'
import { Category } from '../category/entities/category.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Article, Category])],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
