import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'
import { Article } from '../article/entities/article.entity'
import { Category } from '../category/entities/category.entity'
import { Tag } from './entities/tag.entity'

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Article)
    private readonly ArticleRepository: Repository<Article>,
    @InjectRepository(Category)
    private readonly CategoryRepository: Repository<Category>,
    @InjectRepository(Tag)
    private readonly TagRepository: Repository<Tag>
  ) {}

  /**
   * @description: 创建标签，关联分类
   */
  async create(createTagDto: CreateTagDto) {
    try {
      const tag = new Tag()
      tag.name = createTagDto.name

      const category = await this.CategoryRepository.findOneBy({ id: createTagDto.categoryId })
      tag.category = category

      tag.articles = []
      return await this.TagRepository.save(tag)
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  findAll() {
    return `This action returns all tag`
  }

  /**
   * @description: 根据id查询
   */
  async findOne(id: number) {
    try {
      const res = await this.TagRepository.findOne({ where: { id: id }, relations: ['articles', 'category'] })

      if (!res) throw `对应标签不存在`

      return res
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`
  }

  remove(id: number) {
    return `This action removes a #${id} tag`
  }
}
