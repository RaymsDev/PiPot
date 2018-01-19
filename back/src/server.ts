import * as http from 'http';
import * as https from 'https';

import App from "./app";
import {
  setInterval
} from 'timers';

const serverPort = process.env.PORT ||  3000;
App.set('port', serverPort);

const server = http.createServer(App);

server.listen(serverPort);
server.on('error', onError);
server.on('listening', onListening);

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;
  let bind = (typeof serverPort === 'string') ? 'Pipe ' + serverPort : 'Port ' + serverPort;
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
  let addr = server.address();
  let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}

const interval = 60 * 1000;

function getEvent() {
  const options: https.RequestOptions = {
    method: "GET",
    hostname: "pipot2.cumulocity.com",
    path: "/event/events",
    headers: {
      "Authorization": "Basic cGlwb3QyL3JlbXkubGFmZnVnZUB5bm92LmNvbTpCYWJvdTk3NEA="
    }
  };

  const req = https.get(options, res => {
    console.log("Status : ", res.statusCode);
    console.log("Headers : ", res.headers);
    res.on("data", (data => {
      data = JSON.parse(data.toString());
    }));
  });

  req.on('error', (e) => {
    console.error(e);
  });

  req.end();
}

getEvent();

setInterval(getEvent, interval);