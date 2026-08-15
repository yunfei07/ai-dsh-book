import assert from 'node:assert/strict';
import test from 'node:test';
import { defaultLocaleDevPlugin } from './default-locale-dev-plugin.mjs';

/**
 * @typedef {(request: { url?: string }, response: TestResponse, next: () => void) => void} TestMiddleware
 * @typedef {{ statusCode: number, setHeader: (name: string, value: string) => void, end: () => void }} TestResponse
 * @typedef {(server: { middlewares: { use: (handler: TestMiddleware) => void } }) => void} ConfigureServer
 */

function createHarness() {
  /** @type {TestMiddleware | undefined} */
  let middleware;
  const plugin = defaultLocaleDevPlugin('zh');
  const configureServer = /** @type {ConfigureServer} */ (
    /** @type {unknown} */ (plugin.configureServer)
  );

  configureServer({
    middlewares: {
      use(handler) {
        middleware = handler;
      },
    },
  });

  assert.ok(middleware);
  return middleware;
}

test('redirects the development root to the default locale', () => {
  const middleware = createHarness();
  const headers = new Map();
  let ended = false;
  let continued = false;
  /** @type {TestResponse} */
  const response = {
    statusCode: 200,
    setHeader(name, value) {
      headers.set(name, value);
    },
    end() {
      ended = true;
    },
  };

  middleware(
    { url: '/?ref=local' },
    response,
    () => {
      continued = true;
    },
  );

  assert.equal(response.statusCode, 307);
  assert.equal(headers.get('Location'), '/zh?ref=local');
  assert.equal(ended, true);
  assert.equal(continued, false);
});

test('passes non-root requests through unchanged', () => {
  const middleware = createHarness();
  let continued = false;
  /** @type {TestResponse} */
  const response = {
    statusCode: 200,
    setHeader() {},
    end() {},
  };

  middleware(
    { url: '/zh/getting-started' },
    response,
    () => {
      continued = true;
    },
  );

  assert.equal(continued, true);
});
