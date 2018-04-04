import express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { Request, Response } from 'express-serve-static-core';
import { configure, getLogger, connectLogger } from 'log4js';
import config from 'config';

import { SurfingController } from './controllers/SurfingController';
import { SwaggerController } from './controllers/SwaggerController';
import IConfig from './Interfaces/IConfig';
import ErrorResponse from './models/ErrorResponse';
import * as Utils from './services/Utils';

configure('./config/log4js.json');
const log = getLogger('app');
const settingsConfig = config.get<IConfig>('config');
Utils.InitiateDatabase(log, settingsConfig);

const app = express();
app.use(connectLogger(getLogger('http'), { level: 'auto' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', SurfingController);
app.use('/', SwaggerController);

app.use((req: Request, res: Response, next: any) => {
  next(new Error('Not Found'));
});

app.use((err: any, req: Request, res: Response, next: any) => {
  log.error('Something went wrong:', err);
  res.status(err.message === 'Not Found' ? 400 : 500);
  res.send(new ErrorResponse(err.message));
});

app.listen(settingsConfig.hostingPort);