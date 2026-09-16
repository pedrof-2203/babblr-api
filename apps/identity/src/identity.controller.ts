import { HEALTH_PATTERN } from '@app/contracts';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class IdentityController {
  @MessagePattern(HEALTH_PATTERN)
  health() {
    return { service: 'identity', status: 'ok' };
  }
}
