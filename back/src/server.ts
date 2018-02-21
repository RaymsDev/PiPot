import { ConsoleLogger } from './utils/logger.class';
import * as express from 'express';

import {
  SigfoxController
} from './controllers/sigfox.controller';
import {
  RestServer
} from './server.rest';


//To load .env file as ENV variable
require("env2")(".env");

export const PORT = normalizePort(process.env.PORT || 3000);
export const PREFIX = "/api";

const server = RestServer.start(express(), PORT, PREFIX);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: number | string): number | string {
  const port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) {
    return val;
  } else if (port >= 0) {
    return port;
  } else {
    return 3001;
  }
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = (typeof PORT === 'string') ? 'Pipe ' + PORT : 'Port ' + PORT;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address();
  const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  //debug(`Listening on ${bind}`);
}

process.on('SIGUSR2', () => {
  process.exit(0);
});


const IOT_HUB_CONNECTION_STRING = process.env.IOT_HUB_CONNECTION_STRING;


const iotHubClient = require('./utils/iotHubReaderClient');
var iotHubReader = new iotHubClient(IOT_HUB_CONNECTION_STRING, "pipotConsumer");
iotHubReader.startReadMessage(function (obj, date) {
  try {
    SigfoxController.create(obj)
    .then(measure=>{
      ConsoleLogger.info(measure);
    })
    .catch(error=>{
      ConsoleLogger.error(error);
    });
  } catch (err) {
    ConsoleLogger.error(err);
  }
});