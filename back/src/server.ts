import { RestServer } from './server.rest';
import * as express from "express";

const port :number = 3000;

const server = RestServer.start(express(), port);
