import { Module } from '@nestjs/common';
import { configurationModule } from '@app/shared';
import { TcpClientsModule } from './tcp-clients.module';

@Module({ imports: [configurationModule('gateway'), TcpClientsModule] })
export class GatewayModule {}
