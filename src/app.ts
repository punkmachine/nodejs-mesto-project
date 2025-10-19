import 'dotenv/config';

import './types/express';

import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';

import routes from './routes';
import { createUser, login } from './controllers/user';
import { createUserValidation, loginValidation } from './helpers/validations/userValidations';

import auth from './middlewares/auth';
import HttpStatus from './helpers/constants/statusCodes';

import { requestLogger, errorLogger } from './middlewares/logger';

const {
  MONGO_URL,
  PORT = 3000,
} = process.env;

if (!MONGO_URL) {
  process.exit(1);
}

const app = express();

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Успешное подключение к MongoDB');
  })
  .catch(() => {
    process.exit(1);
  });

app.use(requestLogger);

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.post('/signup', createUserValidation, createUser);
app.post('/signin', loginValidation, login);

app.use(auth);
app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.code === 11000) {
    res.status(HttpStatus.CONFLICT).send({
      message: 'Пользователь с таким email уже существует',
    });

    return;
  }

  if (err.name === 'CastError') {
    res.status(HttpStatus.NOT_FOUND).send({
      message: 'Ресурс не найден',
    });

    return;
  }

  const { statusCode = HttpStatus.INTERNAL_SERVER_ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === HttpStatus.INTERNAL_SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
