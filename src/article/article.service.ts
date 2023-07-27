import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'

import { Article } from './entities/article.entity'
import { ArticleDto } from './dto/article.dto'
import { Category } from '../category/entities/category.entity'
import { Tag } from 'src/tag/entities/tag.entity'

Article
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly ArticleRepository: Repository<Article>,
    @InjectRepository(Category)
    private readonly CategoryRepository: Repository<Category>,
    @InjectRepository(Tag)
    private readonly TagRepository: Repository<Tag>
  ) {}

  async create(articleDto: ArticleDto) {
    const tagIds = articleDto.tagIds
    try {
      const article = new Article()
      article.title = articleDto.title
      const tags = await this.TagRepository.find({ where: { id: In(tagIds) }, relations: ['category'] })
      article.tags = tags

      const category = await this.CategoryRepository.findOneBy({ id: tags[0].category.id })
      article.category = category

      const res = await this.ArticleRepository.save(article)
      return res
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * @description: 根据id查询
   */
  async findOne(id: number) {
    try {
      const res = await this.ArticleRepository.findOne({ where: { id: id }, relations: ['tags', 'category'] })

      if (!res) throw `对应文章不存在`

      return res
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
