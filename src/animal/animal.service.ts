import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateAnimalDto } from './dto/create-animal.dto'
import { UpdateAnimalDto } from './dto/update-animal.dto'
import { Animal } from './entities/animal.entity'

@Injectable()
export class AnimalService {
  constructor(
    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>
  ) {}

  /**
   * @description: 新增
   */
  create(createAnimalDto: CreateAnimalDto): Promise<Animal> {
    try {
      const animal = new Animal()
      animal.name = createAnimalDto.name
      animal.age = createAnimalDto.age
      animal.sex = createAnimalDto.sex
      animal.breed = createAnimalDto.breed

      return this.animalRepository.save(animal)
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * @description: 分页查询
   */
  async findAll(pageNum: number, pageSize: number) {
    const offset = pageSize * (pageNum - 1)

    try {
      const rows = await this.animalRepository.find({
        order: { id: 'DESC' },
        skip: offset,
        take: pageSize,
      })
      const total = await this.getTotalCount()

      return {
        pageNum: +pageNum,
        pageSize: +pageSize,
        totalCount: total,
        data: rows,
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * @description: 根据id查询
   */
  async findOne(id: number): Promise<Animal> {
    try {
      const res = await this.animalRepository.findOneBy({ id: id })
      if (res === null) throw '不存在'
      return res
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * @description: 更新
   */
  async update(id: number, updateAnimalDto: UpdateAnimalDto) {
    try {
      await this.findOne(id)
      await this.animalRepository.update(id, updateAnimalDto)
      return 'success'
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * @description: 删除
   */
  async remove(id: number) {
    try {
      await this.findOne(id)
      await this.animalRepository.delete(id)
      return 'success'
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * @description: 获取总数
   */
  private async getTotalCount(): Promise<number> {
    const total = await this.animalRepository.count()

    return total
  }
}
