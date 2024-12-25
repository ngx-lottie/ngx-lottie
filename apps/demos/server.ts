import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');

  const engine = new AngularNodeAppEngine();

  server.get(
    '**',
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: 'index.html',
    }),
  );

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    engine
      .handle(req)
      .then(response => {
        if (response) {
          writeResponseToNodeResponse(response, res);
        } else {
          next();
        }
      })
      .catch(next);
  });

  return server;
}

const server = app();

if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4200;
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:\${port}`);
  });
}

console.warn('Node Express server started');

export const reqHandler = createNodeRequestHandler(server);
