import 'zone.js/node';
import 'reflect-metadata';

import { join } from 'path';
import { readFileSync } from 'fs';
import * as express from 'express';

const {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  AppServerModuleNgFactory,
  renderModuleFactory,
} = require('../dist-integration-server/main');

const PORT = process.env.PORT || 4200;
const DIST_FOLDER = join(__dirname, '../dist-integration');

const app = express();
// Read `index.html` only once and cache it
const document = readFileSync(join(DIST_FOLDER, 'index.html')).toString();

app.use(express.static(DIST_FOLDER, { index: false }));

app.get('*', async (req, res) => {
  const url = req.url;
  // eslint-disable-next-line no-console
  console.time(`GET: ${url}`);

  const html = await renderModuleFactory(AppServerModuleNgFactory, {
    url,
    document,
  });

  // eslint-disable-next-line no-console
  console.timeEnd(`GET: ${url}`);
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Express server is running and listening at http://localhost:${PORT}!`);
});
