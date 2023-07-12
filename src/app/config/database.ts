import type { PoolOptions } from 'mysql2/promise'

import * as dotenv from 'dotenv'

dotenv.config()

export const databaseConfig: PoolOptions = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
}
