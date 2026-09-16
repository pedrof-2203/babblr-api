import { microserviceConfig } from '@app/shared';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CollabModule } from './collab.module';

async function bootstrap(): Promise<void> {
  const options = await microserviceConfig('collab');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CollabModule,
    { transport: Transport.TCP, options }
  );
  app.enableShutdownHooks();
  await app.listen();
  Logger.log(
    `Collab listening on TCP ${options.host}:${options.port}`,
    'Bootstrap'
  );
}

void bootstrap().catch((error: unknown) => {
  Logger.error(error, undefined, 'Bootstrap');
  process.exitCode = 1;
});
