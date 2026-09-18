import { Module } from '@nestjs/common';
import { UserHttpController } from './user-http.controller';
import { TcpClientsModule } from 'apps/gateway/src/tcp-clients.module';

@Module({
  imports: [TcpClientsModule],
  controllers: [UserHttpController]
})
export class UserGatewayModule {}
