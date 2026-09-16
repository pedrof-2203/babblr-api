import { microserviceConfig } from '@app/shared';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MessagingModule } from './messaging.module';

async function bootstrap(): Promise<void> {
  const options = await microserviceConfig('messaging');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MessagingModule,
    { transport: Transport.TCP, options }
  );
  app.enableShutdownHooks();
  await app.listen();
  Logger.log(
    `Messaging listening on TCP ${options.host}:${options.port}`,
    'Bootstrap'
  );
}

void bootstrap().catch((error: unknown) => {
  Logger.error(error, undefined, 'Bootstrap');
  process.exitCode = 1;
});
