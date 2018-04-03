import express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { Request, Response } from 'express-serve-static-core';
import mongoose from 'mongoose';
import { configure, getLogger, connectLogger } from 'log4js';

import { SurfingController } from './controllers/SurfingController';
import { SwaggerController } from './controllers/SwaggerController';

const app = express();

configure('./config/log4js.json');
const log = getLogger('app');

// Connect to MongoDB
const mongoUrl = 'mongodb://localhost:27017/sofomoTestDb';
mongoose.connect(mongoUrl).then(() => log.info('Connected to MongoDB'),
).catch(err => {
    log.error('MongoDB connection error. Please make sure MongoDB is running. ', err);
});

app.use(connectLogger(getLogger('http'), { level: 'auto' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', SurfingController);
app.use('/', SwaggerController);

app.use((req: Request, res: Response, next: any) => {
  next(new Error('Not Found'));
});

if (app.get('env') === 'development') {
  app.use((err: any, req: Request, res: Response, next: any) => {
      log.error('Something went wrong:', err);
      res.status(err.message === 'Not Found' ? 400 : 500);
      res.send(`Error message: ${err.message}, error: ${err}`);
  });
}

app.use((err: any, req: Request, res: Response, next: any) => {
  log.error('Something went wrong:', err);
  res.status(err.message === 'Not Found' ? 400 : 500);
  res.send(`Error: ${err.message}`);
});

app.listen(3001);