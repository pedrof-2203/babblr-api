import { Module } from '@nestjs/common';
import { AuthHttpController } from './auth-http.controller';
import { TcpClientsModule } from 'apps/gateway/src/tcp-clients.module';

@Module({
  imports: [TcpClientsModule],
  controllers: [AuthHttpController]
})
export class AuthGatewayModule {}
