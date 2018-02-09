import { RestServer } from './server.rest';
import * as express from "express";

//To load .env file as ENV variable
require("env2")(".env");

export const PORT = normalizePort(process.env.PORT || 3000);
export const PREFIX = "/api";

const server = RestServer.start(express(), PORT, PREFIX);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: number|string): number|string {
  const port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) { return val; } else if (port >= 0) { return port; } else { return 3001; }
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') { throw error; }
  const bind = (typeof PORT === 'string') ? 'Pipe ' + PORT: 'Port ' + PORT;
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

process.on('SIGUSR2', () => { process.exit(0); });

import {Registry, Device, Amqp} from "azure-iothub";
import { Client } from 'azure-iothub/lib/client';

var serviceConfig:Client.TransportConfigOptions = {
  host:"",
  keyName: 'keyname' ,
  hubName:"",
  sharedAccessSignature:""
};

var serviceAmqp = new Amqp(serviceConfig );

const IOT_HUB_CONNECTION_STRING=process.env.IOT_HUB_CONNECTION_STRING;
let registry = Registry.fromConnectionString(IOT_HUB_CONNECTION_STRING);

console.log("listening devices");
registry.list((err, deviceList)=>{
  deviceList.forEach((device) => {
    let key = device.authentication ? device.authentication.symmetricKey.primaryKey : '<no primary key>';
    console.log(device.deviceId + ': ' + key);
  });
});


function print(err, res) {
  if (err) console.log(err.toString());
  if (res) console.log(res.statusCode + ' ' + res.statusMessage);
}


serviceAmqp.getFeedbackReceiver((message)=>{
  console.log(message);
});