import { IsEnum, IsNumber, IsString, MaxLength, Max, Min } from 'class-validator'

export enum Sex {
  male = 'male',
  female = 'female',
}

export enum Breed {
  dog = 'dog',
  cat = 'cat',
  rabbit = 'rabbit',
}

export class CreateAnimalDto {
  @IsString()
  @MaxLength(20)
  name: string

  @IsNumber()
  @Max(100)
  @Min(1)
  age: number

  @IsEnum(Sex)
  sex: Sex

  @IsEnum(Breed)
  breed: Breed
}
