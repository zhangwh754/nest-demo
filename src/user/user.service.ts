import { Injectable } from '@nestjs/common'

import { conn } from '../app/database'

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
   * @description: 用户分页查询
   */
  private async findUsers(pageNum: number, pageSize: number) {
    const offset = pageSize * (pageNum - 1)
    const args = [pageSize, offset].map(String)

    const sql = `
      SELECT id, nickname, sex, age FROM users LIMIT ? OFFSET ?
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
