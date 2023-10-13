class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'err';
    this.isOperational = true;
    // console.log('\n \n \n \n ', this.statusCode, ' \n \n \n \n \n \n \n ');

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
