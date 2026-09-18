import { inspect } from 'node:util';

/**
 * An opaque encoded hash supplied by a trusted password-hashing service.
 * Validates storage constraints, not algorithm syntax or password strength.
 * Never construct this from a plaintext password.
 */
export class PasswordHash {
  static readonly MAX_LENGTH = 1024;

  readonly #value: string;

  constructor(hash: string) {
    if (typeof hash !== 'string') {
      throw new TypeError('Password hash must be a string');
    }

    if (
      hash.length === 0 ||
      hash.length > PasswordHash.MAX_LENGTH ||
      /[^\x21-\x7e]/u.test(hash)
    ) {
      throw new Error('Invalid password hash');
    }

    this.#value = hash;
    Object.freeze(this);
  }

  /** Explicit access for persistence and password verification. */
  value(): string {
    return this.#value;
  }

  /** Compares stored encodings; does not verify a plaintext password. */
  equals(other: PasswordHash): boolean {
    return (
      other instanceof PasswordHash &&
      #value in other &&
      this.#value === other.#value
    );
  }

  toString(): string {
    return '[REDACTED]';
  }

  toJSON(): string {
    return '[REDACTED]';
  }

  [inspect.custom](): string {
    return '[REDACTED]';
  }
}
