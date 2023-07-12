import { ValidationPipeOptions } from '@nestjs/common'

export const validationPipeConfig: ValidationPipeOptions = {
  transform: true,
  transformOptions: { enableImplicitConversion: true },
}
