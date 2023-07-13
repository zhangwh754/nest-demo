import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'

@Controller('file')
export class FileController {
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async upload(@UploadedFile() file: any) {
    // console.log('file', file)
    return [file.filename]
  }

  @UseInterceptors(FilesInterceptor('files'))
  @Post('uploadMulti')
  async uploadMulti(@UploadedFiles() files: any) {
    // console.log(files)
    return files.map(item => item.filename)
  }
}
