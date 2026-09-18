import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { commandHandlers } from './application/commands';
import { UserRepositoryPort } from './application/ports/user-repository.port';
import { queryHandlers } from './application/queries';
import { MongooseUserRepositoryAdapter } from './infrastructure/adapters/mongoose-user.repository.adapter';
import { User, UserSchema } from './infrastructure/schemas/user.schema';
import { UserMessageController } from './user-message.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { HashModule } from '@app/hash';

@Module({
  imports: [
    CqrsModule,
    DatabaseModule.forRootAsync({
      imports: [ConfigModule.forRoot({ envFilePath: 'apps/identity/.env' })],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.getOrThrow<string>('MONGODB_URI')
      })
    }),
    HashModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UserMessageController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    {
      provide: UserRepositoryPort,
      useClass: MongooseUserRepositoryAdapter
    }
  ],
  exports: [CqrsModule, UserRepositoryPort]
})
export class UserModule {}
