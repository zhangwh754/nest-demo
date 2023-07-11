import { Injectable } from '@nestjs/common'

import { conn } from '../app/database'

@Injectable()
export class UserService {
  async find(offset: number, limit: number) {
    const args = [limit, offset].map(String)

    const [rows] = await conn.execute('SELECT * FROM `users` LIMIT ? OFFSET ?', args)

    return rows
  }
}
