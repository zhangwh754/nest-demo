import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { GlobalModuleModule } from './global-module/global-module.module'
import { FileModule } from './file/file.module'
import { AuthGuard } from './app/guard'

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    GlobalModuleModule.forRoot({ url: 'concatUrl' }),
    FileModule,
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
