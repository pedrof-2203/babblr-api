import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginContract } from 'libs/contracts/identity/auth/login.contract';
import { LoginCommand } from './application/commands/login/login.command';
import { AuthPatterns } from 'libs/contracts/identity/auth/patterns';

@Controller()
export class AuthMessageController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern(AuthPatterns.LOGIN)
  async login(@Payload() contract: LoginContract.Request): Promise<string> {
    return await this.commandBus.execute(
      new LoginCommand(contract.emailAddress, contract.plainPassword)
    );
  }
}
