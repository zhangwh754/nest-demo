import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { GlobalModuleModule } from './global-module/global-module.module'
import { FileModule } from './file/file.module'
import { AuthGuard } from './app/guard'
import { EventsModule } from './events/events.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    GlobalModuleModule.forRoot({ url: 'concatUrl' }),
    FileModule,
    EventsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
