import HttpStatus from '../constants/statusCodes';

class NotFoundError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HttpStatus.NOT_FOUND;
    this.name = 'NotFoundError';
  }
}

export default NotFoundError;
