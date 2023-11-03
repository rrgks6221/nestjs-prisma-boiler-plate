import { HttpStatus } from '@nestjs/common';
import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';

interface Error {
  errorCode: typeof ERROR_CODE[keyof typeof ERROR_CODE];
}

/**
 * node  process error exception
 * ex) ReferenceError, TypeError etc
 * {@link https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Error}
 */
export class HttpProcessErrorException {
  public readonly errorCode: typeof ERROR_CODE[keyof typeof ERROR_CODE];

  public readonly message: string;

  public readonly statusCode: ErrorHttpStatusCode;

  constructor(error: Error) {
    const { errorCode } = error;

    this.errorCode = errorCode;
    this.message = 'server error';
    this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  }

  getResponse(): HttpProcessErrorException {
    return this;
  }
}
