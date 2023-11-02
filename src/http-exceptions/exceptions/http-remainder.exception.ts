import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@src/http-exceptions/exceptions/http.exception';
import { HttpError } from '@src/http-exceptions/types/exception.type';

/**
 * filter 를 만들지 않은 exception
 */
export class HttpRemainderException extends HttpException {
  constructor(error: HttpError<HttpRemainderException>) {
    const { errorCode, message } = error;

    super({
      errorCode,
      message,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
