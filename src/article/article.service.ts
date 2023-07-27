import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'

import { Article } from './entities/article.entity'
import { ArticleDto } from './dto/article.dto'
import { Category } from '../category/entities/category.entity'

Article
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly ArticleRepository: Repository<Article>,
    @InjectRepository(Category)
    private readonly CategoryRepository: Repository<Category>
  ) {}

  async create(articleDto: ArticleDto) {
    const categoryIds = articleDto.categoryIds
    try {
      const article = new Article()
      article.title = articleDto.title
      const categories = await this.CategoryRepository.findBy({ id: In(categoryIds) })
      article.categories = categories

      console.log(article)

      const res = await this.ArticleRepository.save(article)
      return res
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
