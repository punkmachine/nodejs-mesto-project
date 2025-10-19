import { Request } from 'express';

// Интерфейс для авторизованных запросов
export interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
  };
}
