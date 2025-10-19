import HttpStatus from '../constants/statusCodes';

class BadRequestError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HttpStatus.BAD_REQUEST;
    this.name = 'BadRequestError';
  }
}

export default BadRequestError;
