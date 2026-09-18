import { isEmail } from 'class-validator';

export class EmailAddress {
  private readonly _value: string;

  constructor(address: string) {
    if (typeof address !== 'string') {
      throw new TypeError('Email address must be a string');
    }

    if (/\p{Cc}/u.test(address)) {
      throw new Error('Invalid email address');
    }

    const trimmed = address.trim();

    if (
      !isEmail(trimmed, {
        allow_display_name: false,
        allow_utf8_local_part: false,
        allow_ip_domain: false,
        require_tld: true,
        ignore_max_length: false
      })
    ) {
      throw new Error('Invalid email address');
    }

    const separator = trimmed.lastIndexOf('@');
    this._value =
      trimmed.slice(0, separator + 1) +
      trimmed.slice(separator + 1).toLowerCase();

    Object.freeze(this);
  }

  value(): string {
    return this._value;
  }

  equals(other: EmailAddress): boolean {
    return other instanceof EmailAddress && this._value === other.value();
  }

  toString(): string {
    return this._value;
  }

  toJSON(): string {
    return this._value;
  }
}
