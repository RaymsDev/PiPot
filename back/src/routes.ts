import * as express from 'express';

import GreenhouseRouter from './routes/greenhouse.router';
import MeasureRouter from './routes/measure.router';
import SigfoxRouter from './routes/sigfox.router';

const app = express();
app.use("/measure", MeasureRouter);
app.use("/sigfox", SigfoxRouter);
app.use("/greenhouse", GreenhouseRouter);

export var Routes: express.Express = app;