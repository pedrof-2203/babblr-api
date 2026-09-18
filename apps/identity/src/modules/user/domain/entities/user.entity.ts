import { ConflictException } from '@nestjs/common';
import { Entity, EntityProps } from 'libs/shared/domain/entities/entity';
import {
  DisplayName,
  EmailAddress,
  PasswordHash,
  UserId
} from '../value-objects';

interface UserProps extends EntityProps {
  id?: UserId;
  displayName: DisplayName;
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
      displayName: props.displayName,
      emailAddress: props.emailAddress,
      passwordHash: props.passwordHash,
      createdAt: now,
      updatedAt: now
    });
  }

  static restore(props: UserProps): User {
    return new User({
      id: props.id,
      displayName: props.displayName,
      emailAddress: props.emailAddress,
      passwordHash: props.passwordHash,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt
    });
  }

  get userId(): UserId {
    return this.id;
  }

  get displayName(): DisplayName {
    return this.props.displayName;
  }

  get emailAddress(): EmailAddress {
    return this.props.emailAddress;
  }

  get passworHash(): PasswordHash {
    return this.props.passwordHash;
  }

  changeName(newName: DisplayName): void {
    if (newName.equals(this.props.displayName)) {
      return;
    }
    this.props.displayName = newName;
    this.touch();
  }

  changeEmail(newAddress: EmailAddress): void {
    if (newAddress.equals(this.props.emailAddress)) {
      return;
    }
    this.props.emailAddress = newAddress;
    this.touch();
  }

  changePassword(newPassword: PasswordHash): void {
    if (newPassword.equals(this.props.passwordHash)) {
      return;
    }
    this.props.passwordHash = newPassword;
    this.touch();
  }
}
