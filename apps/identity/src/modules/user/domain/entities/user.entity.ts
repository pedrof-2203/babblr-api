import { ConflictException } from '@nestjs/common';
import { Entity, EntityProps } from 'libs/shared/domain/entities/entity';
import { EmailAddress, PasswordHash, UserId } from '../value-objects';

interface UserProps extends EntityProps {
  id?: UserId;
  emailAddress: EmailAddress;
  passwordHash: PasswordHash;
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps) {
    super(props);
  }

  static create(props: UserProps): User {
    const now = new Date();
    return new User({
      id: new UserId(),
      emailAddress: props.emailAddress,
      passwordHash: props.passwordHash,
      createdAt: now,
      updatedAt: now
    });
  }

  static restore(props: UserProps): User {
    return new User({
      id: props.id,
      emailAddress: props.emailAddress,
      passwordHash: props.passwordHash,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt
    });
  }

  get userId(): UserId {
    return this.id;
  }

  get emailAddress(): EmailAddress {
    return this.props.emailAddress;
  }

  get passworHash(): PasswordHash {
    return this.props.passwordHash;
  }

  changeEmail(newAddress: EmailAddress): void {
    if (newAddress.equals(this.props.emailAddress)) {
      throw new ConflictException();
    }
    this.props.emailAddress = newAddress;
    this.touch();
  }

  changePassword(newPassword: PasswordHash): void {
    if (newPassword.equals(this.props.passwordHash)) {
      throw new ConflictException();
    }
    this.props.passwordHash = newPassword;
    this.touch();
  }
}
