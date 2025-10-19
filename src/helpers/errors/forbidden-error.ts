import HttpStatus from '../constants/statusCodes';

class ForbiddenError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HttpStatus.FORBIDDEN;
    this.name = 'ForbiddenError';
  }
}

export default ForbiddenError;
