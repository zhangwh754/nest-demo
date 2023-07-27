import { IsString, MaxLength } from 'class-validator'

export class CategoryDto {
  @IsString()
  @MaxLength(10)
  name: string
}
