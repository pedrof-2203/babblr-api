import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { IDENTITY_SERVICE } from 'libs/contracts';
import { LoginContract } from 'libs/contracts/identity/auth/login.contract';
import { AuthPatterns } from 'libs/contracts/identity/auth/patterns';
import { Public } from 'libs/decorators/public.decorator';
import { firstValueFrom } from 'rxjs';

@ApiTags('Auth')
@Controller('auth')
export class AuthHttpController {
  constructor(
    @Inject(IDENTITY_SERVICE)
    private readonly identityClient: ClientProxy
  ) {}

  @Public()
  @Post('signIn')
  async login(
    @Body() contract: LoginContract.Request
  ): Promise<LoginContract.Response> {
    const accessToken: string = await firstValueFrom(
      this.identityClient.send(AuthPatterns.LOGIN, contract)
    );
    return {
      accessToken: accessToken
    };
  }
}
