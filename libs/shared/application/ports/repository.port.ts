export abstract class RepositoryPort<TEntity> {
  abstract findAll(): Promise<TEntity[]>;
  abstract save(entity: TEntity): Promise<void>;
  abstract findById(id: string): Promise<TEntity | null>;
  abstract deleteById(id: string): Promise<void>;
}
