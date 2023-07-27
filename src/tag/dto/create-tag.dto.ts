import { IsNumber, IsString, MaxLength } from 'class-validator'

export class CreateTagDto {
  @IsString()
  @MaxLength(30)
  name: string

  @IsNumber()
  categoryId: number
}
