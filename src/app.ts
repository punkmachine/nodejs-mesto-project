import 'dotenv/config';

import express, { type Request, type Response, type NextFunction } from 'express';
import mongoose from 'mongoose';

import userRouter from './routes/user';
import cardRouter from './routes/card';

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

app.use(express.json());

// Временное решение авторизации
app.use((req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  req.user = {
    _id: '68f486669ad1e5c719525d0b',
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = err as { statusCode: number; message: string };

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
