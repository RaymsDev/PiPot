import * as express from 'express';
import { PREFIX } from './server';
import MeasureRouter from './routes/measure.router';

const app = express();
app.use("/measure", MeasureRouter) ;

export var Routes: express.Express = app;