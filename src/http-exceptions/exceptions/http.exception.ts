import { HttpException as NestHttpException } from '@nestjs/common';
import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { HttpError } from '@src/http-exceptions/types/exception.type';

export class HttpException extends NestHttpException {
  public readonly statusCode: ErrorHttpStatusCode;

  public readonly errorCode: typeof ERROR_CODE[keyof typeof ERROR_CODE];

  public readonly message: string;

  constructor(
    error: HttpError<HttpException> & { statusCode: ErrorHttpStatusCode },
  ) {
    const { statusCode, errorCode, message } = error;

    super(
      {
        errorCode,
        message,
      },
      statusCode,
    );
  }
}
