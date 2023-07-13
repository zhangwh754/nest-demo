import { resolve } from 'path'

import { Controller, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common'
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
    const filenameArr = filenames.split(',').map(filename => resolve(__dirname, `../../public/resource/${filename}`))

    const fileStream = new zip.Stream()

    filenameArr.forEach(filename => {
      fileStream.addEntry(filename)
    })

    response.setHeader('Content-Type', 'application/octet-stream')

    response.setHeader('Content-Disposition', `attachment; filename=${new Date().getTime()}.zip`)

    fileStream.pipe(response)
  }
}
