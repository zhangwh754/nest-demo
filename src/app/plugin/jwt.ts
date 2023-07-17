import * as dotenv from 'dotenv'

dotenv.config()

export const JWTConstant = {
  secret: process.env.JWT_SECRET,
}
