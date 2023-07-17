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

    try {
      // 执行插入操作
      await conn.execute(sql, values)

      return this.find(1, 10)
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * @description: 根据id查询用户
   */
  async findOne(id: string) {
    const sql = `
      SELECT id, nickname, sex, age FROM users WHERE id = ?
    `

    try {
      const [rows] = await conn.execute(sql, [id])

      return rows[0]
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * @description: 根据昵称查询用户
   */
  async findUserByNickName(nickname: string) {
    const sql = `
      SELECT * FROM users WHERE nickname = ?
    `

    try {
      const [rows] = await conn.execute(sql, [nickname])

      return rows
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
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
    try {
      const [rows] = await conn.execute(sql, args)

      return rows
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * @description: 用户总数查询
   */
  private async getUsersTotalCount() {
    try {
      const [result] = await conn.execute('SELECT COUNT(*) as totalCount FROM users')

      const totalCount = result[0].totalCount

      return totalCount
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
