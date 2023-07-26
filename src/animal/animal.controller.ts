import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'

import { AnimalService } from './animal.service'
import { CreateAnimalDto } from './dto/create-animal.dto'
import { PaginationDto } from 'src/app/common/dto'
import { UpdateAnimalDto } from './dto/update-animal.dto'

@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalService.create(createAnimalDto)
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    const { pageNum, pageSize = 10 } = pagination

    return this.animalService.findAll(pageNum, pageSize)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalService.update(+id, updateAnimalDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalService.remove(+id)
  }
}
