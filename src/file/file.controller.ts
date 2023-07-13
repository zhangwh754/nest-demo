import { resolve, basename } from 'path'
import { existsSync } from 'fs'

import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import type { Response } from 'express'
import { zip } from 'compressing'

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

  @Get('export/:filenames')
  async download(@Param('filenames') filenames: string, @Res() response: Response) {
    try {
      const filenameArr = filenames.split(',').map(filename => resolve(__dirname, `../../public/resource/${filename}`))

      const fileStream = new zip.Stream()

      filenameArr.forEach(filename => {
        if (existsSync(filename)) {
          fileStream.addEntry(filename)
        } else {
          throw `文件[${basename(filename)}]不存在`
        }
      })

      response.setHeader('Content-Type', 'application/octet-stream')

      response.setHeader('Content-Disposition', `attachment; filename=${new Date().getTime()}.zip`)

      fileStream.pipe(response)
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
