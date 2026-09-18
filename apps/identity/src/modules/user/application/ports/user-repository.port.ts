import { RepositoryPort } from 'libs/shared/application/ports/repository.port';
import { User } from '../../domain/entities/user.entity';

export abstract class UserRepositoryPort extends RepositoryPort<User> {
  abstract findByEmail(emailAddress: string): Promise<User | null>;
}
