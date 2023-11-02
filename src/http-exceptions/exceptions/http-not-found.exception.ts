import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@src/http-exceptions/exceptions/http.exception';
import { HttpError } from '@src/http-exceptions/types/exception.type';

/**
 * status code 404 error exception
 */
export class HttpNotFoundException extends HttpException {
  constructor(error: HttpError<HttpNotFoundException>) {
    const { errorCode, message } = error;

    super({
      errorCode,
      message,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
