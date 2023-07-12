import * as mysql from 'mysql2/promise'

import { databaseConfig } from '../config'

const access: mysql.PoolOptions = databaseConfig

export const conn = mysql.createPool(access)
