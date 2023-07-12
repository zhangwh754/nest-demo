import { Module, DynamicModule, Global } from '@nestjs/common'

type Options = {
  url: string
}

@Global()
@Module({})
export class GlobalModuleModule {
  static forRoot(options: Options): DynamicModule {
    const customModule = { provide: 'AAA', useValue: 'baseUrl' + options.url }

    return {
      module: GlobalModuleModule,
      providers: [customModule],
      exports: [customModule],
    }
  }
}
