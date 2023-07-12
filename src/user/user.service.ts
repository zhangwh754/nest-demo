import { Injectable, HttpException, HttpStatus } from '@nestjs/common'

import { conn } from '../app/database'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
  async find(pageNum: number, pageSize: number) {
    const rows = await this.findUsers(pageNum, pageSize)
    const totalCount = await this.getUsersTotalCount()
    const totalPages = Math.ceil(totalCount / pageSize)

    return {
      pageNum: +pageNum,
      pageSize: +pageSize,
      totalPages: totalPages,
      totalCount: totalCount,
      data: rows,
    }
  }

  /**
   * @description: 创建新用户
   */
  async create(createUserDto: CreateUserDto) {
    const _user = await this.findUserByNickName(createUserDto.nickname)
    if ((_user as any[]).length) {
      throw new HttpException('该昵称已存在', HttpStatus.BAD_REQUEST)
    }

    const sql = `INSERT INTO users (nickname, password, sex, age) VALUES (?, ?, ?, ?)`

    const values = [createUserDto.nickname, createUserDto.password, createUserDto.sex, createUserDto.age]

    // 执行插入操作
    const [rows] = await conn.execute(sql, values)

    return this.find(1, 10)
  }

  /**
   * @description: 根据昵称查询用户
   */
  async findUserByNickName(nickname: string) {
    const sql = `
      SELECT id, nickname, sex, age FROM users WHERE nickname = ?
    `

    const [rows] = await conn.execute(sql, [nickname])

    return rows
  }

  /**
   * @description: 用户分页查询
   */
  private async findUsers(pageNum: number, pageSize: number) {
    const offset = pageSize * (pageNum - 1)
    const args = [pageSize, offset].map(String)

    const sql = `
      SELECT
      id, nickname, sex, age
      FROM users
      ORDER BY id DESC
      LIMIT ? OFFSET ?
    `

    const [rows] = await conn.execute(sql, args)

    return rows
  }

  /**
   * @description: 用户总数查询
   */
  private async getUsersTotalCount() {
    const [result] = await conn.execute('SELECT COUNT(*) as totalCount FROM users')
    const totalCount = result[0].totalCount

    return totalCount
  }
}
