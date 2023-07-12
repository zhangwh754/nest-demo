import { IsOptional, IsNumber } from 'class-validator'

export class PaginationDto {
  @IsNumber()
  pageNum: number

  @IsOptional()
  @IsNumber()
  pageSize?: number
}
