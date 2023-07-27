import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async find(pageNum: number, pageSize: number) {
    const data = await this.findUsers(pageNum, pageSize)
    const totalCount = await this.getUsersTotalCount()

    return {
      pageNum: +pageNum,
      pageSize: +pageSize,
      totalCount: totalCount,
      data: data,
    }
  }

  /**
   * @description: 创建新用户
   */
  async create(createUserDto: CreateUserDto) {
    const _user = await this.findUserByNickName(createUserDto.nickname)
    if (_user) throw new HttpException('该昵称已存在', HttpStatus.BAD_REQUEST)

    const user = new User()
    user.nickname = createUserDto.nickname
    user.password = createUserDto.password
    user.sex = createUserDto.sex
    user.age = createUserDto.age

    try {
      // 执行插入操作
      await this.userRepository.save(user)

      return await this.find(1, 10)
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * @description: 根据id查询用户
   */
  async findOne(id: number) {
    try {
      const [rows] = await this.userRepository.find({
        where: {
          id: id,
        },
      })

      return rows[0]
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * @description: 根据昵称查询用户
   */
  async findUserByNickName(nickname: string) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          nickname: nickname,
        },
      })

      console.log('user', user)

      return user
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * @description: 用户分页查询
   */
  private async findUsers(pageNum: number, pageSize: number) {
    const offset = pageSize * (pageNum - 1)

    try {
      const data = await this.userRepository.find({
        order: { id: 'DESC' },
        skip: offset,
        take: pageSize,
      })

      console.log(data)

      return data
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * @description: 用户总数查询
   */
  private async getUsersTotalCount() {
    try {
      const total = await this.userRepository.count()

      return total
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
