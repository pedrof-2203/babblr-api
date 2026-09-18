import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from './delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<
  DeleteUserCommand,
  void
> {
  async execute(command: DeleteUserCommand): Promise<void> {}
}
