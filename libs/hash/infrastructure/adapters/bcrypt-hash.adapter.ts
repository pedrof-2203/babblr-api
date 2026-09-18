import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashPort } from '../../domain/ports/hash.port';

@Injectable()
export class BcryptHashAdapter extends HashPort {
  hash(value: string): Promise<string> {
    return bcrypt.hash(value, 12);
  }

  compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
