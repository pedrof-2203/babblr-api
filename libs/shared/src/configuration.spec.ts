import { validateEnvironment } from './configuration';

describe('environment validation', () => {
  it('uses distinct development ports and separate bind/connect defaults', () => {
    const gateway = validateEnvironment({}, 'gateway');
    expect(gateway).toMatchObject({
      PORT: 3000,
      COLLAB_PORT: 3001,
      IDENTITY_PORT: 3002,
      MESSAGING_PORT: 3003,
      COLLAB_HOST: '127.0.0.1'
    });
    expect(validateEnvironment({}, 'collab').COLLAB_HOST).toBe('0.0.0.0');
  });

  it('converts environment port strings to numbers', () => {
    expect(
      validateEnvironment({ COLLAB_PORT: '4001' }, 'collab').COLLAB_PORT
    ).toBe(4001);
  });

  it.each(['', 'abc', '3001.5', '0', '65536', -1, false])(
    'rejects invalid port %p',
    (port) => {
      expect(() =>
        validateEnvironment({ COLLAB_PORT: port }, 'collab')
      ).toThrow('COLLAB_PORT');
    }
  );

  it('rejects duplicate ports, including the HTTP port', () => {
    expect(() => validateEnvironment({ COLLAB_PORT: 3000 }, 'gateway')).toThrow(
      'unique'
    );
    expect(() =>
      validateEnvironment({ IDENTITY_PORT: 3001 }, 'identity')
    ).toThrow('unique');
  });

  it.each(['', '  ', 123])('rejects empty or non-string host %p', (host) => {
    expect(() =>
      validateEnvironment({ IDENTITY_HOST: host }, 'identity')
    ).toThrow('IDENTITY_HOST');
  });
});
