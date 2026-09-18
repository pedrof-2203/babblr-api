import { UniqueId } from '../value-objects/unique-id';

export interface EntityProps {
  id?: UniqueId;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class Entity<TProps extends EntityProps> {
  protected readonly props: TProps;

  protected constructor(props: TProps) {
    this.props = { ...props };
  }

  getProps(): TProps {
    return { ...this.props };
  }

  get id(): TProps['id'] {
    return this.props.id;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  protected touch(): void {
    this.props.updatedAt = new Date();
  }
}
