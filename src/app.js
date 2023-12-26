import express from 'express';
import { spreadRouter } from './routers/SpreadRouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/spread', spreadRouter);

export { app }
