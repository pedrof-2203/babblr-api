import { randomInt } from 'node:crypto';

export class DisplayName {
  private readonly _value: string;

  constructor(name?: string | null) {
    if (name != null && typeof name !== 'string') {
      throw new TypeError('Display name must be a string');
    }

    const trimmed = name?.trim();
    this._value = trimmed || `user${randomInt(10_000_000_000, 100_000_000_000)}`;

    Object.freeze(this);
  }

  value(): string {
    return this._value;
  }

  equals(other: DisplayName): boolean {
    return other instanceof DisplayName && this._value === other.value();
  }

  toString(): string {
    return this._value;
  }

  toJSON(): string {
    return this._value;
  }
}
