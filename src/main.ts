import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthenticationGuardGuard } from './guard/auth/authentication-guard/authentication-guard.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
  app.useGlobalGuards(new AuthenticationGuardGuard());
  await app.listen(3000);
}
bootstrap();
