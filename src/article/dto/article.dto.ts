import { IsArray, IsString, MaxLength } from 'class-validator'

export class ArticleDto {
  @IsString()
  @MaxLength(30)
  title: string

  @IsArray()
  tagIds: number[]
}
