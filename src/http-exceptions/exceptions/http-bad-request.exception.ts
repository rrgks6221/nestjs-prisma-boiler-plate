import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@src/http-exceptions/exceptions/http.exception';
import { HttpError } from '@src/http-exceptions/types/exception.type';

/**
 * status code 400 error exception
 */
export class HttpBadRequestException extends HttpException {
  constructor(error: HttpError<HttpBadRequestException>) {
    const { errorCode, message } = error;

    super({
      errorCode,
      message,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  getResponse(): HttpBadRequestException {
    return super.getResponse() as HttpBadRequestException;
  }
}
