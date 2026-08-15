/**
 * Redirect the development server root to the default locale route.
 *
 * FumaPress emits locale-prefixed routes in development. Production output is
 * normalized separately so the default locale remains available at `/`.
 *
 * @param {string} locale
 * @returns {import('waku/config').VitePlugin}
 */
export function defaultLocaleDevPlugin(locale) {
  return {
    name: 'ai-dsh-book:default-locale-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const url = new URL(request.url ?? '/', 'http://localhost');
        if (url.pathname !== '/') {
          next();
          return;
        }

        response.statusCode = 307;
        response.setHeader('Location', `/${locale}${url.search}`);
        response.end();
      });
    },
  };
}
