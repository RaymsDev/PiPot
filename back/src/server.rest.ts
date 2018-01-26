import { Routes } from './routes';
import * as express from "express";
import * as http from 'http';

const PORT: number = 3000;
const PREFIX: string = "/";

export class RestServer {
  public static start(app: express.Express, port: number = PORT, routePrefix: string = PREFIX): http.Server {
    
    // IMPORTANT: Routes must be defined AFTER the initialization of the app
    // so that it can use the configured middleware!
    app.use(routePrefix, Routes);

    const server = app.listen(port,()=>{
      console.log(`REST SERVER started on port ${port} !`);
    });

    this.init(app);
    this.initHeader(app);

    return server;
  }

  private static init(app: express.Express) {

  }

  private static initHeader(app: express.Express) {
    app.use((req: express.Request, res: express.Response) => {
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET');
    });
  }
}