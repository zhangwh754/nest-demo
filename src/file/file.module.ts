import { extname, resolve } from 'path'

import { Module } from '@nestjs/common'
import { diskStorage } from 'multer'

import { FileController } from './file.controller'
import { MulterModule } from '@nestjs/platform-express'

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: resolve(__dirname, '../../public/resource'),
        filename: (_, file, callback) => {
          const filename = `${new Date().getTime() + extname(file.originalname)}`
          return callback(null, filename)
        },
      }),
    }),
  ],
  controllers: [FileController],
  providers: [],
})
export class FileModule {}
