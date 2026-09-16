import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

export const SERVICE_PORTS = {
  COLLAB: 3001,
  IDENTITY: 3002,
  MESSAGING: 3003
} as const;

export type Application = 'gateway' | 'collab' | 'identity' | 'messaging';

export function validateEnvironment(
  input: Record<string, unknown>,
  application: Application
): Record<string, unknown> {
  const values = { ...input };
  const ports = {
    PORT: 3000,
    ...Object.fromEntries(
      Object.entries(SERVICE_PORTS).map(([service, port]) => [
        `${service}_PORT`,
        port
      ])
    )
  };
  const assigned = new Set<number>();
  for (const [key, fallback] of Object.entries(ports)) {
    const raw = values[key] ?? fallback;
    const port =
      typeof raw === 'number' || typeof raw === 'string' ? Number(raw) : NaN;
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      throw new Error(`${key} must be an integer between 1 and 65535`);
    }
    if (assigned.has(port))
      throw new Error(`Ports must be unique: ${key}=${port}`);
    assigned.add(port);
    values[key] = port;
  }
  for (const service of Object.keys(SERVICE_PORTS)) {
    const key = `${service}_HOST`;
    const host =
      values[key] ?? (application === 'gateway' ? '127.0.0.1' : '0.0.0.0');
    if (typeof host !== 'string' || !host.trim()) {
      throw new Error(`${key} must be a non-empty host`);
    }
    values[key] = host.trim();
  }
  return values;
}

export function configurationModule(application: Application) {
  return ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `apps/${application}/.env`,
    validate: (values: Record<string, unknown>) =>
      validateEnvironment(values, application)
  });
}

// Initialize configuration only; never instantiate business providers twice.
export async function microserviceConfig(
  application: Exclude<Application, 'gateway'>
) {
  const context = await NestFactory.createApplicationContext(
    configurationModule(application),
    { abortOnError: false }
  );
  try {
    const config = context.get(ConfigService);
    const prefix = application.toUpperCase();
    return {
      host: config.getOrThrow<string>(`${prefix}_HOST`),
      port: config.getOrThrow<number>(`${prefix}_PORT`)
    };
  } finally {
    await context.close();
  }
}
