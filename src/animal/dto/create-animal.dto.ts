import { IsEnum, IsNumber, IsString } from 'class-validator'

enum Sex {
  male = 'male',
  female = 'female',
}

enum Breed {
  dog = 'dog',
  cat = 'cat',
  rabbit = 'rabbit',
}

export class CreateAnimalDto {
  @IsString()
  name: string

  @IsNumber()
  age: number

  @IsEnum(Sex)
  sex: Sex

  @IsEnum(Breed)
  breed: Breed
}
