import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@src/http-exceptions/exceptions/http.exception';
import { HttpError } from '@src/http-exceptions/types/exception.type';

interface Log {
  log: string;
}

/**
 * customize status code 500 error exception
 */
export class HttpInternalServerErrorException extends HttpException {
  constructor(
    error: Omit<HttpError<HttpInternalServerErrorException>, 'message'> & Log,
  ) {
    const { errorCode } = error;

    super({
      errorCode,
      message: 'server error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
