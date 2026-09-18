import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from './get-user-by-email.query';
import { UserContract } from 'libs/contracts/identity/user/user.contract';
import { UserRepositoryPort } from '../../ports/user-repository.port';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler implements IQueryHandler<
  GetUserByEmailQuery,
  UserContract
> {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(query: GetUserByEmailQuery): Promise<UserContract> {
    const user = await this.userRepository.findByEmail(query.emailAddress);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id.value(),
      emailAddress: user.emailAddress.value(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}