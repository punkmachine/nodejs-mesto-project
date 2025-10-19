import HttpStatus from '../constants/statusCodes';

class ConflictError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HttpStatus.CONFLICT;
    this.name = 'ConflictError';
  }
}

export default ConflictError;
