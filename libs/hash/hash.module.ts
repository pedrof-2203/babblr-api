import { Module } from '@nestjs/common';
import { HashPort } from './domain/ports/hash.port';
import { BcryptHashAdapter } from './infrastructure/adapters/bcrypt-hash.adapter';

@Module({
  providers: [{ provide: HashPort, useClass: BcryptHashAdapter }],
  exports: [HashPort]
})
export class HashModule {}
