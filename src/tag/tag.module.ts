import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TagService } from './tag.service'
import { TagController } from './tag.controller'
import { Tag } from './entities/tag.entity'
import { Article } from '../article/entities/article.entity'
import { Category } from '../category/entities/category.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Category, Article, Tag])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
