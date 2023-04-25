import express from 'express';

import globalRouter from './Routers';

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use('/', globalRouter);

export default api;