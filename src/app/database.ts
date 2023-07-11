import * as mysql from 'mysql2/promise'
import * as dotenv from 'dotenv'

dotenv.config()

const access: mysql.PoolOptions = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
}

export const conn = mysql.createPool(access)
