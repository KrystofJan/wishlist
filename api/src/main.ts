import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });
  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get<number>('port') ?? 3000);
}
bootstrap();
