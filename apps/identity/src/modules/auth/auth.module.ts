import { Module } from '@nestjs/common';
import { AuthMessageController } from './auth-message.controller';
import { commandHandlers } from './application/commands';
import { UserModule } from '../user/user.module';
import { HashModule } from '@app/hash';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'libs/decorators/auth.guard';

@Module({
  imports: [
    ConfigModule,
    HashModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: '3600s' }
      })
    }),
    UserModule
  ],
  controllers: [AuthMessageController],
  providers: [
    ...commandHandlers,
  ]
})
export class AuthModule {}
