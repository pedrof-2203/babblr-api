import 'reflect-metadata';
import { strict as assert } from 'node:assert';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { setTimeout as delay } from 'node:timers/promises';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import {
  COLLAB_SERVICE,
  IDENTITY_SERVICE,
  MESSAGING_SERVICE,
  HEALTH_PATTERN
} from 'libs/contracts';

async function verify(): Promise<void> {
  const processes = ['gateway', 'collab', 'identity', 'messaging'].map((app) =>
    spawn(process.execPath, [`dist/apps/${app}/main.js`], {
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true
    })
  );
  const output = processes.map(() => '');
  processes.forEach((child, index) => {
    child.stdout.on('data', (data: Buffer) => {
      output[index] += data.toString();
    });
    child.stderr.on('data', (data: Buffer) => {
      output[index] += data.toString();
    });
  });
  let gateway:
    | Awaited<ReturnType<typeof NestFactory.createApplicationContext>>
    | undefined;
  try {
    for (let attempt = 0; attempt < 100; attempt++) {
      assert(
        processes.every((child) => child.exitCode === null),
        output.join('\n')
      );
      if (output.every((log) => log.includes('listening on'))) break;
      await delay(100);
    }
    assert(
      output.every((log) => log.includes('listening on')),
      output.join('\n')
    );
    // Load gateway configuration only after spawning: ConfigModule writes defaults
    // to process.env, which must not leak into the independent service processes.
    const { GatewayModule } = createRequire(__filename)(
      '../apps/gateway/src/gateway.module'
    ) as typeof import('../apps/gateway/src/gateway.module');
    // Resolve the actual gateway providers, rather than constructing test clients.
    gateway = await NestFactory.createApplicationContext(GatewayModule, {
      logger: false,
      abortOnError: false
    });
    const config = gateway.get(ConfigService);
    for (const [token, service] of [
      [COLLAB_SERVICE, 'collab'],
      [IDENTITY_SERVICE, 'identity'],
      [MESSAGING_SERVICE, 'messaging']
    ]) {
      const client = gateway.get<ClientProxy>(token);
      const response: unknown = await firstValueFrom(
        client.send(HEALTH_PATTERN, {}).pipe(timeout(3000))
      );
      assert.deepEqual(response, { service, status: 'ok' });
      console.log(`Gateway -> ${service}: OK`);
    }
    const base = `http://127.0.0.1:${config.getOrThrow<number>('PORT')}`;
    assert.equal((await fetch(`${base}/docs`)).status, 200);
    const document = await fetch(`${base}/docs-json`);
    assert.equal(document.status, 200);
    assert.equal((await fetch(`${base}/api`)).status, 404);
    console.log('HTTP Swagger and existing empty API: OK');
    console.log(output.join('\n'));
  } finally {
    await gateway?.close();
    for (const child of processes) child.kill();
  }
}

void verify().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
