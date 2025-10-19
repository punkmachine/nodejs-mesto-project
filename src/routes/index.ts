import { Router } from 'express';

import userRouter from './user';
import cardRouter from './card';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/cards', cardRouter);

export default routes;
