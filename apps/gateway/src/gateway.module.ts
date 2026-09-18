import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { configurationModule } from '@app/shared';
import { TcpClientsModule } from './tcp-clients.module';
import { UserGatewayModule } from './modules/identity/user/user-gateway.module';
import { AuthGatewayModule } from './modules/identity/auth/auth-gateway.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'libs/decorators/auth.guard';

@Module({
  imports: [
    configurationModule('gateway'),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET')
      })
    }),
    TcpClientsModule,
    UserGatewayModule,
    AuthGatewayModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class GatewayModule {}
