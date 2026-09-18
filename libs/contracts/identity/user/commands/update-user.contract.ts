import { PartialType } from '@nestjs/swagger';
import { CreateUserContract } from './create-user.contract';

export namespace UpdateUserContract {
  export class Request extends PartialType(CreateUserContract.Request) {}

  export interface Response {
    id: string;
    message: 'User updated'
  }
}