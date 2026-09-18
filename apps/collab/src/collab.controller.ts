import { HEALTH_PATTERN } from 'libs/contracts';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class CollabController {
  @MessagePattern(HEALTH_PATTERN)
  health() {
    return { service: 'collab', status: 'ok' };
  }
}
