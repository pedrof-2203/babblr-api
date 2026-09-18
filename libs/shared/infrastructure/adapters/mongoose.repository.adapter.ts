import { Model, UpdateQuery } from 'mongoose';
import { RepositoryPort } from '../../application/ports/repository.port';

interface MongooseRecord {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export abstract class MongooseRepositoryAdapter<
  TEntity,
  TRecord extends MongooseRecord
> extends RepositoryPort<TEntity> {
  protected constructor(protected readonly model: Model<TRecord>) {
    super();
  }

  async findAll(): Promise<TEntity[]> {
    const records = await this.model.find().lean<TRecord[]>().exec();
    return records.map((record) => this.toDomain(record));
  }

  async save(entity: TEntity): Promise<void> {
    const { _id, createdAt, ...props } = this.toPersistence(entity);

    await this.model
      .updateOne(
        { _id },
        {
          $set: props,
          $setOnInsert: { createdAt }
        } as UpdateQuery<TRecord>,
        { upsert: true, runValidators: true, timestamps: false }
      )
      .exec();
  }

  async findById(id: string): Promise<TEntity | null> {
    const record = await this.model.findById(id).lean<TRecord>().exec();
    return record ? this.toDomain(record) : null;
  }

  async deleteById(id: string): Promise<void> {
    await this.model.deleteOne({ _id: id }).exec();
  }

  protected abstract toDomain(record: TRecord): TEntity;
  protected abstract toPersistence(entity: TEntity): TRecord;
}
