import { Module } from '@nestjs/common';
import { CollabController } from './collab.controller';

@Module({
  imports: [],
  controllers: [CollabController]
})
export class CollabModule {}
