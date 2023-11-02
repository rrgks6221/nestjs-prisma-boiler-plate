import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@src/http-exceptions/exceptions/http.exception';
import { HttpError } from '@src/http-exceptions/types/exception.type';

/**
 * node  process error exception
 * ex) ReferenceError, TypeError etc
 * {@link https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Error}
 */
export class HttpProcessErrorException extends HttpException {
  constructor(error: HttpError<HttpProcessErrorException>) {
    const { errorCode, message } = error;

    super({
      errorCode,
      message,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
