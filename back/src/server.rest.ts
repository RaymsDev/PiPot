import {
  ConsoleLogger
} from './utils/logger.class';
import {
  Routes
} from './routes';
import * as express from "express";
import * as http from 'http';
import * as mongoose from "mongoose";
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';

//To load .env file as ENV variable
require("env2")(".env");

const PREFIX: string = "/";
const MONGO_DB_URI: string = process.env.MONGODB_URI || "mongodb://localhost:27017/pipot";

export class RestServer {

  public static start(app: express.Express, port: number | string, routePrefix: string = PREFIX): http.Server {

    this.config(app);
    // IMPORTANT: Routes must be defined AFTER the initialization of the app
    // so that it can use the configured middleware!
    app.use(routePrefix, Routes);
    const server = app.listen(port, () => {
      ConsoleLogger.info(`REST SERVER started on port ${port} !`);
    });

    this.initHeader(app);

    return server;
  }

  private static config(app: express.Express) {
    this.mongoConnection();
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    app.use(morgan("dev"));
  }

  private static mongoConnection() {
    const env = process.env.ENV;
    if (env == "prod") {
      const MONGODB_HOST = process.env.MONGO_DB_HOST;
      const MONGODB_USER = process.env.MONGO_DB_USER;
      const MONGODB_PASS = process.env.MONGO_DB_PASS;
      mongoose.connect(MONGODB_HOST, {
          user: MONGODB_USER,
          pass: MONGODB_PASS
        })
        .catch(error => {
          ConsoleLogger.error(error);
        });
      return;
    }

    mongoose.connect(MONGO_DB_URI)
      .catch(error => {
        ConsoleLogger.error(error);
      });


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