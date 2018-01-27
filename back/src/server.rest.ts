import { Routes } from './routes';
import * as express from "express";
import * as http from 'http';
import * as mongoose from "mongoose";
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

const PORT: number = 3000;
const PREFIX: string = "/";
const MONGODB_URI: string = "mongodb://localhost:27017/pipot";

export class RestServer {
  
  public static start(app: express.Express, port: number|string = PORT, routePrefix: string = PREFIX): http.Server {
    
    this.config(app);
    // IMPORTANT: Routes must be defined AFTER the initialization of the app
    // so that it can use the configured middleware!
    app.use(routePrefix, Routes);

    const server = app.listen(port,()=>{
      console.log(`REST SERVER started on port ${port} !`);
    });

    this.initHeader(app);

    return server;
  }

  private static config(app: express.Express) {
    this.mongoConnection();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(logger("dev"));
  }

  private static mongoConnection(){
    mongoose.connect(MONGODB_URI || process.env.MONGODB_URI);

  }

  private static initHeader(app: express.Express) {
    app.use((req: express.Request, res: express.Response, next) => {
      // Request methods you wish to allow
      // cors
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
  }
  
}

