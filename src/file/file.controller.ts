import { Controller, Post, UseInterceptors } from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'

@Controller('file')
export class FileController {
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async upload() {
    return
  }
  @UseInterceptors(FilesInterceptor('files'))
  @Post('uploadMulti')
  async uploadMulti() {
    return
  }
}
