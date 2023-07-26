import * as dotenv from 'dotenv'

dotenv.config()

export const TypeOrmConfig = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [],
  synchronize: true,
  port: 3306,
}
