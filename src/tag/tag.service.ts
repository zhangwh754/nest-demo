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

  /**
   * @description: 分页接口
   */
  async findAll(pageNum: number, pageSize: number) {
    const data = await this.findTags(pageNum, pageSize)
    const totalCount = await this.getTagsTotal()

    return {
      pageNum: +pageNum,
      pageSize: +pageSize,
      totalCount: totalCount,
      data: data,
    }
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

  /**
   * @description: 修改标签名称
   */
  async update(id: number, updateTagDto: UpdateTagDto) {
    try {
      const tag = new Tag()
      tag.name = updateTagDto.name

      await this.findOne(id)

      await this.TagRepository.update(id, tag)
      return '修改成功'
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * @description: 删除标签
   */
  async remove(id: number) {
    try {
      await this.findOne(id)

      await this.TagRepository.delete(id)
      return '删除成功'
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * @description: 标签分页
   */
  async findTags(pageNum: number, pageSize: number) {
    const offset = (pageNum - 1) * pageSize

    try {
      const res = await this.TagRepository.find({
        order: { id: 'DESC' },
        skip: offset,
        take: pageSize,
      })
      return res
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * @description: 获取总数
   */
  private async getTagsTotal() {
    try {
      return await this.TagRepository.count()
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
