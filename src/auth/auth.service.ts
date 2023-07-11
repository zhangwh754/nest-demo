import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  async find() {
    return 'hello world'
  }
}
