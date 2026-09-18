import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';
import { UserRepositoryPort } from '../../ports/user-repository.port';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<
  UpdateUserCommand,
  void
> {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(command: UpdateUserCommand): Promise<void> {}
}
