import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets'
import { interval, Observable } from 'rxjs'
import { filter, map, take } from 'rxjs/operators'
import { Server } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('handler')
  handler(@MessageBody('data') data: number[]): Observable<WsResponse<number>> {
    return interval(2000).pipe(
      take(data.length),
      map(index => data[index]), // 获取对应索引的数据
      filter(value => value % 2 !== 0), // 过滤出偶数
      map(value => ({ event: 'events', data: value * 100 })) // 乘100返回
    )
  }

  @SubscribeMessage('endless')
  endless(): Observable<WsResponse<number>> {
    return interval(100).pipe(
      take(10),
      map(value => ({ event: 'events', data: value }))
    )
  }
}
