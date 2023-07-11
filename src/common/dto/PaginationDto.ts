import { IsNumberString, IsOptional } from 'class-validator'

export class PaginationDto {
  @IsNumberString()
  pageNum: number

  @IsOptional()
  @IsNumberString()
  pageSize?: number
}
