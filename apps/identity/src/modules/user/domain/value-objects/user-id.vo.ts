import { UniqueId } from 'libs/shared/domain/value-objects/unique-id';

export class UserId extends UniqueId {
  constructor(id?: string) {
    super(id);
  }
}
