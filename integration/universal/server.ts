import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import * as express from 'express';

import { join } from 'path';
import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';

enableProdMode();

const app = express();

const PORT = process.env.PORT || 4200;
const BROWSER_FOLDER = join(process.cwd(), 'dist');

import { AppServerModuleNgFactory } from './dist-server/main';

app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory
  })
);

app.set('view engine', 'html');
app.set('views', BROWSER_FOLDER);

app.get('/stop', (req, res) => {
  res.end();

  res.on('finish', () => {
    console.log('Stopping express server');
    process.exit(0);
  });
});

app.get('*.*', express.static(BROWSER_FOLDER));

app.get('*', (req, res) => {
  res.render('index', { req });
});

app.listen(PORT, () => {
  console.log(`Express server is running and listening at http://localhost:${PORT}`);
});
