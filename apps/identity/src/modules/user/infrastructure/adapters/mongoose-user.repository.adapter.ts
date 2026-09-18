import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseRepositoryAdapter } from 'libs/shared/infrastructure/adapters/mongoose.repository.adapter';
import { UserRepositoryPort } from '../../application/ports/user-repository.port';
import { User } from '../../domain/entities/user.entity';
import { EmailAddress, PasswordHash, UserId } from '../../domain/value-objects';
import { User as UserRecord } from '../schemas/user.schema';

@Injectable()
export class MongooseUserRepositoryAdapter
  extends MongooseRepositoryAdapter<User, UserRecord>
  implements UserRepositoryPort
{
  constructor(
    @InjectModel(UserRecord.name)
    userModel: Model<UserRecord>
  ) {
    super(userModel);
  }

  async findByEmail(emailAddress: string): Promise<User | null> {
    const record = await this.model
      .findOne({ emailAddress: new EmailAddress(emailAddress).value() })
      .lean()
      .exec();
    return record ? this.toDomain(record) : null;
  }

  protected toDomain(record: UserRecord): User {
    return User.restore({
      id: new UserId(record._id),
      emailAddress: new EmailAddress(record.emailAddress),
      passwordHash: new PasswordHash(record.passwordHash),
      createdAt: record.createdAt,
      updatedAt: record.updatedAt
    });
  }

  protected toPersistence(user: User): UserRecord {
    const props = user.getProps();

    return {
      _id: user.userId.value(),
      emailAddress: props.emailAddress.value(),
      passwordHash: props.passwordHash.value(),
      createdAt: props.createdAt,
      updatedAt: props.updatedAt
    };
  }
}
