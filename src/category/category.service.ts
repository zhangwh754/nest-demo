import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CategoryDto } from './dto/category.dto'
import { Category } from './entities/category.entity'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly CategoryRepository: Repository<Category>
  ) {}

  async create(categoryDto: CategoryDto) {
    const category = new Category()
    category.name = categoryDto.name

    try {
      const res = await this.findByName(category.name)

      if (res) throw `该分类已存在`

      return await this.CategoryRepository.save(category)
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(pageNum: number, pageSize: number) {
    const data = await this.findCategories(pageNum, pageSize)
    const totalCount = await this.getTotalCount()

    return {
      pageNum: +pageNum,
      pageSize: +pageSize,
      totalCount: totalCount,
      data: data,
    }
  }

  /**
   * @description: 根据id查询分类
   */
  async findOne(id: number) {
    try {
      const res = await this.CategoryRepository.findOne({ where: { id: id }, relations: ['articles'] })

      if (!res) throw `对应分类不存在`

      return res
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * @description: 根据名字搜索category
   */
  async findByName(name: string) {
    try {
      const category = await this.CategoryRepository.findOne({
        where: {
          name: name,
        },
      })
      return category
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * @description: 分页查询
   */
  async findCategories(pageNum: number, pageSize: number) {
    const offset = pageSize * (pageNum - 1)

    try {
      const data = await this.CategoryRepository.find({
        order: { id: 'DESC' },
        // relations: ['articles'],
        skip: offset,
        take: pageSize,
      })

      return data
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * @description: 更新标签
   */
  async update(id: number, categoryDto: CategoryDto) {
    const category = new Category()
    category.name = categoryDto.name

    try {
      await this.findOne(id)
      await this.CategoryRepository.update(id, category)
      return 'success'
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * @description: 移除某个标签
   */
  async remove(id: number) {
    try {
      await this.findOne(id)
      await this.CategoryRepository.delete(id)
      return 'success'
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  private async getTotalCount() {
    try {
      const total = await this.CategoryRepository.count()

      return total
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
