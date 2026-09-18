import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UserRepositoryPort } from '../../ports/user-repository.port';
import { User } from '../../../domain/entities/user.entity';
import { HashPort } from '@app/hash';
import { ConflictException } from '@nestjs/common';
import { EmailAddress, PasswordHash } from '../../../domain/value-objects';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<
  CreateUserCommand,
  string
> {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly bcryptAdapter: HashPort
  ) {}

  async execute(command: CreateUserCommand): Promise<string> {
    const userExists: boolean =
      (await this.userRepository.findByEmail(command.emailAddress)) != null;

    if (userExists) {
      throw new ConflictException(
        'A user with this email address already exists'
      );
    }

    const user = User.create({
      emailAddress: new EmailAddress(command.emailAddress),
      passwordHash: new PasswordHash(
        await this.bcryptAdapter.hash(command.plainPassword)
      )
    });

    await this.userRepository.save(user);

    return user.id.toString();
  }
}
