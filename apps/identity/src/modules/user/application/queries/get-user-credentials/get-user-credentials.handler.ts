import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserCredentialsCommand } from './get-user-credentials.query';
import { UserCredentials } from 'libs/contracts/identity/user/user-credentials.contract';
import { UserRepositoryPort } from '../../ports/user-repository.port';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetUserCredentialsCommand)
export class GetUserCredentialsHandler implements ICommandHandler<
  GetUserCredentialsCommand,
  UserCredentials
> {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(command: GetUserCredentialsCommand): Promise<UserCredentials> {
    const user = await this.userRepository.findByEmail(command.emailAddress);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id.toString(),
      emailAddress: user.emailAddress.toString(),
      passwordHash: user.passworHash.value()
    };
  }
}
