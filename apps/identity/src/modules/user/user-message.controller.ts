import { Controller, HttpException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CreateUserContract } from 'libs/contracts/identity/user/commands/create-user.contract';
import { CreateUserCommand } from './application/commands/create-user/create-user.command';
import { GetUserByIdQuery } from './application/queries/get-user-by-id/get-user-by-id.query';
import { User } from './domain/entities/user.entity';
import { UserContract } from 'libs/contracts/identity/user/user.contract';
import { UserPatterns } from 'libs/contracts/identity/user/patterns';

@Controller()
export class UserMessageController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @MessagePattern({ cmd: 'identity.user.create' })
  async create(@Payload() contract: CreateUserContract.Request) {
    try {
      await this.commandBus.execute(
        new CreateUserCommand(contract.emailAddress, contract.plainPassword)
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw new RpcException({
          statusCode: error.getStatus(),
          response: error.getResponse()
        });
      }
      throw error;
    }

    return { message: 'User created' };
  }

  @MessagePattern(UserPatterns.FIND_BY_ID)
  async findById(@Payload('id') id: string) {
    const user = await this.queryBus.execute<GetUserByIdQuery, User>(
      new GetUserByIdQuery(id)
    );
    return this.toContract(user);
  }

  private toContract(user: User): UserContract {
    return {
      id: user.id.value(),
      emailAddress: user.emailAddress.value(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}
