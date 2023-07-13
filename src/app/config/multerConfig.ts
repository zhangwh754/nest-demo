import { extname, resolve } from 'path'

import { diskStorage } from 'multer'

export const multerConfig = {
  storage: diskStorage({
    destination: resolve(__dirname, '../../../public/resource'),
    filename: (_, file, callback) => {
      const filename = `${new Date().getTime() + extname(file.originalname)}`
      return callback(null, filename)
    },
  }),
}
