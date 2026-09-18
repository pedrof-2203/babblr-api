import {
  COLLAB_SERVICE,
  IDENTITY_SERVICE,
  MESSAGING_SERVICE
} from 'libs/contracts';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync(
      [
        { name: COLLAB_SERVICE, prefix: 'COLLAB' },
        { name: IDENTITY_SERVICE, prefix: 'IDENTITY' },
        { name: MESSAGING_SERVICE, prefix: 'MESSAGING' }
      ].map(({ name, prefix }) => ({
        name,
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.getOrThrow<string>(`${prefix}_HOST`),
            port: config.getOrThrow<number>(`${prefix}_PORT`)
          }
        })
      }))
    )
  ],
  exports: [ClientsModule]
})
export class TcpClientsModule {}
