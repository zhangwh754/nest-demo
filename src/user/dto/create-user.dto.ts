import { IsNumber, IsString } from 'class-validator'

enum Sex {
  male = 'male',
  female = 'female',
}

export class CreateUserDto {
  @IsString()
  nickname: string
  @IsString()
  password: string
  @IsString()
  sex: Sex
  @IsNumber()
  age: number
}
