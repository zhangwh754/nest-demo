import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { GlobalModuleModule } from './global-module/global-module.module'
import { FileModule } from './file/file.module'
import { AuthGuard } from './app/guard'
import { EventsModule } from './events/events.module'
import { TypeOrmConfig } from './app/config/typeorm'
import { CategoryModule } from './category/category.module'
import { ArticleModule } from './article/article.module'
import { TagModule } from './tag/tag.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(TypeOrmConfig), // typeOrm模块
    GlobalModuleModule.forRoot({ url: 'concatUrl' }), // 全局模块
    AuthModule,
    UserModule,
    FileModule,
    EventsModule,
    CategoryModule,
    ArticleModule,
    TagModule,
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
