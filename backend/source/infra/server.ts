import express from 'express';
import { api } from '../app/api';
import { handleError, handleNotFound } from '../app/middlewares';

const server = express();

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(api);
server.use(handleError());
server.use(handleNotFound());

export default server;
