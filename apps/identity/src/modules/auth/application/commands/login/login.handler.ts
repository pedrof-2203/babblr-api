import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { HashPort } from '@app/hash';
import { JwtService } from '@nestjs/jwt';
import { GetUserCredentialsCommand } from 'apps/identity/src/modules/user/application/queries/get-user-credentials/get-user-credentials.query';
import { UserCredentials } from 'libs/contracts/identity/user/user-credentials.contract';
import { UnauthorizedException } from '@nestjs/common';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand, string> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly bcryptAdapter: HashPort,
    private readonly jwtService: JwtService
  ) {}

  async execute(command: LoginCommand): Promise<string> {
    const user = await this.queryBus.execute<
      GetUserCredentialsCommand,
      UserCredentials
    >(new GetUserCredentialsCommand(command.emailAddress));


    const isValid: boolean = await this.bcryptAdapter.compare(
      command.plainPassword,
      user.passwordHash
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      emailAddress: user.emailAddress
    };

    return await this.jwtService.signAsync(payload);
  }
}
