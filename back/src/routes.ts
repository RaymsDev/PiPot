import * as express from 'express';
import { PREFIX } from './server';
import MeasureRouter from './routes/measure.router';
import SigfoxRouter from './routes/sigfox.router';

const app = express();
app.use("/measure", MeasureRouter) ;
app.use("/sigfox", SigfoxRouter);

export var Routes: express.Express = app;