import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from './get-user-by-id.query';
import { UserRepositoryPort } from '../../ports/user-repository.port';
import { NotFoundException } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<
  GetUserByIdQuery,
  User
> {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(query: GetUserByIdQuery): Promise<User> {
    const user = await this.userRepository.findById(query.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
