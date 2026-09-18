import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { IDENTITY_SERVICE } from 'libs/contracts';
import { CreateUserContract } from 'libs/contracts/identity/user/commands/create-user.contract';
import { UserPatterns } from 'libs/contracts/identity/user/patterns';
import { CurrentUserContract } from 'libs/contracts/identity/user/queries/current-user.contract';
import { UserContract } from 'libs/contracts/identity/user/user.contract';
import { CurrentUser } from 'libs/decorators/current-user.decorator';
import { Public } from 'libs/decorators/public.decorator';
import { firstValueFrom } from 'rxjs';

@ApiTags('Users')
@Controller('users')
export class UserHttpController {
  constructor(
    @Inject(IDENTITY_SERVICE)
    private readonly identityClient: ClientProxy
  ) {}

  @Get('currentUser')
  async findCurrentUser(
    @CurrentUser() currentUser: CurrentUserContract
  ): Promise<UserContract> {
    const user = await firstValueFrom(
      this.identityClient.send(UserPatterns.FIND_BY_ID, { id: currentUser.sub })
    );
    return user;
  }

  @Public()
  @Post('signUp')
  async create(
    @Body() contract: CreateUserContract.Request
  ): Promise<CreateUserContract.Response> {
    const userId = await firstValueFrom(
      this.identityClient.send(UserPatterns.CREATE, contract)
    );
    return {
      id: userId,
      message: 'User created'
    };
  }
}
