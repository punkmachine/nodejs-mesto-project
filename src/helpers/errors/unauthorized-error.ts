import HttpStatus from '../constants/statusCodes';

class UnauthorizedError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HttpStatus.UNAUTHORIZED;
    this.name = 'UnauthorizedError';
  }
}

export default UnauthorizedError;
