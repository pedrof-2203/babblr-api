import { NestFactory } from '@nestjs/core';
import { CollabModule } from './collab.module';

async function bootstrap() {
  const app = await NestFactory.create(CollabModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
