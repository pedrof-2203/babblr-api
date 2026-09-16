import { Module } from '@nestjs/common';
import { MessagingController } from './messaging.controller';

@Module({
  imports: [],
  controllers: [MessagingController]
})
export class MessagingModule {}
