import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class SizeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 判断请求的Content-Type是否为JSON
    console.log(parseInt(req.get('Content-Length') || '0', 10))

    if (req.is('json')) {
      // 获取请求体的大小（单位为字节）
      const contentLength = parseInt(req.get('Content-Length') || '0', 10)

      // 将大小转换为更友好的格式，例如MB
      const contentSizeInMB = contentLength / 1024

      // 输出请求体大小
      console.log(`JSON Request Size: ${contentSizeInMB.toFixed(2)} KB`)
    }

    next()
  }
}
