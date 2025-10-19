class ValidationError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
    this.name = 'ValidationError';
  }
}

export default ValidationError;
