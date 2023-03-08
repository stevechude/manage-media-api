import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseFormatInterceptor } from './interceptors/response-format.interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // this pipes is needed to allow the validation of the request body
  // via the dto's
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new ResponseFormatInterceptor());
  await app.listen(3333);
}
bootstrap();
