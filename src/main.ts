import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { formatErrors } from './common/pipe/custom-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        exposeDefaultValues: true,
      },
      exceptionFactory: (errors: ValidationError[]) => {
        throw new BadRequestException(formatErrors(errors));
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
