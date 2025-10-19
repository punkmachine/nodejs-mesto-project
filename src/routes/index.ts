import { Router } from 'express';

import userRouter from './user';
import cardRouter from './card';

import NotFoundError from '../helpers/errors/not-found-error';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/cards', cardRouter);

routes.use((req, res, next) => {
  next(new NotFoundError('Ресурс не найден'));
});

export default routes;
